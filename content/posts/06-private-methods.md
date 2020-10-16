---
title: "Private Methods are Usually a Smell"
description: "An object-oriented critique of private methods"
date: 2020-10-15
---

Objects all over the world are hiding and waiting to be named.  Their behavior lives in our private methods.

Why would we create and name an object that does something that any other object should not know about?

One of the reasons objects are powerful - in the OOP sense - is because we can write them to be anthropomorphic collaborators.

Objects have the potential to represent behaviors we can anticipate and reason about at the _naming_ level of abstraction.

While there are a few very specific reasons for hiding behavior, I've found that private methods are often an excuse for one of the following:

__1__ - Hiding implementation details (inside a private method)

__2__ - Not realizing that an object doesn't really want to be doing something (so we dump this code inside a private method and forget about it)

__3__ - Avoiding extracting and naming something (usually just out of laziness)

```c-sharp
```

When is the creation of a private method on an object that has behavior a reasonable decision?  I can think of a few valid reasons, each of which occurs in generally limited circumstances:

- As a more interpretable "synonym" for some implementation detail. This can occur when a descriptive name can be applied to an otherwise awkward one-line operation and has specific use only in this context.

```c-sharp
```

- When a collaborator outside of our control has a public method that is poorly named and can be wrapped with a more descriptive private method for use in the implementation of our object's public behavior. In this case, the decision to include a private wrapper should be weighed against the cost of wrapping the entire "thing we don't control" in our own class that publicly exposes more useful names.

```c-sharp
```

- To implement the Singleton pattern

```c-sharp
```
