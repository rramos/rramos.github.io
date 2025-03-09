---
title: Hugo consent
date: '2025-03-09T15:00:00+00:00'
lang: en
draft: true
tags:
    - Webhosting
    - Hugo
---

In order for websites to be compliant with GDPR it is required to have a way to manage all non-functional third party cookies. The following document describes how to configure [Hugo Framework](https://hugocodex.org) to manage that.

## Requirements ##

In order to setup this Add-on you should have a functional Hugo website

## How it works ## 

> The code inserts a consent banner at the bottom of the screen. When you click ‘Deny’, ‘Allow’, ‘Allow all’ or ‘Save preferences’ it creates a cookie that is valid for 31 days. Each page load the code checks for the existence of this cookie. If it exists, it will check which scripts are allowed. If it does not exist, the page will only load the functional scripts. Scripts are managed in a ‘consent.yaml’ file in the data directory. 

## Installation ##

* **Step 1**. Download the `consent.yaml` file and adjust it to your needs
* **Step 2**. Store it in the `data` directory of your project
* **Step 3**. Make sure the script files live in your `static/js` folder
* **Step 4**. Download the file `consent.html`
* **Step 5**. Save the file in the `layouts/partials` directory of your project
* **Step 6**. Make sure the bottom of your layout document looks like this:

```html
...
{{ partial "consent.html" . }}
</body>
</html>
```

### consent.yaml ###

The following example `consent.yaml` show two third party examples

```yaml
items:
  - title: Google Analytics (functional)
    description: This code gives us insight into the number of people that visit our website, where they are from and what they are clicking on. We follow the guidelines of the Dutch Government, which describe how to use Google Analytics without requiring explicit consent.
    is_functional: true
    script_file: ga.js
  - title: Crisp chat
    description: This code gives users the option to chat directly with us through a chat box in the bottom right corner. Visitor data will (also) be sent to Crisp.
    is_functional: false
    script_file: crisp.js
```

## References ##

* <https://hugocodex.org>
* <https://hugocodex.org/add-ons/cookie-consent>
* <>
