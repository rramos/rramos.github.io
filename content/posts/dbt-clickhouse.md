---
title: dbt-clickhouse
date: "2024-01-29T02:00:00+00:00"
lang: en
tags:
  - DBT
  - Clickhouse
---

Article about DBT and Clickhouse

## Integrating dbt and ClickHouse ##

In this we will be following the integration steps to use dbt and clickhouse with sample IMDB data.

## Configure ClickHouse sources ##

Setup clickhouse check my previous [article](https://rramos.github.io/2024/01/28/clickhouse/) if you would like more information on this product.

Then connect with a client and run the following DDL scripts

```sql
CREATE DATABASE imdb;

CREATE TABLE imdb.actors
(
    id         UInt32,
    first_name String,
    last_name  String,
    gender     FixedString(1)
) ENGINE = MergeTree ORDER BY (id, first_name, last_name, gender);

CREATE TABLE imdb.directors
(
    id         UInt32,
    first_name String,
    last_name  String
) ENGINE = MergeTree ORDER BY (id, first_name, last_name);

CREATE TABLE imdb.genres
(
    movie_id UInt32,
    genre    String
) ENGINE = MergeTree ORDER BY (movie_id, genre);

CREATE TABLE imdb.movie_directors
(
    director_id UInt32,
    movie_id    UInt64
) ENGINE = MergeTree ORDER BY (director_id, movie_id);

CREATE TABLE imdb.movies
(
    id   UInt32,
    name String,
    year UInt32,
    rank Float32 DEFAULT 0
) ENGINE = MergeTree ORDER BY (id, name, year);

CREATE TABLE imdb.roles
(
    actor_id   UInt32,
    movie_id   UInt32,
    role       String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree ORDER BY (actor_id, movie_id);
```

After creating the source tables lets fill them with data from AWS, running the following code.

```sql
INSERT INTO imdb.actors
SELECT *
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_actors.tsv.gz',
'TSVWithNames');

INSERT INTO imdb.directors
SELECT *
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_directors.tsv.gz',
'TSVWithNames');

INSERT INTO imdb.genres
SELECT *
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_movies_genres.tsv.gz',
'TSVWithNames');

INSERT INTO imdb.movie_directors
SELECT *
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_movies_directors.tsv.gz',
        'TSVWithNames');

INSERT INTO imdb.movies
SELECT *
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_movies.tsv.gz',
'TSVWithNames');

INSERT INTO imdb.roles(actor_id, movie_id, role)
SELECT actor_id, movie_id, role
FROM s3('https://datasets-documentation.s3.eu-west-3.amazonaws.com/imdb/imdb_ijs_roles.tsv.gz',
'TSVWithNames');
```

## Setup DBT ##

Starting by setting up DBT environment

```bash
pip install dbt-core
pip install dbt-clickhouse
```

Init the dbt project

```bash
dbt init imdb
```

Update the file `dbt_project.yml` and make sure to add the actors

```yaml
models:
  imdb:
    # Config indicated by + and applies to all files under models/example/
    actors:
      +materialized: view
```

Create the following file `models/actors/schema.yml` with the following content

```yaml
version: 2

sources:
- name: imdb
  tables:
  - name: directors
  - name: actors
  - name: roles
  - name: movies
  - name: genres
  - name: movie_directors
```

Create the following file `models/actors/actor_summary.sql` with the content

```sql
{{ config(order_by='(updated_at, id, name)', engine='MergeTree()', materialized='table') }}

with actor_summary as (
SELECT id,
    any(actor_name) as name,
    uniqExact(movie_id)    as num_movies,
    avg(rank)                as avg_rank,
    uniqExact(genre)         as genres,
    uniqExact(director_name) as directors,
    max(created_at) as updated_at
FROM (
        SELECT {{ source('imdb', 'actors') }}.id as id,
                concat({{ source('imdb', 'actors') }}.first_name, ' ', {{ source('imdb', 'actors') }}.last_name) as actor_name,
                {{ source('imdb', 'movies') }}.id as movie_id,
                {{ source('imdb', 'movies') }}.rank as rank,
                genre,
                concat({{ source('imdb', 'directors') }}.first_name, ' ', {{ source('imdb', 'directors') }}.last_name) as director_name,
                created_at
        FROM {{ source('imdb', 'actors') }}
                    JOIN {{ source('imdb', 'roles') }} ON {{ source('imdb', 'roles') }}.actor_id = {{ source('imdb', 'actors') }}.id
                    LEFT OUTER JOIN {{ source('imdb', 'movies') }} ON {{ source('imdb', 'movies') }}.id = {{ source('imdb', 'roles') }}.movie_id
                    LEFT OUTER JOIN {{ source('imdb', 'genres') }} ON {{ source('imdb', 'genres') }}.movie_id = {{ source('imdb', 'movies') }}.id
                    LEFT OUTER JOIN {{ source('imdb', 'movie_directors') }} ON {{ source('imdb', 'movie_directors') }}.movie_id = {{ source('imdb', 'movies') }}.id
                    LEFT OUTER JOIN {{ source('imdb', 'directors') }} ON {{ source('imdb', 'directors') }}.id = {{ source('imdb', 'movie_directors') }}.director_id
        )
GROUP BY id
)

select *
from actor_summary
```

Configure the clickstream connection on the following file `~/.dbt/profiles.yml`

```yaml
imdb:
  target: dev
  outputs:
    dev:
      type: clickhouse
      schema: imdb_dbt
      host: localhost
      port: 8123
      user: default
      password: ''
      secure: False
```

After this updates run the `dbt debug` command.
To make sure the connection is working properly

```text
dbt debug
00:31:58  Running with dbt=1.7.6
00:31:58  dbt version: 1.7.6
00:31:58  python version: 3.11.6
00:31:58  python path: /home/rramos/Development/local/dbt/bin/python
00:31:58  os info: Linux-6.6.10-zen1-1-zen-x86_64-with-glibc2.38
00:31:58  Using profiles dir at /home/rramos/.dbt
00:31:58  Using profiles.yml file at /home/rramos/.dbt/profiles.yml
00:31:58  Using dbt_project.yml file at /home/rramos/Development/local/dbt/imdb/dbt_project.yml
00:31:58  adapter type: clickhouse
00:31:58  adapter version: 1.7.1
00:31:58  Configuration:
00:31:58    profiles.yml file [OK found and valid]
00:31:58    dbt_project.yml file [OK found and valid]
00:31:58  Required dependencies:
00:31:58   - git [OK found]
...
00:31:58  Registered adapter: clickhouse=1.7.1
00:31:58    Connection test: [OK connection ok]
```

If the connection test passed properly, one just need to create the model via dbt.

```sh
dbt run
```

And you should have a similar output

```text
dbt run
00:38:13  Running with dbt=1.7.6
00:38:13  Registered adapter: clickhouse=1.7.1
00:38:13  Unable to do partial parsing because a project config has changed
00:38:15  Found 1 model, 6 sources, 0 exposures, 0 metrics, 421 macros, 0 groups, 0 semantic models
00:38:15  
00:38:15  Concurrency: 1 threads (target='dev')
00:38:15  
00:38:15  1 of 1 START sql view model `imdb`.`actor_summary` ............................. [RUN]
00:38:15  1 of 1 OK created sql view model `imdb`.`actor_summary` ........................ [OK in 0.17s]
00:38:15  
00:38:15  Finished running 1 view model in 0 hours 0 minutes and 0.27 seconds (0.27s).
00:38:15  
00:38:15  Completed successfully
00:38:15  
00:38:15  Done. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1
```

Test query the model

```sql
SELECT *
FROM imdb_dbt.actor_summary
WHERE num_movies > 5
ORDER BY avg_rank DESC
```

## Conclusion ##

In this article I've went through the process of setup a Clickhouse database and setup dbt to setup the models with IMDB test data for actors, directors, movies, etc.

This two systems work like a charm together.
Clickstream shows great performance for analytical queries, and dbt compiles and runs your analytics code against your data platform, enabling you and your team to collaborate on a single source of truth for metrics, insights, and business definitions.

Would like to extend this exercise by incorporating github actions related with dbt test actions before promoting to production.

## References ##

* <https://clickhouse.com/docs/en/integrations/dbt>
* <https://docs.getdbt.com/guides>
