---
title: smothmq
date: "2024-10-11T10:10:00+00:00"
lang: en
tags:
  - Development
  - Testing
  - SQS
---

SmoothMQ is a drop-in replacement for SQS with a much smoother developer experience. It has a functional UI, observability, tracing, message scheduling, and rate-limiting. SmoothMQ lets you run a private SQS instance on any cloud.

## Intro ##

SmoothMQ is a drop-in replacement for SQS with a much smoother developer experience. It has a functional UI, observability, tracing, message scheduling, and rate-limiting. SmoothMQ lets you run a private SQS instance on any cloud.

![diagram client queue worker](/images/sqs.drawio.svg)

## Building ##

Checkout the code from the repo https://github.com/poundifdef/SmoothMQ and run the application with 

```sh
go run . server
```

## Client Test ##

One can use the following repo as an example:

```sh
git clone https://github.com/rramos/smoothmq-tests.git
cd smoothmq-tests
```

And follow the `README.md` instructions.

You should be able to produce some test messages to your local smoothmq instance

## Conclusion ##

In this article, we covered the steps to set up SmoothMQ locally. SmoothMQ is a lightweight, single-application solution written in Go, offering an intuitive UI for managing SQS queues and messages. This tool can be particularly useful for integrating into CI/CD pipelines to facilitate functional testing.
For those developing specifically for SQS, SmoothMQ provides a streamlined experience. However, if your application relies on multiple AWS services, you might consider using [LocalStack](https://github.com/localstack/localstack), which offers broader support across the AWS ecosystem.

## References ##

* <https://github.com/rramos/smoothmq-tests.git>
* <https://github.com/poundifdef/SmoothMQ>
* <https://github.com/localstack/localstack>
