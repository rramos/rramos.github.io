---
title: Microsoft Fabric
date: "2024-01-25T10:00:00+00:00"
lang: en
tags:
  - Microsoft Fabric
---

In this article I will go through MS Fabric

## Intro ##

Fabric is a centralized product implemented by Microsoft in a SaaS way, that combines several services such as DataLake, Orchestration Processing Visualization and AI.

Billing is defined by the amount of processing used and the amount of storage used.

OneLake is the solution for storage where all the Data is automatically indexed for discovery, lineage and Governance are configured with support of Pureview.

Data can be virtualized with external storage locations from different cloud providers, no data duplication is needed similar to pointers.

Also data is stored in Delta guaranteeing ACID compliant characteristics.

Integration with PowerBI for reporting using the familiar look

Data Activator is the realtime processing component which triggers actions based on rules, like automated reports or procedures.

The Product also brings CoPilot features for PowerBI, DS Notebooks and DataFactory cleaning processes.

## Components ##

* OneLake
* Data Factory
* Synapse
* Data Activator
* PowerBI

## Integrations ##

Databricks integration through Delta Uniform, also Unity Catalog integrates with OneSecurity

## Copilot ##

Several integrations of Copilot, but the one with PowerBI is really interesting to produce quick visualizations from natual language prompts

## Conclusion ##

Not much to conclude here as the Product needs to be deeply tested from my part. I have some concerns on vendor lock-in, but the fact that it sits on top a DataLake and supports openformats brings some reassurance.

One thing that also troubles me, is that if one client just want to use a partial feature would need to acquire the full solution.

For instance D365 in the past allowed the client to export data from that system to a Datalake with internal feature of the Product and now it relies on Fabric only, if this strategy is going to be followed for the rest of MS portfolio, example DataFactory, although increased stability or support. I found the lack of flexibility concerning, by forcing clients to use this solution.

## References ##

* <https://www.microsoft.com/en-us/microsoft-fabric>
