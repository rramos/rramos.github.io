---
title: Sublime Install Guide
date: "2017-09-23T09:18:00+00:00"
lang: en
tags:
  - IDE
  - Utils
  - Linux
---

Installation guide for Sublime

## Intro ##

Text Editing, Done Right

## Install ##

For me [Sublime](https://www.sublimetext.com/), this is one of the best smart editors in Linux. Here are the quick instructions to install for Ubuntu.

```bash
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install sublime-text
```
