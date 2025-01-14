---
title: git-cliff
date: "2024-06-07T11:00:00+00:00"
lang: en
tags:
  - Git
  - CI/CD
  - Utils
---
## Intro ##

In this article I will go through integrating git cliff to automated a change log generation report

## What is git-cliff ##

git-cliff can generate changelog files from the Git history by utilizing conventional commits as well as regex-powered custom parsers.

## Setup ##

Install with cargo

```sh
cargo install git-cliff
```

Initialize with the following command

```sh
git cliff --init
```

It will create a `cliff.toml` file with the configurations that should be used.

Let's generate a changelog

```sh
git cliff -o CHANGELOG.md
```

## Customization ##

The tool allows several customizations that you can configure on the toml file, like skipping commits, multirepos, emojies.

Check the [example section](https://git-cliff.org/docs/templating/examples) for more details

## Integrations ##

Now what you would like to do is integrate this application on your CI/CD process and not having your developers to worry on generating the CHANGELOG file the following section provide several examples based on your source control system

* <https://git-cliff.org/docs/category/integration>

Providing one example with [Github Actions](https://git-cliff.org/docs/github-actions/git-cliff-action)

```yaml
- name: Check out repository
  uses: actions/checkout@v3
  with:
    fetch-depth: 0

- name: Generate a changelog
  uses: orhun/git-cliff-action@v3
  with:
    config: cliff.toml
    args: --verbose
  env:
    OUTPUT: CHANGELOG.md
    GITHUB_REPO: ${{ github.repository }}
```

## Conclusion ##

Git-cliff is highly customizable and has a low footprint, making it an excellent choice for incorporating into a CI/CD process to automatically generate a CHANGELOG for a source control repository. To ensure consistency in how developers record changes and apply tags, I recommend defining clear guidelines for pre-commit hooks. This will streamline the automation process. Additionally, thoroughly test various configurations before finalizing your toml configuration.

## References ##

* <https://git-cliff.org/>
* <https://git-cliff.org/docs/github-actions/git-cliff-action>
