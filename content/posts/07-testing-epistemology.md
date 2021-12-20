---
title: "Testing and Epistemology"
description: "Thinking about end-to-end tests from an epistemological perspective"
date: 2021-12-19
---

I find it interesting to think about software testing in terms of epistemology.
We might think of a test suite as a set of knowledge claims about the behavior of our software.
At the level of end-to-end tests, such knowledge claims may often correspond to user stories.

For a user story like "As a user, when I delete an document, I can no longer view it among my documents,"
and a passing end-to-end test named "Given a user deletes an document, that user can no longer view it from their documents view,"
we would like to say that we know for certain the software meets the stated specification.

Despite the somewhat philosophical starting point, I want to capture some thoughts about how taking this perspective on
test-writing can help guide us toward a practical approach to developing software. Asking the question "what do I know, given
this test I've written passes," is a simple but often enlightening habit.  As engineers, we should hold the bar for what we
consider knowledge quite high, and thinking explicitly about what any knowledge claim a test allows us to make will
inevitably help us to reveal and assess subtle assumptions that underpin any given test.

When a test that we expect to pass passes, we consider this a knowledge claim (even if only loosely) about what our
software actually does. Given the assumptions of our test logic and the way that the system under test interacted
with the world when the test was executed, we make an assertion about a subsequent event or outcome.

More importantly, __when a test that we expect to pass fails, we're revealing that there is something we don't yet know
(or perhaps forgot to consider) about our software__. In this case, something about the system under test, its environment,
or the test itself resulted in an unexpected event or outcome.  Despite our best efforts, I believe gaps in knoweldge about
what our software actually does often occur due to __insufficient vetting of our knowledge claim justifications.__

In 1963, Edmund Gettier published a 3-page paper titled
"[Is Justified True Belief Knowledge?](https://web.archive.org/web/20180128081456/http://philosophyfaculty.ucsd.edu:80/faculty/rarneson/Courses/gettierphilreading.pdf)"
that had a profound impact on the study of epistemology.  In the paper, he challenged a widely-held definition of knowledge;
that is, that conditions sufficient for knowledge can be expressed in the following manner:

```
  S knows that P if and only if:
    (i) P is true,
    (ii) S believes that P, and
    (iii) S is justified in believing that P.
```

I would encourage you to read the paper for the two examples Gettier gives, but in short, he suggests that this notion
of "justified true belief" is __insufficient for what we would intuitively consider knowledge__.  In short, there are cases
when we have justified true beliefs as merely a _coincidence_, and in such cases, we would not intuitively accept such JTBs as knowledge.

For instance, let's imagine that every evening you come home from work and are greeted by your dog, Max.
You arrive home today, and as you open the door, you see a dog that looks exactly Max run happily toward you.  In this situation,

- It is true that Max is in the room
- You believe that Max is in the room
- You are justified in believing that Max is in the room

So, you might say that in this situation you have knowledge that Max is in the room.

However, there's a twist to the story - the dog that's running toward you is in
fact the neighbor's new dog Minnie, who somehow found her way in.  The neighbor's dog
looks just like Max.  Max, however, is asleep on the couch, truly in the room,
hidden under a blanket.

Nothing about the conditions leading to what we just considered knowledge are
violated - Max is in the room, you believe that Max is in the room, and you are
justified in your belief, given that Max has always run toward you, and the dog
that greeted you looks just like Max, and yet we feel as though in fact you did
not have real knowledge of your claim that Max was in the room, after all.
In a sense, you were just "lucky" that he was there.  Perhaps your justification
was insufficient, or was based on false premises or incomplete information.

> For me, the Gettier problem compels us to consider our justifications closely.
> We should look for areas where our justifications are weak and might be easily falsified.

"As I enter the room, I know that Max is here, because I see a dog that looks just like him
running toward me, as he always does - but can I possibly falsify this justification by
searching the rest of the room?" As engineers writing tests and depending on their results,
strengthening our justifications allows us to strengthen our knowledge claims about the software under
test, making our tests more valuable and our software more reliable.
