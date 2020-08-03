---
title: "Malformed Data Parsing in Postgres"
description: "Wrangling dirty data in PostgreSQL"
date: 2019-08-19
---

Sometimes the trickiest part of an ETL problem is transforming the raw data you have into a useful format. 

In this post, I'll walk through an interesting data serialization problem, and explore a few Postgres functions that I leveraged. 
I was recently working on a project involving some data containing malformed JSON (we'll look at the format in a moment) 
stored in several Postgres database tables as text. I'm not sure how the data was serialized into this format when 
it was originally loaded, but the end goal of this project involved writing a number of database triggers and functions 
that parsed the tables containing this raw data and inserting transformed, new data into other tables. The raw import 
table consisted of approximately ~1M rows and having about a dozen columns of varying Character and Numeric types, 
including a column we'll call "commerce" with malformed JSON-like objects stored as text. Upon brief inspection, it 
looked like the data in the "commerce" column was very close to being valid JSON, and all of the records I inspected 
appeared to have the same malformations - unquoted numeric properties, internal single-quoting of properties and values, 
and a pair of double quotes surrounding the entire object. Apart from that, one minor caveat was that it looked like 
data in a property called "Meta" was a comma-separated list stored as a string rather than an array. So, an example value 
in the "commerce" column looked something like this:

```sql
  SELECT commerce FROM import_data LIMIT 1;
```
```js
// result
"{ 0: {'Origine': 'Lyon','DestID': 123, 'Meta': 'Foo, Bar, Baz'},
   1: {'Origine': 'Strasbourg','DestID': 3432, 'Meta': 'Foo, Quux'}}"
```

As you can see, this is almost JSON. 
We have three minor issues to resolve before it is valid. 

We need to: 
    - Eliminate the outermost double-quotes 
    - Replace internal single-quotes with double quotes 
    - Wrap the single digit properties at the first level of the parent object in double quotes. 
    
One of the many reasons I love Postgres is that it provides a robust set of Functions and Operators to work with JSON. 
In making these transformations, we'd have a properly serialized JSON object, allowing us to take advantage of these features. 
Proper serialization here would make downstream operations on this data much easier to implement. Unfortunately, since 
I didn't control how the data gets imported, I'd need to implement a post-hoc solution on the existing import. Postgres 
provides support for pattern matching using POSIX-style regular expressions. Though we could likely construct a single 
regex to clean the string, I opted to use a combination of functions to clean the string: `left`, `right`, `replace`, 
and `regexp_replace`. We can replace all of the single quotes in the string with double quotes using the Postgres 
`replace` function. It looks a bit weird, but escaping single quotes in a string requires four single quotes - two outer 
quotes for the string, and two inner quotes to represent an escaped single quote. It would also be possible to use a 
Dollar-Quoted String here.

```sql
  SELECT replace("commerce", '''', '"') FROM import_data LIMIT 1;
```

```js
// result
"{ 0:{"Origine": "Lyon","DestID": 123, "Meta": "Foo, Bar, Baz"},
   1: {"Origine": "Strasbourg","DestID": 3432, "Meta": "Foo, Quux"}}"
```

We can remove the leading and trailing double quotes using `left` and `right` functions:

```sql
 SELECT
  left(
    right(
      replace(commerce, '''', '"'),
     -1),
  -1)
FROM import_data LIMIT 1;
```

```js
// result
{0:{"Origine": "Lyon","DestID": 123, "Meta": "Foo, Bar, Baz"},
 1: {"Origine": "Strasbourg","DestID": 3432, "Meta": "Foo, Quux"}} 
```
We can use `regexp_replace` to replace the non-double-quoted digit properties with double quotes, and finally cast the 
output as Postgres's JSONB data type.

```sql
 SELECT
  left(
    right(
      regexp_replace(
        replace(commerce, '''', '"'),
        '([0-9]+):', '"\1":', 'g'),
     -1),
  -1)::jsonb;
AS commerce_cleaned
FROM import_data LIMIT 1;
```

```js
result
{"0": {"Meta": "Foo, Bar, Baz", "DestID": 123, "Origine": "Lyon"}, 
 "1": {"Meta": "Foo, Quux", "DestID": 3432, "Origine": "Strasbourg"}} 
```

This will take the value in the commerce column, create a capture group around digits preceding a colon, and replace 
them with the capture group surrounded by double quotes and a trailing colon, searching globally in the field. It's 
required to explicitly look for numbers followed by a colon because the string contains other numerals that are property 
values. Wrapping this expression in a function that takes an initial text value will make things more readable when we 
use it in composing downstream procedures:


```sql
CREATE OR REPLACE FUNCTION clean_commerce(t text) RETURNS jsonb AS $$
BEGIN
  RETURN
    left(
      right(
        regexp_replace(
          replace(t, '''', '"'),
          '([0-9]+):', '"\1":', 'g'),
       -1),
    -1)::jsonb;
END;
$$ LANGUAGE plpgsql; 
```

Now, we can simply run a query like:

```sql
SELECT clean_commerce(commerce) FROM import_data;
```

```js
result
{"0": {"Meta": "Foo, Bar, Baz", "DestID": 123, "Origine": "Lyon"}, 
 "1": {"Meta": "Foo, Quux", "DestID": 3432, "Origine": "Strasbourg"}} 
```

With some basic sanitation in place, we can now take advantage of Postgres's builtin JSON support. For example, in a 
downstream trigger, we can use the `->` operator to select and parse out separate columns for the "0" and "1" sub-objects. 
Let's say we wanted to populate a table parsed_data to capture values from the "Origine" Meta object keys whenever new 
new records are inserted into the import_data table. For example:

```sql
-- Create Trigger Function

CREATE OR REPLACE FUNCTION parse_import_data()
  RETURNS trigger AS
  $BODY$
  BEGIN
    INSERT INTO parsed_data (id, origine_1, origine_2)
    VALUES (
      NEW.id,
      clean_commerce(NEW.commerce)->'0'->>'Origine',
      clean_commerce(NEW.commerce)->'1'->>'Origine'
    );
    RETURN NEW;
  END;
$BODY$ LANGUAGE plpgsql; 

-- Create Insert Trigger

CREATE TRIGGER parse_insert_data
  BEFORE INSERT
  ON import_data
  FOR EACH ROW
  EXECUTE PROCEDURE parse_import_data(); 
```
Another interesting problem in this dataset involved the "Meta" property in the extracted JSON object. As you can see,
 it's a string with comma-separated values of varying length. As it turned out, there was some meaning to the number of 
 items in the list. If the first value of the comma-separated string at the "Meta" property was either "Foo" or "Bar," 
 the string had three comma-separated values, which mapped to properties called "Accord", "Nom", and "Email", respectively. 
 For first values of "Baz", "Quux", or "Jam," the Meta property had two values mapped to an "Accord" and an "Email," 
 respectively. As part of the pipeline, I needed to extract this data to a table, as well. Again, PostgreSQL JSON support 
 helped make the task relatively easy. First, we define a function to convert the comma separated text values to a proper 
 JSONB array. For this, we can use a combination of the function concat to prepend and append curly braces around the 
 selector, cast the result to a text array type, and pass the result to the builtin function array_to_json. Note that 
 this function is specific to the structure of the data we're importing, which was determined by inspection.

```sql
/**
  Function to create JSONB array from Meta CSV text value
*/

CREATE OR REPLACE FUNCTION commerce_meta_to_array(obj jsonb, prop text)
  RETURNS jsonb AS $$
  BEGIN
    RETURN
      array_to_json(concat('{', obj -> prop ->>'Meta', '}')::text[])::jsonb;
  END;
  $$ LANGUAGE plpgsql; 
```

Now we can use this to parse the raw data, using the `->>` operator to select the appropriate index of the value in the 
array depending on its first value. I'm wrapping the initial query in a CTE to be able to query the `array_to_json` objects 
as columns.

```sql
WITH cte AS (SELECT
  id,
  commerce_meta_to_array(clean_commerce(commerce), '0') buyer,
  commerce_meta_to_array(clean_commerce(commerce), '1') seller
  FROM import_data)

SELECT
  id,
  buyer ->> 0 accord_0,
  seller ->> 0 accord_1,
  CASE WHEN buyer ->> 0 IN ('Foo', 'Bar') THEN buyer ->> 1 ELSE NULL END nom_0,
  CASE WHEN buyer ->> 0 IN ('Foo', 'Bar') THEN buyer ->> 2 ELSE buyer ->> 1 END email_0,
  CASE WHEN seller ->> 0 IN ('Foo', 'Bar') THEN seller ->> 1 ELSE NULL END nom_1,
  CASE WHEN seller ->> 0 IN ('Foo', 'Bar') THEN seller ->> 2 ELSE seller ->> 1 END email_1
FROM cte; 
```

I'd like to investigate optimizations here, as I suspect that the nested function calls and type casting are expensive. 
