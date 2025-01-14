---
title: Dataform
date: "2024-05-24T17:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - GCP
---

In this article I'll go through Dataform a GCP service to operationalize ETL processes in BigQuery

## Intro ##

In this article I'll go through Dataform a GCP service to operationalize ETL processes in BigQuery

## Context ##

Dataform lets you manage data transformation in the Extraction, Loading, and Transformation (ELT) process for data integration. After raw data is extracted from source systems and loaded into BigQuery, Dataform helps you to transform it into a well-defined, tested, and documented suite of data tables.

## Features ##

* Develop curated, up-to-date, trusted, and documented tables in BigQuery
* Enable data analysts and data engineers to collaborate on the same repository
* Build scalable data pipelines in BigQuery using SQL
* Integrate with GitHub and GitLab
* Keep tables updated without managing infrastructure

## Dataform-cli ##

If you like to use the cli on your PC I would recommend adjusting the node version to prevent some warnings related with `punnycode` which was deprecated

```sh
nvm install 20.5.1
nvm use 20.5.1
```

Next install the client

```sh
npm i -g @dataform/cli@^3.0.0-beta
```

After that start setup the credentials

```sh
dataform init-creds
```

This will configure the environment for your bigquery project.

**NOTE:** You should pay attention for the version of the cli used, because if you use an older version the configuration files are not supported in the interface. At the time of this writing the supported version of the cli was `@dataform/cli@^3.0.0-beta` but check the Official [documentation](https://cloud.google.com/dataform/docs/use-dataform-cli) for updates

## Github integration ##

The dataform repository can be integrated with a 3rd party source control like Github which is useful depending on your Company policy.

The following document provides details on how to setup for several 3rd parties

* <https://cloud.google.com/dataform/docs/connect-repository>

For github you can configure either via SSH or HTTPS simply provide the required permissions and that's it.

Will try to check if there are some github actions already available on the marketplace to automate execution, but first lets start by setting up some workflow.

## Workflow Development ###

After initializing the dataform repository one gets a structure like the following

```sh
.
├── definitions
│   ├── first_view.sqlx
│   └── second_view.sqlx
└── workflow_settings.yaml
```

This example simply creates 2 views with one column and the `workflow_settings.yaml` file provides information of the version used project default location and dataset

Let's switch to sanbox branch and start our developments...

```sh
$ git checkout sandbox
Switched to branch 'sandbox'
Your branch is up to date with 'origin/sandbox'.
```

Also create a `dataform` dataset in Bigquery on the project you selected make sure to chose the correct region.

### Source data declarations ###

You can declare any BigQuery table type as a data source in Dataform. Declaring BigQuery data sources that are external to Dataform lets you treat those data sources as first-class Dataform objects.

You can declare one data source per a SQLX declaration file.

Let's start by creating a new source from BigQuery public datasets

creating the following file: `definitions/dataset-declaration.sqlx`

```yaml
    config {
      type: "declaration",
      database: "bigquery-public-data",
      schema: "samples",
      name: "shakespeare",
    }
```

This is the part if you are using a [Medallion Architecture](https://www.databricks.com/glossary/medallion-architecture) configure your raw sources.

### Tables and Views ###

To define a table, you define the table type and write a SELECT statement in a type: "table" SQLX file. Dataform then compiles your Dataform core code into SQL, executes the SQL code, and creates your defined tables in BigQuery.

To reference a SQL workflow object in a SELECT statement and automatically add it as a dependency, use the `ref` function.

Let's create a sample table from shakespeare source by creating the file `asd` with the content:

```sql
config { type: "table" }

SELECT *  FROM ${ref("shakespeare")} LIMIT 100
```

Also remove the previous view files and compile to validate

```sh
rm definitions/second_view.sqlx
rm definitions/first_view.sqlx
dataform compile
```

You should get the following output

```sh
Compiling...

Compiled 1 action(s).
1 dataset(s):
  dataform.shakespeare-sample [table]
```

So this seems to compile let's run it.

```sh
dataform run
```

You should get a similar output

```sh
Compiling...

Compiled successfully.

Running...

Table created:  dataform.shakespear-sample [table]
```

Now let's save our changes but first execute the format command to make sure the syntax is normalized and pretty :D

```sh
dataform format
git add *
git commit -m "Added shakespear-sample table"
git push
```

**NOTE:** Bigquery as the limitation to work in a single region, which means if you have some source in `US` and want to process the dataset in `EU` which is the case, you need to use the data transfer service. This is annoying, check this [option](https://cloud.google.com/bigquery/docs/managing-tables#copy_tables_across_regions) but I'll just replicate the table for testing purposes.

### Documentation of tables ###

The previous table doesn't have proper descriptions, so let's add those.

Let's start by providing a description for the table like the example:

```yaml
config {
  type: "table",
  description: "Description of the table",
 }
```

and include columns definitions from one auxiliary file so that we can reuse the descriptions if required

Creating the `includes/docs.js` file with the content

```yaml
const columns = {
    word: "A single unique word (where whitespace is the delimiter) extracted from a corpus.",
    word_count: "The number of times this word appears in this corpus.",
    corpus: "The work from which this word was extracted.",
    corpus_date: "The year in which this corpus was published."
}

module.exports = {
  columns
};
```

For our `shakespear-sample.sqlx` example would be something like:

```yaml
config {
  type: "table",
  description: "A shakespear sample table from BigQuery public samples",
  columns: docs.columns
}

SELECT
  *
FROM
  ${ref("shakespear")}
LIMIT
  100
```

Now when running the `dataform run` command the descriptions will be present on the table

### Dataform tags ###

To organize components of your SQL workflow into collections, you can add custom tags to SQLX files of the following types:

* table
* view
* incremental
* assertion
* operations

The tags are useful if you want to filter workflows that you would like to run ex: `tags: ["daily", "hourly"]`

For hour Example lets add the following tag

```yaml
tags: ["adhoc", "shakespear-model"]
```

This allows you to trigger the executions by tag in case you want to aggregate several processes.

### Dependencies ###

You can define a dependency relationship between objects of a SQL workflow. In a dependency relationship, the execution of the dependent object depends on the execution of the dependency object. This means that Dataform executes the dependent after the dependency.

Example:

```sh
config { dependencies: [ "some_table", "some_assertion" ] }
```

### Assertions ###

An assertion is a data quality test query that finds rows that violate one or more rules specified in the query. If the query returns any rows, the assertion fails. Dataform runs assertions every time it updates your SQL workflow and it alerts you if any assertions fail.

You can configure several types of assertions. The following example defines that the following columns cannot be null.

```yaml
config {
  type: "table",
  assertions: {
    nonNull: ["user_id", "customer_id", "email"]
  }
}
SELECT ...
```

Check the following [page](https://cloud.google.com/dataform/docs/assertions) for more detail description.

Dataform automatically creates views in BigQuery that contain the results of compiled assertion queries.

Let's create one example on our sample data.

> Let's assume we should not have words with less then one character for validation purposes.

One should include the following assertion

When running dataform run one should see the following warning:

```sh
Assertion failed:  dataform_assertions.dataform_shakespear-sample_assertions_rowConditions
  > 
  >       create or replace view `dataio-sandbox.dataform_assertions.dataform_shakespear-sample_assertions_rowConditions` as 
  > SELECT
  >   'LENGTH(word) > 2' AS failing_row_condition,
  >   *
  > FROM `dataio-sandbox.dataform.shakespear-sample`
  > WHERE NOT (LENGTH(word) > 2)
  > 
  bigquery error: Assertion failed: query returned 6 row(s).
```

Also you will find a new dataset `dataform_assertions` with the identified assertions found.

You can also define those assertions independently and include them as dependencies.

Example: `definitions/manual_assertion.sqlx`

```yaml
config { type: "assertion" }

SELECT
  *
FROM
  ${ref("sometable")}
WHERE
  a IS NULL
  OR b IS NULL
  OR c IS NULL
```

And then specify on your view or table definition:

```yaml
config {
  type: "view",
  dependencies: [ "manual_assertion"]
}
```

## Scheduling ##

  There are several ways to setup the scheduling of workflows this article will not cover that but here are the links:

* <https://cloud.google.com/dataform/docs/workflow-configurations>
* <https://cloud.google.com/dataform/docs/schedule-executions-workflows>
* <https://cloud.google.com/dataform/docs/schedule-executions-composer>

## Pricing ##

 Dataform uses BigQuery so you are billed for its processing like you execute normal queries. You can also be billing for the scheduling product you use so check in the detail the [pricing page](https://cloud.google.com/dataform/pricing).

## Conclusion ##

Dataform is a very powerful tool to centralize the SQL code for your ETL. With integrated source control, monitoring and schedule of workflows in GCP. This article only touched part of the functionalities but you can do a lot more with this.

I found this very similar to [DBT](https://rramos.github.io/2023/12/21/dbt/) if you need something that would work with different warehouse technologies probably is a good option, but if you are committing to work in GCP with Bigquery this brings the advantage of being fulling integrated with GCP services and you have an out-of-the-box visual interface.

## Next ##

I would like to configure github actions to validate a CI/CD flow that tests the changes and execute the code if all is good, but that would go for a dedicated article.

Also extend the tests with Assertions, quality checks understand how well this works with Dataplex and doing some tests with scheduling.

## References ##

* <https://cloud.google.com/dataform>
* <https://cloud.google.com/dataform/docs/quickstart-create-workflow>
* <https://cloud.google.com/dataform/pricing>
* <https://cloud.google.com/dataform/docs/dimensions-package>
* <https://cloud.google.com/dataform/docs/connect-repository>
* <https://cloud.google.com/dataform/docs/use-dataform-cli>
* <https://rramos.github.io/2023/12/21/dbt>
