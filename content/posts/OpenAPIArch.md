---
title: OpenAPI Development in Arch Linux
date: "2022-12-23T20:00:00+00:00"
lang: en
tags:
  - Architecture
  - .NET
  - OpenAPI
---

This article is about OpenAPI development in Linux specifically .netcore

## Intro ##

It as been a while since i've engaged with C#. In this article I'll describe a step-by-step on how to setup your Arch Linux to implement a .netcore application implementation of OpenAPI.

## Installation ##

Let's start by making sure we have the SDK and runtime packages available on the system.

```bash
sudo pacman -S dotnet-runtime dotnet-sdk
```

We can validate the existing environments with the command

```bash
dotnet --list-sdks
```

At the time of this writing

```bash
6.0.100 [/usr/share/dotnet/sdk]
```

Microsoft recommends using Visual Studio Code i will skip that part but here is the [url](https://wiki.archlinux.org/title/Visual_Studio_Code) in case of need.

## Hello World ##

Now let's do a quick 5m Hello world just to make sure everything is working properly.

```bash
dotnet new console -o MyApp
```

One should have a similar output

```bash
The template "Console App" was created successfully.

Processing post-creation actions...
Running 'dotnet restore' on /home/rramos/Development/hello/MyApp/MyApp.csproj...
  Determining projects to restore...
  Restored /home/rramos/Development/hello/MyApp/MyApp.csproj (in 2.82 sec).
Restore succeeded.
```

Now let's run this amazing helloworld

```bash
cd MyApp
dotnet run
```

One should get the desirable outcome

```bash
Hello, World!
```

Congratulations, you've built and run your .NET app. Let's clean the space now

```bash
cd ..
rm  -rf MyApp
```

## OpenAPI ##

Now let's create our webAPI

```bash
dotnet new webapi -o WebApi1
```

Next lets add the Swashbuckle.AspNetCore package

```bash
dotnet add package Swashbuckle.AspNetCore
```

At this stage if you try to build it works  but fails on the execution with the following error:

That is because Arch linux ships ASPNet in a different package. To Solve one should install the extra package using pacman.

```bash
sudo pacman -Sy aspnet-runtime
```

After the installation if we check the exiting runtimes

```bash
dotnet --list-runtimes
```

One should have the following

```bash
Microsoft.AspNetCore.App 6.0.0 [/usr/share/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 6.0.0 [/usr/share/dotnet/shared/Microsoft.NETCore.App]
```

Lets try to run it now

```bash
dotnet run
```

You should have a similar output

```bash
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7177
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5169
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /home/rramos/Development/WebApi1/
```

Now that looks promising let's test the the endpoint by using the browser on

```bash
https://localhost:7177/swagger/index.html
```

One should see a WeatherForecast service which is the baseline service when created the project.

Leave this running for now and open a new terminal to create a client.

## Client ##

Now that we have our service running let'c create a client by retrieving the OpenAPI description.

For that we will be using the `NSwag.ApiDescription.Client` package.

Let's start by creating a new client project and retrieving the OpenAPI description file from swagger.

```bash
cd ..
dotnet new console -o console
cd console
mkdir openapi
wget --no-check-certificate https://localhost:7177/swagger/v1/swagger.json -O openapi/weather.json
```

Now lets add the required package

```bash
dotnet add package NSwag.ApiDescription.Client --version 13.15.5
```

If one checks the `console.csproj` file we can see the package was added. Although i have added a specific version is not relevant.

We are also going to need the following package

```bash
dotnet add package Newtonsoft.Json
```

Add the following block on the `console.csproj` file

```xml
  <ItemGroup>
    <OpenApiReference Include="openapi/weather.json" Namespace="WeatherService">
      <ClassName>WeatherClient</ClassName>
      <OutputPath>WeatherClient.cs</OutputPath>
    </OpenApiReference>
  </ItemGroup>
```

Now execute the build command to generate the WeatherService classes

```bash
dotnet build
```

You should have a similar output

```bash
Microsoft (R) Build Engine version 17.0.0+c9eb9dd64 for .NET
Copyright (C) Microsoft Corporation. All rights reserved.

  Determining projects to restore...
  All projects are up-to-date for restore.

  GenerateNSwagCSharp:
    dotnet --roll-forward-on-no-candidate-fx 2 "/home/rramos/.nuget/packages/nswag.msbuild/13.14.5/build/../tools/Net60//dotnet-nswag.dll" openapi2csclient /className:WeatherClient /namespace:WeatherService /input:"/home/rramos/Development/console/openapi/weather.json" /output:"obj/WeatherClient.cs"
  NSwag command line tool for .NET Core Net60, toolchain v13.14.5.0 (NJsonSchema v10.5.2.0 (Newtonsoft.Json v13.0.0.0))
  Visit http://NSwag.org for more information.
  NSwag bin directory: /home/rramos/.nuget/packages/nswag.msbuild/13.14.5/tools/Net60
  Code has been successfully written to file.

  Duration: 00:00:00.6921924
  console -> /home/rramos/Development/console/bin/Debug/net6.0/console.dll

Build succeeded.
    0 Warning(s)
    0 Error(s)

Time Elapsed 00:00:04.17
```

And a brand new WeatherClient Class is now available to use on your main Program so let's use the following on `Program.cs`

```C#
  // Configure HttpClientHandler to ignore certificate validation errors.
  using var httpClientHandler = new HttpClientHandler();
  httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };

  // Create WeatherClient.
  using var httpClient = new HttpClient(httpClientHandler);
  var weatherClient = new WeatherService.WeatherClient("https://localhost:7177", httpClient);

  // Call WeatherForecast API.
  var forecast = await weatherClient.GetWeatherForecastAsync();
  foreach (var item in forecast)
  {
    Console.WriteLine($"{item.Date} - {item.Summary}");
  }
```

If one runs the client now with `dotnet run` the following output is expected.

```text
12/20/2021 10:34:23 PM +00:00 - Freezing
12/21/2021 10:34:23 PM +00:00 - Cool
12/22/2021 10:34:23 PM +00:00 - Hot
12/23/2021 10:34:23 PM +00:00 - Scorching
12/24/2021 10:34:23 PM +00:00 - Scorching

```

Hurray our client receives the API data and both client and server seems to be working
Archnt to run the service and setup a CI/CD process for it. Also to extend the service or create something more appealing.

## References ##

* <https://wiki.archlinux.org/title/.NET>
* <https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger>
* <https://wiki.archlinux.org/title/Visual_Studio_Code>
* <https://dotnet.microsoft.com/en-us/learn/dotnet/hello-world-tutorial/create>
* <https://github.com/domaindrivendev/Swashbuckle.AspNetCore>
* <https://github.com/RicoSuter/NSwag>
