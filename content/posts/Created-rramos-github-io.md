---
title: Created rramos.github.io
date: "2016-09-17T23:57:00+00:00"
lang: en
comments: true
tags:
  - GitHub
  - Hexo
  - Git
  - Markdown
---

Started Github pages Blog entries

## Started Github pages ##

I had several blogs in the past that i normally tend to ignore and stop writing, so this one will be a simple tech/personal blog with entries that i might find useful in the future to search quicker.

And as any normal blog i would start by writing the procedure of deploying the blog itself.

The only way i would keep this thing updated is if i have very quick way to edit via terminal a Markdown file and do a command like `post-it` and that's it.

So [hexo](https://hexo.io/) seems like a good solution for me.

Gonna try this one out.

So first things first, hosting. I'm cheap bastard so i don't have cool domain yet, and i just need some git repo for the blog.

Lets stick with [GitHub Pages](https://pages.github.com/) there git service is pretty awesome so lets try this one out.

**Mental-Note-To-Self:** Get some nice english corrector ;)

So i've just created a new repo in github and from the settings i've selected to build a standard GitHub Page.

cloned the dam thing to my computer

`git clone git@github.com:rramos/rramos.github.io.git`

## Installing Hexo ##

So first things first, let's install the requirements.

It requires:

* Node
* Git

Well, git i already have since a cloned the repo.
Node must be installed, but since i'm using Ubuntu Xenial i need to install the legacy one.

```sh
sudo apt install nodejs-legacy
```

Now starting to install hexo via npm.

```sh
sudo npm install -g hexo-cli
sudo npm install hexo-deployer-git --save
```

Ok that's it.

## Start writing ##

So i've run the following command on the repo, this initiates the hexo page structure.

```bash
hexo init
```

I've added the deploy configuration in _config.yml

```bash
deploy:
  type: git
  repo: git@github.com:rramos/rramos.github.io.git
  branch: master
```

I also downloaded a very simple theme, cas'm a simple guy. 

```bash
cd themes
git clone https://github.com/lotabout/very-simple
```

Thanks `@lotabout` for the theme by the way.

And installed the theme requirements

```bash
git clone https://github.com/lotabout/very-simple themes/very-simple
sudo npm install hexo-renderer-sass --save
sudo npm install hexo-renderer-jade --save
```

## Writing ##

So ... now i suppose i can start creating blog entries, let's start.

```bash
hexo new post "Created rramos.github.io"
```

I get the output where the md file is and start writing there.

After i have made sure my ssh keys where registered on github i simply deployed with

```bash
hexo deploy
```

And voilá: <https://rramos.github.io>  is up and running.

## Final touches ##

So hexo only dumps the public part of the blog which makes sense to the git repo. ~~But i want to include all the source and not have separated repositories for that.~~

I've created a src dir and copy all the source data there, now i can edit directly that repo, let's take that advantage and remove the default hello world page from the structure guess there might exist a command for that.

```bash
$ hexo list post
INFO  Start processing
Date        Title                     Path                                Category  Tags
2016-09-17  Created rramos.github.io  _posts/Created-rramos-github-io.md
2016-09-18  Hello World               _posts/hello-world.md
```

There you are you bastard hello-world, lets get ride of you.

```bash
hexo clean
rm source/_posts/hello-world.md
hexo generate
```

Well guess that's it. There is a lot to explore in hexo from what i can tell, need to check the documentation and understand the community envolvment. Also a quick way to add imagens and other objects and define the quick way to deploy.

## Separate public from source ##

It turns out that have the source and public data in the same repo causes some issues on the updates. The best approach seems to have a separate repo for the source data and the official Github Pages or other hosting service with git for the public part.

I've also added in this source repo a `.gitignore` with

```bash
public
db.json
.deploy_git
```

So now i just have to edit MarkDown hexo generate and hexo deploy, seems quick enough let's see if this time i can keep this updated.

Cheers,
RR
