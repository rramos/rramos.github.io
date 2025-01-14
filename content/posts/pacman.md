---
title: pacman command in Arch Linux
date: "2023-01-27T10:00:00+00:00"
lang: en
tags:
  - Linux
  - Arch
  - CheatSheet
---

This article is about pacman command in Arch Linux

## Intro ##

I've recently started using a Arch Linux distribution [Garuda Linux](https://garudalinux.org/) and the package management tool is **pacman** this article summarizes the most common actions with based on the following article from [GeeksforGeeks](https://www.geeksforgeeks.org/pacman-command-in-arch-linux/).

> Pacman is a package manager for the arch Linux and arch-based Linux distributions. If you have used Debian-based OS like ubuntu, then the  Pacman is similar to the apt command of Debian-based operating systems. Pacman contains the compressed files as a package format and maintains a text-based package database. Pacman keeps the system up to date by synchronizing package lists with the master server. Pacman can install the packages from the official repositories or your own build packages.

## Installing Packages using the Pacman ##

When we install any new operating system on our machine, the first task we do is to install the software packages on the system. Now, to install the packages on Arch Linux, use the command Pacman with -S option and mention the package name. The -S option tells the Pacman to synchronize and to continue. Here is one example

```sh
sudo pacman -S cmatrix
```

We can mention the many package names after the -S option, separated by space.

```sh
sudo pacman -S package1 package2 package3
```

Then Pacman will show the download and install size of the package and ask for to proceed, then simply press the Y key. Pacman categorizes the installed packages into two categories.

* **Implicitly Installed**: The package that was installed using the -S or -U option.
* **Dependencies**: The package is installed because it is required by another package.

## Removing packages using the Pacman ##

When we don’t need the package anymore, then we should remove the package from the system. To remove the package with all its dependencies which are not required by other packages, use the following command:

```sh
sudo pacman -Rs <package_name>
```

To remove the package without removing its dependency use the following command:

```sh
sudo pacman -R <package_name>
```

To remove the dependencies which are not required anymore, use the following command:

```sh
pacman -Qdtq |  pacman -Rs -
```

## Upgrading packages ##

In arch Linux, we can upgrade the full system by only one command using the Pacman. Use the following command to update the system:

```sh
sudo pacman -Suy
```

Let’s understand the meaning, S tell the pacman to synchronize the local database with the main database. u tells the pacman to upgrade the packages and y update the local catch on the system. Basically, this command synchronizes the local pacman database with the main repository database and then updates the system.

## Searching for a Package ##

Now let’s see how we can search the package into the database of pacman. To search query in the name and description  of the package in the database use the following command:

```sh
sudo pacman -Ss   <query1>  <query2>
```

To search into already installed packages on the system, use the following command:

```sh
sudo pacman -Qs query1>  <query2>
```

To search the query into the local database use the following command:

```sh
sudo pacman -F query1>  <query2>
```

## Cleaning the Package Cache ##

When pacman downloads the packages it stores the packages into the `/var/cache/pacman/pkg/` and while uninstalling the package pacman does not delete these files. Pacman uses these files to downgrade the package or install the package. But it can take a lot of space to store these packages. So to delete the stored packages, use the following command:

```sh
sudo pacman -Sc
```

To remove all stored packages and cache, use the following command:

```sh
sudp pacman -Scc
```

## Installing local packages ##

By using pacman we can install packages other than the main repository of Arch Linux. Use the following command to install the packages

For local:

```sh
sudo pacman -U path_to_file.pkg.tar.xz
```

For remote package:

```sh
sudo pacman -U http://www.example.com/repo/example.pkg.tar.xz
```

## Troubleshooting ##

Sometimes installing the packages with pacman we face some errors. Following are the mainly occurred errors with pacman:

### Conflicting file error ###

This error occurs due to some conflict packages present in the repository. To solve this error we can manually rename the file or force the overwrite function. We can use the following command to overwrite the function:

`pacman -S --overwrite glob package`

### Invalid package ###

This error can occur due to the partial installation of the packages. We can solve this error by deleting .part files in `/var/cache/pacman/pkg/`.

### Locking database ###

This error can occur when pacman is interrupted while updating the database. To solve this error, delete the file `/var/lib/pacman/db.lck` and update the database. Use the following command to delete the file:

## Garuda ##

 Garuda also brings a useful command `update` that abstracts all this interactions to keep your rolling system updated, still very important to understand the command line utilities to manage the packages and check the official man page for further details as this is always evolving.

## References ##

* <https://www.geeksforgeeks.org/pacman-command-in-arch-linux/>
* <https://archlinux.org/pacman/pacman.8.html>
