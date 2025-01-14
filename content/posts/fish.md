---
title: fish configs
date: "2022-12-23T18:30:00+00:00"
lang: en
tags:
  - Linux
  - Bash
  - Customization
  - Utils
---

This article is about fish a user-friendly command line shell for Linux

## About fish ##

fish is a smart and user-friendly command line shell for Linux, macOS, and the rest of the family.

## Configurations ##

To disable the greeting in fish edit the file `.config/fish/config.fish` and put an empty greeting.

```sh
set fish_greeting ""
```

Now re-open the terminal.

## Remove neofetch ##

If you don't want the fancy computer stats everything you open a terminal comment out the last 4 lines on the conf file `./config/fish/config.fish`

```sh
## Run paleofetch if session is interactive
#if status --is-interactive
#   neofetch
#end
```

Now re-open the terminal.

## Oh My Fish ##

Install the package oh-my-fish which would allow to customize you fish configurations running the following command

`curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish`

After this install the theme agnoster

`omf install agnoster`

Apply and reload

```sh
omf theme agnoster
omf reload
```

## Disable starship ##

Comment the following block on the file `./config/fish/config.fish`

```sh
## Starship prompt
#if status --is-interactive
#   source ("/usr/bin/starship" init fish --print-full-init | psub)
#end
```

## Setup the Nord colors in Alacritty ##

Change the default color scheme for Nord colors

replacing on the following file `.config/alacritty/alacritty.yml` for the coloscheme available on the following [repo](https://raw.githubusercontent.com/arcticicestudio/nord-alacritty/develop/src/nord.yml).

```yaml
colors:
  primary:
    background: '#2e3440'
    foreground: '#d8dee9'
    dim_foreground: '#a5abb6'
  cursor:
    text: '#2e3440'
    cursor: '#d8dee9'
  vi_mode_cursor:
    text: '#2e3440'
    cursor: '#d8dee9'
  selection:
    text: CellForeground
    background: '#4c566a'
  search:
    matches:
      foreground: CellBackground
      background: '#88c0d0'
    bar:
      background: '#434c5e'
      foreground: '#d8dee9'
  normal:
    black: '#3b4252'
    red: '#bf616a'
    green: '#a3be8c'
    yellow: '#ebcb8b'
    blue: '#81a1c1'
    magenta: '#b48ead'
    cyan: '#88c0d0'
    white: '#e5e9f0'
  bright:
    black: '#4c566a'
    red: '#bf616a'
    green: '#a3be8c'
    yellow: '#ebcb8b'
    blue: '#81a1c1'
    magenta: '#b48ead'
    cyan: '#8fbcbb'
    white: '#eceff4'
  dim:
    black: '#373e4d'
    red: '#94545d'
    green: '#809575'
    yellow: '#b29e75'
    blue: '#68809a'
    magenta: '#8c738c'
    cyan: '#6d96a5'
    white: '#aeb3bb'
```

## Themes ##

If you don' t like the color scheme check other options using the command.

`fish_config`

## donet autocomplete ##

In case you want dotnet command autocomplete to get something like this.

```bash
 ╭─rramos@buldozer in ~ via  v17.2.0
 ╰─λ dotnet
add               (Add a package/reference)  publish  (Publish a .NET project for deployment)
build                (Build a .NET project)  remove              (Remove a package/reference)
build-server  (Interact with build servers)  restore                   (Restore dependencies)
clean                 (Clean build outputs)  run            (Run the application from source)
…and 6 more rows
```

You should have the following on your `config.fish` file.

```sh
complete -f -c dotnet -a "(dotnet complete)"
```

For Garuda this setup seems to be present out-of-the box.

## Conclusion ##

Although Garuda brings a lot of customizations for fish if one wants to go deeper and adjust for it's own taste can take some time. I certainly would take some time to understand where configurations where being override. I probably include some of this configurations in git to prevent future time waist on customizations.

## References ##

* <https://wiki.archlinux.org/title/fish>
* <https://docs.microsoft.com/en-us/dotnet/core/tools/enable-tab-autocomplete#zsh>
* <https://github.com/oh-my-fish/oh-my-fish>
* <https://techviewleo.com/configure-fish-shell-with-oh-my-fish/>
* <https://github.com/arcticicestudio/nord-alacritty>
* <https://fishshell.com/>
