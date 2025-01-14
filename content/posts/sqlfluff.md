---
title: SQLfluff
date: "2024-06-02T02:00:00+00:00"
lang: en
tags:
  - SQL
  - Software Development
---

In this article we are going to check SQLfluff a dialect-flexible and configurable SQL linter.

## Intro ##

SQLFluff is a dialect-flexible and configurable SQL linter. Designed with ELT applications in mind, SQLFluff also works with Jinja templating and dbt. SQLFluff will auto-fix most linting errors, allowing you to focus your time on what matters.

## Visual Code LINT ##

Visual Code allows the integration of this tool with the following extension.

* <https://marketplace.visualstudio.com/items?itemName=dorzey.vscode-sqlfluff>.

The extension expects `sqlfluff` to be installed and already added to the path. If it is installed but cannot be found, add the path to your preferences as seen below. Find the path by typing which sqlfluff into your terminal.

## Install SQlFluff ##

Install sqlfluff locally in Arch with the following command

```sh
sudo pacman -S sqlfluff
```

## Test locally ##

Let's create a sample sql file.

```sh
echo "  SELECT a  +  b FROM tbl;  " > test.sql
```

Now validate with ANSI dialect with the command

```sh
sqlfluff lint test.sql --dialect ansi
```

One can fix the file with the following:

```sh
sqlfluff fix test.sql --dialect ansi
```

## Pre-commit Hook ##

Following the previous [article](https://rramos.github.io/2024/06/01/markdownlint/) regarding Markdown Lint one can use the following [example](https://github.com/sqlfluff/sqlfluff/blob/main/.pre-commit-config.yaml) to configure a hook to validate SQL lint for a given dialect.

## Conclusion ##

SQLFluff is a very interesting tool to make sure all your team follow the same styling pattern when producing SQL code.
Choose the corresponding dialect and make sure to integrate this tool as a pre-hook on your code repository.

## References ##

* <https://marketplace.visualstudio.com/items?itemName=dorzey.vscode-sqlfluff>
* <https://github.com/sqlfluff/sqlfluff>
* <https://github.com/sqlfluff/sqlfluff/blob/main/.pre-commit-config.yaml>
