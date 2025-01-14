---
title: Local Kubernetes for Testing/Developing
date: "2023-08-26T21:00:00+00:00"
lang: en
tags:
  - Kubernetes
  - Development
---

Article about Minikube a local kubernetes

## Intro ##

**minikube** is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.

Lets start by installing the minikube package.

**NOTE:** This example is targeting a Arch distribution, if you use a different linux flavor check the [Official Docs](https://minikube.sigs.k8s.io/docs/start/) for other install options

```sh
sudo pacman -S minikube
```

The following command will setup a docker environment with a kubernetes environment that you can use for development/testing purposes

```sh
minikube start
```

In order to interact with Kubernetes one can use the provided kubectl command upon starting this environment with the following command

```console
minikube kubectl -- get pods -A
```

One should get something like this

```console
NAMESPACE     NAME                               READY   STATUS    RESTARTS      AGE
kube-system   coredns-787d4945fb-zv72d           1/1     Running   0             10m
kube-system   etcd-minikube                      1/1     Running   0             10m
kube-system   kube-apiserver-minikube            1/1     Running   0             10m
kube-system   kube-controller-manager-minikube   1/1     Running   0             10m
kube-system   kube-proxy-7p9qw                   1/1     Running   0             10m
kube-system   kube-scheduler-minikube            1/1     Running   0             10m
kube-system   storage-provisioner                1/1     Running   1 (10m ago)   10m
```

I will install kubectl package however to allow interaction with other clusters if required.

```sh
sudo pacman -S kubectl
```

We should get the same output by executing

```sh
kubectl get po -A
```

One can check the cluster details with following command

```sh
kubectl cluster-info
```

You should get something similar

```text
Kubernetes control plane is running at https://192.168.49.2:8443
CoreDNS is running at https://192.168.49.2:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Minikube is also bundled with Kubernetes Dashboard which you can launch with the following command

```sh
minikube dashboard
```

You would get something similar to the following image:

![minikube](/images/minikube.png)

Great now we have a Kubernetes cluster running in docker and kubectl command available.

For a more extensive guideline on how to manage Minikube please checkout the [handbook](https://minikube.sigs.k8s.io/docs/handbook/)

Next steps would containerize some application and deploy it.

But that would be for another article...

## References ##

* <https://minikube.sigs.k8s.io/docs/start/>
* <https://wiki.archlinux.org/title/Minikube>
* <https://wiki.archlinux.org/title/Kubernetes>
* <https://minikube.sigs.k8s.io/docs/handbook/>
