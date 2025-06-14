---
title: langchain with langfuse
date: "2025-06-14T16:00:00+00:00"
lang: en
tags:
  - AI
  - LLMs
---

In this article we will setup langfuse plus langchain locally with docker using ollama.

## Intro

LangChain is a framework for developing applications powered by large language models (LLMs) and Langfuse is an open-source LLM engineering platform that helps teams collaboratively debug, analyze, and iterate on their LLM applications

## Langchain

- **Standardized Interfaces**: LangChain simplifies AI app development by providing a common interface for key components, reducing the need to learn multiple APIs and enabling easy switching between providers
- **Orchestration**: LangChain enables efficient coordination of multiple components and models, making it easier to build complex applications with structured control flows.
- **Observability & Evaluation**: LangChain helps developers monitor complex applications and make informed decisions by providing tools to evaluate prompts, models, and performance trade-offs

### Installation

This example considers that you have **ollama** working.

Lets pull `llama2` model, make sure you have enough memory for the model you choose.

```sh
ollama pull llama2
```

Lets try a simple chain

```sh
uv init
uv venv
source .venv/bin/activate
uv pip install -U langchain-ollama
```

You can create the following test script `murray-knows.py` to validate

```python
# murray-knows.py
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM

template = """Act as Pirate and respond the {question} with short explanation"""

prompt = ChatPromptTemplate.from_template(template)

model = OllamaLLM(model="llama2")

chain = prompt | model

response = chain.invoke({"question": "Why is the sky blue?"})
print(response)
```

You should get something similar

> Ahoy matey! Arr, ye be askin' why the sky be blue, eh? Well, let me tell ye, it be because of a thing called rayleigh scattering, see. When sunlight enters the atmosphere, it encounters tiny molecules o' gases like nitrogen and oxygen. These molecules scatter the light in all directions, but they scatter shorter wavelengths (like blue) more than longer wavelengths (like red). So, the blue light be what ye see in the sky! It be a treasure trove of knowledge, that science be! Now, if ye'll excuse me, I have to go find me some booty... er, I mean, attend to me grog...

- In this example we defined the `prompt`. Check the following [page](https://www.promptingguide.ai/introduction/examples) for some prompt examples
- We define the model to use, in this case `llama2`
- We chain with our question and print the response

## Langfuse

Langfuse is an open-source LLM engineering platform (GitHub) that helps teams collaboratively debug, analyze, and iterate on their LLM applications. All platform features are natively integrated to accelerate the development workflow. Langfuse is open, self-hostable, and extensible

### Features

#### Tracing

- **Tracing**: Traces allow you to track every LLM call and other relevant logic in your app.
- **Session**: Sessions allow to track multi-step conversations or agentic workflows.
- **Timeline**: Debug latency issues by inspecting the timeline view.
- **Dashboard**: See quality, cost, and latency metrics in the dashboard to monitor your LLM application.
- **Agent Graphs**: LLM agents can be visualized as a graph to illustrate the flow of complex agentic workflows.
- **Users**: Add your own userId to monitor costs and usage for each user. Optionally, create a deep link to this view in your systems.

#### Prompt Management

- **Version Control**: Collaboratively version and edit prompts via UI, API, or SDKs.
- **Deploy**: Deploy prompts to production or any environment via labels - without any code changes.
- **Metrics**: Compare latency, cost, and evaluation metrics across different versions of your prompts
- **Playground**: Instantly test your prompts in the playground.
- **Link with Traces**: Link prompts with traces to understand how they perform in the context of your LLM application.
- **Track Changes**: Track changes to your prompts to understand how they evolve over time.
- **Combine**: You can reference other text prompts in your prompts using a simple tag format.

#### Evaluations

- **Analytics**: Plot evaluation results in the Langfuse Dashboard.
- **User Feedback**: Collect feedback from your users. Can be captured in the frontend via our Browser SDK, server-side via the SDKs or API. Video includes example application
- **LLM-as-a-judge**: Run fully managed LLM-as-a-judge evaluations on production or development traces. Can be applied to any step within your application for step-wise evaluations.
- **Annotation Queue**: Baseline your evaluation workflow with human annotations via Annotation Queues.
- **Custom**: Add custom evaluation results, supports numeric, boolean and categorical values
- **Export via UI**: Export scores in bulk via the Langfuse UI.

### Setup

Lets start with the following [docker-compose](https://github.com/rramos/dockers/tree/master/docker-langfuse) option.

Start the docker image

```sh
docker-compose up -d
```

Access <http://localhost:3000> create one **account**, **organization** and **project**

We will need to generate credentials in Langfuse. In the **Setup** section select `Langchain` and select **Create API Key**

This will generate a secret key and public key that we will use in our application.

Create a `.env` file with you public and secret key like the example

```text
LANGFUSE_PUBLIC_KEY=pk-lf-52e7e549-5a50-47f3-9d39-62ec9c374d9b
LANGFUSE_PRIVATE_KEY=sk-lf-99de2801-b9b3-4f5a-88dd-c5682d61bd71
```

Now lets change our application to enable tracing, starting by adding the required pip package

```sh
uv pip install langfuse
```

Lets include the langfuse configuration with the previous keys and assign the callback handler

```python
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
from langfuse import Langfuse
from langfuse.langchain import CallbackHandler

load_dotenv()

langfuse = Langfuse(
    public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
    secret_key=os.environ["LANGFUSE_PRIVATE_KEY"],
    host="http://localhost:3000"
)

langfuse_handler = CallbackHandler()

template = """Act as Pirate and respond the {question} with short explanation"""

prompt = ChatPromptTemplate.from_template(template)

model = OllamaLLM(model="llama2")

chain = prompt | model

response = chain.invoke({"question": "Why is the sky blue?"}, config={"callbacks": [langfuse_handler]})
print(response)
```

If we run the code now using `python murray-knows.py`, its execution can be traced in the Dashboard. You'll be able to view details such as execution latency, the model used, and associated metadata.

This would be extremely useful when using a commercial LLM provider for cost control, as there are already several model configurations with defined per-unit pricing that could be leveraged.

I also registered a LLaMA2 model in the **Settings** section, assigning input costs to better understand how much would it cost using a commercial provider.

The following [document](https://langfuse.com/docs/query-traces) describes how to obtain information regarding the traces

## Conclusion

In this article, we walked through the process of setting up Langfuse locally using Docker for tracing capabilities, and built an LLM application with LangChain. We defined a prompt to make the model respond like a pirate, all while running everything locally with Ollama. If you enjoyed this, I highly recommend checking out the official Langfuse documentation—there are several interesting articles, including one on [intent classification](https://langfuse.com/docs/analytics/example-intent-classification) and I also recommend the [LLM Security](https://langfuse.com/docs/security/overview) section

## References

- <https://python.langchain.com/v0.2/docs/introduction>
- <https://langfuse.com>
- <https://www.langchain.com>
- <https://langfuse.com/docs/get-started>
- <https://langfuse.com/docs/analytics/example-intent-classification>
