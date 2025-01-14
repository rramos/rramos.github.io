---
title: celery
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - category
---

TBD

## Intro ##

### What is a Task Queue ###

Task queues are used as a mechanism to distribute work across threads or machines.

A task queue’s input is a unit of work called a task. Dedicated worker processes constantly monitor task queues for new work to perform.

Celery communicates via messages, usually using a broker to mediate between clients and workers. To initiate a task the client adds a message to the queue, the broker then delivers that message to a worker.

A Celery system can consist of multiple workers and brokers, giving way to high availability and horizontal scaling.

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
pip install -U Celery
```

## References ##

* <https://docs.celeryq.dev/en/stable/getting-started/index.html>
