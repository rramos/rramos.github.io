---
title: kind
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - kubernetes
    - Ci/CD
    - CloudFoundry
---

kind is a tool for running local Kubernetes clusters using Docker container “nodes”.
kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI.

## Intro ##

In this article I will go through the process to setup kind locally and test with CloudFoundry.

## Requirements ##

* Docker
* go

## About ##

* Kind consists of Go packages that implement cluster creation, image build, etc.
* A command line interface 
* Docker images written to run systemd, kubernetes, etc.

{% asset_img  [diagram.png Kind Design Diagram] %}

More information on the design: [here](https://kind.sigs.k8s.io/docs/design/initial)

## Installation ##

One option would be to install with

```sh
go install sigs.k8s.io/kind@latest
```

I would recommend however to use you Distribution packaging tool, otherwise you will need to change your PATH variable.

```sh
pacseek kind
```

Lets start by creating a cluster...

> **Note:** This procedure was done in Arch Linux, you may need to adapt for other distributions

## Cluster Creation ##

Execute the following command `kind create cluster` and you will get something similar:

```sh
kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.31.2) 🖼 
 ✓ Preparing nodes 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Thanks for using kind! 😊
```

In order to delete the cluster one can use `kind delete cluster` but let's keep it for now.

If you execute `docker ps` you can check the running containers.

Now let's install Korifi...

## Korifi ##

Korifi was built to serve as a means to deploy and manage applications on Kubernetes while providing automated networking, security, availability, and much more.

Check the following [page](https://tutorials.cloudfoundry.org/korifi/overview/) for more info about the project.

### Korifi Requirements ###

I installed the following packages in my system which where required for 

```sh
sudo pacman -S helm cloudfoundry-cli
```

### Install ###

Clone the code from git

```sh
git clone https://github.com/cloudfoundry/korifi
```

Execute the deploy script

```sh
cd korifi/scripts
./deploy-on-kind.sh korifi
```

### Deploy an application ###

## Conclusion ##

## References ##

* <https://kind.sigs.k8s.io/>
* <https://github.com/cloudfoundry/korifi/blob/v0.13.0/INSTALL.md>
* <https://tutorials.cloudfoundry.org/korifi/local-install>
* <https://tutorials.cloudfoundry.org/korifi/overview/>
