---
title: meltano
date: "2024-12-26T15:00:00+00:00"
lang: en
tags:
    - ETL
    - Data Engineering
---

Meltano is a declarative data integration engine,

## Intro ##

While Meltano is a declarative data integration engine, made for building data-powered features fast, one of the use cases has always been to use Meltano as an ELT platform.

## Features ##

* Meltano HUB as more than 600 connectors
* Largest connector library of any EL tool
* Modify connectors to your liking
* In-flight filtering and hashing of PII
* Detailed pipeline logs and alerting
* Open source and cloud-agnostic

## Installation ##

### Setup python environment ###

Configure a Python 3.11 environment and activate it

```sh
pyenv install 3.11
pyenv virtualenv 3.11 meltano
export PIP_REQUIRE_VIRTUALENV=true
pyenv activate meltano
```

For this option one needs to have pipx.

```sh
pipx install meltano
```

You should get something like

```sh
  installed package meltano 3.4.2, installed using Python 3.12.4
  These apps are now globally available
    - meltano
done! ✨ 🌟 ✨

```

You can check if meltano is working by executing `meltano --version` and get the version.

## Testing ##

We're going to take data from a "source", namely GitHub, and extract a list of commits to one repository.

### Create your Meltano Project ###

We need to initiative the project where we register the plugins and details of the pipelines.

```sh
meltano init meltano
```

You will get something similar

```sh
Creating .meltano folder
created .meltano in /home/rramos/Development/local/meltano-test/meltano/.meltano
Creating project files...
  meltano/
   |-- meltano.yml
   |-- README.md
   |-- requirements.txt
   |-- output/.gitignore
   |-- .gitignore
   |-- extract/.gitkeep
   |-- load/.gitkeep
   |-- transform/.gitkeep
   |-- analyze/.gitkeep
   |-- notebook/.gitkeep
   |-- orchestrate/.gitkeep
Creating system database...  Done!

Your project has been created!

Meltano Environments initialized with dev, staging, and prod.
To learn more about Environments visit: https://docs.meltano.com/concepts/environments

Next steps:
  cd meltano
  Visit https://docs.meltano.com/getting-started/part1 to learn where to go from here
```

#### Add an Extractor ####

Now lets add a plugin to extract data from Github.

```sh

pipx install git+https://github.com/MeltanoLabs/tap-github.git
```

We need to configure the plugin we are going to use the interactive mode

```sh
meltano config tap-github set --interactive
```

* Update the value for the github auth token
* Update the value of the start_date
* Update the value of the repositories to consider

One can execute the following command to validate the plugin configuration `meltano config tap-github`.

#### Select Data to Extract ####

Now that the extractor has been configured we need to select which attributes to consider on the extraction

```sh
meltano select tap-github commits url
meltano select tap-github commits sha
meltano select tap-github commits commit_timestamp
```

This will add on `meltano.yml` the attributes to consider

#### Dummy Loader ####

Next lets add a dummy loader to dump the data into JSON

```sh
meltano add loader target-jsonl --variant=andyh1203
```

This target requires zero configuration, it just outputs the data into a jsonl file.

## Conclusion ##

My initial impression is that the setup is quite messy and difficult to manage, especially when handling different Python versions. Each plugin may only be supported on a specific version, making it challenging to ensure compatibility across packages. This setup clearly requires some significant improvements.

## References ##

* <https://meltano.com>
* <https://docs.meltano.com/getting-started/installation>
