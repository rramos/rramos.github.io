---
title: .NET Aspire Sample Application
date: "2023-12-27T10:00:00+00:00"
lang: en
tags:
  - Software Engineering
  - .NET
---

In this article I will go through the setup process to setup a .NET 8.0 Aspire application in Linux from MS Official Guide

## Intro ##

In this article I will go through the setup process to setup a .NET 8.0 Aspire application in Linux from MS Official Guide

## About ##

Cloud-native apps often require connections to various services such as databases, storage and caching solutions, messaging providers, or other web services. .NET Aspire is designed to streamline connections and configurations between these types of services.

## Requirements ##

In order to use .NET Aspire one needs to have .NET 8.0. As I'm using Ubuntu for this article I've followed this steps to prepare the environment

## Install .NET SDK and Runtime ##

```sh
sudo apt-get update &&   sudo apt-get install -y dotnet-sdk-8.0
sudo apt-get update &&   sudo apt-get install -y aspnetcore-runtime-8.0
```

> **NOTE:** For some reason in Ubuntu 22.04 there seems exit conflicts between donet-sdk-8 and dotnet-sdk-6, as such I had to remove the older versions. Take that into account if you have other projects to maintain with those versions as you may need more work

### Check existing versions ##

Execute the following command to validate you have 8.0 available

```sh
dotnet --list-runtimes
```

You should have something similar for the runtime

```sh
Microsoft.AspNetCore.App 8.0.0 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 8.0.0 [/usr/share/dotnet/shared/Microsoft.NETCore.App]
```

And now the SDK

```sh
dotnet --list-sdks
```

```sh
8.0.100 [/usr/share/dotnet/sdk]
```

Check the templates to make sure we have the aspire

## Update Workloads ##

```sh
sudo dotnet workload update
sudo dotnet workload install aspire
```

## Check existing Templates ##

Run the following to make sure you have the required templates

```sh
dotnet new --list | grep aspire
```

You should get something like:

```none
.NET Aspire Application                       aspire                      [C#]        Common/.NET Aspire/Cloud/Web/Web API/API/Service       
.NET Aspire Starter Application               aspire-starter              [C#]        Common/.NET Aspire/Blazor/Web/Web API/API/Service/Cloud

```

## Generate the Application ##

To generate the application run the following command:

```sh
dotnet new aspire-starter --use-redis-cache --output AspireSample
```

## About the Application ##

The solution consists of the following projects:

* **AspireSample.ApiService**: An ASP.NET Core Minimal API project is used to provide data to the front end. This project depends on the shared AspireSample.ServiceDefaults project.
* **AspireSample.AppHost**: An orchestrator project designed to connect and configure the different projects and services of your app. The orchestrator should be set as the *Startup project*, and it depends on the AspireSample.ApiService and AspireSample.Web projects.
* **AspireSample.ServiceDefaults**: A .NET Aspire shared project to manage configurations that are reused across the projects in your solution related to resilience, service discovery, and telemetry.
* **AspireSample.Web**: An ASP.NET Core Blazor App project with default .NET Aspire service configurations, this project depends on the AspireSample.ServiceDefaults project. For more information, see .NET Aspire service defaults.

## Run the Application ##

To run the application execute

```sh
dotnet run --project AspireSample/AspireSample.AppHost
```

You will get a similar output

```sh
Building...
info: Aspire.Dashboard.DashboardWebApplication[0]
      Now listening on: http://localhost:15214
info: Aspire.Dashboard.DashboardWebApplication[0]
      OTLP server running at: http://localhost:16176
warn: Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager[35]
      No XML encryptor configured. Key {13491cb7-f7b7-4ace-9ab5-0a6b77bf559f} may be persisted to storage in unencrypted form.
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /home/rui.ramos/Development/local/aspire-test/AspireSample/AspireSample.AppHost
```

Checkout on your browser the Aspire Dashboard at <http://localhost:15214>

And the webfront application <http://localhost:5119>

## AspireSample.AppHost ##

Checking the Program.cs we can see relevant information

```c#
var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedisContainer("cache");

var apiservice = builder.AddProject<Projects.AspireSample_ApiService>("apiservice");

builder.AddProject<Projects.AspireSample_Web>("webfrontend")
    .WithReference(cache)
    .WithReference(apiservice);

builder.Build().Run();
```

The preceding code creates a **DistributedApplication** builder adding a Redis Container the APIService and the Sample Web Application

## Why .NET Aspire ##

.NET Aspire is designed to improve the experience of building .NET cloud-native apps. It provides a consistent, opinionated set of tools and patterns that help you build and run distributed apps. .NET Aspire is designed to help you with:

* **Orchestration**: .NET Aspire provides features for running and connecting multi-project applications and their dependencies.
* **Components**: .NET Aspire components are NuGet packages for commonly used services, such as Redis or Postgres, with standardized interfaces ensuring they connect consistently and seamlessly with your app.
* **Tooling**: .NET Aspire comes with project templates and tooling experiences for Visual Studio and the dotnet CLI help you create and interact with .NET Aspire apps.

## References ##

* [Aspire Get Started](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/build-your-first-aspire-app?tabs=dotnet-cli)
* [Aspire Official Docs](https://learn.microsoft.com/en-us/dotnet/aspire/)
* [Dashboard Fundamentals](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard)
* [Aspire Components](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/components-overview?tabs=dotnet-cli#available-components)
