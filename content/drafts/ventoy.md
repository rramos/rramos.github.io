---
title: ventoy
date: "2026-10-07T22:00:00+00:00"
lang: en
draft: true
tags:
  - linux
  - tools
---

In this article I will go through the process to setup a usb bootable pen with several distribution options using ventoy

## About Ventoy

Ventoy is an open source tool to create bootable USB drive for ISO/WIM/IMG/VHD(x)/EFI files.
With Ventoy, you don't need to format the disk over and over, just drag-and-drop files to the USB drive and boot them directly.
You can copy many files to different folders and Ventoy will give you a boot

## Why Ventoy

I was recently trying to install Windows in a old Laptop, and bumped in several issues although the image was properly cooked with Rufus, it didn't properly boot, on that device. fater searching for a bit I did understand there are several partition options GPT, MBR that can be setup, there is UEFI, Secure Boot, Native and Legacy mode. And also you would need to write that 5-8GB image in a bootable pen making the rest unusable. This option is much quicker allow you to include more boot options just moving into the pen the several isos you would like and Ventoy will provide you a bootable solution that would allow you to pick the one you woudl like. With Ventoy you can also browse ISO/WIM/IMG/VHD(x)/EFI files in local disk and boot them

## Setup

You just need to execute Ventoy instalation executable for Windows it would be something like Ventoy2Disk.exe, Linux you can use you package manager and install the tool

```sh
sudo pacman -S ventoy
```

Execute the application and select the usd device you want to install.

After the installation is complete, the USB drive will be divided into 2 partitions.
The 1st partition was formated with exFAT filesystem (You can also reformat it manually with NTFS/FAT32/UDF/XFS/Ext2/3/4 ... See Notes).

You just need to copy iso files to this partition. You can place the iso/wim/img/vhd(x) files any where. Ventoy will search all the directories and subdirectories recursively to find all the image files and list them in the boot menu alphabetically. Also you use plugin configuration to tell Ventoy only to search for image files in a fixed directory (and its subdirectories).

## Conclusion

...

## References

- <https://www.ventoy.net/en/index.html>
