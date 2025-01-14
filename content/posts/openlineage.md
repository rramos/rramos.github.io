---
title: OpenLineage
date: "2024-06-08T21:00:00+00:00"
lang: en
tags:
  - Data Lineage
  - Data Engineering
---

In this article I will go through OpenLineage specification.

## Intro ##

In this article I will go through OpenLineage specification.

## API ##

The specification for OpenLineage is formalized as a JsonSchema [OpenLineage.json](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.json). An OpenAPI spec is also provided for HTTP-based implementations: [OpenLineage.yml](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.yml)

## Documentation ##

Documentation is available at: <https://openlineage.github.io>

## Model ##

![OpenLineage Model Diagram](https://raw.githubusercontent.com/OpenLineage/OpenLineage/main/spec/OpenLineageModel.svg)

* **Run Event**: an event describing an observed state of a job run. Sending at least a START event and a COMPLETE/FAIL/ABORT event is required. Additional events are optional.

* **Job**: a process definition that consumes and produces datasets (defined as its inputs and outputs). It is identified by a unique name within a namespace.

* **Dataset**: an abstract representation of data. It has a unique name within the datasource namespace derived from its physical location (*db.host.database.schema.table*, for example)

* **Run**: An instance of a running job with a start and completion (or failure) time. A run is identified by a globally unique ID relative to its job definition. A run ID must be a UUID.

* **Facet**: A piece of metadata attached to one of the entities defined above

## Example ##

Example: Here is an example of a simple start run event not adding any facet information

```json
{
  "eventType": "START",
  "eventTime": "2020-12-09T23:37:31.081Z",
  "run": {
    "runId": "3b452093-782c-4ef2-9c0c-aafe2aa6f34d",
  },
  "job": {
    "namespace": "my-scheduler-namespace",
    "name": "myjob.mytask",
  },
  "inputs": [
    {
      "namespace": "my-datasource-namespace",
      "name": "instance.schema.table",
    }
  ],
  "outputs": [
    {
      "namespace": "my-datasource-namespace",
      "name": "instance.schema.output_table",
    }
  ],
  "producer": "https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/client",
  "schemaURL": "https://openlineage.io/spec/1-0-0/OpenLineage.json#/definitions/RunEvent"
}
```

## Lifecycle ##

The OpenLineage API defines events to capture the lifecycle of a Run for a given Job. When a job is being run, we capture metadata by sending run events when the state of the job transitions to a different state. We might observe different aspects of the job run at different stages. This means that different metadata might be collected in each event during the lifecycle of a run. All metadata is additive. 

## Facets ##

Facets are pieces of metadata that can be attached to the core entities:

* Run
* Job
* Dataset (Inputs or Outputs)

A facet is an atomic piece of metadata identified by its name. This means that emitting a new facet with the same name for the same entity replaces the previous facet instance for that entity entirely

### Standard Facets ###

#### Run Facets ####

* **nominalTime**: Captures the time this run is scheduled for. This is a typical usage for a time-based scheduled job. The job has a nominal schedule time that will be different from the actual time at which it is running.

* **parent**: Captures the parent job and run when the run has been spawned from a parent run. For example, in the case of Airflow, there is often a run for a DAG that then spawns runs for individual tasks that refer to the parent run as the DAG run. Similarly, when a SparkOperator starts a Spark job, this creates a separate run that refers to the task run as its parent.

* **errorMessage**: Captures the error message, programming language - and optionally stack trace - when a run fails.

#### Job Facets ####

* **sourceCodeLocation:** Captures the source code location and version (e.g., git sha) of the job.

* **sourceCode:** Captures the language (e.g., Python) and actual source code of the job.

* **sql:** Capture the SQL query if the job is a SQL query.

* **ownership:** Captures the owners of the job

#### Dataset Facets ####

* **schema**: Captures the schema of the dataset

* **dataSource**: Captures the Database instance containing the dataset (e.g., Database schema, Object store bucket, etc.)

* **lifecycleStateChange**: Captures the lifecycle states of the dataset (alter, create, drop, overwrite, rename, truncate, etc.).

* **version**: Captures the dataset version when versioning is defined by the database (e.g., Iceberg snapshot ID)

* **columnLineage**: Captures the column-level lineage

* **ownership**: Captures the owners of the dataset

#### Input Dataset Facets ####

* **dataQualityMetrics**: Captures dataset-level and column-level data quality metrics when scanning a dataset with a DataQuality library (row count, byte size, null count, distinct count, average, min, max, quantiles).

* **dataQualityAssertions**: Captures the result of running data tests on a dataset or its columns.

#### Output Dataset Facets ####

* **outputStatistics**: Captures the size of the output written to a dataset (row count and byte size).

#### Custom Facets ####

Naming of custom facets should follow the pattern {prefix}{name}{entity}Facet PascalCased.
The prefix must be a distinct identifier named after the project defining them to avoid collision with standard facets defined in the OpenLineage.json spec.

## Test ##

There are several tools now complying with this specification.
If you want to test with Marquez follow the previous [article](https://rramos.github.io/2024/06/06/marquez/).

## References ##

* <https://openlineage.io>
* <https://openlineage.io/docs>
* <https://marquezproject.ai/docs/quickstart>
* <https://open-metadata.org/>
* <https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md>
