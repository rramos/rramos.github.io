---
title: tinyBird
date: "2024-06-05T09:00:00+00:00"
lang: en
tags:
  - Data Ingestion
  - GitHub
  - Clickhouse
  - Kafka
---

This article is about Tinybird, a modern real-time data platform that ingests data at scale.

## Intro ##

Tinybird is a modern real-time data platform that ingests data at scale, supports SQL and Git, and publishes API endpoints for everyone on your team to consume.

It uses Clickhouse as backend to manage high data volumes with velocity.

Also provides means to design and implement APIs for data products very quickly.

In this article I will follow the setup that *Jim Moffitt* provided on a workshop **Kafka to Analytics**.

The Product looks amazing and I suggest you follow up with them directly.

I'm not affiliate with the product just testing out and providing my personal inputs.

## Requirements ##

Setup the following two sources

* company_info : CSV file with information regarding stock symbols and companies
* event_stream : Kafka broker which will held event data related with stock_prices

## Setup Environment ##

* Dimensional table containing company metadata
* kafka stream of company stock price data
* python script generating data
* Kafka broker
* Tinybird to create the data pipelines
* API implementation with postman to exercise the APIs

The following [github repo](https://github.com/rramos/kafka_to_analytics) provides the required things to get started

## Setup ##

### Tinybird Account ###

Start by creating a Tinybird account and create a new workspace for this project.

* <https://www.tinybird.co/>

After you started one account create a new workspace and access the ui <https://ui.tinybird.co>

### Connect with Git ###

You can fork the following github repository and link with your workspace

* <https://github.com/rramos/kafka_to_analytics>

Then choose the option to connect with you GitHub repository.

I found out that that working directly with the web interface works rather well but there is the option to work with your IDE or cli directly on the repo and setup the [CI/CD](https://www.tinybird.co/docs/production/continuous-integration) component.

## Import company data ##

In datasources load the csv :

* `https://github.com/tinybirdco/zero-to-tinybird/blob/main/data-generator/company-info.csv`

## CLI ##

Install the required pip package

```sh
pip3 install tinybird-cli
```

Access the service to obtain your token and run the command `tb auth`

One can now execute via cli the required commands. I always like when this option is available.

## Tinybird WorkShop ##

Jimm just updated the github repo with the latest content for a workshop zero-to-tinybird.
I would recommend following both the presentation deck and the steps shared on the following github repo.

* <https://github.com/tinybirdco/zero-to-tinybird>

## Plans ##

Professional plan billing:

* Data storage is billed at US$0.34 per GB, with no limit on the amount of data storage.
* Processed data is billed at US$0.07 per GB, with no limit on the amount of processed data.
* Transferred data is billed at US$0.01 - $0.10 per GB (depending on cloud provider or region), with no limit on the amount of transferred data.

## Conclusion ##

Tinybird provides a very intuitive platform to manage real time flows for analytical purposes, incorporating several types of connectors and state of the art technology which brings amazing speed. I also liked the maturity level of the components to be integrated with production ready pipelines following best engineering practices. The Platform as integrated health checks and provides a vast number of API endpoints which allow the client to have full control and flexibility to incorporate with it's own stack.

Well done Tinybird you really have a good product here. I haven't use it is production to understand the stability level and support level the company provides or made any assessment on the pricing related with other options.

## References ##

* <https://github.com/tinybirdco/zero-to-tinybird>
* <https://www.tinybird.co/>
* <https://github.com/rramos/kafka_to_analytics>
* <https://www.tinybird.co/docs/production/continuous-integration>
* <https://github.com/tinybirdco/zero-to-tinybird/tree/main/data-generator>
