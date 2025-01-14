---
title: bun
date: "2024-10-15T16:00:00+00:00"
lang: en
tags:
  - Frontend
  - Runtime
---

Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager

## Intro ##

Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun.

At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage

## Install ##

```sh
curl -fsSL https://bun.sh/install | bash
```

## Using ##

The bun command-line tool also implements a test runner, script runner, and Node.js-compatible package manager, all significantly faster than existing tools and usable in existing Node.js projects with little to no changes necessary.

```sh
bun run start                 # run the `start` script
bun install <pkg>             # install a package
bun build ./index.tsx         # bundle a project for browsers
bun test                      # run tests
bunx cowsay 'Hello, world!'   # execute a package
```

## bun CLI usage ##

The bun CLI contains a Node.js-compatible package manager designed to be a dramatically faster replacement for `npm`, `yarn`, and `pnpm`. It's a standalone tool that will work in pre-existing Node.js projects.

Run a JavaScript file or a `package.json` script:

```sh
bun run path/to/file|script_name
```

Run unit tests:

```sh
bun test
```

Download and install all the packages listed as dependencies in `package.json`:

```sh
bun install
```

Add a dependency to `package.json`:

```sh
bun add module_name
```

Remove a dependency from `package.json`:

```sh
bun remove module_name
```

Create a new Bun project in the current directory:

```sh
bun init
```

Start a REPL (interactive shell):

```sh
bun repl
```

Upgrade Bun to the latest version:

```sh
bun upgrade
```

## References ##

* <https://bun.sh>
* <https://bun.sh/docs>
* <https://bun.sh/guides>
* <https://bun.sh/guides/ecosystem/vite>
