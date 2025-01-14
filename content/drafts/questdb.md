---
title: questdb
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - Data Engineering
    - Time-Series
    - SQL
---

TBD

## Intro ##

QuestDB is an open-source time-series database for high throughput ingestion and fast SQL queries with operational simplicity.

## About ##

* QuestDB is well-suited for financial market data, IoT sensor data, ad-tech and real-time dashboards. It shines for datasets with high cardinality and is a drop-in replacement for InfluxDB via support for the InfluxDB Line Protocol.

* QuestDB implements ANSI SQL with native time-series SQL extensions. These SQL extensions make it simple to filter and downsample data, or correlate data from multiple sources using relational and time-series joins.

* We achieve high performance by adopting a column-oriented storage model, parallelized vector execution, SIMD instructions, and low-latency techniques. The entire codebase is built from the ground up in Java, C++ and Rust with no dependencies and zero garbage collection.

* QuestDB supports schema-agnostic streaming ingestion using the InfluxDB line protocol and a REST API for bulk imports and exports.

* The QuestDB SQL Web Console is an interactive SQL editor facilitating CSV import. Finally, QuestDB also includes the Postgres Wire Protocol for programmatic queries.

* Popular tools that integrate with QuestDB include Apache Kafka, Grafana, Superset, Telegraf and Apache Flink.

## Web Demo ##

* https://demo.questdb.io

## Quick Start ##

https://questdb.io/docs/quick-start/

## References ##

* <https://github.com/questdb/questdb>
* <https://questdb.io/docs/guides/create-database/>
* <https://questdb.io/docs/quick-start/>
* <https://questdb.io/blog/questdb-8-release/>
* <https://github.com/questdb/questdb/releases/tag/8.0.0
* <https://docs.influxdata.com/telegraf/v1/get-started/>
