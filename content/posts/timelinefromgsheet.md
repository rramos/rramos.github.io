---
title: Timeline
date: "2024-06-15T20:00:00+00:00"
lang: en
tags:
  - Frontend
  - Utils
---

In this article I will go through a method that would allow you to incorporate a nice timeline on your website managing the entries from a google sheet.

## Intro ##

In this article I will go through a method that would allow you to incorporate a nice timeline on your website managing the entries from a google sheet.

## Requirements ##

* This method implies that you would include a `iframe` on your html to render the timeline
* You will need Knightlab timeline javascript
* You will need to share GoogleSheet with your data so this method doesn't work for private data

## Demo ##

The final result would be a interactive timeline similar to the following.

{% iframe https://timeline.knightlab.com/examples/user-interface/index.html 100% 800px %}

## Hexo ##

If you use Hexo you will need to include the following tag for iframes:

```html
{% iframe <src-url> <width> <height> %}
```

## Setup ##

### Data Source ###

1. **Prepare the data**: Start by configuring your Googlesheet with data by making a copy of the following [Template](https://docs.google.com/spreadsheets/d/1pHBvXN7nmGkiG8uQSUB82eNlnL8xHu6kydzH_-eguHQ/template/preview). You could check the following example to have a better idea on the final process.

1. **Publish the Gsheet**: Under the File menu, Share submenu, select “Publish to the Web.”

1.**Create a iframe with your source**: Create a `iframe` similar to the following example where the source is after ```https://docs.google.com/spreadsheets/d/```

```html
<iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk&font=Default&lang=en&initial_zoom=2&height=100%" width="100%" frameborder="0"></iframe>
```

> **Note**: Pay attention to date formats and the sharing options. The following [URL](https://timeline.knightlab.com/#make-step-2) has more details in case you bumped into trouble.

## Conclusion ##

In this article, we guide you through the process of configuring an iframe with a dynamic timeline using JavaScript, which loads data from a Google Sheet implemented by Knight Lab. This straightforward process will help you enrich your content by presenting timeline data effectively.

## References ##

* <https://timeline.knightlab.com/docs/using-spreadsheets.html>
* <https://timeline.knightlab.com/#make-step-2>
* [Gsheet Template](https://docs.google.com/spreadsheets/d/1pHBvXN7nmGkiG8uQSUB82eNlnL8xHu6kydzH_-eguHQ/template/preview)
