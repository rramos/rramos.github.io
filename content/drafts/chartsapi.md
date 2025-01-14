---
title: Charts with Node Express and DBT
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - Learning
    - DBT
    - SQLite
    - React
---

In this article I will go through the process to quickly setup an API on top of a sqlite DB managed by dbt and integrate a chart frontend component in React

## Intro ##

In this article I will go through the process to quickly setup an API on top of a sqlite DB managed by dbt and integrate a chart frontend component in React

## Requirements ##

* You will need to setup DBT for the backend process
* You will need to have sqlite module for DBT.
* In case you use Ubuntu use the following command to install `python3 -m pip install dbt-sqlite`
* You will need to have Node so setup the frontend
* You will need to have sqlite for the database

## Project Details ##

Our database will have information regarding products and it's costs during a given timeline.

1. We will use dbt to prepare the view for our backend
1. We will setup CRUD operations for our API
1. We will setup a Node applications to render some charts

**Model:**

* Table : Products
* Table : Incidents
* Table : Costs

This are our raw tables.

Our frontend application will render charts based on selected product ID

* Monthly Costs of Product (BarChart)
* Costs per Category (Piechart)
* Monthly Incidents per Products (Line)

You can clone the following git repo which holds this project setup at:

* <http://github.com/myrepo>

## DBT Setup ##

Lets start by initializing a DBT project and creating.

```bash
dbt init
```

make sure to use sqlite as the database source.

Next let's add you sqlite configuration on the following file `~/.dbt/profiles.yml`

```yaml
chartjs:
  outputs:

    dev:
      type: sqlite
      threads: 1
      database: chartjs
      schema: 'main'
      schemas_and_paths:
        main: '<path_to_the_project>/chartjs/data/etl.db'
      schema_directory: '<path_to_the_project>/chartjs/data'
```

Make sure to adjust the path to you database file and run `dbt debug` to make sure the connection is working correctly.
You can execute `sqlite data/etl.db` to create a blank database

Now let's create a products table. I've added a sample seed file that you can use as reference.

```bash
dbt seed --select "products"
```

**NOTE:** If you get an error similar to `AttributeError: 'SQLiteCredentials' object has no attribute 'host'` please check this [thread](https://github.com/codeforkjeff/dbt-sqlite/issues/47) on how to fix it.

You can validate that you have now data with the following command

```bash
sqlite3 -cmd "select * FROM products" data/etl.db
```

Now let's create a simplified materialized view for our API which would only require:

 1. Identifier for our Product
 1. Category
 1. Cost
 1. TimeColumn

### Create View for our API ###

Create the following file `products/schema.yml` with the content

```yaml
version: 2

sources:
- name: costs
  tables:
  - name: costs
```

And the following script `products/costs.sql` with the content

```sql
{{ config(materialized='table') }}

TODO
```

## Create Nodejs API with CRUD components ##

We would use the express server to quickly setup this

```bash
mkdir server
cd server
npm init
```

It will create a package.json file lets add the required packages

```bash
npm install express
npm install sqlite3
npm install sequelize
```

And create the following file app.js with the content

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../chartjs/data/etl.db'
});

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD routes for User model
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

One can execute the following command to test

```bash
node app.js
```

I also provide a sample postman script if you would like to test the several endpoint to the git repo.

You can test the API on the following URL <http://localhost:3000/>

## References ##

* <https://docs.getdbt.com/docs/core/connect-data-platform/sqlite-setup>
* <https://github.com/codeforkjeff/dbt-sqlite/issues/47>
