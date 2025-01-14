---
title: ClickHouse
date: "2024-01-28T10:00:00+00:00"
lang: en
tags:
  - OLTP
  - SQL
---

In this article I will go through ClickHouse a tree column-oriented DBMS.

## Intro ##

ClickHouse is a true column-oriented DBMS. Data is stored by columns, and during the execution of arrays (vectors or chunks of columns). Whenever possible, operations are dispatched on arrays, rather than on individual values. It is called “vectorized query execution” and it helps lower the cost of actual data processing.

## Architecture ##

ClickHouse was initially built as a prototype to do just a single task well: to filter and aggregate data as fast as possible. That’s what needs to be done to build a typical analytical report, and that’s what a typical GROUP BY query does. The ClickHouse team has made several high-level decisions that, when combined, made achieving this task possible:

**Column-oriented storage**: Source data often contain hundreds or even thousands of columns, while a report can use just a few of them. The system needs to avoid reading unnecessary columns to avoid expensive disk read operations.

**Indexes**: Memory resident ClickHouse data structures allow the reading of only the necessary columns, and only the necessary row ranges of those columns.

**Data compression**: Storing different values of the same column together often leads to better compression ratios (compared to row-oriented systems) because in real data a column often has the same, or not so many different, values for neighboring rows. In addition to general-purpose compression, ClickHouse supports specialized codecs that can make data even more compact.

**Vectorized query execution**: ClickHouse not only stores data in columns but also processes data in columns. This leads to better CPU cache utilization and allows for SIMD CPU instructions usage.

**Scalability**: ClickHouse can leverage all available CPU cores and disks to execute even a single query. Not only on a single server but all CPU cores and disks of a cluster as well.

### Attention to Low-Level Details ###

But many other database management systems use similar techniques. What really makes ClickHouse stand out is attention to low-level details. Most programming languages provide implementations for most common algorithms and data structures, but they tend to be too generic to be effective.

## Setup ##

In order to install run the following script

```bash
curl https://clickhouse.com/ | sh
```

One can start the server with the following command

```bash
./clickhouse server
```

With a different terminal lets start a client with

```bash
./clickhouse client
```

## Tests ##

Lets start by creating a table from sample data

```sql
CREATE TABLE my_first_table
(
    user_id UInt32,
    message String,
    timestamp DateTime,
    metric Float32
)
ENGINE = MergeTree
PRIMARY KEY (user_id, timestamp)
```

The statement uses traditional SQL DDL, with one extend information regarding the execution engine. The MergeTree option provides improved performance for managed tables but there are also options to integrate with external systems such as BigQuery, S3, Kafka, PostgreSQL, ...

### Insert some data ###

```sql
INSERT INTO my_first_table (user_id, message, timestamp, metric) VALUES
    (101, 'Hello, ClickHouse!',                                 now(),       -1.0    ),
    (102, 'Insert a lot of rows per batch',                     yesterday(), 1.41421 ),
    (102, 'Sort your data based on your commonly-used queries', today(),     2.718   ),
    (101, 'Granules are the smallest chunks of data read',      now() + 5,   3.14159 )
```

### Query ###

```sql
 SELECT *
 FROM my_first_table
 ORDER BY timestamp
```

Now lets create a table from external data in S3 and a materialized table using the **MergeTree** engine from it.

### Create data from S3 sources ###

First create our managed table

```sql
CREATE TABLE trips
(
    `trip_id` UInt32,
    `vendor_id` Enum8('1' = 1, '2' = 2, '3' = 3, '4' = 4, 'CMT' = 5, 'VTS' = 6, 'DDS' = 7, 'B02512' = 10, 'B02598' = 11, 'B02617' = 12, 'B02682' = 13, 'B02764' = 14, '' = 15),
    `pickup_date` Date,
    `pickup_datetime` DateTime,
    `dropoff_date` Date,
    `dropoff_datetime` DateTime,
    `store_and_fwd_flag` UInt8,
    `rate_code_id` UInt8,
    `pickup_longitude` Float64,
    `pickup_latitude` Float64,
    `dropoff_longitude` Float64,
    `dropoff_latitude` Float64,
    `passenger_count` UInt8,
    `trip_distance` Float64,
    `fare_amount` Float32,
    `extra` Float32,
    `mta_tax` Float32,
    `tip_amount` Float32,
    `tolls_amount` Float32,
    `ehail_fee` Float32,
    `improvement_surcharge` Float32,
    `total_amount` Float32,
    `payment_type` Enum8('UNK' = 0, 'CSH' = 1, 'CRE' = 2, 'NOC' = 3, 'DIS' = 4),
    `trip_type` UInt8,
    `pickup` FixedString(25),
    `dropoff` FixedString(25),
    `cab_type` Enum8('yellow' = 1, 'green' = 2, 'uber' = 3),
    `pickup_nyct2010_gid` Int8,
    `pickup_ctlabel` Float32,
    `pickup_borocode` Int8,
    `pickup_ct2010` String,
    `pickup_boroct2010` String,
    `pickup_cdeligibil` String,
    `pickup_ntacode` FixedString(4),
    `pickup_ntaname` String,
    `pickup_puma` UInt16,
    `dropoff_nyct2010_gid` UInt8,
    `dropoff_ctlabel` Float32,
    `dropoff_borocode` UInt8,
    `dropoff_ct2010` String,
    `dropoff_boroct2010` String,
    `dropoff_cdeligibil` String,
    `dropoff_ntacode` FixedString(4),
    `dropoff_ntaname` String,
    `dropoff_puma` UInt16
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(pickup_date)
ORDER BY pickup_datetime
SETTINGS index_granularity = 8192
```

Now let's create our raw table. Take into account the ENGINE being used.

```sql
CREATE TABLE trips_raw
(
   `trip_id`               UInt32,
   `vendor_id`             Enum8('1' = 1, '2' = 2, '3' = 3, '4' = 4, 'CMT' = 5, 'VTS' = 6, 'DDS' = 7, 'B02512' = 10, 'B02598' = 11, 'B02617' = 12, 'B02682' = 13, 'B02764' = 14, '' = 15),
   `pickup_date`           Date,
   `pickup_datetime`       DateTime,
   `dropoff_date`          Date,
   `dropoff_datetime`      DateTime,
   `store_and_fwd_flag`    UInt8,
   `rate_code_id`          UInt8,
   `pickup_longitude`      Float64,
   `pickup_latitude`       Float64,
   `dropoff_longitude`     Float64,
   `dropoff_latitude`      Float64,
   `passenger_count`       UInt8,
   `trip_distance`         Float64,
   `fare_amount`           Float32,
   `extra`                 Float32,
   `mta_tax`               Float32,
   `tip_amount`            Float32,
   `tolls_amount`          Float32,
   `ehail_fee`             Float32,
   `improvement_surcharge` Float32,
   `total_amount`          Float32,
   `payment_type_`         Enum8('UNK' = 0, 'CSH' = 1, 'CRE' = 2, 'NOC' = 3, 'DIS' = 4),
   `trip_type`             UInt8,
   `pickup`                FixedString(25),
   `dropoff`               FixedString(25),
   `cab_type`              Enum8('yellow' = 1, 'green' = 2, 'uber' = 3),
   `pickup_nyct2010_gid`   Int8,
   `pickup_ctlabel`        Float32,
   `pickup_borocode`       Int8,
   `pickup_ct2010`         String,
   `pickup_boroct2010`     FixedString(7),
   `pickup_cdeligibil`     String,
   `pickup_ntacode`        FixedString(4),
   `pickup_ntaname`        String,
   `pickup_puma`           UInt16,
   `dropoff_nyct2010_gid`  UInt8,
   `dropoff_ctlabel`       Float32,
   `dropoff_borocode`      UInt8,
   `dropoff_ct2010`        String,
   `dropoff_boroct2010`    FixedString(7),
   `dropoff_cdeligibil`    String,
   `dropoff_ntacode`       FixedString(4),
   `dropoff_ntaname`       String,
   `dropoff_puma`          UInt16
) ENGINE = S3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/nyc-taxi/trips_{0..9}.gz', 'TabSeparatedWithNames', 'gzip');
```

Let's select from our raw table

```sql
SELECT DISTINCT(pickup_ntaname)
FROM trips_raw
LIMIT 10;
```

The S3 table engine supports parallel reads. Writes are only supported if the table definition does not contain glob patterns

You will need to configure access credentials on the **config.xml** if you are using private data or you need to write data. You can also define individual configuration filed on the conf.d directory like the following example.

```xml
<clickhouse>
    <s3>
        <endpoint-name>
            <endpoint>https://dalem-files.s3.amazonaws.com/test/</endpoint>
            <access_key_id>key</access_key_id>
            <secret_access_key>secret</secret_access_key>
            <!-- <use_environment_credentials>false</use_environment_credentials> -->
            <!-- <header>Authorization: Bearer SOME-TOKEN</header> -->
        </endpoint-name>
    </s3>
</clickhouse>
```

But we are not going to do this and just load the public data locally.

Let's just load data from our raw table for the materialized one.

```sql
INSERT INTO trips SELECT * FROM trips_raw
```

This will take some time and you can check the progress bar on the console

```text
0 rows in set. Elapsed: 109.103 sec. Processed 10.00 million rows, 815.59 MB (91.66 thousand rows/s., 7.48 MB/s.)
Peak memory usage: 1.21 GiB.
```

Lets validate we have the data

```sql
buldozer :) SELECT COUNT(1) FROM trips

SELECT COUNT(1)
FROM trips

Query id: 8956eff9-d76e-4a1e-a766-9bcc5dd1f6cd

┌──count()─┐
│ 10000840 │
└──────────┘

1 row in set. Elapsed: 0.002 sec. 
```

Let's execute a DISTINCT query to force a heavier execution plan.

```sql
SELECT DISTINCT(*) FROM trips
```

This execution was done in a single server with a AMD processor

```text
10000840 rows in set. Elapsed: 18.121 sec. Processed 10.00 million rows, 3.07 GB (551.89 thousand rows/s., 169.19 MB/s.)
Peak memory usage: 631.59 MiB.
```

Still it scanned 10M registers in 18s, not bad :D

## Clickhouse Local ##

[Clickhouse local](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local) is very useful if you want to query data directly on top of files without having to install a server.

This option is also very interesting to incorporate in a deployment pipeline

### Query CSV ###

```bash
./clickhouse local -q "SELECT * FROM 'review_?.csv'"
```

### Query Parquet ###

```bash
./clickhouse local -q "
SELECT count()
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/house_parquet/house_0.parquet')"
```

## Integrations ##

Clickhouse as many [integrations](https://clickhouse.com/docs/en/integrations) available:

* **Core integrations**: built or maintained by ClickHouse, they are supported by ClickHouse and live in the ClickHouse GitHub organization
* **Partner integrations**: built or maintained, and supported by, third-party software vendors
* **Community integrations**: built or maintained and supported by community members. No direct support is available besides the public GitHub repositories and community Slack channels

Also the available documentation seems well prepared.

## Production ##

This article only touches the surface on the available options to setup Clickhouse one should read the [Scale Out](https://clickhouse.com/docs/en/architecture/horizontal-scaling) section to understand best to deploy in Production

## Conclusion ##

In this article we followed the quick-start guide in order to setup a Clickhouse server loaded data from S3 a public dataset with 10M records and performed a select distinct query on that table.

Clickhouse presents as a very interesting OLTP solution. If you are considering a solution for Analytical Reporting this is something to have on your radar.

I also liked the fact you can start small having you service full deployment and maintained by you, but still having the capability to scaling horizontally or moving to Cloud Offering which would granting the support characteristics that most of the times are missing in open-source source software.

The fact there is a huge list of [Adopters](https://clickhouse.com/docs/en/about-us/adopters) and a Company providing support and defining a roadmap for the product also brings reassurance to use this Product.

The documentation provide several integrations patterns that are worth checking.

This is definitely one that I will keep an eye on.

Well done Clickhouse ;)

## References ##

* <https://clickhouse.com/>
* <https://clickhouse.com/docs/en/tutorial>
* <https://clickhouse.com/docs/en/about-us/cloud>
* <https://clickhouse.com/docs/en/about-us/adopters>
* <https://clickhouse.com/docs/en/operations/utilities>
