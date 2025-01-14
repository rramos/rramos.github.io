---
title: killercoda
date: "2024-06-08T22:00:00+00:00"
lang: en
tags:
  - Learning
---

Article about Killercoda service

## What is Killercoda ##

Killercoda is a place where you open your browser and get instant access to a real Linux or Kubernetes environment ready to use. These environments are maintained remotely and accessed locally, hence no setup or huge resource usage in local browsers. As a user you can learn from existing scenarios and as a creator you can provide scenarios to teach any kind of tools or technologies.

## What can Creators do on Killercoda ##

Various examples showing what's possible for creators on Killercoda.

* Repository: <https://github.com/killercoda/scenario-examples>
* Documentation: <https://killercoda.com/creators>
* Group scenarios into Courses: <https://killercoda.com/examples-courses>

## Creator Workflow ##

1. You add a Github repository to your Killercoda profile
1. Every time you push into your repository and the specified branch, your Killercoda scenarios will be updated.
1. You'll write for example JSON, Markdown and Bash (for possible verification of user input)

### Create github Repository ###

1. One can clone of or the [examples](https://github.com/killercoda/scenario-examples)

### Add Github Repository Name and Branch ###

1. Go to [Creator Repository](https://killercoda.com/creator/repository) and add the **Repository Name** and **Branch**.

### Provide Access ###

Killercoda needs read access to your repository.

1. Go to [Creator Repository](https://killercoda.com/creator/repository) and copy your Deploy Key and add it under Repository Settings -> Deploy Keys.

### Github Webhook ###

Every time you push, Killercoda will update your scenarios.

1. Go to [Creator Repository](https://killercoda.com/creator/repository) and copy the Payload Url and Secret. Also set the Content Type to JSON under Github Repository Settings -> Webhooks.

### List scenarios ###

Go to [Creator Scenarios](https://killercoda.com/creator/scenarios). Here you should see your scenarios.

## Example ##

The following repository provides a scenario to introduction on linux commands:

* <https://github.com/rramos/killercoda>

You can access the Lab scenario at:

* <https://killercoda.com/rramos>

## Limitations ##

### FREE Membership ###

* Use all scenarios as much as you want
* Create public scenarios and share with others

### PLUS Membership ###

* Use scenarios for up to 4 hours instead of just one (info)
* Open up to 3 scenarios at the same time
* Solve the CKA, CKS, CKAD scenarios in the Exam Remote Desktop
* Proof you're human and have no Captcha bot challenges
* Faster load times and skip queues
* Show us you like what we're doing
* Have prioritized support

## Conclusion ##

This service is particularly useful for setting up quick laboratories. While the free membership has some limitations, it allows for the creation of content for public use efficiently without the need for dedicated infrastructure. Additionally, the inclusion of validations for various tests adds a valuable feature.

## References ##

* <https://killercoda.com/>
* <https://github.com/killercoda/scenario-examples>
* <https://killercoda.com/creators>
* <https://killercoda.com/creators/get-started>
