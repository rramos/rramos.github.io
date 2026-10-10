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
I recently tried installing Windows on an older laptop and ran into a wall of frustration. Even though I burned the ISO image properly using Rufus, the laptop simply refused to boot.

After troubleshooting for a bit, I was reminded of how complex creating bootable media can be:
* Partition Styles: You have to choose between GPT and MBR.
* Boot Firmware & Modes: You need to navigate UEFI, Legacy Mode, and settings like Secure Boot.
* Wasted Storage: Traditional tools take a 5–8 GB Windows image, format your entire USB drive to hold it, and leave the remaining space practically unusable for other tasks.

### Enter Ventoy
Instead of re-formatting your USB drive every single time you need a different installer, Ventoy changes the game entirely:

* Drag-and-Drop Simplicity: You only install Ventoy to your USB drive once. After that, simply copy and paste your ISO files onto the pen drive like regular files.
* Multi-Boot Support: Store multiple ISOs on a single drive (e.g., Windows 10, Windows 11, Ubuntu, MemTest) and choose which one to boot from a simple visual menu.
* Boot Local Files: Ventoy even lets you browse and boot ISO, WIM, IMG, VHD(x), and EFI files directly from your computer's local disk.
* Fast and Convenient: No more waiting 10–15 minutes for imaging tools to write a single OS. Adding a new boot option is as fast as moving a file.


## Installation

You just need to execute Ventoy instalation executable for Windows it would be something like Ventoy2Disk.exe, Linux you can use you package manager and install the tool

```sh
sudo pacman -S ventoy
```

## How to Set Up Your Ventoy USB Drive
Setting up Ventoy takes only a minute or two. Here is how to get started:

### Step 1: Install Ventoy to Your USB
1. Connect your USB drive to your computer.
2. Launch the VentoyGUI application.
3. Select your USB drive from the device list and click Install.

> **Note:** Installing Ventoy will format your drive, so make sure to back up any existing files first!

### Step 2: Understand the Partition Layout
Once the installation finishes, Ventoy automatically splits your USB drive into two partitions:

* **Boot Partition (Hidden)**: A small EFI system partition used internally by Ventoy to manage bootloaders.
* **Data Partition (exFAT)**: The main partition where you store your files.

  * *Tip: While exFAT is the default for maximum cross-platform compatibility, you can manually reformat this data partition to NTFS, FAT32, UDF, XFS, or Ext2/3/4 if your use case requires it.*

## Step 3: Copy Your Bootable Files
1. Simply copy your ISO, WIM, IMG, VHD(x), or EFI files onto the main partition.
2. You can place files directly in the root folder or organize them inside subfolders—Ventoy automatically scans all directories recursively and displays every found image in an alphabetical boot menu.

3. **Optional**: If you have a large drive with non-bootable personal files and want to keep your menu clean, you can use Ventoy's plugin configuration to restrict the search to a specific directory.


## References

- <https://www.ventoy.net/en/index.html>
