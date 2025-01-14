---
title: Portainer
date: "2017-09-23T17:22:00+00:00"
lang: en
tags:
  - Docker
  - Utils
---

This article is about Portainer a docker UI manager solution

## Intro ##

[Portainer](https://portainer.io/) is:

> PORTAINER IS AN OPEN-SOURCE LIGHTWEIGHT MANAGEMENT UI WHICH ALLOWS YOU TO EASILY MANAGE YOUR DOCKER HOSTS OR SWARM CLUSTERS

In order to manage the dockers where it is running one should pass the following option

```bash
sudo docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```

## Snapshot ##

![Portainer.io](/images/portainer.io.png)

## Setup ##

Create the following `docker-compose.yml` file

```yaml
version: '2'
services:
  portainer:
    restart: always
    ports:
     - "9000:9000"
    volumes:
     - ./data:/opt/data
     - /var/run/docker.sock:/var/run/docker.sock
    image: "portainer/portainer"

```

and execute `docker-compose up -d`

You can then access the interface at: <http://localhost:9000>

Cheers,
RR
