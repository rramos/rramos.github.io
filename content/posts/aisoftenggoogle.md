---
title: AI In Software Engineering
date: "2024-06-07T17:00:00+00:00"
lang: en
tags:
  - AI
  - Software Development
  - Leadership
---

Article about advancements in AI for Software Development and practices Google implemented with an interesting rate of AI application on the development flow.

## Intro ##

Humans are one of the most expensive parts of software creation. While companies can always add more equipment, adding more people comes with additional recruitment, training, and communication overhead. At Google, we have more than 30,000 developers, so if we can make even small improvements to individual developers’ productivity, we can attain large overall benefits for our products and their users.

## Metrics Gathering ##

In this [study](https://ieeexplore.ieee.org/document/9159122) Google with the approval of its employees gathered usage metrics of the several events associated with software development which they than can aggregate in sessions.

Once events are organized into sessions, those sessions can be used to derive other metrics about developers’ behaviors.

1. **Coding time**: representing the time spent writing or maintaining code.

1. **Reviewing time**: representing the time spent reviewing code.

1. **Shepherding time**: representing the time spent addressing code review feedback.

1. **Investigation time**: representing the time spent reading documentation.

1. **Development time**: representing the time spent performing a development activity, of any type.

1. **Email time**: the time spent interacting with email.

1. **Meeting time**: the time spent in meetings.

The tool allowed the team to investigate and obtain interesting findings:

1. They found that they could predict negative interpersonal interactions during code review by using the 90th percentile of both reviewing and shepherding time.
2. They found that a new version control system got their changes reviewed more quickly because the new tooling made it easier to create many small changes.

Please check the full [article](https://ieeexplore.ieee.org/document/9159122) as it has very insightfull information.

## Code Review ##

The main goal of code review is to **improve the readability and maintainability of the code base**, and this is supported fundamentally by the **review process**. However, having a well-defined code review process is only one part of the code review story. Tooling that supports that process also plays an important part in its success.

### Code Review Principals ###

This are the principals that Google follow for Code Reviews you can read the full article [here](https://abseil.io/resources/swe-book/html/ch19.html)

#### Simplicity ####

*Critique’s user interface (UI) is based around making it easy to do code review without a lot of unnecessary choices, and with a smooth interface. The UI loads fast, navigation is easy and hotkey supported, and there are clear visual markers for the overall state of whether a change has been reviewed.*

#### Foundation of trust ####

*Code review is not for slowing others down; instead, it is for empowering others. Trusting colleagues as much as possible makes it work.  This might mean, for example, trusting authors to make changes and not requiring an additional review phase to double check that minor comments are actually addressed. Trust also plays out by making changes openly accessible (for viewing and reviewing) across Google.*

#### Generic communication ####

*Communication problems are rarely solved through tooling. Critique prioritizes generic ways for users to comment on the code changes, instead of complicated protocols. Critique encourages users to spell out what they want in their comments or even suggests some edits instead of making the data model and process more complex. Communication can go wrong even with the best code review tool because the users are humans.*

#### Workflow integration ####

*Critique has a number of integration points with other core software development tools. Developers can easily navigate to view the code under review in our code search and browsing tool, edit code in our web-based code editing tool, or view test results associated with a code change.*

The [article](https://abseil.io/resources/swe-book/html/ch19.html) also has one example flow for the code review process with very detailed information of the actions conducted.

The article concludes with the implicit trade-offs when using a code review tool.

Now if you associate the previous work where you get those metrics and using this **Code Review** flow as one of the example activities, there is great value here on having a tool agentv leveraging LLMs to support developers.

This takes me to the next article

## DIDACT ##

Today we describe DIDACT (​​Dynamic Integrated Developer ACTivity), which is a methodology for training large machine learning (ML) models for software development. The novelty of DIDACT is that it uses the process of software development as the source of training data for the model, rather than just the polished end state of that process, the finished code.

The following [article](https://research.google/blog/large-sequence-models-for-software-development-activities/) provides more insigthfull information

DIDACT turns Google's software development process into training demonstrations for ML developer assistants, and uses those demonstrations to train models that construct code in a step-by-step fashion, interactively with tools and code reviewers. These innovations are already powering tools enjoyed by Google developers every day. The DIDACT approach complements the great strides taken by large language models at Google and elsewhere, towards technologies that ease toil, improve productivity, and enhance the quality of work of software engineers.

## Progress so far ##

Google has been making amazing advancements in this field as shown in previous articles, which lead to the latest [one](https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/) focusing on Progress and path ahead and there are some numbers here which I think are worth checking.

It is normal practise that developers use code-completion functionalities in IDEs, so increasing that functionality with AI assisted completion like Copilot or other options would be a natural move. But Google went further and incorporated AI like we seen previously with DIDACT for activities like: code review, code search, bug management and other outer loop surfaces and they captured those metrics.

* They seen continued fast growth of code completion similar to other enterprise contexts, with an **acceptance rate by software engineers of 37%** assisting in the completion of **50% of code characters**.

In other words, the same amount of characters in the code are now completed with AI-based assistance as are manually typed by developers. While developers still need to spend time reviewing suggestions, they have more time to focus on code design.

* Our next significant deployments were resolving code review comments (**>8% of which are now addressed with AI-based assistance**) and automatically adapting pasted code to the surrounding context (now responsible for ~2% of code in the IDE)

* Further deployments include **instructing the IDE to perform code edits with natural language** and **predicting fixes** to build failures.

Google is continue to invest in this field and incorporate latest [Gemini](https://blog.google/technology/ai/google-gemini-ai/) models which means this process would be even better.

## Industry Trends ##

Google highlights two trends they see in the industry:

1. **Human-computer interaction has moved towards natural language** as a common modality, and we are seeing a shift towards using language as the interface to software engineering tasks as well as the gateway to informational needs for software developers, all integrated in IDEs.

1. **ML-based automation of larger-scale tasks** - from diagnosis of an issue to landing a fix — has begun to show initial evidence of feasibility. These possibilities are driven by innovations in agents and tool use, which permit the building of systems that use one or more LLMs as a component to accomplish a larger task.

To expand on the above successes toward these next generation capabilities, the community of practitioners and researchers working in this topic would benefit from common benchmarks to help move the field towards practical engineering tasks. So far, benchmarks have been focused mostly around code generation.

## Conclusion ##

As this article started *Humans are one of the most expensive parts of software creation* so it is only natural that companies look for options to lower that barrier and have more profit.
There are several activities associated with software development which can be empowered with the usage of tools, we see that happening for years now (eg. IDE auto-completion). If your software development cycle can be broken down to leverage this type of AI tools like DIDACT, I would suggest preparing the road for it.
The other important outcome I take from this several articles from Google is the that *with AI-based suggestions, the code author increasingly becomes a reviewer*. It is important to find a balance between the cost of review and added value for the business as ML Products are expensive, not only the training but also the service part.

I would definitely like to work out on implementing something like this as my own personal agent to complement my skills integrated in my IDE and becoming more of an orchestrator of agents than a specialist on a specific field.

## References ##

* <https://research.google/blog/large-sequence-models-for-software-development-activities>
* <https://arxiv.org/abs/2205.06537>
* <https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead>
* <https://blog.google/technology/ai/google-gemini-ai/>
* <https://www.linkedin.com/pulse/navigating-career-paths-generalist-vs-specialist-t-shaped-masriah-ngmsf>
