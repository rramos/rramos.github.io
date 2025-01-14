---
title: serper
date: "2024-06-13T11:00:00+00:00"
lang: en
tags:
  - Utils
  - Langchain
---

This article is about serper, an API service that provides you fast results from Google Search

## Intro ##

serper is an API service that provides you fast results from Google Search

## Features ##

* **Response Time**: Queries are generally returned within 1 to 2 seconds; occasionally, it can take 2 to 4 seconds if a retry is needed.
* **Query Rate Limit**: The default limit for Ultimate credits is 300 queries per second, allowing 15,000 to 18,000 searches per minute. Higher concurrency limits are available upon request.
* **Real-Time Queries**: All API calls query Google directly for the latest results with no caching involved.
Search Query Customization: Users can specify search locations by country, language, and specific areas such as cities or neighborhoods.
* **Credit Deduction**: Credits are deducted for each successful query response. When the credit balance is zero, new queries will not be accepted.

## Example ##

Create the following python file `test.py`

```python
import requests
import json

url = "https://google.serper.dev/search"

payload = json.dumps({
  "q": "apple inc"
})
headers = {
  'X-API-KEY': 'API_KEY',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

You can clone the following [repo](https://github.com/rramos/serper-test) which as this example code.

```sh
git clone git@github.com:rramos/serper-test.git
cd repo
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python test.py
```

> **NOTE:** Make sure to update the `.env` value with your API KEY

## Playground ##

On the provided [Playground](]https://serper.dev/playground), you will find several examples for multiple languages and various options to apply on your request.

## Dashboard ##

The [Dashboard](https://serper.dev/dashboard) provides you with great visibility on the credits consumption

## Langchain Integration ##

There is a Langchain wrapper if you would like to incorporate the search results.
Here is one example using Ollama. Check the following [article](https://rramos.github.io/2024/05/31/ollama) if you would like to setup Ollama locally.

```python
import os
from dotenv import load_dotenv

from langchain.agents import AgentType, initialize_agent
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain_core.tools import Tool
from langchain_community.llms import Ollama

# Load environment variables from .env file
load_dotenv()

# Load API Key
api_key = os.getenv('SERPER_API_KEY')

# Query
query="rramos github tech and data notes"

llm = Ollama(temperature=0,model="llama3")
search = GoogleSerperAPIWrapper()
tools = [
    Tool(
        name="Intermediate Answer",
        func=search.run(query),
        description="useful for when you need to ask with search",
    )
]

self_ask_with_search = initialize_agent(
    tools, llm, agent=AgentType.SELF_ASK_WITH_SEARCH, verbose=True
)
self_ask_with_search.invoke(
    "resume the search results ?"
)
```

## Conclusion ##

This service is incredible, offering blazing fast results with real-time queries and a user-friendly interface. The dashboard and playground provide all the information you need to get started in a raw simple form which I really like. As for pricing, it's essential to calculate your costs to determine if integrating this service into your product is cost-effective.

## References ##

* <https://serper.dev>
* <https://python.langchain.com/v0.2/docs/integrations/tools/google_serper>
* <https://github.com/rramos/serper-test>
