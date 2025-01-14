---
title: Data Generation with jafgen
date: "2023-12-21T14:32:00+00:00"
lang: en
tags:
  - Data Engineering
  - Mock Data
---

Article about mock generation with Jafgen

## Intro ##

In this article I will provide a quick guide to generate mock data based on Jafgen, which you can use for your local projects

## What is JafGen ##

The Jaffle Shop Generator or jafgen is a python package with a simple command line tool for generating a synthetic data set suitable for analytics engineering practice or demonstrations.

## Setup ##

Install via pip

```bash
pip install jafgen
```

## Generate data ##

Generate data

```bash
jafgen --years 1
```

The output of this command is store on the following folder `jaffle-data`:

```bash
jaffle-data/
├── raw_customers.csv
├── raw_items.csv
├── raw_orders.csv
├── raw_products.csv
├── raw_stores.csv
└── raw_supplies.csv
```

Example output

```text
==> raw_customers.csv <==
id,name
f32ab6bb-4912-4319-af20-cf681b797868,Julia Henderson
c07e5161-e8c4-419f-bdeb-3a2271691c75,James Gutierrez
63c021e4-4d59-4958-aa35-ca5f72b1cad9,Janet Robles

==> raw_items.csv <==
id,order_id,sku
f0a084b2-e702-41c9-b748-64e0688dabbf,6190ef46-3be2-4dfe-bbd5-519fc85a36b2,BEV-003
946a7047-f074-444a-9d57-6f9e4df587c7,4e9745e8-2244-42aa-8337-8342adeda83c,BEV-005
dd08b68d-448a-4e2d-9961-9226dacefba5,558f3180-3d98-415f-8197-5cd21b16cb83,BEV-003

==> raw_orders.csv <==
id,customer,ordered_at,store_id,subtotal,tax_paid,order_total
6190ef46-3be2-4dfe-bbd5-519fc85a36b2,f32ab6bb-4912-4319-af20-cf681b797868,2016-09-01T08:20:00,c1d21879-9db8-410a-af61-c0a2c91881d3,600,36,636
4e9745e8-2244-42aa-8337-8342adeda83c,c07e5161-e8c4-419f-bdeb-3a2271691c75,2016-09-01T07:53:00,c1d21879-9db8-410a-af61-c0a2c91881d3,400,24,424
558f3180-3d98-415f-8197-5cd21b16cb83,63c021e4-4d59-4958-aa35-ca5f72b1cad9,2016-09-01T07:26:00,c1d21879-9db8-410a-af61-c0a2c91881d3,600,36,636

==> raw_products.csv <==
sku,name,type,price,description
JAF-001,nutellaphone who dis?,jaffle,1100,nutella and banana jaffle
JAF-002,doctor stew,jaffle,1100,house-made beef stew jaffle
JAF-003,the krautback,jaffle,1200,lamb and pork bratwurst with house-pickled cabbage sauerkraut and mustard

==> raw_stores.csv <==
id,name,opened_at,tax_rate
c1d21879-9db8-410a-af61-c0a2c91881d3,Philadelphia,2016-09-01T00:00:00,0.06
e03fe3a7-86cb-4e58-b4b0-462bff6abdfd,Brooklyn,2017-03-12T00:00:00,0.04
a86be955-8d22-4440-960d-6fd0ac7522a6,Chicago,2018-04-29T00:00:00,0.0625

==> raw_supplies.csv <==
id,name,cost,perishable,sku
SUP-001,compostable cutlery - knife,7,False,JAF-001
SUP-002,cutlery - fork,7,False,JAF-001
SUP-003,serving boat,11,False,JAF-001
```

This files can than be imported to your SQL Engine for development/demonstration purposes

## References ##

* <https://pypi.org/project/jafgen/>
