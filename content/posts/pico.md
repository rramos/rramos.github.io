---
title: pico.sh
date: "2024-02-29T13:00:00+00:00"
lang: en
tags:
  - Hosting
---

This article is about Pico service

## Intro ##

We think of pico.sh as a hacker lab where we can experiment with new ways to interact with the web.

## Features ##

Pico supports the following services:

* prose.sh - A blog platform for hackers
* pastes.sh - A pastebin for hackers
* feeds.sh - An rss email notification service

The paid version called pico+ brings more service

## pico+ ##

Paid version of pico which brings extra services:

* pgs.sh - 10GB asset storage
* tuns.sh - Full access
* imgs.sh - 2GB image registry storage
* prose.sh - 1GB image storage
* Beta access

## Setup ##

### Prose ###

**Prose.sh** - This service allows you to upload Github flavor markdown and it will generate the HTML content to display you just need to sync the data.

Create a post eg. `~/blog/hello-world.md`

```md
# hello world!

This is my first blog post.

Check out some resources:

- [pico.sh](https://pico.sh)
- [antoniomika](https://antoniomika.me)
- [bower.sh](https://bower.sh)

Cya!
```

And just publish with rsync

```bash
rsync ~/blog/* prose.sh:/
```

There are some special files you can setup to customize the css or add a footer

* `_styles.css`
* `_footer.md`

But that's pretty much it

Check the following doc for more information

* <https://pico.sh/prose>

### Pastes ###

You can also use the pastebin service

```bash
echo "foobar" | ssh pastes.sh
```

You can define a expiration

```bash
echo "foobar" | ssh pastes.sh FILENAME expires=2023-12-12
```

It will generate a url for your paste
eg: <https://ruimsramos.pastes.sh/1709216080780412798>

## Conclusion ##

This article was about pico a hacker labs service as they advertise it.

It is extremely fast if you want to use a pastbin option to share some data or quickly upload in prose some markdown notes, when you don't need to worry on setting up something facing just to publish them and focus on the writing.

The pro service like tuns.hs and imgs.sh seem to be also powerful. The later one if you ant to integrate with github actions for instance, but I didn't evaluate that version

## References ##

* <https://pico.sh/getting-started>
* <https://pico.sh/prose>
