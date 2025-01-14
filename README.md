
# Source repo for [rramos.github.io](https://rramos.github.io/) blog

This repo contains the source data for the GitHub pages of rramos.github.io

# Install

```bash
git clone --recursive -j8 git@github.com:rramos/rramos.github.io.src.git
```

# Requirements

You will need hugo to deploy this.

# How to generate new page updates

```bash
hugo build
```

# Test locally

```bash
hugo server
```

If one wants to test the draft articles before publishing should test locally with

```bash
hugo server --buildDrafts
```

# How to deploy

Just commit the changes and github actions will deploy the content

# Blowfish tool

In order to change blowfish configuration run

```bash
npx blowfish-tools
```