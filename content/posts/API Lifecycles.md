---
title: API Lifecycles
date: "2022-12-23T10:00:00+00:00"
lang: en
tags:
  - API
  - Contracts
  - Software
---

Article about API versioning

## Intro ##

A very interesting talk regarding API Lifecycle where Thomas Betts talks with Kin Lane about managing your API lifecycle using standards and specifications, including OpenAPI, AsyncAPI, and JSON Schema. These specifications and the tooling based on them can help reduce communication problems, by creating documentation, generating code, and automating testing.

* [InfoQ Article](https://www.infoq.com/podcasts/api-lifecycles-specifications-standards)

## Communication Problems ##

> Almost every problem in software comes down to a communication problem, whether that's the ability to send, receive and understand a message. It can break down whether it's client to server, or product manager to developer trying to understand requirements. Anytime you have two things trying to  communicate, explaining the contract is really important.
> breaking changes aren't bad or good. They are only bad or good if the communication is lacking or the communication is there.

## Versioning API ##

> he most common way for folks to handle change management using versioning like this is with semantic versioning, where you have a 1.0.0 and then that's a major release. And then when you release any changes that are minor changes, feature enhancements, you go 1.1. If you do a patch, if you're needing to fix something it'd be 1.1.1. So that last digit is just for a fix a patch, something you're making better. That middle digit is for incremental changes. But the first one, so if we went to version 2.0, that's a major change.

Full Chapter list  from the talk:

* API Lifecycle vs. Software Development Lifecycle
* Swagger and OpenAPI
* More Than Just Documentation
* Improving Communication
* AsyncAPI is OpenAPI For Event-Driven APIs
* Better Naming Suggestions
* Relationship Between OpenAPI, AsyncAPI, and JSON Schema
* Maturity Level of AsyncAPI and OpenAPI
* API Specifications Are Not a New Idea
* Versioning an API
* Validation and Testing
* API Specifications For Non-Technical Stakeholders
* What’s Coming For API Lifecycles
* Closing
