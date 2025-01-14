---
title: clasp
date: "2024-06-03T18:00:00+00:00"
lang: en
tags:
  - Automation
  - GSuite
---

In this article I will go through clasp, a way to develop App Scripts locally

## Intro ##

In this article I will go through clasp, a way to develop [App Scripts](https://developers.google.com/apps-script) locally and provide some example labs on how to take advantage of this scripts to automate your daily routines.

## AppScripts ##

Apps Script is a cloud-based JavaScript platform that lets you integrate with and automate tasks across Google products.

## Requirements ##

You need to use a node version compatible with the spec in `package.json`.

```json
"node": "^12.20.0 || ^14.13.1 || >=16.0.0"
```

**NOTE:** Recent node versions would give you a warning regarding punycode `[DEP0040] DeprecationWarning: The punycode module is deprecated. Please use a  userland alternative instead.` If that is the case use a lower node version.

## Installation ##

```sh
npm install -g @google/clasp
```

Then enable the Google Apps Script API: <https://script.google.com/home/usersettings>

## Login ##

The first step would go though login.

```sh
clasp login
```

This command will open a login page with OAuth and save the credential token on the following file `.clasprc.json`

This point on you can start implementing your scripts.

## Codelab ##

The following URL provide a useful Codelab where you will create a repository and manage versions:

* <https://codelabs.developers.google.com/codelabs/clasp>

## Samples ##

The following repo provide several samples that you can use or extend:

* <https://github.com/googleworkspace/apps-script-samples>

## Codelab : Gsheet Fundamentals ##

The following URL provides a Codelab to extend functionality on a GSheet, fetching data from a public API and including Menu items.

* <https://developers.google.com/codelabs/apps-script-fundamentals-3>

## ChatGPT ##

As most of the scripts that one will like to run are not complex, you may find what you are looking for through OpenAPI. I've been haviong good results with it and would advise to explore that path.

## Conclusion ##

App Scripts are valuable tools for automating actions with your GSuite services. They offer a time-saving option for managing repetitive tasks. By using clasp, you can control your changes, test locally, and share your scripts with other team members efficiently.

## References ##

* <https://github.com/google/clasp>
* <https://developers.google.com/apps-script>
* <https://codelabs.developers.google.com/codelabs/clasp>
* <https://github.com/googleworkspace/apps-script-samples>
* <https://developers.google.com/codelabs/apps-script-fundamentals-3>
* <https://developers.google.com/apps-script/guides/slides>
* <https://spreadsheet.dev/generate-google-slides-from-google-sheets>
