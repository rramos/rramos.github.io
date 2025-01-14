---
title: act
date: "2024-05-20T22:00:00+00:00"
lang: en
tags:
  - CI/CD
  - Development
---

In this article I will go through what is the act tool.

## Intro ##

In this article I will go through act tool.

## Context ##

... So one of this days my github actions stopped working while deploying this hexo pages.

(*It was related with one of my github actions module that required one update, but that is not relevant*).

I start doing some dumb changes and quickly realize that I would need some way to test the execution environment and not just doing blind pushes to validate the changes.

Obviously some smart fellows also passed through this and implemented a nice tool for doing exactly that called **act**

So I'm registering on this notes in case I need to use it again (probably will)

## act ##

> "Think globally, act locally"

Run your GitHub Actions locally! Why would you want to do this? Two reasons:

* **Fast Feedback** - Rather than having to commit/push every time you want to test out the changes you are making to your .github/workflows/ files (or for any changes to embedded GitHub actions), you can use act to run the actions locally. The environment variables and filesystem are all configured to match what GitHub provides.
* **Local Task Runner** - I love make. However, I also hate repeating myself. With act, you can use the GitHub Actions defined in your .github/workflows/ to replace your Makefile!

## The issue ##

So I' m using hexo to generate the html from my markdown pages and integrated with github actions using the following repo:

* <https://github.com/sma11black/hexo-action>

But it seems the repo lacks some attention in regards to updates.

And according to github node12 actions support is deprecated and developers should change to node16.

* **Ref:** <https://github.blog/changelog/2022-09-22-github-actions-all-actions-will-begin-running-on-node16-instead-of-node12/>

Well the good thing of opensource is that you can fork the repo and fix the things on your own or search for some other alternative.

## Forked ##

Probably not the best option as there are certainly some better developers than I, but I wanted to fix this quickly.

After forking the repo to <https://github.com/rramos/hexo-action> I can start messing thing up, but I need a way to test this.

This is where ACT comes in place

## Download ##

The instruction look pretty straight forward

```sh
git clone git@github.com:nektos/act.git
```

There should be some package for your distribution but I didn' t have time for that.

```sh
cd act
make build
```

This generate a binary, good thing they implemented this in Golang :D

```sh
export PATH=$PATH:/`pwd`/dist/local
act -h
```

The previous one is to make sure you have  the command available on that terminal if you want to install on the system for future use, run make install.

**NOTE:** I would advise however to check for any distribution package

## Test Github Actions ##

Now lets head to our repository where our .github/workflows directory exist and test this thing.

I'm going to use the repo that which has the githuactions.
Check the following article <https://rramos.github.io/2024/01/26/githubactions>, if you like to know more

But will change the packages for deploy action to my fork

```sh
...
    # Deploy hexo blog website.
    - name: Deploy
      id: deploy
      uses: rramos/hexo-action@master
      with:
        deploy_key: ${{ secrets.HEXO_DEPLOY_KEY }}
        user_name: <user>  # (or delete this input setting to use bot account)
        user_email: <email>  # (or delete this input setting to use bot account)
        commit_msg: ${{ github.event.head_commit.message }}
...
```

And run the command

```sh
act
```

**NOTE:** The first run it will ask the type of resources that you would like to assign to docker

And that' s it you now can start messing with the actions images

In my case i just switch the node image to node22, because I like violence and did a quick fix on the Spawn module which change location and seemed to fix for now.

## Act User Guide ##

I would recommend to check the Official **act** User Guide:

* <https://nektosact.com>

## How Does It Work ##

When you run act it reads in your GitHub Actions from **.github/workflows/** and determines the set of actions that need to be run. It uses the Docker API to either pull or build the necessary images, as defined in your workflow files and finally determines the execution path based on the dependencies that were defined. Once it has the execution path, it then uses the Docker API to run containers for each action based on the images prepared earlier. The environment variables and filesystem are all configured to match what GitHub provides.

## Conclusion ##

**act** is a very useful tool if you like to test/change the actions for GitHub actions without polluting your branches with test attempts. It also speeds up you development process and allows you to make more interesting changes on existing images.

## References ##

* <https://github.com/nektos/act>
* <https://github.com/orgs/community/discussions/36493>
* <https://nektosact.com/>
* <https://nektosact.com/installation/aur.html>

**NOTE:** *This article was written without AI support feel free to enhance it as you like. But remember John Connor is watching you*
