---
title: Databoost.dev
date: "2024-04-02T09:00:00+00:00"
lang: en
tags:
  - Community
---

Article about databoost.dev community forum

## Intro ##

On the past week I've started a Forum for Data Professionals to discuss challenges and ideias in way to create a safe discussion space.

* <https://databoost.dev>

The motivation for creating this was related to a big layoff thread happening in tech on the beginning of the year, in a way to support some of my past colegues, not losing track of them and some way also to share job opportunities or support to kickstarters.

The forum is based on <https://nodebb.org> and this article explain how I've setup the hosting of the application.

Fell free to join if you have an interest in Data, no fees and we sure need someone helping producing content.

## Domain Registration ##

Not much to describe here that part needs to be paid normally on a yearly basis.
I've used <http://www.godaddy.com> but <http://www.amen.pt> also presents some good rates.

## Hosting ##

For this one I picked Google. As it has a Free Tier you can achieve a 0-cost hosting if you don't got abose the usage.

* <https://cloud.google.com/free>

Important to pay attention on the machine you provision and the region.
If you choose a e2-micro with a 30GB disk in one of the following US regions:

* Oregon: us-west1
* Iowa: us-central1
* South Carolina: us-east1

**NOTE:** Check the official docs as this may change

## NodeBB ##

Installation of NodeBB was straight forward from the official documentation

* <https://docs.nodebb.org/installing/os/ubuntu>

The project is pretty well organized and the documentation is very good

I've setup some extra plugins like SSO with gihub and google, Google Analytics, Reactions and some themes.

I opted by the mongodb option and not the redis one.

After some customization on the Backend it was done.

## GCS ##

Having the following options on the free tier:

* 5 GB-months of regional storage (US regions only) per month
* 5,000 Class A Operations per month

Decided to setup a cron job to backup the application

## Cloudfare ##

I also change the DNS domain servers from godaddy to cloudfare as they also support a Free tier which allows me to take advantage of caching and other benefits like DoS protection

## ntfy ##

This service is simple and very useful. I've configure some services to use it like if there are any issues with the backups or access to the system, but look on the [Examples Section](https://docs.ntfy.sh/examples/) for some of the things you can achieve.

## SSL ##

I also setup <https://certbot.eff.org> in order to have SSL enable, but that is something that I still need to check with the functionality provided from cloudfare, If I should change

## Mailjet ##

I also configured [Mailjet](https://app.mailjet.com) and Sendmail to relay all mail to that service. The free tier allow me to use with some limitations that service for newsletter setup and campaign management

## Google Analytics ##

Always good to have visibility on the engagement, activated the GA plugin and setup the tracking.

This still needs some work in this part.

## Conclusion ##

In this article I've been through the options I did to setup databoost.dev a forum for Data Professionals. The hosting and other SaaS options used to achieve a "zero" cost option.

Feel free to join and support us.

## References ##

* <https://databoost.dev>
* <https://nodebb.org>
* <https://app.mailjet.com>
* <https://analytics.google.com>
* <https://www.cloudflare.com>
