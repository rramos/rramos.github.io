---
title: markdownlint
date: "2024-06-01T18:00:00+00:00"
lang: en
tags:
  - Markdown
  - CI/CD
---

Article about Markdown lint

## Intro ##

When producing the contents of this blog I' m generating Markdown files and then letting the [Hexo](https://hexo.io/) framework generate the html static files. However I'm very lazy and need to improve the both the grammar of the articles and the Markdown format.

In this article I will explain how to setup a git pre-hook to validate the Markdown format, oh! and fix all the issues on pre existing articles.

## What is Markdownlint ##

A tool to check markdown files and flag style issues.

* <https://github.com/markdownlint/markdownlint>

## How to check issues locally ##

You can use a docker run on a given path like the following example

```sh
docker run --rm -v ${PWD}:/data markdownlint/markdownlint source
```

or run directly the `mdl` command.

You may check the available rules [here](https://github.com/markdownlint/markdownlint/blob/main/docs/RULES.md).

For Hexo in particular I add metadata which does not comply with some of the rules such as MD002,MD013 and MD032, the same applies for line length as the data will be converted to HTML, I would skip some of the tests and would run like:

```sh
mdl -r ~MD002,~MD013,~MD032,~MD005,~MD009 source
```

## How to fix the issues ##

You can install markdownlint on your IDE eg for vscode **markdownlint** and fix based on the hints.

## Configure git pre-hook ##

Now let's configure a git pre-commit hook to validate Markdown lint before we commit.

### pre-commit install ###

In order to test this without committing there is a nice python tool that you can use

```bash
sudo pacman -S python-pre-commit
```

If you are using a different distribution you might just need to :

```bash
pip install pre-commit
```

Also make sure you have `markdownlint` installed unless you want to use the docker version.

**NOTE:** If that is the case you need to change the id to `id: markdownlint-docker` on the following file

Create the following file `.pre-commit-config.yaml` with the content

```yaml
# See https://pre-commit.com for more information
# See https://pre-commit.com/hooks.html for more hooks
repos:
-   repo: https://github.com/igorshubovych/markdownlint-cli
    rev: v0.41.0    
    hooks:
    -   id: markdownlint
        args: [ --disable=MD013, --disable=MD002,--disable=MD032,--disable=MD005,--disable=MD009 ]
```

Then execute the following command

```sh
pre-commit install
```

This will install the hook configuration. Check the [documentation page](https://pre-commit.com/hooks) as there are several hooks that might be useful.

You can now test if the tests are passing before committing

```sh
pre-commit run --all-files
```

If you get something similar you are good to go.

```text
$ pre-commit run --all-files
markdownlint.............................................................Passed
```

### Exit codes ###

markdownlint-cli returns one of the following exit codes:

0: Program ran successfully
1: Linting errors
2: Unable to write -o/--output output file
3: Unable to load -r/--rules custom rule
4: Unexpected error (e.g. malformed config)

You are now ready to commit with a pre-hook that checks MD lint

## Conclusion ##

Pre-hooks are very valuable as they can automate, enhance your commit, crosscheck business rules, lint, grammar or formatting in order to guarantee that your commit will bring the best value as possible. There are lots of hooks available check them out. pre-commit command is useful as would allow you to test all those scripts before doing the changes on the repo.

## References ##

* <https://github.com/markdownlint/markdownlint/tree/main>
* <https://pre-commit.com/hooks>
* <https://pre-commit.com/>
