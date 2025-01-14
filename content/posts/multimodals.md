---
title: Multi-Modal LLMs
date: "2024-06-11T18:00:00+00:00"
lang: en
tags:
  - LLMs
  - Machine Learning
---

This article is about Multi-Modal LLMs

## Intro ##

In the context of Large Language Models (LLMs), "multi-modal" refers to the capability of a model to process and generate data across different types of input and output modalities. This typically involves integrating and handling various forms of data such as text, images, audio, and even video within a single model. The goal is to create a more comprehensive and versatile AI that can understand and generate responses that are not limited to just one type of data.

## Key Concepts of Multi-modal LLMs ##

### Cross-Modal Understanding ###

Multi-modal LLMs can interpret and connect information across different types of inputs. For example, the model can understand a question posed in text form and provide an answer based on an image input.

### Data Integration ###

These models are trained on datasets that include multiple data types, allowing them to learn correlations and relationships between text, images, and other forms of data.

### Unified Architecture ###

A unified architecture typically supports multiple modalities within a single framework, enabling seamless interaction between different types of data. This contrasts with separate models for each modality.

### Enhanced Applications ###

Multi-modal capabilities enable a wide range of applications such as image captioning, visual question answering, audio-visual recognition, and more. For instance, a multi-modal model can generate descriptive text based on an image or understand and generate responses that consider both text and image inputs.

## Examples of Multi-modal LLMs ##

* **OpenAI's GPT-4**: GPT-4 can process and generate both text and image inputs, allowing it to perform tasks like describing the contents of an image or generating text based on visual input.
* **Google's MUM (Multitask Unified Model)**: MUM can handle information across text and images and is designed to perform complex queries that require understanding multiple modalities.
* **BakLLaVA**: is a multimodal model consisting of the Mistral 7B base model augmented with the LLaVA architecture.
* **LLaVA**: is a novel end-to-end trained large multimodal model that combines a vision encoder and Vicuna for general-purpose visual and language understanding. Updated to version 1.6.

## Testing ##

Lets use ollama to pull the bakllava model

```sh
ollama run bakllava
```

Then send one input picture eg.

```sh
>>> What's in this image? /Users/jmorgan/Desktop/smile.png
The image features a yellow smiley face, which is likely the central focus of the picture.
```

## Conclusion ##

In summary, multi-modal LLMs represent an advanced stage in the development of AI, enabling models to process and generate content across various data types, thereby enhancing their capability to interact with and understand the world in a more holistic manner.

## References ##

* <https://llava-vl.github.io>
* <https://github.com/SkunkworksAI/BakLLaVA>
* <https://ollama.com/library/bakllava>
