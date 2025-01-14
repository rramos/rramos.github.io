---
title: llmlingua
date: '2025-01-14T10:00:00+00:00'
lang: en
tags:
  - LLM
  - Data
---

TBD

## Intro ##

LLMLingua utilizes a compact, well-trained language model (e.g., GPT2-small, LLaMA-7B) to identify and remove non-essential tokens in prompts. This approach enables efficient inference with large language models (LLMs), achieving up to 20x compression with minimal performance loss.

## Why ##

* Ever encountered the token limit when asking ChatGPT to summarize lengthy texts?
* Frustrated with ChatGPT forgetting previous instructions after extensive fine-tuning?
* Experienced high costs using GPT3.5/4 API for experiments despite excellent results?

While Large Language Models like ChatGPT and GPT-4 excel in generalization and reasoning, they often face challenges like prompt length limits and prompt-based pricing schemes.

Now you can use **LLMLingua**, **LongLLMLingua**, and **LLMLingua-2**!

These tools offer an efficient solution to compress prompts by up to 20x, enhancing the utility of LLMs.

* **Cost Savings**: Reduces both prompt and generation lengths with minimal overhead.
* **Extended Context Support**: Enhances support for longer contexts, mitigates the "lost in the middle" issue, and boosts overall performance.
* **Robustness**: No additional training needed for LLMs.
* **Knowledge Retention**: Maintains original prompt information like ICL and reasoning.
* **KV-Cache Compression**: Accelerates inference process.
* **Comprehensive Recovery**: GPT-4 can recover all key information from compressed prompts.

## Quick Start ##

To get started with LLMLingua, simply install it using pip

```sh
pip install llmlingua
```

## Setup ##

TBD

## Test ##

The following demo can be use to test the compression rate for a given prompt and the obtained result.

* <https://huggingface.co/spaces/microsoft/llmlingua-2>

TBD

## Conclusion ##

TBD

## References ##

* <https://llmlingua.com>
* <https://arxiv.org/abs/2310.05736>
* <https://huggingface.co/spaces/microsoft/LLMLingua>
* <https://github.com/microsoft/LLMLingua>
