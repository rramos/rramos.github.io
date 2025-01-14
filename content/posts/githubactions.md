---
title: GitHub Actions
date: "2024-01-26T18:00:00+00:00"
tags:
  - CI/CD
  - GitHub
  - Hexo
---

In this article I will go through the steps to setup github actions to deploy hexo pages upon push requests into Github

## Intro ##

In this article I will go through the steps to setup github actions to deploy hexo pages upon push requests into [Github pages](https://pages.github.com/)

## Github Actions ##

GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.

Check the available [documentation](https://docs.github.com/en/actions) as there are several interesting examples

## Hexo Setup ##

This tech notes site is maintained by [Hexo](https://hexo.io/) a markdown blob framework.

The framework generates html static content based on Markdown articles an one needs carry the following steps to update content

* Create/Update Markdown content
* Execute `hexo generate` to generate content
* Validate the pages with `hexo serve`
* Deploy to your hosting service `hexo deploy`

## Setup ##

Include the following file `.github/workflows/hexo-deploy.yml` on your hexo repo with the content:

```yaml
name: Deploy

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    name: Deploying udateds Hexo articles
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        submodules: 'true'
        token: ${{ secrets.ACCESS_TOKEN }}

    # Caching dependencies to speed up workflows. (GitHub will remove any cache entries that have not been accessed in over 7 days.)
    - name: Cache node modules
      uses: actions/cache@v1
      id: cache
      with:
        path: node_modules
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-
          
    - name: Install Dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      run: npm ci
    
    # Deploy hexo blog website.
    - name: Deploy
      id: deploy
      uses: sma11black/hexo-action@v1.0.4
      with:
        deploy_key: ${{ secrets.HEXO_DEPLOY_KEY }}
        user_name: <GITHUB_USER>  # (or delete this input setting to use bot account)
        user_email: <GITHUB_EMAIL>  # (or delete this input setting to use bot account)
        commit_msg: ${{ github.event.head_commit.message }} 

    # Use the output from the `deploy` step(use for test action)
    - name: Get the output
      run: |
        echo "${{ steps.deploy.outputs.notify }}"
```

1. Replace `<GITHUB_USER>` with your user account and `<GITHUB_EMAIL>` with your email address
1. Generate a new ssh-key with the command `ssh-keygen -t rsa -C "<GITHUB_EMAIL>"` making sure to use you email account
1. This step will generate 2 files a pub key which you need to configure on the destination repo as one allowed **Deployment key**
1. And on the source repo you need to configure a secret where you will put the ssh-key
1. Configure a personal token and register also as a secret on the source repository as **ACCESS_TOKEN**

That's it you just need to start pushing changes

**NOTE:** This assumes the hexo source repository was already configured for the destination github pages account.

## Multi repos ##

It is important to notice that you cannot assign the same deployment key for several repositories.

That is why I used a personal token, but there should be better alternatives.

## Conclusion ##

Github Actions is a really powerful CI/CD tool and for this type of static generation content works rather well.

I had several issues regarding github submodules where the authentication was not passing. If you use the same approach for themes, you may endup on the same situation and using a token approach would be preferable

Also the ssh-keys being bounded by repo caused some initial confusion and there should be a better way to setup the authentication but I didn't explore it in detail.

Also `package-lock.json` are required for this to work and is advisable to have your source repo as private.

This workflow can certainly be improve like including tests and making sure that grammar validation is done as one example.

## References ##

* <https://hexo.io>
* <https://github.com/marketplace/actions/hexo-action>
* <https://pages.github.com/>
