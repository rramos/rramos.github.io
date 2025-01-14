---
title: dog
date: "2024-07-02T15:00:00+00:00"
lang: en
tags:
  - Infrastructure
  - DNS
---

TBD

## Intro ##

dog is an open-source DNS client for the command-line. It has colorful output, supports the DoT and DoH protocols, and can emit JSON.

## Features ##

dog supports the new DNS-over-TLS and DNS-over-HTTPS protocols.

## Install ##

It will depend on your distribution for Arch I'm using the traditional pacman command.

```sh
sudo pacman -S dog
```

## Using ##

### Sending queries ###

To send DNS queries, just pass in the domain you want to query as a command-line argument.

By default, dog will request A records.

```sh
dog example.com
```

### Specifying record types ###

You can request other types of record, such as MX or AAAA, by including an all-caps argument.

```sh
dog example.com MX
```

### Specifying nameservers ###

You can specify which DNS server the request should be sent to by prefixing an argument with the “@” character.

```sh
dog example.com @8.8.4.4
```

### Sending queries over TCP ###

Using the UDP transport is the default behavior. To send packets over TCP, instead of UDP, pass the `-T` or `--tcp` command-line options.

```sh
dog example.com --tcp
```

One downside of using UDP is that its packets are limited to 4,096 bytes. This is not usually a problem, as a normal response will be hundreds of bytes at most. However, large responses, such as those containing multiple DNSSEC keys, will reach the limit and will not be able to be sent over UDP.

By default, dog will detect if this is happening — a DNS server will send an error response indicating the payload is too large — and will automatically re-send the query using TCP if it’s too big for UDP.

### DNS-over-TLS ###

dog supports the new DoT (DNS-over-TLS) transport system. Queries using DoT will be sent over port 853 by default.

```sh
dog example.com --tls @dns.google
```

### DNS-over-HTTPS ###

dog supports the new DoH (DNS-over-HTTPS) transport system. Queries using DoH will be sent over port 443, the standard HTTPS port, by default

```sh
dog example.com --https @https://cloudflare-dns.com/dns-query
```

### JSON output ###

dog can format its output as JSON. If it is being run as part of a script, of if the results are going to be sent to another program, it is preferable to output in a machine-readable language instead of attempting to parse the default output, which is meant to be read by people

```sh
dog example.com A AAAA MX TXT --json
```

### Short mode ###

A common thing to want to do is to get one answer from one query, skipping the TTLs and Additional and Authoritative sections of the response.

```sh
dog example.com --short
```

## Conclusion ##

Most of this functionalities are integrated on `dig` command, however it provides some nice extended functionality like the json output which is easier to integrate with deployment scripts.

If you need to constantly validate infrastructure registers, DNS Caches, or if you manage some web hosting service this is something that could be useful.

## References ##

* <https://dns.lookup.dog/>
* <https://dns.lookup.dog/reference/command-line-options>
