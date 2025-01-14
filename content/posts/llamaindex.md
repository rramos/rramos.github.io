---
title: LlamaIndex
date: "2024-06-04T08:00:00+00:00"
lang: en
tags:
  - AI
  - LLMs
  - RAG
---

Article about LlamaIndex a framework for building context-augmented LLM applications.

## Intro ##

LlamaIndex is a framework for building context-augmented LLM applications.

## Context ##

Context Augmentation refers to any use case that applies LLMs on top of your private or domain-specific data. Some popular use cases include the following:

* Question-Answering Chatbots (commonly referred to as RAG systems, which stands for "Retrieval-Augmented Generation")
* Document Understanding and Extraction
* Autonomous Agents that can perform research and take actions

LlamaIndex provides the tools to build any of these above use cases from prototype to production. The tools allow you to both ingest/process this data and implement complex query workflows combining data access with LLM prompting.

### Why Context Augmentation ###

LLMs offer a natural language interface between humans and data. Widely available models come pre-trained on huge amounts of publicly available data. However, they are not trained on **your** data, which may be private or specific to the problem you're trying to solve. It's behind APIs, in SQL databases, or trapped in PDFs and slide decks.

## Getting Started ##

## Download Data ##

This example uses the text of Paul Graham's essay, ["What I Worked On"](https://paulgraham.com/worked.html).

## Setup ##

Ollama is a tool to help you get set up with LLMs locally.
Check out my [previous article](https://rramos.github.io/2024/05/31/ollama) on how to setup this.

**NOTE:** You will need a machine with at least 32GB of RAM.

### PIP Packages ###

Install the required pip packages

```sh
pip3 install llama-index
pip3 install llama-index-core 
pip3 install llama-index-llms-ollama
pip3 install llama-index-embeddings-huggingface
```

Then create a data dir and generate a data file `paul_graham_essay.txt` with the content from Paul Graham's essay.

Create the following `starter.py` file with the content:

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama

documents = SimpleDirectoryReader("data").load_data()

# bge-base embedding model
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")

# ollama
Settings.llm = Ollama(model="llama3", request_timeout=360.0)

index = VectorStoreIndex.from_documents(
    documents,
)
```

You should have a structure similar this one.

```sh
├── starter.py
└── data
    └── paul_graham_essay.txt
```

We use the `BAAI/bge-base-en-v1.5` model through our `HuggingFaceEmbedding` class and our Ollama LLM wrapper to load in the Llama3 model.

When running the `starter.py` script it will build an index over the documents in the data folder.

## Query the Data ##

Let's add the following lines on our script.

```python
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")
print(response)
```

This creates an engine for Q&A over your index and asks a simple question. You should get back a response similar to the following:

```text
According to the given context, before college, the author worked on writing and programming.
In 9th grade, he tried writing programs on an IBM 1401 using an early version of Fortran. 
Later, with microcomputers, everything changed, and he started programming seriously. 
He wrote simple games, a program to predict model rocket flight heights, and a word processor that his father used to write books.
```

## Next Steps ##

The execution of this code on my local toaster without a GPU takes something like `5m41,258s` . One way that we might try to reduce this is by incorporating [llmlingua](https://llmlingua.com/) on the chain. I would probably write one article specifically for it. But in a nutshell is like a token compressor that would reduce the size of your prompt without losing context.

## Conclusion ##

In this article I went to the process of testing LlamaIndex a framework for building context-augmented LLM applications, using a data file regarding Paul Graham essay and leveraging `bge-base-en-v1.5` model to ask a question with this new context.

## References ##

* <https://github.com/run-llama/llama_index>
* <https://docs.llamaindex.ai/en/latest>
* <https://www.youtube.com/watch?v=wjZofJX0v4M&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi>
* <https://docs.llamaindex.ai/en/latest/getting_started/concepts>
* <https://docs.llamaindex.ai/en/latest/getting_started/starter_example_local>
* <https://llmlingua.com>
