---
title: json-server
date: '2025-04-13T20:00:00+00:00'
draft: false
tags:
    - Mocking
    - API
    - Tools
---

In this article we will go though npm json-server

## What is it ##

json-server is an npm package that lets you set up a REST API in seconds with zero coding, making it an excellent tool for rapid prototyping.

## Install ##

You just need the npm package

```sh
npm install json-server
```

## Usage ##

Create a example json file like the following example `db.json`

```json
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

then run

```sh
npx json-serve db.json
```

And that's it, you will endup having a new mock server 

```sh
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

( ˶ˆ ᗜ ˆ˵ )

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile
```

## Features ##

The API will have some integrated features such as:

### Conditions ###

```sh
GET /posts?views_gt=9000
```

### Range ###

```sh
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate ###

```sh
GET /posts?_page=1&_per_page=25
```

### Sort ###

```sh
GET /posts?_sort=id,-views
```

### Nested and array fields ###

```sh
GET /foo?a.b=bar
GET /foo?x.y_lt=100
GET /foo?arr[0]=bar
```

### Embed ###

```sh
GET /posts?_embed=comments
GET /comments?_embed=post
```

### Delete ###

```sh
DELETE /posts/1
DELETE /posts/1?_dependent=comments
```

### Serving static files ###

If you create a `./public` directory it will serve its contents in addition

```sh
json-server -s ./static
json-server -s ./static -s ./node_modules
```

For full reference checkout the official page: <https://github.com/typicode/json-server>

## Conclusion ##

This package is extremely useful for prototyping a REST API without writing any code. However, it's important to review the license type before using it on a large scale. If you're working in frontend development, this tool can be especially handy while waiting for the backend to be completed.

## References ##

* <https://github.com/typicode/json-server>
