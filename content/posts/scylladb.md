---
title: scylladb
date: "2024-05-21T12:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - Backend
  - NoSQL
---

This article is about ScyllaDB

## Intro ##

Scylla is the real-time big data database that is API-compatible with Apache Cassandra and Amazon DynamoDB. Scylla embraces a shared-nothing approach that increases throughput and storage capacity to realize order-of-magnitude performance improvements and reduce hardware costs.

## Why ScyllaDB ##

ScyllaDB is favored for its exceptional capability to manage high data volumes and support rapid read/write operations. It is particularly effective in environments demanding high throughput, low latency, and the ability to scale. The database is also known for its robustness and fault tolerance, ensuring data integrity and availability.

## Develop with ScyllaDB ##

Developing with ScyllaDB involves setting up the database environment, choosing the appropriate drivers for your programming language, and integrating it with your application.

* [Run ScyllaDB](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/run-scylladb.html)
* [Install a Driver](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/install-drivers.html)
* [Connect an Application](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/connect-apps.html)
* [Tutorials and Example Projects](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/tutorials-example-projects.html)

## Run ScyllaDB ##

ScyllaDB offers various deployment options, including Docker and ScyllaDB Cloud, making it flexible for different development scenarios.

* [Run ScyllaDB in Docker](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/run-scylladb.html#create-database-docker)
* [Deploy with ScyllaDB Cloud (SaaS)](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/run-scylladb.html#create-database-scylladb-cloud)
* [Self-deploy in the Cloud or On-premise](https://docs.scylladb.com/stable/get-started/develop-with-scylladb/run-scylladb.html#create-database-self-deploy)

For the scope of this article will focus on a docker deployment running a single node.

Run the following command to run scylla in detached mode

```bash
docker run --name scylla -d scylladb/scylla
```

To check server logs you can run the following command:

```bash
docker logs -f scylla
```

To verify the node status execute the following command:

```bash
docker exec -it scylla nodetool status
```

You should have a similar output

```text
Datacenter: datacenter1
=======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address     Load       Tokens       Owns    Host ID                               Rack
UN  172.17.0.2  181.09 KB  256          ?       de5cb62e-165f-4be0-b0b4-df04be16aac4  rack1

Note: Non-system keyspaces don't have the same replication settings, effective ownership information is meaningless
```

To connect to a node one can use the following command

```bash
docker exec -it scylla cqlsh
```

### Scylla APIs and compatibility ###

By default, Scylla is compatible with Apache Cassandra and its APIs - CQL and Thrift. There is also support for the API of Amazon DynamoDB™, which needs to be enabled and configured in order to be used. For more information on how to enable the DynamoDB™ API in Scylla, and the current compatibility of this feature as well as Scylla-specific extensions, see [Alternator](https://github.com/scylladb/scylladb/blob/master/docs/alternator/alternator.md) and [Getting started with Alternator](https://github.com/scylladb/scylladb/blob/master/docs/alternator/getting-started.md).

## Next steps ##

Next steps would be to create some client application. The following resources provide a good starting point, but that would be outside the scope of this article.

## Additional Resources ##

* [https://university.scylladb.com/courses/scylla-essentials-overview/](Scyla Essentials course)
* [Data Modeling in Scylla](https://university.scylladb.com/courses/data-modeling/)
* [Data Modeling and Application Development](https://university.scylladb.com/courses/data-modeling/)
* [Scylla Documentation](https://docs.scylladb.com/)
* [slack channel](http://slack.scylladb.com/)

## Reference ##

* <https://www.scylladb.com/>
* <https://github.com/scylladb/scylladb>
* <https://docs.scylladb.com/stable/>
* <https://docs.scylladb.com/stable/get-started/>
* <https://university.scylladb.com/courses/using-scylla-drivers/lessons/rust-and-scylla-2/>
* <https://github.com/scylladb/scylla-cdc-rust>
* <https://github.com/scylladb/video-streaming>
* <https://github.com/scylladb/gaming-leaderboard-demo>
* <https://github.com/scylladb/scylla-cloud-getting-started/blob/main/docs/source/build-with-rust.md>
