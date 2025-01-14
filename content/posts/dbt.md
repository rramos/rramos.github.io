---
title: DBT Quick WalkThrough
date: "2023-12-21T15:00:00+00:00"
lang: en
tags:
  - DBT
  - Data Engineering
  - Data Modeling
---

In this article I will describe a step-by-step guide on how to setup a local DBT environment

## Intro ##

In this article I will describe a step-by-step guide on how to setup a local DBT environment and some basic ground rules to use it.

## What is DBT ##

dbt™ is a SQL-first transformation workflow that lets teams quickly and collaboratively deploy analytics code following software engineering best practices like modularity, portability, CI/CD, and documentation

## Pre Requirements ##

In order to use dbt™ one must have the python requirements installed, they may differe based on the environment your are using. Will provide an example for a Linux based system

```sh
sudo apt-get install git libpq-dev python-dev python3-pip
pip install dbt-core
pip install dbt-postgres
```

## Setup a PostgreSQL Environment ##

One can use different sources such as Snowflake, BigQuery, etc. For the testing purposes lets run a docker image with  postgres. The following reop has some options for that

* <https://github.com/rramos/dockers/tree/master/docker-postgres>

> **NOTE:** If you will use a different source make sure to install with pip the appropriate connector eg. `pip install dbt-bigquery``

## Setup ##

Lets initialize the environment

```sh
dbt init
```

1. Provide a name for the project
1. Include the connection details for the postgresql example
    1. host (hostname for the instance): localhost
    1. port [5432]:
    1. user (dev username): admin
    1. pass (dev password):
    1. dbname (default database that dbt will build objects in): test_db
    1. schema (default schema that dbt will build objects in): dbt
    1. threads (1 or more) [1]:

```sh
dbt deps
```

This will make sure it is installed all the required deps for the project

```sh
dbt run
```

If you get an output similar to the following it means you have everything ready to start using dbt

```text
13:20:25  Running with dbt=1.7.4
13:20:25  Registered adapter: postgres=1.7.4
13:20:25  Found 2 models, 4 tests, 0 sources, 0 exposures, 0 metrics, 401 macros, 0 groups, 0 semantic models
13:20:25  
13:20:25  Concurrency: 1 threads (target='dev')
13:20:25  
13:20:25  1 of 2 START sql table model dbt.my_first_dbt_model ............................ [RUN]
13:20:25  1 of 2 OK created sql table model dbt.my_first_dbt_model ....................... [SELECT 2 in 0.11s]
13:20:25  2 of 2 START sql view model dbt.my_second_dbt_model ............................ [RUN]
13:20:25  2 of 2 OK created sql view model dbt.my_second_dbt_model ....................... [CREATE VIEW in 0.06s]
13:20:25  
13:20:25  Finished running 1 table model, 1 view model in 0 hours 0 minutes and 0.27 seconds (0.27s).
13:20:25  
13:20:25  Completed successfully
13:20:25  
13:20:25  Done. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2
```

You can access the web browser to validate the created table and view based on default init: <http://localhost:5050/browser/>

* table: my_first_dbt_model
* view: my_second_dbt_model

## dbt™ Structure ##

After you initialize the dbt™ environment you should endup with a structure similar to the following

```sh
test
├── analyses
├── dbt_packages
├── dbt_project.yml
├── logs
│   └── dbt.log
├── macros
├── models
│   └── example
│       ├── my_first_dbt_model.sql
│       ├── my_second_dbt_model.sql
│       └── schema.yml
├── README.md
├── seeds
├── snapshots
├── target
│   ├── compiled
│   │   └── test
│   │       └── models
│   │           └── example
│   │               ├── my_first_dbt_model.sql
│   │               ├── my_second_dbt_model.sql
│   │               └── schema.yml
│   │                   ├── not_null_my_first_dbt_model_id.sql
│   │                   ├── not_null_my_second_dbt_model_id.sql
│   │                   ├── unique_my_first_dbt_model_id.sql
│   │                   └── unique_my_second_dbt_model_id.sql
│   ├── graph.gpickle
│   ├── graph_summary.json
│   ├── manifest.json
│   ├── partial_parse.msgpack
│   ├── run
│   │   └── test
│   │       └── models
│   │           └── example
│   │               ├── my_first_dbt_model.sql
│   │               ├── my_second_dbt_model.sql
│   │               └── schema.yml
│   │                   ├── not_null_my_first_dbt_model_id.sql
│   │                   ├── not_null_my_second_dbt_model_id.sql
│   │                   ├── unique_my_first_dbt_model_id.sql
│   │                   └── unique_my_second_dbt_model_id.sql
│   ├── run_results.json
│   └── semantic_manifest.json
└── tests

```

Lets check the 1st level directories and what you might find there:

> **NOTE:** The structure may change based on the version and new  features that would be included. For this article the dbt version was 1.7.4

## analyses ##

Not tested.

## dbt_packages ##

Installed packages from the packages HUB will lend on this location. You should not need to change here directly unless you are implementing your own packages.

One example to include dbt_utils package is by creating the file `packages.yml` on the root directory of the project and then one can run `dbt deps` to fetch the dependencies

Example:

```yaml
packages:
  - package: dbt-labs/dbt_utils
    version: 1.1.1
```

## logs ##

Log directory for dbt™ executions

## macros ##

Macros act like small snippets of jinja code that you can than refeer on the models. They are very useful for reusability and colaborative effort.

One can call the macro using something similar: `{% macro macro_name(params) %}`

## models ##

This section is where most of the work is going to be done. Here one can define the SQL associated with each model using jinja syntax

**Example:** raw/raw_customer.sql

```sql
{{
    config(
        materialized='table'
    )
}}

select * 
FROM 
{{ source('bigquery', 'customers') }}
```

## seeds ##

Useful for temporary data that incorporated and used as **__ref** . The data should exist as CSV

ex:

```csv
shipmode,delivery_team
First Class, RHL_Couriers
Second Class, RHL_Couriers
Standard Class, RHL_Couriers
Same Day, Globalmart
```

## snapshots ##

Not tested

## target ##

This directory will hold compile sql bsed on your jinja spec and also other outcomes such as the graphs for the documentation.

## tests ##

Tests for your model were you can defined rules such as nullability, dictionary of terms, etc.

One can use the  `dbt test` command to check if the there is something failing.

> **NOTE:** Please check the [Best Practises Guide](https://docs.getdbt.com/best-practices) as it should provide more insigthful information. You can also check the following example repo <https://github.com/rramos/dbt-training> which holds some test data

## Loading Example Data ##

The example data is based on the udemy bootcamp from Vantage Point, check the references section with the link for the course as it is very insigthful.

The following repo already has most of the things done and could be useful as a starting point:

* <https://github.com/rramos/dbt-training>

## Data Information ##

* Data is composed of 3 CSV files: customers, orders and product data
* Following a traditional [Medallions Architecture](https://www.databricks.com/glossary/medallion-architecture) (AKA bronze, silver gold)
* Implement a (raw) layer based on the source data
* Implement a (staging) where we hold aggregation logic
* Implement Gold layer (reporting) with materialization data for reporting purposes

## dbt™ Cloud ##

dbtLabs is the company behind dbt™. Although one can use the community version of dbt-core packages the company sells a solution that helps their clients using a friendly graphical interface to take advantage of dbt™ in a Enterprise way.

You can check out their website to understand better the features associated to it:

* <https://www.getdbt.com/product/dbt-cloud>

## Conclusion ##

In this article it was presented a high-level overview on dbt™ how it can be setup and provided some references for best practises and how to take most advantage of the product.

My personal view on this product is that it brings better control for data assets with embedded lineage also documentation generation and testing features all integrated in a common stack allowing the CI/CD process to be a "walk-in-the-park"

The community is very large which is a plus (<https://www.getdbt.com/community> ). DBTCloud provides an Entreprise level solution that would speed up Data Engineering work via UI, I didn't go deeper on the costs to understand if it pays-off.

Only having the dbt-core option seems to be quite limited compared with the Entreprise solution, but the community supports several features which should be consider if you don't want to go in that path (like the integration with Airflow).

I'm not a big fan of jinja option as the main syntax for the Product, but that is more of a personal flavor.

## References ##

* [The Data Bootcamp: Transform your Data using dbt™](https://www.udemy.com/course/the-dbt-bootcamp-transform-your-data-using-data-build-tool/)
* <https://www.databricks.com/glossary/medallion-architecture>
* <https://github.com/rramos/dockers>
* <https://docs.getdbt.com/>
* <https://docs.getdbt.com/guides/codespace?step=1>
* <https://docs.getdbt.com/guides/airflow-and-dbt-cloud?step=1>
* <https://docs.getdbt.com/best-practices>
* <https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview>
* <https://github.com/rramos/dbt-training>
