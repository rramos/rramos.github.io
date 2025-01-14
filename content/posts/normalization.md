---
title: Database Normalization
date: "2024-05-26T18:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - Database
---

This article is about Database Normalization

## Intro ##

Was watching this interesting [video](https://www.youtube.com/watch?v=GFQaEYEc8_8) about Normalization. This article consolidates the Normal Forms rules.

## Databases Normal Forms ##

### First Normal Form (1NF) ###

- **Using row order to convey information is not permitted.**
- **Mixing data types within the same column is not permitted.**
- **Having a table without a primary key is not permitted.**
- **Repeating groups of data on a single row is not permitted.**

### Second Normal Form (2NF) ###

- **Each non-key attribute in a table must depend on the entire primary key.**

### Third Normal Form (3NF) ###

- **Each non-key attribute in a table must depend on the key, the whole key, and nothing but the key.**

### Boyce-Codd Normal Form (BCNF) ###

- **Each attribute in the table must depend on the key, the whole key, and nothing but the key.**

### Fourth Normal Form (4NF) ###

- **The only kinds of multivalued dependency allowed in a table are multivalued dependencies on the key.**

### 5NF ###

- **It must not be possible to describe the table as being the logical result of joining some other tables together.**

Note that the Normal forms are cumulative which means 5NF must bind also to 4NF,3NF and so forth.

## Why is this important ##

Normalization entails organizing the columns (attributes) and tables (relations) of a database to ensure that their dependencies are properly enforced by database integrity constraints.

## Conclusion ##

This article summarizes the several Normal forms that you encounter in Database Normalization and it' s characteristics. If you would like to learn more about the topic I would advise watching the [Decomplexity video](https://www.youtube.com/watch?v=GFQaEYEc8_8) as the author did a great job explaining with examples.

## References ##

- <https://www.youtube.com/watch?v=GFQaEYEc8_8>
- <https://en.wikipedia.org/wiki/Database_normalization>
