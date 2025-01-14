---
title: Artifactory Setup
date: "2022-12-23T22:00:00+00:00"
lang: en
tags:
  - Docker
  - Nuget
  - Package Management
  - CI/CD
---

In this article i will describe how to setup a docker environment to have a JFrog Artifactory locally

## Intro ##

In this article i will describe how to setup a docker environment to have a JFrog Artifactory local solution.

## Objective ##

The main objective of this walkthrough is to have a local repository to manage packages such as Nugets, jars, rpms, etc.

Could be useful to test CI/CD pipelines also.

## Versions ##

Artifactory has several versions. It is recommend to use a Professional edition for productivity workloads. For this article we consider the OSS version

## Requirements ##

For this setup one should have:

* docker
* docker-compose

## Installation ##

Obtain the docker-compose image

```sh
https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/oss/docker/jfrog-artifactory-oss/7.12.10/jfrog-artifactory-oss-7.12.10-compose.tar.gz
```

**NOTE:** Check the latest version on the official [website](https://jfrog.com/download-jfrog-platform/).

Extract the tarball

Run the `config.sh` with privileges to setup your folder with the proper permissions.

In my case i also installed the PostgreSQL service.

One should have an output similar to this one

```text
Beginning JFrog Artifactory setup


Validating System requirements

Installation Directory (Default: /root/.jfrog/artifactory): /home/rramos/Development/github/dockers/docker-artifactory/data

Running system diagnostics checks, logs can be found at [/home/rramos/Development/github/dockers/docker-artifactory/artifactory-oss-7.12.10/systemDiagnostics.log]

Triggering migration script. This will migrate if needed and may take some time.

Migration logs will be available at [/home/rramos/Development/github/dockers/docker-artifactory/artifactory-oss-7.12.10/bin/migration.log]. The file will be archived at [/home/rramos/Development/github/dockers/docker-artifactory/data/var/log] after installation

For IPv6 address, enclose value within square brackets as follows : [<ipv6_address>]
Please specify the IP address of this machine (Default: 127.0.1.1):

Are you adding an additional node to an existing product cluster? [y/N]: N

The installer can install a PostgreSQL database, or you can connect to an existing compatible PostgreSQL database
(https://service.jfrog.org/installer/System+Requirements#SystemRequirements-RequirementsMatrix)
If you are upgrading from an existing installation, select N if you have externalized PostgreSQL, select Y if not.
Do you want to install PostgreSQL? [Y/n]: Y

To setup PostgreSQL, please enter a password
database password:

confirm database password:

Creating third party directories (if necessary)

Attempting to seed PostgreSQL. This may take some time.

Successfully seeded PostgreSQL

Docker setup complete

Installation directory: [/home/rramos/Development/github/dockers/docker-artifactory/data] contains data and configurations.

Use docker-compose commands to start the application. Once the application has started, it can be accessed at [http://127.0.1.1:8082]

Examples:
cd /home/rramos/Development/github/dockers/docker-artifactory/artifactory-oss-7.12.10


start postgresql:    docker-compose -p rt-postgres -f docker-compose-postgres.yaml up -d
start:               docker-compose -p rt up -d
stop:                docker-compose -p rt down

NOTE: The compose file uses several environment variables from the .env file. Remember to run from within the [/home/rramos/Development/github/dockers/docker-artifactory/artifactory-oss-7.12.10] folder

Done
```

At the end of the process the postgres container is still up. I would suggest killing it as we are going to setup the docker-compose setup for it.

```bash
# docker ps
CONTAINER ID   IMAGE                                    COMMAND                  CREATED              STATUS              PORTS                                       NAMES
77bbf3150642   docker.bintray.io/postgres:12.5-alpine   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgresql
```

Killing the containers

```bash
docker kill 77bbf3150642
docker container prune
```

**NOTE:** Attention don't run the prune command if you want to keep other containers running.

## Post Install ##

During the setup I've selected the following path

```sh
/home/rramos/Development/github/dockers/docker-artifactory/data
```

However there are some adjustments required for the services to reach the containers which will be on the same network and need to be adjusted.

Following this setup you should now have on your current dir `data` and `artifactory-oss-7.12.10` folder.

Create the following file template docker file that starts all the components

```bash
cp artifactory-oss-7.12.10/templates/docker-compose-all.yaml  docker-compose.yaml
```

And replace the line

```env
POSTGRES_PASSWORD=${PG_PASS}
```

Let's include that var on the env file.

```bash
cp artifactory-oss-7.12.10/.env .
```

Add the password you defined for postgres on `.env` file.

```env
PG_PASS=V3ry$$scurePasssW0rd
```

Let's spin up the application

```bash
docker-compose up -d
```

If you start getting some issues regarding DB connection issues there is a final step.

Stop all the containers

```bash
docker-compose down
```

Edit the file `./data/var/data/nginx/conf.d/artifactory.conf` and replace `localhost` references with `artifactory`

**NOTE:** You may need sudo permission to change those files

Also edit the file `./data/var/etc/system.yaml`

Making sure the DB `url` is like:

```bash
url: jdbc:postgresql://postgres:5432/artifactory
```

Now let's restart the containers

```bash
docker-compose up -d
```

And access on the following url: `http://localhost:8081/artifactory/`

The default user/password is `admin`/`password`

Now it's time to explore ...

## Conclusion ##

There are several ways to setup Artictory depending on your environment. If you want to use for local developments it may not payoff due to the limitation of the oss version. One cannot manage Nuget packages for instance and require an pro version. As that was may principal objective i didn't explore more the tool.

Also include the docker-compose setting on my dockers [repo](https://github.com/rramos/dockers)

## References ##

* <https://www.jfrog.com/confluence/display/JFROG/Installing+Artifactory>
* <https://www.jfrog.com/confluence/display/JFROG/NuGet+Repositories>
