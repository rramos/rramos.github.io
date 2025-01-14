---
title: motherduck GA
date: "2024-06-12T09:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - PaaS
  - DuckDB
---

This article is about Motherduck a data warehouse solution build with DuckDB

## Intro ##

MotherDuck is a collaborative data warehouse that extends the power of DuckDB to the cloud

## What is Motherduck ##

MotherDuck is the first analytics data warehouse that offers cloud scale and individualized, user-level tenancy. Managing user-level compute limits and cost attribution without cumbersome upfront configuration hasn’t been possible until now.

MotherDuck's key components are:

* The MotherDuck cloud service
* MotherDuck's DuckDB SDK
* Hybrid execution
* The MotherDuck web UI

The MotherDuck cloud service enables you to store structured data, query that data with SQL, and share it with others. A key MotherDuck product principle is ease of use.

* **Serverless execution model** - You don't need to configure or spin up instances, clusters, or warehouses. You simply write and submit SQL. MotherDuck takes care of the rest. Under the hood, MotherDuck runs DuckDB and speaks DuckDB's SQL dialect.

* **Managed storage** - you can load data into MotherDuck storage to be queried or shared. MotherDuck storage is durable, secure, and automatically optimized for best performance. MotherDuck storage is surfaced to you via the catalog and logical primitives database, schema, table, view, etc. In addition, MotherDuck can query data outside of MotherDuck storage—as data on Amazon S3, via https endpoints, on your laptop, and so on.

* **The service layer** - MotherDuck provides key capabilities like secure identity, authorization, administration, monitoring, and so on. Currently, billing is not enabled for MotherDuck, and the service is free to use.

> **NOTE:** Currently, MotherDuck runs on AWS us-east-1 region.

## How it works ##

DuckDB has become widely known as “SQLite for Analytics” – a powerful SQL analytics engine with broad adoption in development workflows, ad-hoc analytics on the laptop and embedded applications.

![DuckDB Arch](/images/duckdb-arch.png)

## Usecases ##

Data scientists, analysts, and engineers love DuckDB because it works efficiently regardless of where their data resides. Given that many data professionals have powerful laptops that are often underutilized, they prefer to bring data to their local machines for more efficient crunching, especially for ad hoc analysis and development. MotherDuck enhances this capability by enabling local data analysis while still allowing JOIN operations with data processed in the cloud, optimizing the use of all computing resources.

## HYBRID EXECUTION ##

When connected together, DuckDB and MotherDuck form a different type of distributed system. The two nodes work in concert so you can query data wherever it lives, in the most efficient way possible. This query execution model, called hybrid execution, automatically routes the various stages of queries execution to the most opportune locations, including highly arbitrary scenarios:

* If a SQL query queries data on your laptop, MotherDuck routes the query to your local DuckDB instance
* If a SQL query queries data in MotherDuck or S3, MotherDuck routes that query to MotherDuck
* If a SQL query executes a join between data on your laptop and data in MotherDuck, MotherDuck finds the best way to efficiently join the two

```sql
SELECT
    cr.currency_code,
    t.passenger_count,
    AVG(t.total_amount * cr.exchange_rate) as average_converted_amount
FROM
    sample_data.nyc.yellow_cab_nyc_2022_11 t
CROSS JOIN
    (SELECT * FROM './popular_currency_rate_dollar_20230620.csv') cr
WHERE cr.currency_code = 'EUR'
GROUP BY
    cr.currency_code, t.passenger_count
ORDER BY t.passenger_count ASC;
```

In the example above, the table `yellow_cab_nyc` lives in MotherDuck in the cloud, and is being joining with local data from a CSV file.

You can even do hybrid query execution with data stored in s3, with MotherDuck securely storing and managing your AWS credentials

This engine is extremely powerful to leverage a Datalake or Lakehouse Architecture.

## CLI Usage ##

When start duckdb execute the following command

```sql
ATTACH 'md:';
```

It will start oauth to authorize the connection to the service.
Check the following [page](https://motherduck.com/docs/key-tasks/authenticating-to-motherduck) for more options related with authentication.

You can then check the available databases

```sql
show databases;
```

Executing a query on the sample data

```sql
SELECT
    year,
    AVG(pm25_concentration) AS avg_pm25,
    AVG(pm10_concentration) AS avg_pm10,
    AVG(no2_concentration) AS avg_no2
FROM sample_data.who.ambient_air_quality 
WHERE city = 'Berlin'
GROUP BY year
ORDER BY year DESC;
```

> **NOTE:** You need to use duckdb version 1.0.0

## Examples ##

One can explore MotherDuck samples and SQL queries on the following URL:

* <https://motherduck.com/docs/category/example-datasets>

## BI Tools ##

Motherduck supports DuckDB [JDBC driver](https://duckdb.org/docs/api/java.html) the following example doc explains how to setup Tableau but you can connect other systems using that driver.

* <https://motherduck.com/docs/integrations/bi-tools/tableau>

Check the [docs](https://motherduck.com/docs/category/business-intelligence-tools) for other integrations as surelly they will include more options soon.

## Pricing ##

There are free, standard and custom plans. Check the official page:

* <https://motherduck.com/product/pricing>

## Conclusion ##

DuckDB recently announced the launch of [version 1.0.0](https://duckdb.org/2024/06/03/announcing-duckdb-100.html) after six years of development, providing a very stable version. Complementing this, MotherDuck introduced a PaaS solution that offers a serverless execution model, storage, and a service layer for collaborative work. This is an excellent solution for those who want to avoid the complexities of underlying service management while empowering their users.

## References ##

* <https://motherduck.com/>
* <https://motherduck.com/docs/getting-started/>
* <https://motherduck.com/blog/announcing-motherduck-duckdb-in-the-cloud/>
* <https://motherduck.com/docs/architecture-and-capabilities>
* <https://motherduck.com/blog/announcing-motherduck-general-availability-data-warehousing-with-duckdb>
* <https://app.motherduck.com>
* <https://duckdb.org/2024/06/03/announcing-duckdb-100.html>
