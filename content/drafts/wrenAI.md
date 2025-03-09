---
title: WrenAI
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - AI
    - SQL
    - Utils
---

TBD

## Intro ##

WrenAI is a text-to-SQL solution for data teams to get results and insights faster by asking business questions without writing SQL.

## Project Status ##

WrenAI is currently in alpha version. The project team is actively working on progress and aiming to release new versions at least biweekly.

## Testing Scenario ##

1. Configure Ollama with a LLM model (deepseek-r1)
2. Setup sample database with duckdb
3. Explore wrenAI

### Preparing Environment ###

For this example we will setup a DB environment with DuckDB and using local LLM with Ollama

### Setup Ollama ###

Lets setup Ollama with `deepseek-r1` and include nomic-embed-text

```sh
ollama pull nomic-embed-text
ollama run deepseek-r1
```

> **Note**: for more details on how to setup Ollama locally check `https://rramos.github.io/2024/05/31/ollama/`


Let's check if the API is working with a sample payload

```sh
curl http://localhost:11434
```

You should get `Ollama is running` as output

This one allows you to test the prompt

```sh
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1",
  "prompt": "Why is the sky blue?"
}'
```

### Setup wrenai configuration ###

In order to setup wrenai for local use it is required to change the configuration

Create the following files 

### Using Sample data ###

start up and choose ecommerce

#### Creating the DuckDB sources ####

Lets use the sample data from duckdb in action and use some of the example questions

For this example lets us some sample data from <https://github.com/duckdb-in-action/examples>.

```sh
mkdir datasources 
cd datasources
wget https://raw.githubusercontent.com/duckdb-in-action/examples/refs/heads/main/ch03/ch03_db/load.sql
wget https://github.com/duckdb-in-action/examples/raw/refs/heads/main/ch03/ch03_db/prices.parquet
wget https://github.com/duckdb-in-action/examples/raw/refs/heads/main/ch03/ch03_db/readings.parquet
wget https://github.com/duckdb-in-action/examples/raw/refs/heads/main/ch03/ch03_db/systems.parquet
wget https://github.com/duckdb-in-action/examples/raw/refs/heads/main/ch03/ch03_db/schema.sql
```

Or using Motherduck

```sh
harlequin md:_share/duckdb_in_action_ch3_4/d0c08584-1d33-491c-8db7-cf9c6910eceb
```

> **NOTE**: I like using [harlequin](https://rramos.github.io/2024/07/04/harlequin/) to check the datasources but one can use duckdb directly


## Instalation

Select an LLM provider: 
    OpenAI
  ▸ Custom


## References ##

* <https://github.com/Canner/WrenAI>
* <https://github.com/duckdb-in-action/examples>
* <https://livebook.manning.com/book/duckdb-in-action/>
* <https://github.com/ollama/ollama/blob/main/docs/api.md>


create table readings as select * from read_parquet('readings.parquet');