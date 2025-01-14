---
title: harlequin
date: "2024-07-04T17:00:00+00:00"
lang: en
tags:
  - Data
  - Engineering
  - SQL
  - SQLite
  - DuckDB
  - Utils
---

In this article we are going through the tool harlequin a SQL IDE that runs on the terminal

## Intro ##

Harlequin is a SQL IDE for DuckDB, SQLite, and other databases that runs in your Terminal

## How ##

Harlequin is written in Python, using the Textual framework.

Harlequin is free and open-source software, licensed to you under the MIT License. You can find the source on GitHub.

## Install ##

After installing Python 3.8 or above, install Harlequin using pip or pipx with:

```sh
pipx install harlequin
```

You may want to install Harlequin with one or more extras, which provide additional features like additional database support or remote file viewing. That would look like this:

```sh
pipx install harlequin[postgres,s3]
```

Check the official documentation to assess the available extensions: <https://harlequin.sh/docs/duckdb/extensions>

## Loading some examples ##

Let's clone the examples provided by superset as an example

```sh
git clone git@github.com:apache-superset/examples-data.git
```

Loading data

```sh
harlequin "local.duckdb"
```

Using with MotherDuck

```sh
harlequin "local.duckdb" "md:"
```

```sql
-- Sample query. For more, see docs over at
-- https://motherduck.com/docs/sample-data-queries/hacker-news

create table airports as from READ_CSV_AUTO('./airports.csv.gz');
create table bartlines as from READ_JSON_AUTO('./bart-lines.json.gz');
create table birt_france_data_for_country_map as from READ_CSV_AUTO('./birth_france_data_for_country_map.csv');
create table birt_names2 as from READ_JSON_AUTO('./birth_names2.json.gz');
create table birth_names as from READ_JSON_AUTO('./birth_names.json.gz');
create table countries as from READ_JSON_AUTO('./countries.json.gz');
create table energy as from READ_JSON_AUTO('./energy.json.gz');
create table flight_data as from READ_CSV_AUTO('./flight_data.csv.gz');
create table multiformat_time_series as from READ_JSON_AUTO('./multiformat_time_series.json.gz');
create table paris_iris as from READ_JSON_AUTO('./paris_iris.json.gz');
create table random_time_series as from READ_JSON_AUTO('./random_time_series.json.gz');
create table san_francisco as from READ_CSV_AUTO('./san_francisco.csv.gz');
create table sf_population as from READ_JSON_AUTO('./sf_population.json.gz');
create table unicode_utf8_unixnl_test as from READ_CSV_AUTO('./unicode_utf8_unixnl_test.csv');
```

## Conclusion ##

Harlequin is a terminal tool created by Ted Conbeer in 2023, designed to facilitate efficient SQL execution across multiple engines. Written in Python, this tool allows users to load files and explore data rapidly. Key features include auto-complete functionality, quick listing of both local and S3 files, and the ability to create tables and perform SQL-based exploration directly from the terminal.

## References ##

* <https://github.com/tconbeer/harlequin>
* <https://harlequin.sh/docs/getting-started>
