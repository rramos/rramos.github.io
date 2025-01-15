---
title: ansible-cmdb
date: "2017-10-09T22:17:00+00:00"
lang: en
tags:
  - Ansible
  - DevOps
---

This article is about ansible-cmdb a nice solution for gathering your ansible facts into a visual format.

## Intro

This article is about [ansible-cmdb](https://github.com/fboender/ansible-cmdb) a very nice solution for gathering your ansible facts into a visual format.

> Ansible-cmdb takes the output of Ansible's fact gathering and converts it into a static HTML overview page (and other things) containing system configuration information.
> It supports multiple types of output (html, csv, sql, etc) and extending information gathered by Ansible with custom data. For each host it also shows the groups, host variables, custom variables and machine-local facts.

## Supported output formats / templates

- Fancy HTML (--template html_fancy), as seen in the screenshots above.
- Fancy HTML Split (--template html_fancy_split), with each host's details in a separate file (for large number of hosts).
- CSV (--template csv), the trustworthy and flexible comma-separated format.
- JSON (--template json), a dump of all facts in JSON format.
- Markdown (--template markdown), useful for copy-pasting into Wiki's and such.
- Markdown Split ('--template markdown_split'), with each host's details in a separate file (for large number of hosts).
- SQL (--template sql), for importing host facts into a (My)SQL database.
  Plain Text table (--template txt_table), for the console gurus.
  and of course, any custom template you're willing to make.

## Setup

And it's so simple to setup :D

```bash
sudo pip install ansible-cmdb
```

**Note:** You could also use your distribution preferred method. check the official site.

## Creating Reports

Simple console generation

```bash
ansible-cmdb -t txt_table --columns name,os,ip,mem,cpus out
```

The HTML Fancy one

```bash
ansible-cmdb --template txt_table out  --template html_fancy
```

Official Screenshot

![screenshot-overview](/images/screenshot-overview.png)

## Conclusion

I found this software quite simple and very useful. I found that `--template txt_table` is quite handy to use on Documentation for small environments. For bigger projects the CSV could be a better choice. Also the fancy HTML templates are very useful on playbook development phases where you can confirm your facts very easily. Ansible-cmdb started as a short Python script, but many people made contributions so far.

Cheers,
RR

## References

- <https://github.com/fboender/ansible-cmdb>
