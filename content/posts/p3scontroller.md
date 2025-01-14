---
title: PS3 Controller in Arch
date: "2024-01-04T20:00:00+00:00"
lang: en
tags:
  - Arch
  - Linux
---

In this article I will go through the process to configure a PS3 controller in Linux (Arch)

## Configuration for PS3 Controller in Arch Linux ##

This quick guide explains how to setup your PS3 controller in Arch Linux making sure the Bluetooth connection works

## Requirements ##

Make sure to install the bluetooth packages and have a working usb device.

```sh
sudo pacman -S bluez bluez-utils bluez-plugins
```

Create the following file `/etc/bluetooth/main.conf` with the content:

```conf
[General]
ClassicBondedOnly=false
```

And just restart you computer.

Press the Middle **PS** button until leds start blinking, then connect the usb cable from the controller to the PC and you should se a warning to authorize the device.

After that you can unplug the controller and manage via you bluetooth manager.

> **NOTE:** Take into account that the ClassicalBondedOnly Option is a solution that regresses you security configuration for bluetooth pairing, more details [here](https://github.com/bluez/bluez/issues/673#issuecomment-1858431729) use at you own risk

## References ##

* <https://wiki.archlinux.org/title/Gamepad>
