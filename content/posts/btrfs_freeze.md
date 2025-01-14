---
title: btrfs freeze
date: "2024-12-03T19:00:00+00:00"
lang: en
tags:
  - Linux
  - Filesystems
---

Quick tip if your BTRFS system seems to freeze from time to time

## Intro ##

In this article I will explain 2 configurations that you might consider if using BTRFS and start noticing some freezing on the system.

### Beahvior ###

From time to time I started noticing that the system was getting freeze (1-2s) on everything. Mouse, window manager, sound, graphics and was not getting any outputs that justify this behavior for my Arch Linux system.

After googling a bit and getting to some Reddit posts, I managed to find some people that have the same issue, and it seems this behavior was all connected to BTRFS.

This two options seemed to work for me, as I also have SSDs

### Disable quotas in BTRFS ###

It seems quotas are still buggy. As I don't use them I run the following to disable them.

```sh
sudo btrfs quota disable /foo
```

**NOTE:** execute for all your mount points

### Run fstrim ###

fstrim is used on a mounted filesystem to discard (or "trim") blocks which are not in use by the filesystem. This is useful for solid-state drives (SSDs) and thinly-provisioned storage.

Running the following command will trim all mounted filesystems mentioned in `/etc/fstab` on devices that support the discard operation.

```sh
sudo fstrim -Av
```

> **NOTE:** Running fstrim frequently, or even using mount -o discard, might
       negatively affect the lifetime of poor-quality SSD devices. For
       most desktop and server systems a sufficient trimming frequency
       is once a week.

That's it now reboot the computer and you should notice some differences.

## References ##

* <https://man7.org/linux/man-pages/man8/fstrim.8.html>
* <https://www.suse.com/support/kb/doc/?id=000020696>
