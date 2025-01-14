---
title: tldr
date: "2024-06-06T11:50:00+00:00"
lang: en
tags:
  - Utils
  - Linux
  - Mac
---

This article is about tldr, a community effort to simplify the beloved man pages with practical examples.

## Intro ##

The tldr pages are a community effort to simplify the beloved man pages with practical examples.

## What is tldr-pages ##

The tldr-pages project is a collection of community-maintained help pages for command-line tools, that aims to be a simpler, more approachable complement to traditional man pages.

Maybe you're new to the command-line world? Perhaps you're just a little rusty or can't always recall the arguments for commands like `lsof`, or `tar`?

The first option to consider would be `man tar` where you would get a long documented list of options, which still makes sense to use if you want to deepdive on the available argument and options.

But there seems to be room for simpler help pages, focused on practical examples using `tldr man`.

## How do I use it ##

For browsing without installing one can use directly <https://tldr.inbrowser.app>

Another option would be to install locally either with your package manager eg.

```sh
sudo apt-get install tldr
```

Or via NPM

```sh
npm install -g tldr
```

For Mac would be something like

```sh
brew install tlrc
```

## Post install ##

After installation don't forget to update

```sh
tldr --update
```

## How do I contribute to tldr-pages ##

Some ways to contribute include:

* Adding your favorite command which isn't covered.
* Adding examples or improving the content of an existing page.
* Adding requested pages from our issues with the help wanted label.
* Translating pages into different languages.

All `tldr` pages are written in markdown, so they can be edited quite easily and changes can be submitted in pull requests here using Git on the command-line or using the [GitHub](https://github.com/tldr-pages/tldr) web interface.

Just check the [Contribution Guidelines Page](https://github.com/tldr-pages/tldr/blob/main/CONTRIBUTING.md) for more details.

## What does "tldr" mean ##

TL;DR stands for "Too Long; Didn't Read". It originated as Internet slang, where it is used to indicate that a long text (or parts of it) has been skipped as too lengthy.

## References ##

* <https://tldr.sh/>
* <https://github.com/tldr-pages/tldr>
* <https://tldr.inbrowser.app>
