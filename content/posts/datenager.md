---
title: date.nager
date: "2024-06-11T12:00:00+00:00"
lang: en
tags:
  - Utils
  - OpenAPI
---

Article about Nager.Date an open source project with the goal of making holidays easy to query.

## Intro ##

Nager.Date is an open source project with the goal of making holidays easy to query.

## About ##

Discover the convenience of easily accessing holidays from over 100 countries with Nager.Date. Our popular project utilizes the power of .NET and offers a user-friendly public [REST API](https://date.nager.at/Api) for seamless integration into your application.

## Testing ##

Use the following sample python code to obtain the national holiday in Portugal in 2024 `get_national_holidays.py`.

```python
import json
import requests

response = requests.get('https://date.nager.at/api/v3/publicholidays/2024/PT')
public_holidays = json.loads(response.content)

for public_holiday in public_holidays:
  print(public_holiday['date']," - ",public_holiday['name'])
```

You should have a similar output when running

```text
2024-01-01  -  New Year's Day
2024-02-13  -  Carnival
2024-03-29  -  Good Friday
2024-03-31  -  Easter Sunday
2024-04-25  -  Freedom Day
2024-05-01  -  Labour Day
2024-05-30  -  Corpus Christi
2024-06-01  -  Azores Day
2024-06-10  -  National Day
2024-07-01  -  Madeira Day
2024-08-15  -  Assumption Day
2024-10-05  -  Republic Day
2024-11-01  -  All Saints Day
2024-12-01  -  Restoration of Independence
2024-12-08  -  Immaculate Conception
2024-12-25  -  Christmas Day
2024-12-26  -  St. Stephen's Day
```

## Countries coverage ##

You can find an overview of the supported countries [here](https://date.nager.at/Country/Coverage).

## Holiday types ##

What variants of holidays are supported by Nager.Date

| Type | Description |
|---|---|
|Public | Public holiday|
|Bank | Bank holiday, banks and offices are closed|
|School | School holiday, schools are closed|
|Authorities |  Authorities are closed|
|Optional |Majority of people take a day off|
|Observance |Optional festivity, no paid day off|

## Data precision ##

There is no generally valid designation for the next administrative level of countries. "Nager.Date" supports the initial subdivision of a country, but we will not support a detailed level because the effort required is too high.

To keep it generally valid, we will treat this subdivision as SubdivisionCodes, this will replace the current designation Counties.

United States of America use `States`
Germany use `States`
Austria use `States`
Switzerland use `Cantons`
Brazil use `States`
Australia use `States` or `Territories`
Russia use `Federal districts`
Canada use `Province` or `Territories`

## Response Model ##

|   |   |
|---|---|
|**date**| The date of the holiday|
|**localName** | Local name|
|**name**| English name|
|**countryCode** | ISO 3166-1 alpha-2|
|**fixed** | Is this public holiday every year on the same date|
|**global** | Is this public holiday in every county (federal state)|
|**counties** | If it is not global you found here the Federal states (ISO-3166-2)|
|**launchYear** | The launch year of the public holiday|
|**types** | The types of the public holiday, several possible (Public, Bank, School,...)|

Example:

```json
[
   {
      "date": "2017-01-01",
      "localName": "Neujahr",
      "name": "New Year's Day",
      "countryCode": "AT",
      "fixed": true,
      "global": true,
      "counties": null,
      "launchYear": 1967,
      "types": [
         "Public"
      ]
   },
   ...
```

## References ##

* <https://date.nager.at/>
* <https://github.com/nager/Nager.Date>
* <https://date.nager.at/Api>
