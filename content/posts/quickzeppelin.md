---
title: Quick Setup Zeppelin Notebook
date: "2017-09-19T22:06:00+00:00"
lang: en
tags:
  - Zeepelin
  - Scala
  - Docker
  - Spark
---

In this article i describe a quick way to have zeepelin running locally

## Intro ##

In this article i describe a quick way to have zeepelin running so that you could quickly testing some Spark application.

**NOTE:** This procedure shouldn't be used in production environments has you should setup the Notebook with auth and connected to your local infrastructure.

## Requirements ##

* One should have a docker environment setup. Check my previous {% post_link dockerclean article %} if you need some help with that
* [Docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-14-04)

## Setup ##

1. Create a folder named zeepelin

```bash
mkdir docker-zeepelin
```

1. Create a `data` where you could put some data to analyse.

```bash
mkdir -p docker-zeepelin/data
```

1. Create the following `docker-compose.yml` file in dir `docker-zeepelin` :

```yaml
version: '2'
services:
  zeppelin:
    ports:
     - "8080:8080"
    volumes:
     - ./data:/opt/data
    image: "dylanmei/zeppelin"

```

1. Launch docker-compose

```bash
sudo docker-compose up -d
```

1. That's it you should now be able to access <http://localhost:8080>

## Test it ##

1. Lets download a demo file to our `data` dir.

```bash
curl -s https://api.opendota.com/api/publicMatches -o ./data/OpenDotaPublic.json
```

Yeah! I kinda like [Dota2](https://www.dota2.com/home) so this makes sense :D

1. Create a new NoteBook in the web Interface and use the following code

```scala
%spark

val df = sqlContext.read.json("file:///opt/data/OpenDotaPublic.json")
df.show
```

Hit: **Shift-Enter**

1. Let's register this dataframe as temp table and create some visuals

```scala
%spark
df.registerTempTable("publicmatches")
```

1. Create the following to generate visualizations

```sql
%sql
select radiant_win,match_id
 from publicmatches
```

![PieChart](/images/radiant_win.png)

Guess i need to start playing on Radiant side :D

Well and that's it.

Cheers,
RR

## References ##

* <https://zeppelin.apache.org/docs/0.5.5-incubating/tutorial/tutorial.html>
* <https://hortonworks.com/tutorial/getting-started-with-apache-zeppelin/>
* <https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04>
* <https://docs.docker.com/compose>
* <https://zeppelin.apache.org/>
