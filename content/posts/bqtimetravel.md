---
title: BigQuery Timetravel
date: "2024-06-08T20:50:00+00:00"
lang: en
tags:
  - BigQuery
  - Utils
  - Data Engineering
---

In this article, we will go through the process of using Bigquery time travel feature

## Intro ##

In this article, we will go through the process of using Bigquery time travel feature

## What is Timetravel ##

BigQuery lets you use time travel to access data stored in BigQuery that has been changed or deleted.

You can access data from any point within the time travel window, which covers the past seven days by default. Time travel lets you query data that was updated or deleted, restore a table or dataset that was deleted, or restore a table that expired

## Configure the time travel window ##

You can set the duration of the time travel window, from a minimum of two days to a maximum of seven days.

You can use the Google Cloud console, the bq command-line tool, or the BigQuery API to specify the time travel window for a dataset.

When creating the dataset check for the option `--max_time_travel_hours`

## Requirements ##

### Query data at a point in time ###

The following query returns a historical version of the table from one hour ago:

```sql
SELECT *
FROM `mydataset.mytable`
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);
```

### Creating a snapshot from a given timestamp ###

The following query creates a snapshot from the original table given a specified timestamp within the time-travel window.

```sql
CREATE TABLE mydataset.mytable_01062024 AS (
SELECT * 
FROM `mydataset.mytable` 
FOR SYSTEM_TIME AS OF TIMESTAMP('2024-06-01 10:00:00.000 UTC'))
```

### Restoring a table with bq ###

The following bq command-line tool command copies a table named table1 from one hour ago into a table named table1_restored.

```sh
bq cp mydataset.table1@-3600000 mydataset.table1_restored
```

**NOTE:** time `-3600000` is specified in milliseconds using a relative offset

## Limitations ##

* Time travel only provides access to historical data for the duration of the time travel window. To preserve table data for non-emergency purposes for longer than the time travel window, use table snapshots.
* If a table has, or has previously had, row-level access policies, then time travel can only be used by table administrators. For more information, see Time travel and row-level access.
* Time travel does not restore table metadata.

## Conclusion ##

In this article we explore the Timetravel feature of Bigquery. This feature is very useful to recover data within the time window. Take into account that all tables on a dataset with this configuration are contributors for your spending so is wise to adjust depending on the criticality of your data this windows, which would save you some money.

## References ##

* <https://cloud.google.com/bigquery/docs/time-travel>
* <https://cloud.google.com/bigquery/docs/access-historical-data>
