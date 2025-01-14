---
title: Create a patch with git
date: "2024-12-01T12:30:00+00:00"
lang: en
tags:
  - git
  - Development
---

Quick way to create a patch with git from two different branches

## Intro ##

In order to get a patch from the diff between `master` and `foo` branches one could use the following:

### Generate the Patch ###

```sh
git diff --no-color --binary master foo > /tmp/patch
```

### Apply changes ###

To later apply the patch:

```sh
git apply /tmp/patch
```

### Changes within the same branch ###

If you don't have dedicated branches with the changes and all are on the same branch you can just execute

```sh
git diff --no-color --binary > /tmp/patch
```

> **NOTE:** `--no-color` ensures the diff is valid to apply if you have automatic coloring on, `--binary` ensures binary files are handled correctly as well.

## References ##

* <https://www.karltarvas.com/git-get-a-patch-between-two-branches>
* <https://git-scm.com/docs/diff-generate-patch>
