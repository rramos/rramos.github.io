---
title: Evidence
date: "2023-12-26T16:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - Data Visualization
  - Markdown
---

In this article I will go through Evidence

## Intro #

In this article I will go through [Evidence](https://docs.evidence.dev/)

## What is Evidence ##

Evidence is an open source, code-based alternative to drag-and-drop business intelligence tools.

Evidence reports are written in [Evidence-flavored Markdown](https://docs.evidence.dev/markdown) - an extension of markdown that includes SQL queries, data viz components, and programmatic features.

## SQL ##

Code fences in Evidence markdown files run inline queries and return data. These code fences run the DuckDB SQL dialect.

```sql orders_by_month
select
    date_trunc('month', order_datetime) as order_month,
    count(*) as number_of_orders,
    sum(sales) as sales_usd
from needful_things.orders
group by 1, order by 1 desc
```

More information on queries available at [Queries Section](https://docs.evidence.dev/core-concepts/queries)

## Components ##

Evidence has a built in component library to create charts and other visual elements. More on Components.

```xml
<LineChart 
    data = {orders_by_month}    
    y = sales_usd 
    title = 'Sales by Month, USD' 
/>
```

Check the [Component Library](https://docs.evidence.dev/components/all-components) for more information.

One can also use, Loops, If/Then Statements, Partials, Page Variables, and also sorts of customizations checkout the [Core Components](https://docs.evidence.dev/core-concepts/syntax/#) page for more details.

In production, Evidence is a static site generator. This means it doesn't run queries when someone visits your site, but pre-builds all possible pages as HTML beforehand.

You can host your Evidence project using Evidence Cloud, cloud services like Netlify or Vercel, or your own infrastructure. Evidence does not currently support Github Pages.

## Build Process ##

Evidence doesn't run new queries each time someone visits one of your reports.

Instead, Evidence runs your queries once, at build time, and statically generates all of the pages in your project. This includes all possible permutations of any parameterized pages.

You can schedule (or trigger) regular builds of your site to keep it up-to-date with your data warehouse.

This has two benefits for you and your users:

If something goes wrong with your SQL, Evidence just stops building your project, and continues to serve older results.
Your site will be exceptionally fast. Under most conditions, pages will load in milliseconds.

## Requirements ##

| Requirement | Min Version | Max Version |
| ----------- | ----------- | ----------- |
| Node.js     | 16.14       | 20.10       |
| NPM         | 7           | 10.1        |

> **NOTE:** This requirements may change based on the evolution of the Product. At the time of this writing was 3.0.2

## Setup ##

There are several ways to install Evidence, for this article following the traditional one with npx, but there is an option using [docker](https://github.com/evidence-dev/docker-devenv) if you prefeer that option

```sh
npx degit evidence-dev/template evidence-test
cd evidence-test
npm install
npm run sources
npm run dev
```

I would suggest however to setup the [VSCode Plugin](https://marketplace.visualstudio.com/items?itemName=Evidence.evidence-vscode) if you use that IDE, as it do all this work underneat :D

## Test ##

Now let's generate Some Random data using [jafgen](https://rramos.github.io/2023/12/21/jafgen/)

```sh
cd evidence-test/sources
jafgen --years 1
mv jaffgen-data jaffgendata
```

Create the following file `jaffledata/connection.yaml` with the content:

```yaml
# This file was automatically generated
name: jaffledata
type: csv
options: {}
```

Then run

```sh
npm run sources
```

> **NOTE:** A better way to configure sources would be by accessing the following URL: <http://localhost:3000/settings/>

## Create a sample report ##

Create the following page `pages/jaffle.md` with the content

````md
# Jaffle Example Report

This example is based on mock data from jaffle. 

Let's check the data

## Orders
```sql orders
select * from raw_orders
```

## Customers
```sql customers
select * from raw_customers
```

# Orders by Customer
```sql orders_by_customer
select
     count(o.id) as orders,
     c.column0 as customerid
from raw_orders as o
left join raw_customers as c
on o.customer = c.column0
group by c.column0
order by orders desc
```

<BarChart
    data="{orders_by_customer}"
    x="customerid"
    y="orders"
    series="customerid"
    title="Orders by Customer"
/>

````

You can test the report through the URL:

* <http://localhost:3000/jaffle>

And that's it :)

## Conclusion ##

This article provided a quick intro on how to setup evidence to quickly generate analytical visualization based on Markdown documents. The sample data used was CSV mocked data. In general seems a very useful tools for generating quick reports the renderization in the interface is quite fast.

Points that I found some issues. Loading directly from CSV doesn't seem a good approach as there seems to be a lack of configuration, and CSV by nature tend to need some work in terms of data treatment, a rather convert the data to duckdb to mitigate this.

Also take into account the pages are static so the refresh rate of our sources is up to you. The good news is that it seems to fit well with some CI/CD process. Github pages not supported at the moment, but there are other options.

Guess I will try this option further in future. I Strongly recommend to check the Official documentation on the Components and Syntax.

## References ##

* <https://docs.evidence.dev/getting-started/install-evidence>
* <https://github.com/evidence-dev/docker-devenv>
* <https://marketplace.visualstudio.com/items?itemName=Evidence.evidence-vscode>
* <https://docs.evidence.dev/markdown>
