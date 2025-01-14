---
title: pacseek
date: "2024-06-18T02:00:00+00:00"
tags:
  - Arch
  - Linux
  - Utils
  - Package Management
---

This article is about pacseek a terminal user interface for searching and installing Arch Linux packages

## Intro ##

This article is about pacseek a terminal user interface for searching and installing Arch Linux packages

## Context ##

One of the things that that bugs me a bit is the fact that when I' m trying to install some package in Arch with `pacman` command and is not present on the repository which makes search for a [aur](https://aur.archlinux.org/packages) package. If you like to know more about aur packages check the following article.

It would be interesting to have a way to search those packages directly from the terminal and and just let your package manager deal with it.

This application requires aya which is a AUR helper written and go.

Make sure to pay Mario Oenning a beer for this work.

## Installation ##

```sh
sudo pacman -S pacseek yay
```

When you start the command the first time it will create a `~/.config/pacseek/config.json` configuration file which you can edit manually or use the settings screen

## Using ##

Let's say we would like to install a telegram application and understand which options we may find.

```sh
pacseek telegram
```

We would end-up with a similar interface to choose

![packseek screenshoot](/images/pacseek.png)

If the package does not exist on the default [chaotic-aur repo](https://aur.chaotic.cx/) it downloads from one exiting aur reference including dependencies and starts the build process.

I'm surely going to start using this from now on.

I would like to find some tool that would give statistics utilization of commands and recommendations for auto-cleaning. That could be a nice side-project there isn't something like this already.

## Conclusion ##

In this article we went through **pacseek** a terminal user interface that would speed your process to install packages in Arch that may not be available on chaotic-aur repo and you need to download the dependencies and build it, without the need to search for them on the browser. It also shows you the dependencies and takes care of downloading the missing ones.

## References ##

* <https://github.com/moson-mo/pacseek>
* <https://aur.archlinux.org/packages>
* <https://github.com/moson-mo/pacseek/wiki>
* <https://aur.chaotic.cx>
