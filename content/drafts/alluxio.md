---
title: Alluxio PoC
date: "2017-09-07T23:53:28+00:00"
lang: en
draft: true
tags:
  - Data Engineering
  - Distributed System
  - Data Backend
  - Infrastructure

---

This article goes through Alluxio a distributed storage layer

## Intro ##

Something that i have in mind for some time is to test [Alluxio](http://www.alluxio.org/) as a distributed storage layer for Spark.

In this article i'll describe my PoC on this.

## Objective ##

* Test Alluxio as a Storage layer for Spark
* Create a docker environment that could be quick to setup
* Document the procedure and test the solution

## Infrastructure ##

Create several dockers to run the tests

* 1 dockers for HDFS (TBD)
* 3 dockers for aluxio cluster (TBD)

## Pre-Setup ##

Let's start by creating a docker with CDH which will simulate our HDFS Infrastructure.

We could use the provide docker image from Cloudera

```sh
docker pull cloudera/quickstart:latest
```

Let's create the image with docker compose

TODO: ...

To fireup a Cloudera Quickstart Container

```sh
docker run --hostname=quickstart.cloudera --privileged=true -t -i cloudera/quickstart /usr/bin/docker-quickstart -d
```

## Setup ##

### Setup Alluxio #

TODO

### Setup HDFS ###

TODO

### Setup Spark ###

TODO

## Tests ##

WIP

## References ##

* <https://www.cloudera.com/documentation/enterprise/5-6-x/topics/quickstart_docker_container.html>
* <http://www.alluxio.org/>
* <http://www.alluxio.org/docs/1.5/en/Running-Alluxio-On-Docker.html>
