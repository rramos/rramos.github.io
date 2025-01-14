---
title: Dataplex
date: "2024-06-01T10:00:00+00:00"
lang: en
tags:
  - GCP
  - Data Governance
---

Article about Dataplex a Data Governance solution provided by GCP

## Intro ##

Dataplex is a data fabric that unifies distributed data and automates data management and governance for that data.

Dataplex lets you do the following:

* Build a domain-specific data mesh across data that's stored in multiple Google Cloud projects, without any data movement.
* Consistently govern and monitor data with a single set of permissions.
* Discover and curate metadata across various silos using catalog capabilities.
* Securely query metadata by using BigQuery and open source tools, such as SparkSQL, Presto, and HiveQL.
* Run data quality and data lifecycle management tasks, including serverless Spark tasks.
* Explore data using fully managed, serverless Spark environments with simple access to notebooks and SparkSQL queries.

## Terminology ##

Dataplex abstracts away the underlying data storage systems, by using the following constructs:

### Lake ###

A logical construct representing a data domain or business unit. For example, to organize data based on group usage, you can set up a lake for each department (for example, Retail, Sales, Finance).

### Zone ###

A subdomain within a lake, which is useful to categorize data. Zones are of two types: **raw** and **curated**.

* **Raw zone:** Contains data that is in its raw format and not subject to strict type-checking.

* **Curated zone:** Contains data that is cleaned, formatted, and ready for analytics. The data is columnar, Hive-partitioned, and stored in Parquet, Avro, Orc files, or BigQuery tables. Data undergoes type-checking- for example, to prohibit the use of CSV files because they don't perform as well for SQL access.

### Asset ###

Maps to data stored in either Cloud Storage or BigQuery. You can map data stored in separate Google Cloud projects as assets into a single zone.

### Entity ###

Represents metadata for structured and semi-structured data (table) and unstructured data (fileset).

### Automatic cataloging of assets ###

For a given project, Data Catalog automatically catalogs the following Google Cloud assets:

* Analytics Hub linked datasets
* BigQuery datasets, tables, models, routines, and connections
* Bigtable instances, clusters, and tables (including column family details)
* Dataplex lakes, zones, tables, and filesets
* Dataproc Metastore services, databases, and tables
* Pub/Sub topics
* Spanner instances, databases, tables, and views
* Vertex AI models, datasets, and Vertex AI Feature Store resources

### Catalog non-Google Cloud assets ###

To catalog metadata from non-Google Cloud systems in your organization, you can use the following:

* Community-contributed connectors to multiple popular on-premises data sources
* Manually build on the Data Catalog APIs for custom entries

### Data quality is now GA ###

Dataplex automatic data quality lets you define and measure the quality of your data. You can automate the scanning of data, validate data against defined rules, and log alerts if your data doesn't meet quality requirements.

#### Pre-defined rules ####

* **Row-level:**  For row-level category rules, the expectation is applied against each data row. Each row independently passes or fails the condition. For example, `column_A_value < 1`.

* **Aggregate:** For aggregate rules, the expectation is applied against a single value aggregated across the entire data. For example, `Avg(someCol) >= 10`.

### Dimensions ###

You can aggregate the results on the following Dimensions:

* Freshness
* Volume
* Completeness
* Validity
* Consistency
* Accuracy
* Uniqueness

## Ingest data ##

Dataplex provides templates (powered by Dataflow) to perform common data processing tasks like data ingestion, processing, and managing data lifecycle.

### Dataplex data profiling is now GA ###

Dataplex data profiling lets you identify common statistical characteristics of the columns in your BigQuery tables. This information helps you to understand and analyze your data more effectively.

#### Scope ####

As part of the specification of a data profiling scan, you can specify the scope of a job as one of the following options:

* **Full table:** The entire table is scanned in the data profiling scan. Sampling, row filters, and column filters are applied on the entire table before calculating the profiling statistics.

* **Incremental:** Incremental data that you specify is scanned in the data profile scan. Specify a Date or Timestamp column in the table to be used as an increment. Typically, this is the column on which the table is partitioned. Sampling, row filters, and column filters are applied on the incremental data before calculating the profiling statistics.

#### Export scan results to BigQuery table ####

You can export the data profiling scan results to a BigQuery table for further analysis. To customize reporting, you can connect the BigQuery table data to a Looker dashboard. You can build an aggregated report by using the same results table across multiple scans.

## Build a Data Mesh ##

You can use Dataplex to build a data mesh architecture. This guide shows you how to use Dataplex features, such as a lake, zones, and assets, to build a data mesh.

A data mesh is an organizational and technical approach that decentralizes data ownership among domain data owners. These owners provide the data as a product in a standard way and facilitate communication among different parts of the organization to distribute datasets across different locations.

For that you will need to:

* Create a Dataplex lake that will act as the domain for your data mesh
* Add zones to your lake that will represent individual teams within each domain and provide managed data contracts.
* Attach assets that map to data stored in Cloud Storage

Highly recommended to deep dive on the following [document](https://services.google.com/fh/files/misc/build-a-modern-distributed-datamesh-with-google-cloud-whitepaper.pdf). 

## Best Practices ##

When you select the project in which to host your lake, consider the following factors:

* The project must belong to the same VPC Service Controls perimeter as the data destined to be within the lake.
* The lake service account requires administrator permissions on the Cloud Storage buckets or BigQuery datasets. Dataplex creates external tables in BigQuery for tables discovered in Cloud Storage. Dataplex also makes available BigQuery table metadata, and tables discovered in the Cloud Storage bucket, in a Dataproc Metastore. The Dataproc Metastore is located within the data lake project.

## Pricing ##

There are several SKUs that you need to consider when using this service. For instance you may need a Dataproc Metastore instance.

## Conclusion ##

Any service providing governance, profiling, and quality reporting for data is inherently valuable. The fact that this service is seamlessly integrated within the cloud provider's offering is a significant plus. While costs may be uncertain and require further investigation, this solution can be particularly beneficial for organizations without dedicated resources to manage these activities. In such cases, exploring this option is definitely worth considering.

## References ##

* <https://cloud.google.com/data-catalog/docs/concepts/overview>
* <https://cloud.google.com/data-catalog/docs/integrate-data-sources#integrate_on-premises_data_sources>
* <https://cloud.google.com/dataplex/docs/quickstart-guide>
* <https://cloud.google.com/dataplex/pricing>
* <https://cloud.google.com/architecture/data-mesh>
* <https://services.google.com/fh/files/misc/build-a-modern-distributed-datamesh-with-google-cloud-whitepaper.pdf>
* <https://cloud.google.com/architecture/design-self-service-data-platform-data-mesh>
