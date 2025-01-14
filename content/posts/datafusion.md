---
title: Datafusion
date: "2024-06-08T14:00:00+00:00"
lang: en
tags:
  - Rust
  - Utils
  - Data Engineering
---

Article about DataFusion Rust query engine build for high-quality data-centric systems

## Intro ##

DataFusion is a very fast, extensible query engine for building high-quality data-centric systems in Rust, using the Apache Arrow in-memory format. Python Bindings are also available. DataFusion offers SQL and Dataframe APIs, excellent performance, built-in support for CSV, Parquet, JSON, and Avro, extensive customization, and a great community.

## Features ##

* Feature-rich SQL support and DataFrame API
* Blazingly fast, vectorized, multi-threaded, streaming execution engine.
* Native support for Parquet, CSV, JSON, and Avro file formats. Support for custom file formats and non file datasources via the TableProvider trait.
* Many extension points: user defined scalar/aggregate/window functions, DataSources, SQL, other query languages, custom plan and execution nodes, optimizer passes, and more.
* Streaming, asynchronous IO directly from popular object stores, including AWS S3, Azure Blob Storage, and Google Cloud Storage (Other storage systems are supported via the ObjectStore trait).
* Excellent Documentation and a welcoming community.
* A state of the art query optimizer with expression coercion and simplification, projection and filter pushdown, sort and distribution aware optimizations, automatic join reordering, and more.
* Permissive Apache 2.0 License, predictable and well understood Apache Software Foundation governance.
* Implementation in Rust, a modern system language with development productivity similar to Java or Golang, the performance of C++, and loved by programmers everywhere.
* Support for Substrait query plans, to easily pass plans across language and system boundaries.

## Use Cases ##

DataFusion can be used without modification as an embedded SQL engine or can be customized and used as a foundation for building new systems.

While most current usecases are “analytic” or (throughput) some components of DataFusion such as the plan representations, are suitable for “streaming” and “transaction” style systems (low latency).

## Examples ##

To run the examples, use the `cargo run` command such as:

```sh
git clone https://github.com/apache/datafusion
cd datafusion
# Download test data
git submodule update --init

# Run the `csv_sql` example:
# ... use the equivalent for other examples
cargo run --example csv_sql
```

### Use DataFrame API to process data stored in a CSV ###

```rust
use datafusion::prelude::*;

#[tokio::main]
async fn main() -> datafusion::error::Result<()> {
  // create the dataframe
  let ctx = SessionContext::new();
  let df = ctx.read_csv("tests/data/example.csv", CsvReadOptions::new()).await?;

  let df = df.filter(col("a").lt_eq(col("b")))?
           .aggregate(vec![col("a")], vec![min(col("b"))])?
           .limit(0, Some(100))?;

  // execute and print results
  df.show().await?;
  Ok(())
}
```

Output should be something like:

```text
+---+--------+
| a | MIN(b) |
+---+--------+
| 1 | 2      |
+---+--------+
```

Or you can run specifically this example

```sh
git clone git@github.com:rramos/datafusion-test.git
cd datafusion-test
cargo build
cargo run
```

## datafusion-cli ##

DataFusion CLI (datafusion-cli) is an interactive command-line utility for executing SQL queries against any supported data files.

While intended as an example of how to use DataFusion, datafusion-cli offers a full range of SQL and support reading and writing CSV, Parquet, JSON, Arrow and Avro, from local files, directories, or remote locations such as S3.

### Installation ###

```sh
cargo install datafusion-cli
```

### Example ###

Here is an example of how to run a SQL query against a local file, `hits.parquet`:

```sh
$ datafusion-cli
DataFusion CLI v37.0.0
> select count(distinct "URL") from 'hits.parquet';
+----------------------------------+
| COUNT(DISTINCT hits.parquet.URL) |
+----------------------------------+
| 18342019                         |
+----------------------------------+
1 row(s) fetched.
Elapsed 1.969 seconds.
```

## Projects using datafusion ##

Here are some active projects using DataFusion:

* [Arroyo](https://github.com/ArroyoSystems/arroyo) Distributed stream processing engine in Rust
* [Ballista](https://github.com/apache/datafusion-ballista) Distributed SQL Query Engine
* [CnosDB](https://github.com/cnosdb/cnosdb) Open Source Distributed Time Series Database
* [Comet](https://github.com/apache/datafusion-comet) Apache Spark native query execution plugin
* [Cube Store](https://github.com/cube-js/cube.js/tree/master/rust)
* [Dask SQL](https://github.com/dask-contrib/dask-sql) Distributed SQL query engine in Python
* [delta-rs](https://github.com/delta-io/delta-rs) Native Rust implementation of Delta Lake
* [Exon](https://github.com/wheretrue/exon) Analysis toolkit for life-science applications
* [GlareDB](https://github.com/GlareDB/glaredb) Fast SQL database for querying and analyzing distributed data.
* [GreptimeDB](https://github.com/GreptimeTeam/greptimedb) Open Source & Cloud Native Distributed Time Series Database
* [HoraeDB](https://github.com/apache/incubator-horaedb) Distributed Time-Series Database
* [InfluxDB](https://github.com/influxdata/influxdb) Time Series Database
* [Kamu](https://github.com/kamu-data/kamu-cli/) Planet-scale streaming data pipeline
* [LakeSoul](https://github.com/lakesoul-io/LakeSoul) Open source LakeHouse framework with native IO in Rust.
* [Lance](https://github.com/lancedb/lance) Modern columnar data format for ML
* [ParadeDB](https://github.com/paradedb/paradedb) PostgreSQL for Search & Analytics
* [Parseable](https://github.com/parseablehq/parseable) Log storage and observability platform
* [qv](https://github.com/timvw/qv) Quickly view your data
* [Restate](https://github.com/restatedev) Easily build resilient applications using distributed durable async/await
* [ROAPI](https://github.com/roapi/roapi)
* [Seafowl](https://github.com/splitgraph/seafowl) CDN-friendly analytical database
* [Spice.ai](https://github.com/spiceai/spiceai) Unified SQL query interface & materialization engine
* [Synnada](https://synnada.ai/) Streaming-first framework for data products
* [VegaFusion](https://vegafusion.io/) Server-side acceleration for the [Vega](https://vega.github.io/)
     visualization grammar
* [ZincObserve](https://github.com/zinclabs/zincobserve)
     Distributed cloud native observability platform

## References ##

* <https://crates.io/crates/datafusion>
* <https://docs.rs/datafusion/latest/datafusion/>
* <https://arrow.apache.org/datafusion>
* <https://github.com/apache/arrow-datafusion>
* <https://datafusion.apache.org/user-guide/example-usage.html>
