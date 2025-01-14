---
title: Github ssh keys
lang: en
date: "2022-12-23T14:00:00+00:00"
tags:
  - Git
  - GitHub
  - SSH
---

This article is about Github ssh keys

## Intro ##

When using github one of the most recommend ways to get in sync with your repo is by using ssh keys. If you don't use it check the following article from github docs where they explain in detail how to do the setup

* <https://docs.github.com/en/github/authenticating-to-github/about-ssh>

On your **Profile** you can manage your SSH and GPG keys.

But take into account the following if you have more than one account the ssh-keys are unique on the system.

So if you have for example:

1. corporate account ruiramosff
1. personal account rramos

You need to have distinct ssh-keys per profile.

I would recommend for this cases to have distinct ssh keys and to a proper setup on your repo configurations adding for example

```bash
[user]
        name = Rui Ramos
        email = rui.ms.ramos@gmail.com
```

You can also do this globally on your `~./gitconfig` but if you are going to work on the same machine but want to use different profiles, pay attention to have the git configuration adapted to it.

Cheers,
RR
