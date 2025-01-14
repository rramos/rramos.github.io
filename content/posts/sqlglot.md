---
title: SQLGlot
date: "2024-05-22T14:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - SQL
---

In this article we will go through SQLGlot is a no-dependency SQL parser, transpiler, optimizer, and engine

## Intro ##

SQLGlot is a no-dependency SQL parser, transpiler, optimizer, and engine. It can be used to format SQL or translate between 21 different dialects like DuckDB, Presto / Trino, Spark / Databricks, Snowflake, and BigQuery. It aims to read a wide variety of SQL inputs and output syntactically and semantically correct SQL in the targeted dialects.

## Install ##

```sh
pip3 install "sqlglot[rs]"
```

## Examples ##

Create the following python script to check translation of datafunctions from duckdb to hive

```python
import sqlglot
print(sqlglot.transpile("SELECT EPOCH_MS(1618088028295)", read="duckdb", write="hive")[0])
```

You should get the following output when running this code

```sh
SELECT FROM_UNIXTIME(1618088028295 / POW(10, 3))
```

SQLGlot can even translate custom time formats:

```python
import sqlglot
print(sqlglot.transpile("SELECT STRFTIME(x, '%y-%-m-%S')", read="duckdb", write="hive")[0])
```

You should get

```sh
SELECT DATE_FORMAT(x, 'yy-M-ss')
```

The official README file from the repo have other interesting examples

* <https://github.com/tobymao/sqlglot>

## Optimize ##

It also can rewrite queries into an "optimized" form like on the following example:

```python
import sqlglot
from sqlglot.optimizer import optimize

print(
    optimize(
        sqlglot.parse_one("""
            SELECT A OR (B OR (C AND D))
            FROM x
            WHERE Z = date '2021-01-01' + INTERVAL '1' month OR 1 = 0
        """),
        schema={"x": {"A": "INT", "B": "INT", "C": "INT", "D": "INT", "Z": "STRING"}}
    ).sql(pretty=True)
)
```

Which will provide the following output

```sql
SELECT
  (
    "x"."a" <> 0 OR "x"."b" <> 0 OR "x"."c" <> 0
  )
  AND (
    "x"."a" <> 0 OR "x"."b" <> 0 OR "x"."d" <> 0
  ) AS "_col_0"
FROM "x" AS "x"
WHERE
  CAST("x"."z" AS DATE) = CAST('2021-02-01' AS DATE)
```

## SQL Execution ##

SQLGlot is able to interpret SQL queries, where the tables are represented as Python dictionaries. The engine is not supposed to be fast, but it can be useful for unit testing and running SQL natively across Python objects.

```python
from sqlglot.executor import execute

tables = {
    "sushi": [
        {"id": 1, "price": 1.0},
        {"id": 2, "price": 2.0},
        {"id": 3, "price": 3.0},
    ],
    "order_items": [
        {"sushi_id": 1, "order_id": 1},
        {"sushi_id": 1, "order_id": 1},
        {"sushi_id": 2, "order_id": 1},
        {"sushi_id": 3, "order_id": 2},
    ],
    "orders": [
        {"id": 1, "user_id": 1},
        {"id": 2, "user_id": 2},
    ],
}

execute(
    """
    SELECT
      o.user_id,
      SUM(s.price) AS price
    FROM orders o
    JOIN order_items i
      ON o.id = i.order_id
    JOIN sushi s
      ON i.sushi_id = s.id
    GROUP BY o.user_id
    """,
    tables=tables
)
```

You should get the output

```sh
user_id price
      1   4.0
      2   3.0
```

## Conclusion ##

This tool is very interesting if you are considering migrating between technologies in order to validate your SQL syntax or even speed up the process.

The optimization component is also something to take in to consideration.

If you are looking for some way to emulate Bigquery interfaces to test your application the following two projects could also be something to consider [bigquery-emulator](https://github.com/goccy/bigquery-emulator) and [tinyquery](https://github.com/alangpierce/tinyquery)

Another important tool with similar functionality is Google **interactive-sql-translator** in case you are specifically searching on ways to speed up the migration to BigQuery could be a better approach.

## References ##

* <https://github.com/tobymao/sqlglot>
* <https://github.com/goccy/bigquery-emulator>
* <https://cloud.google.com/bigquery/docs/interactive-sql-translator>
