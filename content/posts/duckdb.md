---
title: DuckDB Mock environment
date: "2023-12-26T18:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - Data Modeling
  - Data Visualization
  - DuckDB
---

In this article I will go through DuckDB an in-process SQL OLAP database management system

## Intro ##

In this article I will go through DuckDB an in-process SQL OLAP database management system and setup some mock data to do some tests

## Setup ##

In order to setup duckdb client install the following pip packages.

```sh
pip install -U duckcli
pip install duckdb==0.9.2
```

The duckcli allow autocompletion on the terminal

> **NOTE:** There is other client options like ODBC or Node checkout the official page for those cases.

## Generate Mock Data ##

DuckDB reads data directly from files, and support CSV, Parquet, JSON, Excel and more.

Now lets [generate some data](https://rramos.github.io/2023/12/21/jafgen/) and import to our SQL Engine.

```sh
jafgen --years 1
```

This will generate 6 CSV files with mock data

```sh
jaffle-data/
├── raw_customers.csv
├── raw_items.csv
├── raw_orders.csv
├── raw_products.csv
├── raw_stores.csv
└── raw_supplies.csv
```

lets start the client and create managed tables for each

```sh
duckcli mydatabase.db
```

The CSVs have a header line so lets create the following tables using the commands

```sql
CREATE TABLE raw_items AS SELECT * FROM read_csv_auto('jaffle-data/raw_items.csv',header = true);
CREATE TABLE raw_orders AS SELECT * FROM read_csv_auto('jaffle-data/raw_orders.csv',header = true);
CREATE TABLE raw_products AS SELECT * FROM read_csv_auto('jaffle-data/raw_products.csv',header = true);
CREATE TABLE raw_stores AS SELECT * FROM read_csv_auto('jaffle-data/raw_stores.csv',header = true);
CREATE TABLE raw_supplies AS SELECT * FROM read_csv_auto('jaffle-data/raw_supplies.csv',header = true);
```

There are other options like defining a official delimiter or specifying the columns. Check the official page for more details on [CSV Import](https://duckdb.org/docs/data/csv/overview).

```sql
mydatabase.db> show tables;
+--------------+
| name         |
+--------------+
| raw_items    |
| raw_orders   |
| raw_products |
| raw_stores   |
| raw_supplies |
+--------------+
5 rows in set
Time: 0.030s
```

## Disclaimer ##

DuckDB seems to be blazing fast it also has the option to run in-memmory. It is important however to identify in which usecases this backend could present benefits or not.

## When or Not to use ##

DuckDB aims to automatically achieve high performance by using well-chosen default configurations and having a forgiving architecture. Of course, there are still opportunities for tuning the system for specific workloads. The Performance Guide’s page contain guidelines and tips for achieving good performance when loading and processing data with DuckDB.

### When to use DuckDB ##

* Processing and storing tabular datasets, e.g., from CSV or Parquet files
* Interactive data analysis, e.g., join & aggregate multiple large tables
* Concurrent large changes, to multiple large tables, e.g., appending rows, adding/removing/updating columns
* Large result set transfer to client

### When to not use DuckDB ##

* High-volume transactional use cases (e.g., tracking orders in a webshop)
* Large client/server installations for centralized enterprise data warehousing
* Writing to a single database from multiple concurrent processes
* Multiple concurrent processes reading from a single writable database

## Conclusion ##

In this article I went through the process to setup duckdb in a local environment and load some data into it. This database has some interesting benchmark values, I would suggest you try this one out especially if your usecase doesn't involve transactional data or multiple concurrent processes reading from a single writable database there for staging processes, development environments or single threaded CDC process seems very interesting.

I will certainly use this more in the future. Also very poisitive feedback regarding the documentation you can find on the [Official website](https://duckdb.org/docs/).

I haven´t found direct support for Delta yet, although it supports Parquet.

If you want to understand better why to choose DuckDB please check this article [Why DuckDB](https://duckdb.org/why_duckdb)

## References ##

* <https://github.com/dbcli/duckcli>
* <https://duckdb.org>
* <https://duckdb.org/docs/guides/performance/benchmarks>
* <https://duckdb.org/docs/data/csv/overview>
