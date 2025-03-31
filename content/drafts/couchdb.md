---
title: couchdb
date: "2025-03-29T19:00:00+00:00"
lang: en
draft: true
tags:
  - Databases
  - VUE
  - CouchDB
---

TBD

## Intro

TBD

### Couchdb ###

Seamless multi-master sync, that scales from Big Data to Mobile, with an Intuitive HTTP/JSON API and  designed for Reliability

### Fauxton ###

Fauxton is a native web-based interface built into CouchDB. It provides a basic interface to the majority of the functionality, including the ability to create, update, delete and view documents and design documents. It provides access to the configuration parameters, and an interface for initiating replication.

### PouchDB ###

PouchDB is an open-source JavaScript database inspired by Apache CouchDB that is designed to run well within the browser. It enables applications to store data locally while offline, then synchronize it with CouchDB and compatible servers when the application is back online, keeping the user's data in sync no matter where they next login.

## Installation ##

In order to use Fauxton we need to have couchdb, lets start there

```sh
sudo pacman -S couchdb
```

Lets change `/etc/couchdb/local.ini` and create an admin account

```ini
[admins]
admin = mysecretpassword
```

> **NOTE**: After starting CouchDB for the first time, plain-password will be replaced with the hashed version.

Lest start the service

```sh
systemctl restart couchdb.service
```

Lets test the service with `curl http://127.0.0.1:5984/`


### Access Fauxton ###

You can access Fauxton using the previous credentials at:

* <http://localhost:5984/_utils/#login>

### Activate CORS ###

When you login in Fauxton go to `Config -> CORS` and Enabled it. This will be required to use with PouchDB

> PouchDB is a JavaScript implementation of CouchDB. Its goal is to emulate the CouchDB API with near-perfect fidelity, while running in the browser.

## Create App ##

Lets create a electron sample application that will use PouchDB. I've forked the repo from **jkuczek15** and updated packages.

```sh
git clone git@github.com:rramos/electron-pouchdb.git
cd electron-pouchdb
npm audit fix --force
npm audit fix --force
npm install
```

If one run `npm start` it will start a electron application like the following

![Electron PouchDB sample App](/images/electron-pouchdb/png)


## References

* <https://couchdb.apache.org/fauxton-visual-guide/index.html#getting-started>
* <https://docs.couchdb.org/en/stable/intro/index.html>
