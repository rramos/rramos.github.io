---
title: celery
date: '2025-06-10T22:00:00+00:00'
lang: en
draft: false
tags:
    - Python
    - Orchestration 
---

In this article we will go through Celery and run a sample monitory script which call a long_running task managed by Celery.

## Intro ##

### What is a Task Queue ###

Task queues are used as a mechanism to distribute work across threads or machines.

A task queue’s input is a unit of work called a task. Dedicated worker processes constantly monitor task queues for new work to perform.

Celery communicates via messages, usually using a broker to mediate between clients and workers. To initiate a task the client adds a message to the queue, the broker then delivers that message to a worker.

A Celery system can consist of multiple workers and brokers, giving way to high availability and horizontal scaling.

## Examples ##

Examples of when Celery is useful:

* Sending emails in the background to avoid blocking user requests.
* Generating large reports or summaries.
* Processing images or other media files uploaded by users.
* Running machine learning tasks on user data.
* Performing bulk operations, such as data import or export.
* Scheduling tasks for routine maintenance, data cleanup, or other scheduled operations.
* Integrating with third-party APIs without blocking the main application. 

## Supports ##

### Brokers ###

* RabbitMQ
* Redis
* Amazon SQS

### Concurrency ###

* prefork (multiprocessing)
* Eventlet, gevent
* thread (multithreaded)
* solo (single threaded)

### Result Stores ###

* AMQP, Redis
* Memcached,
* SQLAlchemy, Django ORM
* Apache Cassandra, Elasticsearch, Riak
* MongoDB, CouchDB, Couchbase, ArangoDB
* Amazon DynamoDB, Amazon S3
* Microsoft Azure Block Blob, Microsoft Azure Cosmos DB
* Google Cloud Storage
* File system

### Serialization ###

* pickle, json, yaml, msgpack
* zlib, bzip2 compression
* Cryptographic message signing

## Features ##

### Monitoring ###

A stream of monitoring events is emitted by workers and is used by built-in and external tools to tell you what your cluster is doing – in real-time.

### Scheduling ###

You can specify the time to run a task in seconds or a datetime, or you can use periodic tasks for recurring events based on a simple interval, or Crontab expressions supporting minute, hour, day of week, day of month, and month of year.

### Work-flows ###

Simple and complex work-flows can be composed using a set of powerful primitives we call the “canvas”, including grouping, chaining, chunking, and more.

### Resource Leak Protection ###

The `--max-tasks-per-child` option is used for user tasks leaking resources, like memory or file descriptors, that are simply out of your control.

### Time & Rate Limits ###

You can control how many tasks can be executed per second/minute/hour, or how long a task can be allowed to run, and this can be set as a default, for a specific worker or individually for each task type.

### User Components ###

Each worker component can be customized, and additional components can be defined by the user. The worker is built up using “bootsteps” — a dependency graph enabling fine grained control of the worker’s internals.

## Install ##

To install using pip

```sh
uv init
uv venv
source .venv/bin/activate
uv pip install -U Celery
```

## Testing

In this example scenario we will be using Redis as Broker and a monitor script to capture the execution progress.

We need a redis instance I'm using the following [docker-redis](https://github.com/rramos/dockers/tree/master/docker-redis) for it

```sh
docker-compose up -d
```

Lets add `rich` and `celery[redis]` modules to our project

```sh
uv pip install -U Celery[redis]
uv pip install rich
```

Then we need to register the tasks which the worker will run by creating  `tasks.py` whith the following code

```python
from celery import Celery
import time

app = Celery('tasks', backend='redis://localhost:6379/1', broker='redis://localhost:6379/0')

@app.task(bind=True)
def long_running_task(self):
    for i in range(0, 101, 10):
        time.sleep(0.5)
        self.update_state(state='PROGRESS', meta={'progress': i})
    return {'progress': 100}
```

In this example we created a dummy `long_running_task()` which simply updates the execution status.

One can start the worker with the following

```sh
celery -A tasks worker --loglevel=INFO
```

Now lets create our `monitor.py` script which will trigger the celery task

```python
import time
from rich.progress import Progress, BarColumn, TextColumn, TimeRemainingColumn
from tasks import long_running_task

def monitor_task(task_id):
    from celery.result import AsyncResult
    result = AsyncResult(task_id)

    with Progress(
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        "[progress.percentage]{task.percentage:>3.0f}%",
        TimeRemainingColumn(),
    ) as progress:
        task_id_ui = progress.add_task("Running Task...", total=100)

        while not result.ready():
            meta = result.info or {}
            progress_value = meta.get('progress', 0)
            progress.update(task_id_ui, completed=progress_value)
            time.sleep(0.5)

        # Final update
        progress.update(task_id_ui, completed=100)

if __name__ == "__main__":
    # Start the Celery task
    task = long_running_task.delay()
    print(f"Started task: {task.id}")
    monitor_task(task.id)

```

You can execute the monitor script `python monitor.py` and you should get a similar output:

```sh
(test-celery) -bash-5.2$ python monitor.py 
Started task: 6c5b3656-a148-423c-acca-fd59c2ec23b8
Running Task... ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:00
(test-celery) -bash-5.2$
```

## Conclusion ##

In this article, we explored some of Celery's key features and developed a monitoring script that executes a celery_long_running task while tracking its execution status. This example only scratched the surface of what Celery can do. As a distributed task queue system for Python, Celery excels at handling tasks asynchronously or on a schedule, helping the main application remain responsive and efficient.

We also examined several scenarios where Celery proves beneficial. In general, it’s well-suited for any long-running or periodic tasks that can be offloaded to improve user experience. Additionally, Celery provides powerful tools for execution tracking, task distribution, and retry management, making it a robust solution for asynchronous processing in Python applications.

## References ##

* <https://docs.celeryq.dev/en/stable/getting-started/index.html>
* <https://docs.celeryq.dev/en/stable/getting-started/introduction.html#features>
