---
title: DuckDB hf:// Prefix
date: "2024-06-09T15:00:00+00:00"
lang: en
tags:
  - DuckDB
  - Hugging Face
  - AI
  - Machine Learning
---

Article about Duckdb support for Hugging Face data sources.

## Intro ##

DuckDB and Hugging Face co-authored an announcement about the new release using `hf://` prefix in DuckDB to access datasets in Hugging Face repositories, this spawns a new wave of opportunities to make data more accessible and lightweight for the AI and ML sectors.

## Dataset repositories ##

Hugging Face is a popular central platform where users can store, share, and collaborate on machine learning models, datasets, and other resources.

A dataset typically includes the following content:

* A README file: This plain text file provides an overview of the repository and its contents. It often describes the purpose, usage, and specific requirements or dependencies.
* Data files: Depending on the type of repository, it can include data files like CSV, Parquet, JSONL, etc. These are the core components of the repository.

Now, it is possible to query them using the URL pattern below:

```sql
hf://datasets/⟨my_username⟩/⟨my_dataset⟩/⟨path_to_file⟩
```

For example, to read a CSV file, you can use the following query:

```sql
SELECT *
FROM 'hf://datasets/datasets-examples/doc-formats-csv-1/data.csv';
```

**NOTE:** You must have the latest duckdb version

## Creating a local table ##

To avoid accessing the remote endpoint for every query, you can save the data in a DuckDB table by running a CREATE TABLE ... AS command. For example:

```sql
CREATE TABLE data AS
    SELECT *
    FROM 'hf://datasets/datasets-examples/doc-formats-csv-1/data.csv';
```

Then, simply query the data table as follows:

```sql
SELECT *
FROM data;
```

## Glob Patterns ##

To query all files under a specific format, you can use a glob pattern. Here’s how you can count the rows in all files that match the pattern `*.parquet`.

```sql
SELECT count(*) AS count
FROM 'hf://datasets/cais/mmlu/astronomy/*.parquet';
```

## Versioning and revisions ##

In Hugging Face repositories, dataset versions or revisions are different dataset updates. Each version is a snapshot at a specific time, allowing you to track changes and improvements. In git terms, it can be understood as a branch or specific commit.

You can query different dataset versions/revisions by using the following URL:

```sql
hf://datasets/⟨my-username⟩/⟨my-dataset⟩@⟨my_branch⟩/⟨path_to_file⟩
```

For example:

```sql
SELECT *
FROM 'hf://datasets/datasets-examples/doc-formats-csv-1@~parquet/**/*.parquet';
```

## Authentication ##

Configure your Hugging Face Token in the DuckDB Secrets Manager to access private or gated datasets.
First, visit [Hugging Face Settings – Tokens](https://huggingface.co/settings/tokens) to obtain your access token

* **CONFIG**: The user must pass all configuration information into the CREATE SECRET statement. To create a secret using the CONFIG provider, use the following command:

```sql
 CREATE SECRET hf_token (
    TYPE HUGGINGFACE,
    TOKEN 'your_hf_token'
 );
```

* **CREDENTIAL_CHAIN**: Automatically tries to fetch credentials. For the Hugging Face token, it will try to get it from `~/.cache/huggingface/token`. To create a secret using the CREDENTIAL_CHAIN provider, use the following command:

```sh
 CREATE SECRET hf_token (
    TYPE HUGGINGFACE,
    PROVIDER CREDENTIAL_CHAIN
 );
```

## Conclusion ##

The integration of `hf://` paths in DuckDB significantly streamlines accessing and querying over 150,000 datasets available on Hugging Face. This feature democratizes data manipulation and exploration, making it easier for users to interact with various file formats such as CSV, JSON, JSONL, and Parquet. By utilizing hf:// paths, users can execute complex queries, efficiently handle large datasets, and harness the extensive resources of Hugging Face repositories

## References ##

* <https://duckdb.org/2024/05/29/access-150k-plus-datasets-from-hugging-face-with-duckdb>
* <https://huggingface.co/docs/hub/datasets-duckdb>
* <https://huggingface.co/blog/chilijung/access-150k-hugging-face-datasets-with-duckdb>
