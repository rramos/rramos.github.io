---
title: Redpanda
date: "2024-02-14T12:00:00+00:00"
lang: en
tags:
  - Streaming
---

In this article I'll go through the Redpanda quickstart guide

## Intro ##

In this article I'll go through the Redpanda quickstart guide.
Spinning up a Redpanda cluster in Docker to evaluate in Linux

## Requirements ##

Make sure you have `docker` and `docker-compose`

## Setup ##

For lightweight testing, we are going to start a single Redpanda broker.

Create the following `docker-compose.yml` file with the content:

```yaml
version: "3.7"
name: redpanda-quickstart
networks:
  redpanda_network:
    driver: bridge
volumes:
  redpanda-0: null
services:
  redpanda-0:
    command:
      - redpanda
      - start
      - --kafka-addr internal://0.0.0.0:9092,external://0.0.0.0:19092
      # Address the broker advertises to clients that connect to the Kafka API.
      # Use the internal addresses to connect to the Redpanda brokers'
      # from inside the same Docker network.
      # Use the external addresses to connect to the Redpanda brokers'
      # from outside the Docker network.
      - --advertise-kafka-addr internal://redpanda-0:9092,external://localhost:19092
      - --pandaproxy-addr internal://0.0.0.0:8082,external://0.0.0.0:18082
      # Address the broker advertises to clients that connect to the HTTP Proxy.
      - --advertise-pandaproxy-addr internal://redpanda-0:8082,external://localhost:18082
      - --schema-registry-addr internal://0.0.0.0:8081,external://0.0.0.0:18081
      # Redpanda brokers use the RPC API to communicate with each other internally.
      - --rpc-addr redpanda-0:33145
      - --advertise-rpc-addr redpanda-0:33145
      # Tells Seastar (the framework Redpanda uses under the hood) to use 1 core on the system.
      - --smp 1
      # The amount of memory to make available to Redpanda.
      - --memory 1G
      # Mode dev-container uses well-known configuration properties for development in containers.
      - --mode dev-container
      # enable logs for debugging.
      - --default-log-level=debug
    image: docker.redpanda.com/redpandadata/redpanda:v23.3.5
    container_name: redpanda-0
    volumes:
      - redpanda-0:/var/lib/redpanda/data
    networks:
      - redpanda_network
    ports:
      - 18081:18081
      - 18082:18082
      - 19092:19092
      - 19644:9644
  console:
    container_name: redpanda-console
    image: docker.redpanda.com/redpandadata/console:v2.4.3
    networks:
      - redpanda_network
    entrypoint: /bin/sh
    command: -c 'echo "$$CONSOLE_CONFIG_FILE" > /tmp/config.yml; /app/console'
    environment:
      CONFIG_FILEPATH: /tmp/config.yml
      CONSOLE_CONFIG_FILE: |
        kafka:
          brokers: ["redpanda-0:9092"]
          schemaRegistry:
            enabled: true
            urls: ["http://redpanda-0:8081"]
        redpanda:
          adminApi:
            enabled: true
            urls: ["http://redpanda-0:9644"]
    ports:
      - 8080:8080
    depends_on:
      - redpanda-0
```

And start the execution with `docker-compose up -d`

### Start Streaming ###

Let's use the `rpk` command-line tool to create a topic, produce messages to it, and consume messages.

Get information about the cluster with the command

```bash
docker exec -it redpanda-0 rpk cluster info
```

Now lets create a topic called **chat-room**:

```bash
docker exec -it redpanda-0 rpk topic create chat-room
```

Producing messages for that topic

```bash
docker exec -it redpanda-0 rpk topic produce chat-room
```

Consuming one message from the topic

```bash
docker exec -it redpanda-0 rpk topic consume chat-room --num 1
```

You can install `rpk` on your system directly and connect with the broker

```bash
curl -LO https://github.com/redpanda-data/redpanda/releases/latest/download/rpk-linux-amd64.zip
```

Then unzip the file and put the rpk binary on bin path ex: `unzip rpk-linux-amd64.zip -d ~/.local/bin/`

You can test the connection to your broker with:

```bash
rpk cluster info -X brokers=127.0.0.1:19092
```

### Generating Mock Data ###

Let's use the following command from our references to product mock data.

Leave one terminal open with the following command

```bash
rpk topic consume Products -X brokers=127.0.0.1:19092
```

On a different terminal create the following file `schema.avsc`

```json
{
  "type": "record",
  "name": "Products",
  "namespace": "exp.products.v1",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "productId", "type": ["null", "string"] },
    { "name": "title", "type": "string" },
    { "name": "price", "type": "int" },
    { "name": "isLimited", "type": "boolean" },
    { "name": "sizes", "type": ["null", "string"], "default": null },
    { "name": "ownerIds", "type": { "type": "array", "items": "string" } }
  ]
}
```

Make sure to install datagen

```bash
npm install -g @materializeinc/datagen
```

Create the following `.env` file

```conf
# Kafka Brokers
KAFKA_BROKERS=localhost:19092

# For Kafka SASL Authentication:
SASL_USERNAME=
SASL_PASSWORD=
SASL_MECHANISM=

# For Kafka SSL Authentication:
SSL_CA_LOCATION=
SSL_CERT_LOCATION=
SSL_KEY_LOCATION=

# Connect to Schema Registry if using '--format avro'
SCHEMA_REGISTRY_URL=
SCHEMA_REGISTRY_USERNAME=
SCHEMA_REGISTRY_PASSWORD=
```

Then execute the following command

```bash
datagen -s schema.avsc -n 10
```

And you just generated mock data based on the provided json file.
Take a look on the following repo for more details on datagen.

* <https://github.com/MaterializeInc/datagen.git>

## Conclusion ##

Redpanda provides a very quick alternative to have a quick kafka environment, which is especially good for developers. This article didn't go deep on performance evaluations of Kafka vs Redpanda but their benchmarks worth assessing if that means reducing your kafka footprint.

Probably would let that for another article. Also I would like to test the SASL options and schema register option.

## References ##

* <https://redpanda.com/>
* <https://docs.redpanda.com/current/get-started/quick-start/>
* <https://github.com/MaterializeInc/datagen.git>
