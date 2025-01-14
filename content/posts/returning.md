---
title: SQL RETURNING
date: "2024-06-10T22:10:00+00:00"
lang: en
tags:
  - SQL
  - Utils
  - SQLite
---

This article is about SQL RETURNING clause

## Intro ##

The RETURNING clause is not a statement itself, but a clause that can optionally appear near the end of top-level DELETE, INSERT, and UPDATE statements. The effect of the RETURNING clause is to cause the statement to return one result row for each database row that is deleted, inserted, or updated.

## Usecase ##

The RETURNING clause is designed to provide the application with the values of columns that are filled in automatically by SQLite.

## Example ##

```sql
CREATE TABLE t0(
  a INTEGER PRIMARY KEY,
  b DATE DEFAULT CURRENT_TIMESTAMP,
  c INTEGER
);
INSERT INTO t0(c) VALUES(random()) RETURNING *;
```

In the INSERT statement above, SQLite computes the values for all three columns. The RETURNING clause causes SQLite to report the chosen values back to the application. This saves the application from having to issue a separate query to figure out exactly what values were inserted.

## Limitations ##

RETURNING is not standard SQL. It is an extension. SQLite's syntax for RETURNING is modelled after PostgreSQL and is supported since version 3.35. You need to check if your RDBMS support this expression

## Reference ##

* <https://www.sqlite.org/lang_returning.html>
