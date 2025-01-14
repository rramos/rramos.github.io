---
title: How to bypass Kobo wizard in Linux
date: "2023-08-21T22:00:00+00:00"
lang: en
tags:
  - Books
  - Troubleshooting
  - Kobo
---

Article on how to bypass Kobo wizard in Linux

## Intro ##

This article is a copy from **Curtis Gedak** in the following [reference](https://gedakc.users.sourceforge.net/display-doc.php%3Fname%3Dkobo-desktop-ereader-setup).

> Kobo eReaders can no longer be set up using the Kobo Desktop on GNU/Linux (see warning below). Fortunately there is a work around to get your Kobo eReader working without a Kobo Account.

If you have a kobo reader stuck in the setup wizard as it happen to me (wifi got broken) there is a quick setup you can do to bypass the initial setup wizard.

**Notice:** This procedure was done in a old Kobo ebook reader, and is not guarantee that it will work on newer versions, use at your own risk

## Issue ##

Kobo ebook reader stuck on the initial setup phase. Wifi doesn't work and plugging to a computer requires the windows software installed, which for linux users doesn't not work.

## Solution ##

Create a dummy user on the device to bypass the initial setup

## Pre-Requisites ##

You need to install sqlitebrowser

Using the following code for Arch there should be a similar option Ubuntu or Fedora distributions

```sh
sudo pacman -S sqlitebrowser
```

## Procedure ##

1. Plug you ebook reader via usb
    - You can check the mount points you should see a `/media/your-user-name/KOBOeReader` device . Assuming this path as reference
1. Connect with SLQliteBrowser

  ```sh
  sqlitebrowser /media/your-user-name/KOBOeReader/.kobo/KoboReader.sqlite
  ```

1. Click on the Execute SQL tab and in the SQL string: section enter the following statement

```sql
insert into USER
  (UserID, UserKey, UserDisplayName, UserEmail, ___DeviceID)
values
  ("foo", "foo", "foo", "foo","foo");
```

1. Save the changes
    - Save these changes by selecting the menu option: File -> Save Database or File -> Write Changes.

1. Close the sqlitebrowser by selecting the menu option: File -> Exit.

1. Safely unmount your Kobo eReader.

And voilá, your eReader should now boot up and display the QUICK TOUR screen

## Reference ##

- <https://gedakc.users.sourceforge.net/display-doc.php%3Fname%3Dkobo-desktop-ereader-setup>
