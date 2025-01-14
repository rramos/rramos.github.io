---
title: Marquez
date: "2024-06-06T09:50:00+00:00"
lang: en
tags:
  - Data Lineage
  - Data Engineering
  - Tools
---

This article is about Marquez a OpenLineage compliant tool for Data Governance

## Intro ##

Marquez enables consuming, storing, and visualizing OpenLineage metadata from across an organization, serving use cases including data governance, data quality monitoring, and performance analytics.

## Quick Start ##

In order to setup locally and test the tool you can follow this guide which will spin up using Docker and seed with sample data

### Install ###

Checkout marquez source

```sh
git clone https://github.com/MarquezProject/marquez && cd marquez
```

Start up the docker image with sample metadata

```sh
./docker/up.sh --seed
```

Open the browser for <http://localhost:3000>

## Why Marquez ##

Marquez enables highly flexible data lineage queries across all datasets, while reliably and efficiently associating (upstream, downstream) dependencies between jobs and the datasets they produce and consume.

### Design ###

Marquez is a modular system and has been designed as a highly scalable, highly extensible platform-agnostic solution for metadata management. It consists of the following system components:

* **Metadata Repository**: Stores all job and dataset metadata, including a complete history of job runs and job-level statistics (i.e. total runs, average runtimes, success/failures, etc).
* **Metadata API**: RESTful API enabling a diverse set of clients to begin interacting with metadata around dataset production and consumption.
* **Metadata UI**: Used for dataset discovery, connecting multiple datasets and exploring their dependency graph

Marquez implements the [OpenLineage](https://openlineage.io/docs/) specification. OpenLineage provides support for Java and Python as well as many integrations.

The Metadata API is an abstraction for recording information around the production and consumption of datasets.

## OpenLineage ##

OpenLineage is an Open Standard for lineage metadata collection designed to record metadata for a **job** in execution.

The standard defines a generic model of **dataset**, **job**, and **run** entities uniquely identified using consistent naming strategies. The core model is highly extensible via **facets**. A facet is user-defined metadata and enables entity enrichment.

I will write a dedicated article about that spec.

## Conclusion ##

In this article we went through a quick startup of Marquez a tool for visualizing metadata. It complies with Openlineage specification, the frontend component is really fast (Would like to understand how it scales to large datasets and extensive glossaries). Providing OpenAPI is very useful to extend and integrate with your in-house tooling

## Next Steps ##

Would like to test this with [Airflow integration](https://github.com/MarquezProject/marquez/blob/main/examples/airflow/airflow.md) and also understand how it compares with other solutions such [OpenMetadata](https://open-metadata.org/) or [Dataplex](https://rramos.github.io/2024/06/01/dataplex/).

## References ##

* <https://marquezproject.ai>
* <https://marquezproject.ai/docs/quickstart>
* <https://openlineage.io/docs>
