---
title: hexo-twitter
date: "2024-06-18T23:00:00+00:00"
lang: en
tags:
  - Hexo
  - Twitter
---

In this article I will go through the setup process to auto publish updates from Hexo into twitter

## Intro ##

In this article I will go through the setup process to auto publish updates from Hexo into twitter

## Context ##

Due to GDPR regulations I had to make some changes on this blog related with consent as I configured Google Analytics to track visitors of the Website. While researching several hexo plugins and services I introduced several changes that would improve the reach of the articles.

One of the ways is to populate my twitter feed when there are new articles created.

## Requirements ##

* This configure requires the usage of [hexo](https://hexo.io/) . If you don't know is a blogging framework that converts Markdown into html pages, similar to [jekyll](https://jekyllrb.com/)
* Also you will need to have a twitter dev account

## Twitter Dev Account ##

In order to use the twitter API you need a Dev account, and it seems you need to apply. Check the following URL <https://developer.twitter.com> and follow the steps in order to have your key.

In your project App you should be able to generate the required secrets for:

* TWITTER_CONSUMER_KEY
* TWITTER_CONSUMER_SECRET
* TWITTER_ACCESS_TOKEN_KEY
* TWITTER_ACCESS_TOKEN_SECRET

This information you be required later

## Hexo Plugin ##

In order to have Hexo auto-publishing to twitter install the following plugin

```sh
npm i hexo-twitter-auto-publish
```

You now have 2 options you can define the following configuration on your `_config.yml` file:

```yaml
twitterAutoPublish:
  consumerKey: Xegp8XDTMqVxcI2tId1juT70X
  consumerSecret: fq4eY5NmK2X9ZxSDSUaFqMBPWWMUCCYu35PMvzoqB0YzqLOTEs
  accessTokenKey: 929842798974656517-VuQxIuoLhtoeqW71LofX6M5fIw8Pf3c
  accessTokenSecret: R5RZtQj5tLWbSgFx39lq6cd2AcIQRjQk5kbepOobxCplA
```

What this does is to trigger the publishing method after each `hexo deploy` action or you can execute `hexo twitter-publish` specifically to publish new articles.

## Github Actions ##

In case you use Github Actions to run `hexo deploy` to deploy your website updates you can setup the following secrets

* TWITTER_CONSUMER_KEY
* TWITTER_CONSUMER_SECRET
* TWITTER_ACCESS_TOKEN_KEY
* TWITTER_ACCESS_TOKEN_SECRET

And update your workflow to include

```yaml
...
   env:
        TWITTER_CONSUMER_KEY: ${{ secrets.TWITTER_CONSUMER_KEY }} 
        TWITTER_CONSUMER_SECRET: ${{ secrets.TWITTER_CONSUMER_SECRET }} 
        TWITTER_ACCESS_TOKEN_KEY: ${{ secrets.TWITTER_ACCESS_TOKEN_KEY }} 
        TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }} 
```

But you will have an issue as this plugin stores information of what was deployed on the following file `twitter-db.json` and each time you run it will take the status that it has on the master branch, so you would end up re-triggering already published tweets.

If you use this option I would suggest to disable the plugin for including `enable: false` and only use the `hexo twitter-publish` directly remembering that this would require an extra step to commit the `twitter-db.json` update. (I'll look if there is a better way for this)

## First deploy ##

If you check the `twitter-db.json` you will understand there are 3 arrays:\

* *published - contains posts that are already on twitter and each post has a tweetId.

* to-publish - contains all new posts that have not yet appeared on Twitter.

* to-destroy - contains posts that for some reason have been moved to a working version, or we changed the twitterAutoPublish in the page from true to false.

I would recommend moving the entries to **publish** in order to prevent publish old articles you have, or reaching the daily limit in twitter.

## Twitter Limitations ##

Twitter as some limitations for publishing, I will only focus here on the Free Account as there are other tiers with extended functionality and less limitations

Use-case: **For write-only use cases and testing the X API**

* Rate limited access to v2 post posting and media upload endpoints
* 1,500 Posts per month - posting limit at the app level
* 1 app ID
* Login with X

You also have a daily cap so if you try to push lots of articles at once you will probably bump on that limit

## Conclusion ##

In this article we went through the process of setup Hexo with hexo-twitter-auto-publish which allow automatically publish tweets from the new/updated articles. This can run in deploy mode or directly with `hexo twitter-publish` command. We also touch some limitations that can be found if integrated with Github Actions. This plugin allows one to extend the reach of the publications.

After searching for available plugins in Hexo this was one of the few that where actually maintained, most of then have more than 6 years without updates and few contributions which makes me think if Jekyll would' t be a better approach. But that assessment would go for another time

## References ##

* <https://github.com/studioLaCosaNostra/hexo-twitter-auto-publish>
* <https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions>
