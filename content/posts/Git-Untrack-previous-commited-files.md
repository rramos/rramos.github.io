---
title: Git Untrack previous committed files
date: "2021-02-21T11:07:00+00:00"
lang: en
tags:
  - Git
---

This article is about git and untrack committed files

## Intro ##

This is something that sometimes bugs me, you keep hitting the `.gitinore` configuration file but still the file you try to ignore always gets referenced on your changes.

If that happens most probably you've reference it in the past to be track and you need to remove it, so this are the steps.

## Update your .gitignore and untrack the file ##

This example to untrack `db.json`

1. Change the entry in .gitignore ex: `*.json`

1. Execute the following command to untrack

```bash
git update-index --assume-unchanged db.json
```

1. Commit the changes
