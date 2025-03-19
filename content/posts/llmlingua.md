---
title: llmlingua
date: '2025-03-19T10:00:00+00:00'
lang: en
draft: false
tags:
  - LLMs
  - Data Engineering
---

llmlingua a model to compact prompts

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

This example use ollama with deepseek-r1 and llmlingua

```sh
python -m venv venv
source venv/bin/activate
pip install ollama llmlingua
```

## Test ##

The following example can be use to test the compression rate for a given prompt and the obtained result.

```python
import ollama
from llmlingua import PromptCompressor

# Define the model and original prompt
model = "deepseek-r1"  # You can change this to other models like "llama2"
original_prompt = "Can you please tell me what the capital of France is? I need this information for my geography project."


llm_lingua = PromptCompressor()
compressed_prompt = llm_lingua.compress_prompt(prompt, instruction="", question="", target_token=200)


print(f"Compressed Prompt: {compressed_prompt}")

# Generate response using Ollama
response = ollama.chat(model=model, messages=[{"role": "user", "content": compressed_prompt}])

# Print the response
print("AI Response:", response["message"]["content"])
```

You can test directly using the following **Demo**

* <https://huggingface.co/spaces/microsoft/llmlingua-2>

## Conclusion ##

With the usage of commercial products that charge for per token, a compressor like this would make sense. Still important to assess each use-case to understand if it makes sense for the volume of tokes you are considering. Also I have this in my drafts for some time now, and with the speed of inovation on the AI field there could be a better way or model to do this today.


## References ##

* <https://llmlingua.com>
* <https://arxiv.org/abs/2310.05736>
* <https://huggingface.co/spaces/microsoft/LLMLingua>
* <https://github.com/microsoft/LLMLingua>
