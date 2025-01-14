---
title: algolia
date: '2025-01-14T10:00:00+00:00'
lang: en
tags:
    - Recommendations
    - Search
    - Data Science
---

TBD

## Intro ##

In this article we will go through the process to setup an algolia index. Also setup hexo plugin so that each new post be indexed there. In the end implement a python script for search that could be used in a bot.

## What is Algolia ##

Why bother building an Algolia index? That's simple:

Enhance search relevance: Deliver highly relevant search results tailored to your data and user needs.
Optimize search performance: Experience fast and efficient search queries, even with large volumes of data.
Personalization: Create personalized search experiences for each user

Algolia sets some upper limits to its services to ensure stability and performance for all users.

Your free allowance on Algolia Build
Your first 1,000,000 records are free, and every month you'll receive 10,000 search requests and 10,000 recommend requests. You can learn more about Build's service limits

<https://www.algolia.com/pricing/>

Up to 10k search requests / month
1m records included
AI features to test

Free,
Free/pay-as-you-go,
Annual plans

Also supports configuring budgets

## How it works ##

1. You start by defining you Index data.
1. You specify your searchable attributes from your data (eg: `title, cast.name`)
1. Specify Ranking and sorting (eg: `popularity`)

Search:

It supports A/B testing and Personalization

You can apply typo tolerance eg: min number of characters in word to accept matches

Language support, ignore-plurals, Synonymous, segmentation and decompounding, special characters. word proximity

Stop words: List of words that should be considered as optional

Pagination configuration, Highlight, snippeting, prefixing
Deduplication and Grouping

Replicas

Algolia has one ranking formula per index. Every index has a unique sorting strategy but you can’t change it at query time. This is because pre-sorting during indexing instead of at query time leads to a considerable performance boost.

The key use of replica indices is they let you provide different rankings for the same data.

Algolia lets you automatically replicate the content of one index (the primary) onto other indices (standard and virtual replicas) and synchronize content changes.

Logging and Monitoring

Dictionaries

You can configure words to be ignored, plurals

Analytics

You can can an overview of the users that search, total searches, results, geo,  

A/B testing

You can create a replica of your index and launch an A/B test and check analytics to understand if the new option provides better results befiore promoting to all users.

Enhance

You can customize the search experience with rules, such as promoting an item or hiding one. Remove words and redirect users to another page

Dynamic Re-ranking allow the results and search conversions to be incorporated on the model continuously

Personalization

It also allows personalization, which relies com capturing user activity via events that need to be sent.

Recommendation

Algolia provides recommendations based on the data in your index. One needs to choose the type of recommendations and send events using Insights API . You can have:

* Complementary recommendations
* Alternative recommendations
* Trending items
* Trending facets value
* Looking similar
You can also apply rules on trained models

## Local Setup ##

Let's create a local Vue app to test the index search.

```sh
npx create-instantsearch-app@latest instantsearch-app \
    --name 'instantsearch-app' \
    --template 'Vue InstantSearch with Vue 3' \
    --app-id 'APP_ID' \
    --api-key 'API_KEY' \
    --index-name 'movie' \
    --attributes-to-display 'title' \
    --no-interactive \
    --image-attribute 'backdrop_path'
```

Replace APP_ID and API_KEY for the values provided upon registering your account.

You can also select the start guide and choose other libraries

Then start the application with

```sh
yarn start
```

And go to <http://localhost:3000/>

## Integration in Hexo ##

## Conclusion ##

TBD

## References ##

* <https://dashboard.algolia.com>
* <https://github.com/thom4parisot/hexo-algolia>
* <https://github.com/LouisBarranqueiro/hexo-algoliasearch>
* <https://www.algolia.com/developers/code-exchange/integrate-hexo-with-algolia/>
