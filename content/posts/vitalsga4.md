---
title: Web Vitals
date: "2024-06-12T14:20:00+00:00"
lang: en
tags:
  - Metrics
  - Web Performance
---

In this article I will go through Google Web Vitals

## Intro ##

Web Vitals is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

## Core Web Vitals ##

Site owners shouldn't have to be performance experts to understand the quality of experience they are delivering to their users. The Web Vitals initiative aims to simplify the landscape, and help sites focus on the metrics that matter most, the Core Web Vitals.

Core Web Vitals are the subset of Web Vitals that apply to all web pages, should be measured by all site owners, and will be surfaced across all Google tools. Each of the Core Web Vitals represents a distinct facet of the user experience, is measurable in the field, and reflects the real-world experience of a critical user-centric outcome.

### Largest Contentful Paint (LCP) ###

Measures loading performance. To provide a good user experience, LCP should occur within **2.5 seconds** of when the page first starts loading.

More info: [here](https://web.dev/articles/lcp)

### Interaction to Next Paint (INP) ###

Measures interactivity. To provide a good user experience, pages should have a INP of **200 milliseconds** or less.

More info: [here](https://web.dev/articles/inp)  

### Cumulative Layout Shift (CLS) ###

Measures visual stability. To provide a good user experience, pages should maintain a CLS of **0.1. or less**.

More info: [here](https://web.dev/articles/cls)

To ensure you're hitting the recommended target for these metrics for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.

## Tools ##

Google believes that the Core Web Vitals are critical to all web experiences. As a result, it is committed to surfacing these metrics in all of its [popular tools](https://web.dev/articles/vitals-tools).

* <https://developer.chrome.com/docs/lighthouse/overview>
* <https://developer.chrome.com/docs/crux>
* <https://pagespeed.web.dev>
* <https://search.google.com/search-console/about>

## lighthouse ##

You can use lighthouse by installing a [google chrome extension](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) or running the following command.

```sh
npm install -g lighthouse
```

And then running your validation example:

```sh
lighthouse https://rramos.github.io/ --view
```

This will pop-up a browser to make the required tests and the `--view` option to directly open the report.

## Conclusion ##

In this article we went through web vitals metrics to assess the quality of a website according to Google metrics LCP, INP and CLS. Also provided a list of support tools to debug those values for a given website.

## Reference ##

* <https://web.dev/articles/vitals-ga4>
* <https://developer.chrome.com/docs/lighthouse>
* <https://developer.chrome.com/docs/crux>
* <https://pagespeed.web.dev>
* <https://search.google.com/search-console/about>
