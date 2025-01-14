---
title: Apache Superset
date: "2024-06-24T19:00:00+00:00"
lang: en
tags:
  - Frontend
  - Data
  - Engineering
  - Analytics
  - Dashboards
---

This article is about the setup to run Apache superset locally and use with duckdb datasets.

## Intro ##

In this article I will go through the process to setup locally superset and work with duckdb datasets.

## Steps ##

1. Install and configure a functional Superset instance
2. Create a local or memory duckdb database with sample data
3. Validate the working datasets

We will be using the provided datasets from superset examples which are in json and csv and create duckdb tables with those.

## Quickstart ##

```sh
pyenv install 3.7
pyenv virtualenv 3.5.1 venv
```

### Docker ###

If you would like to test with docker version it will brings most of the plugins and would be quicker than to setup the python environment correctly.

For that you can follow this steps:

Download superset

```seh
git clone https://github.com/apache/superset
```

Start the docker containers with docker-compose

```sh
# Enter the repository you just cloned  
$ cd superset  
  
# Fire up Superset using Docker Compose  
$ docker compose up
```

Now head over to [http://localhost:8088](http://localhost:8088/) and log in with the default created account:

```sh
username: admin
password: admin
```

### Local Python Installation ###

I would like to do some tests with duckdb and the existing docker image does not bring the required python packages for that as such, I went through the hard path.

First let's create a Python environment for 3.9.

```sh
pyenv install 3.9
pyenv virtualenv 3.9 superset
pyenv activate superset
```

Download superset code

```sh
git clone git@github.com:apache/superset.git
cd superset
```

Install python packages

```sh
pip install --upgrade pip
pip install -r requirements/base.in
pip install duckdb
pip install duckdb-engine
pip install Pillow
```

Let's configure the default env

```sh
mkdir data
export SUPERSET_CONFIG_PATH="~/.superset/superset_config.py"
```

Generate the `superset_config.py` file with the following content:

```sh
# Superset specific config
ROW_LIMIT = 5000

# Flask App Builder configuration
# Your App secret key will be used for securely signing the session cookie
# and encrypting sensitive information on the database
# Make sure you are changing this key for your deployment with a strong key.
# Alternatively you can set it with `SUPERSET_SECRET_KEY` environment variable.
# You MUST set this for production environments or the server will refuse
# to start and you will see an error in the logs accordingly.
SECRET_KEY = 'SECRET_KEY'

# The SQLAlchemy connection string to your database backend
# This connection defines the path to the database that stores your
# superset metadata (slices, connections, tables, dashboards, ...).
# Note that the connection information to connect to the datasources
# you want to explore are managed directly in the web UI
# The check_same_thread=false property ensures the sqlite client does not attempt
# to enforce single-threaded access, which may be problematic in some edge cases
SQLALCHEMY_DATABASE_URI = 'sqlite:////PATH_TO_YOUR_SUPERSET/superset/data/superset.db?check_same_thread=false'

# Flask-WTF flag for CSRF
WTF_CSRF_ENABLED = True
# Add endpoints that need to be exempt from CSRF protection
WTF_CSRF_EXEMPT_LIST = []
# A CSRF token that expires in 1 year
WTF_CSRF_TIME_LIMIT = 60 * 60 * 24 * 365

# Set this API key to enable Mapbox visualizations
MAPBOX_API_KEY = ''

```

**NOTE**: Make sure to replace PATH_TO_YOUR_SUPERSET and SECRET_KEY values. You can generate a new secret with the following command `openssl rand -base64 42`

Create the data folder and start the initialization commands

```sh
mkdir data
superset db upgrade
superset fab create-admin
superset fab create-permissions
superset init
superset load_examples
```

You can now run superset with the command:

```sh
superset run -p 8088 --with-threads --reload
```

Now you just need to access <http://localhost:8088/> and start creating you datasets and charts.

## Loading Data ##

When you run the command `superset load_examples` it loads example data and several charts and dashboards which allow you to explore the tool.

You can also load this data into duckdb to try creating from those datasets

```sh
git clone git@github.com:apache-superset/examples-data.git
```

And run the following sql after starting duckdb

```sh
create table airports as from READ_CSV_AUTO('./airports.csv.gz');
create table bartlines as from READ_JSON_AUTO('./bart-lines.json.gz');
create table birt_france_data_for_country_map as from READ_CSV_AUTO('./birth_france_data_for_country_map.csv');
create table birt_names2 as from READ_JSON_AUTO('./birth_names2.json.gz');
create table birth_names as from READ_JSON_AUTO('./birth_names.json.gz');
create table countries as from READ_JSON_AUTO('./countries.json.gz');
create table energy as from READ_JSON_AUTO('./energy.json.gz');
create table flight_data as from READ_CSV_AUTO('./flight_data.csv.gz');
create table multiformat_time_series as from READ_JSON_AUTO('./multiformat_time_series.json.gz');
create table paris_iris as from READ_JSON_AUTO('./paris_iris.json.gz');
create table random_time_series as from READ_JSON_AUTO('./random_time_series.json.gz');
create table san_francisco as from READ_CSV_AUTO('./san_francisco.csv.gz');
create table sf_population as from READ_JSON_AUTO('./sf_population.json.gz');
create table unicode_utf8_unixnl_test as from READ_CSV_AUTO('./unicode_utf8_unixnl_test.csv');
```

In order to test connection add a new database connection using

```sh
duckdb:///local.duckdb
```

Or if you are using in-memory

```sh
duckdb:///:memory:
```

You can test connectivity going to **Settings -> Database Connections**

## Next Steps ##

* Deep dive on the functionalities of Superset as the tool seems extremely complete on chart possibilities.
* Test a with a dataset in DubckDB hybrid mode

## Conclusion ##

Superset is an exceptionally powerful tool for Business Intelligence, offering numerous graphical options and configurations, including 3D charts. It is lightweight and fast, with an integrated API and support for various database connections. This article guides you through setting up a local environment, primarily for testing with DuckDB.

Using Docker is the most efficient way to start and explore Superset. However, setting it up directly with Python offers greater flexibility for testing other connectors, although managing Python dependencies can be challenging. Superset is designed to be configured for cloud environments using Kubernetes, so these steps are not intended for production environments. For a production setup, refer to the official documentation, which is very comprehensive.

## References ##

* <https://superset.apache.org/docs/intro>
* <https://superset.apache.org/docs/quickstart>
* <https://www.restack.io/docs/superset-knowledge-apache-superset-duckdb-integration>
* <https://duckdb.org/2022/10/12/modern-data-stack-in-a-box.html>
