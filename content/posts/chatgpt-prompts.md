---
title: Chat-GPT Data Science Prompts
date: "2023-07-25T11:00:00+00:00"
lang: en
tags:
  - OpenAI
  - ChatGPT
  - Data Science
  - Prompt Engineering
---
## Excertpt ##

This article gather several ChatGPT prompts

## Intro ##

This article is a resume of Travis Tang Medium article reference on the Reference section. According to Travis Chat GPT performs well in explaining things and providing boilerplate code, however falters when comes to debugging or creating complex snippets.

I totally agree with Travis mention

> Will ChatGPT replace data scientists? No, I don’t think so. At least not yet. However someone using ChatGPT might.
>
> I hope these prompts are helpful for you! It certainly helped me.

Check him in <https://medium.com/@travis-tang>

## Write Python ##

### Train Classification Model ###

>Prompt: I want you to act as a data scientist and code for me. I have a dataset of [describe dataset]. Please build a machine learning model that predict [target variable].

### Automatic Machine Learning ###

> Prompt: I want you to act as an automatic machine learning (AutoML) bot using TPOT for me. I am working on a model that predicts [...]. Please write python code to find the best classification model with the highest AUC score on the test set.

### Tune Hyperparameter ###

> Prompt: I want you to act as a data scientist and code for me. I have trained a [model name]. Please write the code to tune the hyper parameters.

### Explore Data ###

> Prompt: I want you to act as a data scientist and code for me. I have a dataset of [describe dataset]. Please write code for data visualisation and exploration.

### Generate Data ###

> Prompt: I want you to act as a fake data generator. I need a dataset that has x rows and y columns: [insert column names]

### Get Feature Importance ###

> Prompt: I want you to act as a data scientist and explain the model’s results. I have trained a decision tree model and I would like to find the most important features. Please write the code.

### Visualize Data with Matplotlib ###

> Prompt: I want you to act as a coder in python. I have a dataset [name] with columns [name]. [Describe graph requirements]

### Visualize Image Grid Matplotlib ###

> Prompt: I want you to act as a coder. I have a folder of images. [Describe how files are organised in directory] [Describe how you want images to be printed]

### Explain Model with Lime ###

> Prompt: I want you to act as a data scientist and explain the model’s results. I have trained a [library name] model and I would like to explain the output using LIME. Please write the code.

### Explain Model with Shap ###

> Prompt: I want you to act as a data scientist and explain the model’s results. I have trained a scikit-learn XGBoost model and I would like to explain the output using a series of plots with Shap. Please write the code.

### Write Multithreaded Functions ###

> Prompt: I want you to act as a coder. Can you help me parallelize this code across threads in python?

### Compare Function Speeds ###

> Prompt: I want you to act as a software developer. I would like to compare the efficiency of two algorithms that performs the same thing in python. Please write code that helps me run an experiment that can be repeated for 5 times. Please output the runtime and other summary statistics of the experiment. [Insert functions]

### Create NumPy Array ###

> Prompt: I want you to act as a data scientist. I need to create a numpy array. This numpy array should have the shape of (x,y,z). Please initialize the numpy array with random values.

## Test Code ##

### Write Unit Test ###

> Prompt: I want you to act as a software developer. Please write unit tests for the function [Insert function]. The test cases are: [Insert test cases]

### Validate Column ###

> Prompt: I want you to act as a data scientist. Please write code to test if that my pandas Dataframe [insert requirements here]

## Explain Code ##

### Explain Python ###

> Prompt: I want you to act as a code explainer. What is this code doing? [Insert code]

### Explain SQL ###

> Prompt: I want you to act as a data science instructor. Can you please explain to me what this SQL code is doing? [Insert SQL code]

### Explain Google Sheets Formula ###

> Prompt: I want you to act as a Google Sheets formula explainer. Explain the following Google Sheets command. [Insert formula]

## Optimize Code ##

> Prompt: I want you to act as a software developer. Please help me improve the time complexity of the code below. [Insert code]

## Improve Code Speed ##

> Prompt: I want you to act as a code optimizer. Can you point out what’s wrong with the following Pandas code and optimize it? [Insert code here]

### Optimize Pandas ###

> Prompt: I want you to act as a code optimizer. Can you point out what’s wrong with the following Pandas code and optimize it? [Insert code here]

### Optimize Pandas Again ###

> Prompt: I want you to act as a code optimizer. Can you point out what’s wrong with the following Pandas code and optimize it? [Insert code here]

### Optimize Python ###

> Prompt: I want you to act as a code optimizer. The code is poorly written. How do I correct it? [Insert code here]

## Optimize SQL ##

> Prompt: I want you to act as an SQL code optimizer. The following code is slow. Can you help me speed it up? [Insert SQL]

## Format code ##

### Simplify Python ###

>Prompt: I want you to act as a code simplifier. Can you simplify the following code?

### Write Documentation ###

> Prompt: I want you to act as a software developer. Please provide documentation for func1 below. [Insert function]

### Improve Readability ###

> Prompt: I want you to act as a code analyzer. Can you improve the following code for readability and maintainability? [Insert code]

### Format SQL ###

>Prompt: I want you to act as a SQL formatter. Please format the following SQL code. Please convert all reserved keywords to uppercase [Insert requirements]. [Insert Code]

## Translate Code ##

### Translate Between DBMS ###

> Prompt: I want you to act as a coder and write SQL code for MySQL. What is the equivalent of PostgreSQL’s DATE_TRUNC for MySQL?

### Translate Python to R ###

> Prompt: I want you to act as a code translator. Can you please convert the following code from python to R? [Insert code]

### Translate R to Python ###

> Prompt: I want you to act as a code translator. Can you please convert the following code from R to python? [Insert code]

## Explain concepts ##

### Explain to Five-Year-Old ###

>Prompt: I want you to act as a data science instructor. Explain [concept] to a five-year-old.

### Explain to Undergraduate ###

> Prompt: I want you to act as a data science instructor. Explain [concept] to an undergraduate.

### Explain to Professor ###

>Prompt: I want you to act as a data science instructor. Explain [concept] to a professor.

### Explain to Business Stakeholder ###

> Prompt: I want you to act as a data science instructor. Explain [concept] to a business stakeholder.

### Explain Like Stackoverflow ###

> Prompt: I want you to act as an answerer on StackOverflow. You can provide code snippets, sample tables and outputs to support your answer. [Insert technical question]

## Suggest ideas ##

### Suggest Edge Cases ###

> Prompt: I want you to act as a software developer. Please help me catch edge cases for this function [insert function]

### Suggest Dataset ###

> Prompt: I want you to act as a data science career coach. I want to build a predictive model for [...]. At the same time, I would like to showcase my knowledge in [...]. Can you please suggest the five most relevant datasets for my use case?

### Suggest Portfolio Ideas ###

> Prompt: I want you to act as a data science coach. My background is in [...] and I would like to [career goal]. I need to build a portfolio of data science projects that will help me land a role in [...] as a [...]. Can you suggest five specific portfolio projects that will showcase my expertise in [...] and are of relevance to [company]?

### Suggest Resources ###

> Prompt: I want you to act as a data science coach. I would like to learn about [topic]. Please suggest 3 best specific resources. You can include [specify resource type]

### Suggest Time Complexity ###

> Prompt: I want you to act as a software developer. Please compare the time complexity of the two algorithms below. [Insert two functions]

### Suggest Feature Engineering ###

> Prompt: I want you to act as a data scientist and perform feature engineering. I am working on a model that predicts [insert feature name]. There are columns: [Describe columns]. Can you suggest features that we can engineer for this machine learning problem?

### Suggest A/B Testing Steps ###

> Prompt: I want you to act as a statistician. [Describe context] Please design an A/B test for this purpose. Please include the concrete steps on which statistical test I should run.

### Career Coaching ###

> Prompt: I want you to act as a career advisor. I am looking for a role as a [role name]. My background is [...]. How do I land the role and with what resources exactly in 6 months?

## Troubleshoot problem ##

### Correct ChatGPT Code ###

> Prompt: Your above code is wrong. [Point out what is wrong]. Can you try again?

### Correct Python Code ###

> Prompt: I want you to act as a software developer. This code is supposed to [expected function]. Please help me debug this python code that cannot be run. [Insert function]

### Correct SQL Code ###

> Prompt: I want you to act as a SQL code corrector. This code does not run in [your DBMS, e.g. PostgreSQL]. Can you correct it for me? [SQL code here]

### Troubleshoot PowerBI Model ###

> Prompt: I want you to act as a PowerBl modeler. Here is the details of my current project. [Insert details]. Do you see any problems with the table?

## Write SQL ##

### Create Running Average ###

> Prompt: I want you to act as a data scientist and write SQL code for me. I have a table with two columns [Insert column names]. I would like to calculate a running average for [which value]. What is the SQL code that works for PostgreSQL 14?

### Solve Leetcode Question ###

> Prompt: Assume you are given the tables… with the columns… Output the following…Prompt: Assume you are given the tables… with the columns… Output the following…

## Write other Code ##

### Write Google Sheets Formula ###

> Prompt: I want you to act as a bot that generates Google Sheets formula. Please generate a formula that [describe requirements]

### Write R ###

> Prompt: I want you to act as a data scientist using R. Can you write an R script that [Insert requirement here]

### Write Shell ###

> Prompt: I want you to act as a Linux terminal expert. Please write the code to [describe requirements]

### Write VBA ###

> Prompt: I want you to act as an Excel VBA developer. Can you write a VBA that [Insert function here]?

## Miscellaneous ##

### Format Tables ###

> Prompt: I want you to act as a document formatter. Please format the following into a nice table for me to place in Google Docs? [insert text table here]

## Summarize Book ##

> Prompt: I want you to act as a technical book summarizer. Can you please summarize the book [name] with 5 main points?

### Summarize Paper ###

> Prompt: I want you to act as an academic. Please summarise the paper [...] in simple terms in one paragraph.

### Provide Emotional Support ###

> Prompt: I want you to provide emotional support to me. [Explain problem here.]

## Reference ##

* <https://medium.datadriveninvestor.com/60-chatgpt-prompts-for-data-science-tried-tested-and-rated-4994c7e6adb2>
