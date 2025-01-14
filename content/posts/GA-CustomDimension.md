---
title: How to Create a Google Analytics Custom Dimension
date: "2017-09-07T20:37:00+00:00"
lang: en
tags:
  - Google Analytics
  - Analytics
  - Metrics
  - Dimensions
---

This article explains how to create GA custom dimensions

## Intro ##

In order to add a custom dimension in Google Analytics follow this steps:

1. Click **admin** and navigate to the property you which to add a custom dimension

![Custom Dimension (step 1)](/images/Custom_Dimension.png)

1. Click new **Custom Dimension**

1. Give it a **Name** and a **Scope** and you'l get the javascript to add on your website

![Custom Dimension (step 2)](/images/GA_CustomDimension_js.png)

1. After you should modify your tracking code adding for example

```javascript
ga('send', 'pageview', {
  'dimension1':  'My Custom Dimension'
});
```

## When we should use this ##

Let's say your website does some sort of user classification, you can create a CustomDimension ex: `UserCategory` and send enrich the data you track.
