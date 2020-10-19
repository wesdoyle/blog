---
title: "Private Methods are often a Smell"
description: "Extract private methods to new objects"
date: 2020-10-18
---

One of the reasons objects are powerful - in the OOP sense - is because we can write
and reason about them as [anthropomorphic collaborators](https://sandimetz.com/blog/2018/21/what-does-oo-afford).
I realize that such a characterization of objects is not to everyone's liking, but I'd like to use this notion
to set the context for the following observations about how private methods are a sign of incomplete design.

For now, let's assume we're working to maximize our ability to reason about our code using
an object-oriented approach, using a high-level language, with a focus on principles like message sending, 
inversion of control, late binding, and polymorphism. We want to create objects that, in fact, 
often have a "functional" flavor and expose behavior that we can directly test.

Consider the following question - Why would we create and name an object that does something that
no other object should know about?

This isn't a rhetorical question - I'd like us to consider this a bit carefully, as OOP-ers.
To aid our efforts, let's consider a few real-world analogies.  I think it helps to spend a bit of time
to think of non-virtual systems that can be reasoned about, repaired, changed, swapped-out, and
troubleshooted at __different levels of abstraction__.  Let's consider a few examples:

- __A Bicycle__ - the bicycle itself is a system.  It contains many mechanical subsystems: the
frame, the brake system, the gears, the suspension, the wheels, etc.  Each of these subsystems contain mechanical
subsytems of their own - the subcomponents, materials, and fasteners.  We choose to stop identifying
subsystems as such at the lowest levels of abstraction that are useful for us to reason about, repair,
or otherwise change anything that relates to the highest-level of abstraction we care about - for instance,
the bicycle (or, perhaps, some combination of the bicycle, the cyclist, and their environment).


- __A Company that Builds Software__ - the company itself is a system.  
It contains many subsystems along overlapping and orthogonal dimensions. 
The various departments - engineering, HR, executive staff - are examples of subsystems.
The complex processes of package delivery, office cleaning, coffee brewing, paycheck depositing,
bill paying, insurance distributing, holiday observing, are all subsystems.  The processes by
which individual employees complete their work are subsystems.  
The software used in all of these various processes are subsystems.


- __A bookshelf__ - The bookshelf itself is a system.  Like the bicycle and software company, it contains many
subsystems at varying levels of abstraction - from the means of assembly to the mechanical components to the
books that it holds - each can be conceived of as subsystems, depending on the specific purpose of reasoning about the 
bookshelf itself.

Objects have the potential to represent behaviors we can anticipate and reason about at the _named_ level of abstraction.
We can talk about the subsystems of a thing only because we have meaningful names for them, and because they _have publicly
understood behavior_.  We can talk about repairing the brake system on a bicycle, changing out our ERP software at the company, 
and moving the height of the shelving on the bookshelf.  

Is it reasonable to say that the brake system is an implementation detail of the bicycle? Of course -
but only when we're talking at a _very high level of abstraction_ relative to system as a whole. 
If the brakes don't work, we can say that the bicycle needs to be repaired, but, as mechanics, 
it's often more useful to talk specifically about the particular aspects of the brake system that are
the root cause of failure, rather than to say "the bicycle is broken - it's due to an implementation detail."  

As bicycle mechanics, we learn how to address the state of a bicycle at lower and more nuanced levels of 
abstraction than someone who does not work on bicycles.  We can test and make assertions about the subsystems in 
their own right, just as we can talk about the state of the bicycle as a whole.

As software developers, we can write explicit assertions about the public interface of objects -
public methods or combinations of methods of named objects are unit tested.  When an object hides behavior,
it may be worth asking - is it really the responsibility of this object to be doing this?  Is this method 
defined the right level of abstraction, or should it be moved to a collaborating object and be made public?

Just as a bicycle mechanic typically does not manufacture or assemble bike frames or brake calipers, we don't
typically write database software or network drivers.  At a "low" level of abstraction (relative to our
business processes), we delegate responsibility to others, and build on top of those details.
We don't test database internals separately from our business logic, and we might often test our business logic
without their direct collaboration.  Those lowest-level subsystems are the true implementation details of the 
systems we design.

Let's bring this thought back to the things we do control in our system - the objects we name, specify,
and implement.  These are the things we'd like to be able to test directly.

We have no good way to test private members of our objects, as they're explicitly hidden from the
public interface.  We could superficially work around this by changing an access modifier to `protected`, 
inheriting from the class we need to test in our test class, exposing these methods in that context to test,
but this seems like treating a symptom of incomplete design. If you're doing this, the code is probably telling you, 

> "Hey! I don't really want to be an implementation detail - you want to test me, after all.
> I actually belong to the public interface of a different class."

When we _listen to the ways that data flows through our objects_ as we write, refactor, 
and extend their behavior, they often send us such clues.  We feel the software splitting at 
the seams when we reason about what the appropriate subsystems are. 
As OOP-ers, these seams are often potential object boundaries.

While there are certain specific reasons for hiding behavior, 
I've found that private methods are often the result of one of the following:

### 1. - __Hiding "implementation details" that contain behavior we actually care about__

### 2. - __Failing to realize that an object doesn't really _want_ to be doing part the job we've given it__

### 3. - __Avoiding extracting and naming a new class (usually out of laziness, once we realize we're doing 1. or 2.)__

When is the creation of a private method a reasonable design decision?  
I can think of a few valid reasons, each of which occurs in generally limited circumstances:

- As a more interpretable synonym for some true implementation detail of an object. This can occur when a
reusable, descriptive name should be applied to an otherwise awkward (often Boolean) operation 
and has specific use only in the scope of the object where it is used.

- When a collaborator outside of our control exposes public method that is poorly named and can be 
wrapped with a more descriptive private method for use in the implementation of our object's public 
behavior. In this case, the decision to include a private wrapper should be weighed against the cost 
of wrapping the entire "thing we don't control" in our own class that publicly exposes more useful 
names and hides the implementation details of the dependency.

- Using a private constructor for specific cases, like implementing the Singleton, Builder, or Factory Method patterns.

Objects whose functionality we really care about are hidden, waiting to be extracted and named in many of our private methods!


