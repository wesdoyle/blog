---
title: "Private Methods are Usually a Smell"
description: "A critique of private methods"
date: 2020-10-15
---

Objects all over the world are hiding and waiting to be named.  Their behavior lives in private methods.

One of the reasons objects are powerful - in the OOP sense - is because we can write and reason about them as [anthropomorphic collaborators](https://sandimetz.com/blog/2018/21/what-does-oo-afford).
I realize that for some developers, building systems of software in terms of conceptual objects is 
at least [poor taste](http://loup-vaillant.fr/articles/anthropomorphism-and-oop) 
at worst [an expensive disaster which must end](http://www.smashcompany.com/technology/object-oriented-programming-is-an-expensive-disaster-which-must-end), 
and in any case should probably [should be unlearned](https://dpc.pw/the-faster-you-unlearn-oop-the-better-for-you-and-your-software).
This particular exploration is interesting, but I'll save it for another post.

For now, let's assume we're working to maximize our ability to reason about our code using an object-oriented approach, with a focus on things like message-sending, inversion of control, late-binding, and polymorphism. We want to create objects that have a "functional" flavor and behavior that we can directly test.

Consider the following question - Why would we create and name an object that does something that no other object should know about?

This isn't a rhetorical question - I'd like us to consider this a bit deeply, as OOP-ers.  To aid our efforts, let's consider a few real-world analogues.

- TBD

- TBD

- TBD

Objects have the potential to represent behaviors we can anticipate and reason about at the _naming_ level of abstraction.  We can write explicit assertions about the public interface of objects - public methods can be unit tested directly.

While there are a few very specific reasons for hiding behavior, I've found that private methods are often an excuse for one of the following:

__1__ - Hiding _"implementation details"_

__2__ - Failing to realize that an object doesn't really _want_ to be doing part the job we initially gave it

__3__ - Avoiding extracting and naming something (usually out of laziness, once we realize we're doing __1__ or __2__)


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
