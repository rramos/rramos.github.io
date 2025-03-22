---
title: Metabase
date: '2025-03-22T10:00:00+00:00'
lang: en
draft: false
tags:
    - Analytics
    - Dashboards
    - BI
---

This article goes through Metabase running locally and configuring a Vite application with the SDK to embed a dashboard

## Intro ##

### What is Metabase ? ###

Metabase is an open-source business intelligence platform. You can use Metabase to ask questions about your data, or embed Metabase in your app to let your customers explore their data on their own.

![Metabase dashboard example](/images/metabase01.png)

Metabase is accessible from the free open-source tier to the powerful pay-as-you-go Pro plan all the way to Enterprise.

### Features ###

* **Analytics dashboards**: Bring together charts and questions on live dashboards with interactive tools to let everyone get the info they need.
* **Query builder**: The query builder makes it easy for anyone - even your less data-savvy teammates - to put together questions with just clicks, prompts, and, menu choices. No data expertise or SQL needed.
* **Models**: Create and customize metadata-rich, annotated models in the handiest way for each team to use, filtered with the columns they need - no joins required.
* **CSV Upload**: Upload and analyze your spreadsheets in Metabase
* **Usage Analytics**: Metabase usage analytics is a collection of dashboards, questions, and models to understand and act on how your data is used in your Metabase, as well as performance, and configuration changes.
* **SQL editor**: For the data analysts, data scientists, data engineers, developers and other data specialists. The SQL editor lets you get down with native queries when it isn’t your first rodeo.
* **Permissions**: Get granular governance over permissions for groups of people on your internal and embedded analytics, right down to the row and column level.
* **Data sandbox**: Get selective about data access with row- and column-level permissions for groups of people based on attributes you choose.
* **Collections and verified items**: Bring structure to your Metabase by tucking relevant models, questions, and dashboards together into collections, and make them easier find.

Take into consideration the product evolution and check the Roadmap as the product is in constant evolution.

Remember to check their [Roadmap](https://www.metabase.com/roadmap) as the theam is working on some nice features to include.


### Embedding ###

One interesting approach to leverage this tool is to Embedded Analytics on your own product.

There are two ways so far to reach that outcome:

1. **Iframe embedding**: For organizations that need embedded analytics really fast with little engineering overhead.
2. **Embedded analytics SDK for React**: For organizations that need bespoke in-app analytics. Everything you get with iframes with more control and flexibility.

The following <https://www.metabase.com/product/embedded-analytics> provides more information on both techniques.

Lets follow the following [Quickstart](https://www.metabase.com/docs/latest/embedding/sdk/quickstart-with-sample-app) to create a example sample.

## Demo Example ##

For this example one needs a working Metabase environment.

You can use this one [docker-metabase](https://github.com/rramos/dockers/tree/master/docker-metabase) as an example.

### Enable the SDK in Metabase ###

In Metabase, click on the gear icon in the upper right and navigate to Admin `Settings > Settings > Embedding` and enable the Embedded analytics SDK.

### Create an API key in Metabase ###

Still in the Admin’s Settings tab, navigate to the Authentication section in the sidebar and click on the API keys tab. Create a new API key.

Key name: “Embedded analytics SDK” (just to make the key easy to identify).
Group: select “Admin” (since this is only for local testing).

you will generate a key similar to `mb_DoSaW9sH30PsJTP1rhSeUh5FZ4TTFps3iNKKYuc63CA=`

### Create a Sample Vite Project ###

Lets create a empty vite project

```sh
npm create vite@latest
cd vite-project
npm install
npm run dev
```

One can access <http://localhost:5173> to validate

### Install the SDK in your app ###

When installing the NPM package, it’s critical to use the npm dist-tag that corresponds to the major version of your Metabase. For example, if your Metabase is version 1.53.x, you’d run 53-stable

Example:

```sh
npm install @metabase/embedding-sdk-react@53-stable
```

In my case I'm running version `0.53.7` so lets install the sdk

I then replaced `App.tsx` with

```js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  MetabaseProvider,
  defineMetabaseAuthConfig,
  InteractiveDashboard,
} from "@metabase/embedding-sdk-react";

/**
 * This creates an auth config to pass to the `MetabaseProvider` component.
 * You'll need to replace the `metabaseInstanceUrl` and the `apiKey` values.
 */
const authConfig = defineMetabaseAuthConfig({
  metabaseInstanceUrl: "http://localhost:3000",
  apiKey: "mb_DoSaW9sH30PsJTP1rhSeUh5FZ4TTFps3iNKKYuc63CA=",
});

/**
 * Now embed your first dashboard. In this case, we're embedding the dashboard with ID 1.
 * On new Metabases, ID 1 will be the example dashboard, but feel free to use a different dashboard ID.
 */
export default function App() {
  return (
    <MetabaseProvider authConfig={authConfig}>
      <InteractiveDashboard dashboardId={1} />
    </MetabaseProvider>
  );
}
```

After that the example dashboard will be presented on our Vite application <http://localhost:5173>

**NOTE**: This configuration should be considered only for testing purposes, SSO and SSL should be considered for moving forward.

### Multi-tenant ###

The following article explains how to configure multi-tenancy for delivering Metabase in ones application

* <https://www.metabase.com/learn/metabase-basics/embedding/multi-tenant-self-service-analytics>

The solution uses the attributes to sandbox the data to ensure users can only see the data they have permissions to.

## Community ##

The previous article is one of the several available on the [Community](https://www.metabase.com/community) section, they seem very interesting and showcase real-case scenarios.

## Conclusion ##

In this article, we explored Metabase, an open-source business intelligence platform, highlighting its powerful features for creating dynamic dashboards and seamlessly embedding them into your application.

## References ##

* <https://www.metabase.com/start/oss/>
* <https://github.com/ClickHouse/metabase-clickhouse-driver>
* <https://clickhouse.com/docs/en/integrations/metabase>
