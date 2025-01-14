---
title: API Architectures
date: "2023-08-29T21:00:00+00:00"
lang: en
tags:
  - API
  - Architecture
  - Software
---

This article resumes the video by Alex Xu and Sahn Lam regarding 6 types of API Architectures and there usecases

## Intro ##

This article resumes the video by Alex Xu and Sahn Lam regarding 6 types of API Architectures and there usecases. Checkout there youtube channel as it has very interesting content

![api-architectures](/images/6-API-Archs.jpeg)

## SOAP ##

XML-based for enterprise application where security and reliability are key, but it could be overkill if you are developing a webapp for instance due to fact that it is complex.

## RESTful ##

Resource-based for webservers, implemented on top of HTTP methods very popular in web development. It may not be the best option if you need real time data or operate with a highly connected data model may not be the best choice

## GraphQL ##

query language reduce network load. allow the client to ask for the specific data that it needs, more faster responses as you don't need to over fetch data you don't require. Good choice for applications with complex data requirements

## gRPC ##

High performance for microservices, used protocol buffers by default. Good choice for micro-services architecture for inter-service communications but if dealing with browser client there are some limitations

## WebSocket ##

Bi-directional for low-latency data exchange. Perfect for real chat applications and real time gaming where low latency exchange is crucial

## Webhook ##

Asynchronous for event-driven application. Very useful if you don' t need immediate response and latency is not an issue

## References ##

* <https://www.youtube.com/watch?v=4vLxWqE94l4&ab_channel=ByteByteGo>
