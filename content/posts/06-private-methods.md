---
title: "Private Methods are Usually a Smell"
description: "An investigation into object-oriented alternatives to private methods"
date: 2020-10-15
---

Why would we take the time to create an object that does something that any other object should not know about?

One of the reasons objects are powerful - in the OOP sense - is because we can write them to be anthropomorphic collaborators. 

Objects have the potential to represent behaviors we can anticipate and reason about at the _naming_ level of abstraction.

I've found that private methods are often an excuse for one of the following:

__1__ - Hiding implementation details (inside a private method)

__2__ - Not recognizing that an object doesn't really want to be doing something (so we dump this code inside a private method)

__3__ - Avoiding naming something (so we can say thiings like we're "hiding an implementation detail")
