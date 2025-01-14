---
title: dagster
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - category
---

In this article we will go through a quick start guide for Dagstaer an orchestrator designed to maintain data assets.

## Intro ##

Dagster is an orchestrator that's designed for developing and maintaining data assets, such as tables, data sets, machine learning models, and reports.

You declare functions that you want to run and the data assets that those functions produce or update. Dagster then helps you run your functions at the right time and keep your assets up-to-date.

Dagster is designed to be used at every stage of the data development life-cycle, including local development, unit tests, integration tests, staging environments, and production.

## Features ##

Dagster models pipelines in terms of the data assets they produce and consume, which, by default, brings order and observability to your data platform. Assets in Dagster can model data produced by any system, such as dbt models, Snowflake tables, or even CSV files.

Dagster’s asset-centric approach to building data pipelines makes it easy to:

* **Understand asset production**: Everyone can comprehend data lineage and asset relationships without building the pipeline themselves.
* **Verify asset currency**: Easily identify reasons for outdated assets, such as upstream data delays or code errors.
* **Diagnose data quality issues**: Implement data quality checks in pipelines and receive automatic notifications for issues.
* **Standardize best practices**: Software-defined Assets (SDAs) unify data teams, promoting collaboration and best practices like domain-specific languages and continuous integration.
* **Simplify debugging**: Debugging tools are asset-specific, allowing quick identification and resolution of issues, with minimal re-execution required

Dagster is built to be used at every stage of the data development lifecycle - local development, unit tests, integration tests, staging environments, all the way up to production.

Additionally, Dagster is accompanied by a sleek, modern, web-based UI

## Install ##

Start by creating a virtual environment

```sh
python -m venv venv
source venv/bin/activate
```

Install the required packages

```sh
pip install dagster
pip install --upgrade pip
```

Create dagster project

```sh
dagster project from-example --example tutorial
cd tutorial/
pip install -e ".[dev]"
pip install dagster-webserver
```

Startup the service

```sh
dagster dev
```

You can access the Dagster UI on the following URL:
* <http://127.0.0.1:3000>

## Topics ##

1. Writing your first asset
1. Build an asset graph
1. Scheduling
1. External services
1. Data Quality
1. Partition
1. Testing
1. Adding new Python dependencies
1. Env variables and secrets
1. unit testing

## References ##

* <https://docs.dagster.io>
* <https://dagster.io/community>
* <https://github.com/dagster-io/dagster>
* <https://docs.dagster.io/getting-started/quickstart>
* <https://courses.dagster.io/>
* <https://docs.dagster.io/tutorial>
* <https://docs.dagster.io/concepts>
* <https://docs.dagster.io/guides>
