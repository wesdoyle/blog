---
title: "Multiprocessing in Python"
description: "A quick look at using multiprocessing.Pool"
date: 2020-09-12
---

## A Quick Multiprocessing Example

Much has been written about Python's `GIL` (global interpreter lock), which constrains a Python process to a single 
processor at a time.  At a high level, it's important to remember that if your Python 
program is I/O bound, use `threading`, and if it's CPU-bound, use `multiprocessing`.

Python's `multiprocessing` module provides abstractions over managing the execution and 
communication of multiple Python processes, allowing for (potentially) significant increases
in performance for CPU-bound work.  Using `multiprocessing`, we can spawn multiple subprocesses,
effectively avoiding the limitations enforced by the `GIL` for CPU-bound problems.

For simple problems, where we might need to apply a function against all of the elements in a large dataset, 
such that the data can be chunked and worked on by multiple cores (data parallelism),
the `Pool` object provides a straightforward interface.  

We have several ways of passing data to our Pool of subprocesses, each with their own considerations.

- `map()`: Converts the iterable to a list, if it's not already, and sends chunks from that list to the Pool's set of processes. Better time efficiency than passing items one at a time, with the space trade-off because the entire list needs to fit in memory. With this approach, we must wait for the entire list to complete processing to get results.
- `map_async()`: A variation of `map` that returns an `AsyncResult` from which we can retrieve results using `get()`.  We can provide a timeout.  We must still wait for all results to be processed before we have access to the result.
- `imap()`: Iterates over the iterable one element at a time without converting it into a list.  Avoids the memory tradeoff at the expense of being potentially slower for large iterables due to 1-at-a-time iteration.  This can be mitigated by providing a `chunksize`, which is 1 by default.  With this approach we can get results back as soon as they are done processing, as opposed to waiting for the entire iterable to complete.
- `imap_unordered()`: Similar to `imap`, with results returning as soon as they're ready, except that we don't preserve ordering.

Let's look at a quick example demonstrating some CPU-bound work using a single process versus a multiprocessing approach. 

Let's imagine we have some CPU-bound work wherein we need to execute some intensive computation against all of the data in some iterable.
Without using multiprocessing, we might have the following:

```python
from time import time
from random import random
import statistics as stat


def _do_work(task):
    cycles = 1 + int(random() * 10 ** 2)
    for i in range(10_000_000):
        # burn some CPU
        i * i * cycles
    return cycles


def run():
    sample_size = 3
    task_count = 12
    samples = []
    
    print("Starting single process test")
    for sample in range(sample_size):
    
        t0 = time()
        
        tasks = range(task_count)
        res = map(_do_work, tasks)
        
        [print(f"Cycles: {i}") for i in res]
        
        t1 = time()
        
        print(f"Elapsed: {t1-t0}")
        
        samples.append(t1-t0)

    print(f"Average processing time for "
          f"single process for {sample_size} samples of "
          f"{task_count} tasks:"
          f" {stat.mean(samples)}")


if __name__ == "__main__":
    run()
```

```> Average processing time for single process for 3 samples of 12 tasks: 15.210...```


Now let's look at how we can improve the performance of our program using `multiprocessing.Pool` with `imap_unordered`.
Note that we can use a context manager with the `Pool` to ensure that internal resources are released when the work is complete.


```python
from multiprocessing import Pool
from time import time
from random import random
import statistics as stat


def _do_work(task):
    cycles = 1 + int(random() * 10 ** 2)
    for i in range(10_000_000):
        # burn some CPU
        i * i * cycles
    return cycles


def run():
    sample_size = 3
    workers = 10
    task_count = 12
    chunksize = 4
    samples = []

    print("Starting multiprocessing test")
    for sample in range(sample_size):
    
        t0 = time()
        
        with Pool(processes=workers) as pool:
            tasks = range(task_count)
            res = pool.imap_unordered(_do_work, tasks, chunksize=chunksize)
            [print(f"Cycles: {i}") for i in res]
            
        t1 = time()
        
        print(f"Elapsed: {t1-t0}")
        
        samples.append(t1-t0)

    print(f"Average processing time for "
          f"{sample_size} samples with "
          f"{workers} workers for "
          f"{task_count} tasks:"
          f" {stat.mean(samples)}")


if __name__ == "__main__":
    run()
```

```> Average processing time for 3 samples with 10 workers for 12 tasks: 5.542...```

Here we can see a significant improvement in performance by taking advantage of additional cores for CPU-bound work.



