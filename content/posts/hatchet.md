---
title: Hatchet
date: '2025-03-24T22:00:00+00:00'
lang: en
draft: false
tags:
    - RAGs
    - Orchestration
    - Ollama
    - FastAPI
---

## Intro ##

Hatchet replaces difficult to manage legacy queues or pub/sub systems so you can design durable workloads that recover from failure and solve for problems like **concurrency**, **fairness**, and **rate limiting**

In this tutorial, we'll go through the tutorial from hatchet to implement a RAG chatbot.

## Source ##

You can clone the following repo <https://github.com/rramos/hatchet-rag-demo> if you would like to check the final version.

## Setup ##

Lets start by running a local instance of Hatchet, one can use the following [docker-compose](https://github.com/rramos/dockers/tree/master/docker-hatchet) as reference.

Make sure you have created a API token in `General -> API Tokens`.

Now following the [fastapi-react](https://docs.hatchet.run/home/tutorials/fastapi-react/project-setup) project we will:

1. Create an API which serves fastAPI endpoints
2. Create workflows which serve the Hatchet workers and workflows

Start by initializing the project with `poetry init` and add the following

```toml
[tool.poetry.dependencies]
python = "^3.13"
python-dotenv = "^1.0.1"
uvicorn = {extras = ["standard"], version = "^0.34.0"}
fastapi = "^0.115.12"
openai = "^1.1.0"
beautifulsoup4 = "^4.13.3"
requests = "^2.32.3"
urllib3 = "2.3.0"
hatchet-sdk = "0.47.1"
grpcio-tools = "1.71.0"

[tool.poetry.scripts]
api = "src.api.main:start"
hatchet = "src.workflows.main:start"
```

Then install the dependences with `poetry install`

## Configure worker ##

Now lets create the background workflow that will:

1. reads a website and parses the text content
2. reasons about what information is most relevant to the user request
3. generates a response for the user

### Workflow ###

The workflow will run when `question:create event` gets produced by the frontend app. Then it will read the url from the workflow input (`context.workflow_input`), load the contents of that page with requests and parse the html content to text with Beautiful Soup.

In the next step we can call OpenAI's (*I adapted the code to run locally with ollama*) to extract the most helpful sentences in this document which will be passed to a future step for generation.

Finally, let's use the reasoned context and write a response to the user.

If you would like to know more details regarding the workflow I recommend reading the original article [here](https://docs.hatchet.run/home/tutorials/fastapi-react/building-the-workflow).

This would would be the final script [backend/src/workflows/basicrag.py](https://raw.githubusercontent.com/rramos/hatchet-rag-demo/refs/heads/master/backend/src/workflows/basicrag.py)

### Listening for actions ###

We now need to define the start script so your service can listen for and execute workflow runs.

Create the following file `backend/src/workflows/main.py` with the content

```python
from .hatchet import hatchet
from .basicrag import BasicRagWorkflow


def start():
    worker = hatchet.worker('basic-rag-worker')
    worker.register_workflow(BasicRagWorkflow())
    worker.start()
```

You can run `poetry run hatched` which will start a worker for this process

One can use the following input to trigger the workflow on Hatchet to validate the execution.

```yaml
{
  "messages": [
    {
      "role": "user",
      "content": "how do i install hatchet?"
    }
  ],
  "request": {
    "url": "https://docs.hatchet.run/home"
  }
}
```

Next step is to setup fastAPI as the edge service

### FastAPI

In this step, we set up the FastAPI application, configure CORS middleware, and initialize the Hatchet SDK.

Create the following `src/api/main.py` with the following content

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse # we'll use this later in the tutorial
import uvicorn
from dotenv import load_dotenv
import json
from hatchet_sdk import Hatchet
from .models import MessageRequest

load_dotenv() # we'll use dotenv to load the required Hatchet and OpenAI api keys

app = FastAPI()
hatchet = Hatchet()

# This is required for running a local react app,
# but is not recommended for production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def start():
    """Launched with `poetry run api` at root level"""
    uvicorn.run("src.api.main:app", host="0.0.0.0", port=8000, reload=True)
```

Now, let's define some simple pydantic models for our Request body. Create a file `/backend/src/api/models.py` and define a Message and a MessageRequest model:

```python
from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    role: str
    content: str


class MessageRequest(BaseModel):
    messages: List[Message]
    url: str
```

Next, let's create add some endpoints that the client can call to trigger the workflow.

Check the final file [backend/src/api/main.py](https://raw.githubusercontent.com/rramos/hatchet-rag-demo/refs/heads/master/backend/src/api/main.py)

One can start the API with the following command on a new terminal

```sh
poetry run api
```

You can use curl to make a request to this endpoint and observe the run in the Hatchet Dashboard

```sh
curl -X POST -H "Content-Type: application/json" -d '{
    "messages": [
        {
            "role": "user",
            "content": "how do i install hatchet?"
        }
    ],
    "url": "https://docs.hatchet.run/home"
}' http://localhost:8000/message
```

### Frontend ###

We just miss having a Frontend component, let's use a React app for that

```sh
npx create-react-app frontend --template typescript
```

If one execute the following we can start the application

```sh
cd frontend
npm start
```

Open your browser and navigate to <http://localhost:3000>. You should see the default Create React App page.

Now, let's set up the basic structure of our React component.

Modify [frontend/src/App.tsx](https://raw.githubusercontent.com/rramos/hatchet-rag-demo/refs/heads/master/frontend/src/App.tsx) and [frontend/src/App.css](https://raw.githubusercontent.com/rramos/hatchet-rag-demo/refs/heads/master/frontend/src/App.css) with the versions from that repository

And you should be ready to test

Double check the frontend and ask something about hatchet to see this in action.

## Conclusion ##

In this article, we explored the creation of a RAG system using Hatchet workflows and OpenAI, leveraging a model from Ollama. The process demonstrated how to set up workflows in Hatchet and provided insights into configuring FastAPI as an edge service. After executing this project, the advantages of Hatchet for handling asynchronous workflow scheduling became much clearer.

It would be interesting to test this software with <https://glasskube.dev>, as the various components required for Hatchet's architecture were not entirely clear. With the growing adoption of AI agent solutions, this tool could be a valuable option to explore.

I have previously managed multiple workflows using Airflow, but this solution appears to integrate more seamlessly with asynchronous messaging, queues, and webhooks


## References ##

* <https://github.com/hatchet-dev/hatchet>
* <https://docs.hatchet.run/home/tutorials/fastapi-react/project-setup>
* <https://docs.hatchet.run/self-hosting>
* <https://docs.hatchet.run/home>
* <https://docs.hatchet.run/home/tutorials/fastapi-react/building-the-workflow>
