---
title: ngrok
date: "2023-12-26T20:20:00+00:00"
lang: en
tags:
  - Infrastructure
  - Reserve Proxy
---

In this article I configure a local endpoint using ngrok for testing purposes.

## Intro ##

In this article I configure a local endpoint using ngrok for testing purposes.

## What is ngrok ##

ngrok is a globally distributed reverse proxy that secures, protects and accelerates your applications and network services, no matter where you run them. You can think of ngrok as the front door to your applications

## Requirements ##

For this guide I will use snap. Checkout the [Official guide](https://ngrok.com/docs/getting-started/) for other alternatives.

```sh
snap install ngrok
```

## Configuration ##

Next step create an account with the Free tier at [https://ngrok.com](https://ngrok.com).

> **NOTE:** This option is intended only for testing purposes for Production workloads you should consider a different option based on your network usage. Use this instructions at your own risk

When you access the service you can get your token run the following command to add it to your local configuration

```sh
ngrok config add-authtoken <TOKEN>
```

you can run the following command to make sure your configuration checks out

## Test ##

Open two terminals.
On the first let's start a listener using netcat

```sh
nc -l -p 9393
```

On the second one let's spin up ngrok

```sh
ngrok tcp localhost:9393
```

You will be presented with a forward URL ( check Forwarding option on the output )

For my example it was: `tcp://0.tcp.eu.ngrok.io:15537`

If you go through a browser and choose `http://0.tcp.eu.ngrok.io:15537/`

You should see the http GET request on the terminal for the listener

```sh
GET / HTTP/1.1
Host: 0.tcp.eu.ngrok.io:15537
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,pt-PT;q=0.8,pt;q=0.7
```

You could use a much more interesting example like [MockingBird](https://mockingbird.tinybird.co) or some other mocking data service, but for reference this will do.

Another point to take into consideration is the security part.
When you create the endpoint you can define a differente security mechanism (advisible) like Oauth.

You could run something like the following to use Google OAuth:

```sh
ngrok http http://localhost:8080 --oauth=google --oauth-allow-email=<YOUR_EMAIL>
```

Take into account that IP control will require that you upgrade your plan

## Conclusion ##

ngrok seems to be very easy to setup. Although I didn't go in depth on the CI/CD configuration their Official documentation has more information on that one (example for [Github integration](https://ngrok.com/docs/integrations/github/webhooks/)). Check there documentation regarding [Production usecases](https://ngrok.com/use-cases).

For me personally I think is quite interesting if you want to speed up development and provide a local endpoint quickly to a client to assess in a secure and reliable way. Or quickly provide a webhook for testing something.

Let me know if you know similar alternatives that I should look into.

## References ##

* <https://ngrok.com>
* <https://ngrok.com/docs/>
