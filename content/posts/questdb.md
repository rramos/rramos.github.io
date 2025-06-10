---
title: questdb
date: '2025-06-10T10:00:00+00:00'
lang: en
draft: false
tags:
    - Data Engineering
    - Time-Series
    - SQL
---

In this article we will go through testing questdb, quickly setup with docker load some csv data and test with python-polars

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


## What is questdb

QuestDB is a top performance database that specializes in time-series.
It offers category-leading ingestion throughput and fast SQL queries with operational simplicity.
Given its effiency, QuestDB reduces operational costs, all while overcoming ingestion bottlenecks.
As a result, QuestDB amplifies intensive time-series, capital market, and heavy industry use cases.

## Schema Design

QuestDB has a single database per instance. Unlike PostgreSQL and other database engines, where you may have multiple databases or multiple schemas within an instance, in QuestDB, you operate within a single namespace.

The default database is named `qdb`, and this can be changed via configuration. However, unlike a standard SQL database, there is no need to issue USE DATABASE commands. Once connected, you can immediately start querying and inserting data. If you need multi-tenancy, you must manage table names manually, often by using prefixes for different datasets.

## Instalation

We are going to start the server via docker for testing purposes. For production enviroments one should check other deployment option like [Kubernetes](https://questdb.com/docs/deployment/kubernetes/) for instance 

Lets use the folloring docker example [docker-questdb](https://github.com/rramos/dockers/tree/master/docker-questdb)

```sh
docker-compose up -d
```

Upon starting questdb docker image one can access the web console <http://172.25.0.2:9000>

Lets create a sample database as described on the quick starte guide

```sql
CREATE TABLE trades (
    timestamp TIMESTAMP,
    symbol SYMBOL,
    side SYMBOL,
    price DOUBLE,
    amount DOUBLE
) TIMESTAMP(timestamp) PARTITION BY DAY WAL
DEDUP UPSERT KEYS(timestamp, symbol);
```

## Import Data

Lets create a CSV file (`weather.csv`) with the following content

```csv
"locationId","timestamp","windDir","windSpeed","windGust","cloudCeiling","skyCover","visMiles","tempF","dewpF","rain1H","rain6H","rain24H","snowDepth"
1,"2010-07-05T00:23:58.981263Z",3050,442,512,,"OBS",11.774906006761,-5,-31,58.228032196984,70.471606345673,77.938252342637,58
2,"2017-10-10T10:13:55.246046Z",900,63,428,5487,"BKN",4.958601701089,-19,-7,4.328016420894,36.020659549374,97.821114441800,41
3,"2010-03-12T11:17:13.727137Z",2880,299,889,371,"BKN",10.342717709226,46,81,9.149518425127,20.229637391479,20.074738007931,80
4,"2018-08-21T15:42:23.107543Z",930,457,695,4540,"OBS",13.359184086767,90,-47,33.346163208862,37.501996055160,58.316836760009,13
```

One can use the following endpoint `/imp` to import data

```sh
curl -F data=@weather.csv 'http://172.25.0.2:9000/imp?overwrite=true&name=weather'
```

There are several options for loading data check the [dedicated section](https://questdb.com/docs/guides/import-csv/) for that if you like to know more. 

## Test with a Python Client

In order to select our questdb data lets use python with polars, and creater the enviroment using `uv`

```sh
uv init
uv venv
uv pip install polars pyarrow connectorx
```

Example python script to test

```python
import polars as pl

QUESTDB_URI = "redshift://admin:quest@localhost:8812/qdb"
QUERY = "SELECT * FROM weather LIMIT 5;"

df = pl.read_database_uri(query=QUERY, uri=QUESTDB_URI)
print("Received DataFrame:")
print(df)
```

## Conclusion 

In this article, we explored how to set up a QuestDB table — a high-performance, time-series database — by loading weather data from a CSV file. We concluded with a Python test script using Polars to query the data efficiently. If your use case involves high data cardinality and you're encountering performance issues or want to avoid ingestion bottlenecks, QuestDB is a compelling choice. It consistently outperforms InfluxDB and TimescaleDB, especially on low-resource hardware setups.

## References ##

* <https://github.com/questdb/questdb>
* <https://github.com/questdb/questdb/releases/tag/8.0.0>
* <https://questdb.com/docs/quick-start>
* <https://questdb.com/docs>
* <https://questdb.com/docs/deployment/kubernetes>
