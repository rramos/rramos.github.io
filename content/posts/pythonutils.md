---
title: Python Module Scripts
date: "2024-06-04T15:00:00+00:00"
lang: en
tags:
  - Python
  - Utils
---

This article is related with python modules

## Intro ##

Trey Hunner shared this insightful [article](https://www.pythonmorsels.com/cli-tools/) where one can take advantage of one functionality that some python modules bring.

Please check his article if you want to deep dive on the topic.

## How it works ##

Running Python with the `-m` command-line argument tells Python to run a given Python module as if it were a Python script.

One can execute the following command line to spin up a web server to that list local files

```sh
python -m http.server
```

Depending on the python module you may have a quick way to execute task.

```sh
python -m json.tool file.json
```

The previous example allow you to pretty format the file.json quickly

## Module List ##

Here's a quick summary of every command-line tool in Python:

| Module/Script | Purpose | Category |
| --- | --- | --- |
| `http.server` | Start a simple web server | General |
| `webbrowser` | Launch your web browser | General |
| `json.tool` | Nicely format JSON data | General |
| `calendar` | Show a command-line calendar | General |
| `uuid` | Like `uuidgen` CLI utility | Linux-like |
| `sqlite3` | Like `sqlite3` CLI utility | Linux-like |
| `zipfile` | Like `zip` & `unzip` CLI utilities | Linux-like |
| `gzip` | Like `gzip` & `gunzip` CLI utilities | Linux-like |
| `tarfile` | Like the `tar` CLI utility | Linux-like |
| `base64` | Like the `base64` CLI utility | Linux-like |
| `ftplib` | Like the `ftp` utility | Linux-like |
| `smtplib` | Like the `sendmail` utility | Linux-like |
| `poplib`| Like using `curl` to read email | Linux-like |
| `imaplib` | Like using `curl` to read email | Linux-like |
| `telnetlib` | Like the `telnet`utility | Linux-like |
| `pip` | Install third-party Python packages | Python |
| `venv` | Create a virtual environment | Python |
| `pdb` | Run the Python Debugger | Python |
| `unittest` | Run `unittest` tests in a directory | Python |
| `pydoc`| Show documentation for given string | Python |
| `doctest` | Run doctests for a given Python file | Python |
| `ensurepip`| Install `pip` if it's not installed | Python |
| `idlelib` | Launch Python's IDLE graphical REPL | Python |
| `zipapp` | Turn Python module into runnable ZIP | Python |
| `python -m compileall` | Pre-compile Python files to bytecode | Python |
| `tokenize` | Break Python module into "tokens" | Inspect code |
| `ast` | Show abstract syntax tree for code | Inspect code |
| `dis` | Disassemble Python code to bytecode | Inspect code |
| `inspect` | inspect source code of a Python object | Inspect code |
| `pyclbr` | See overview of a module's objects | Inspect code |
| `asyncio` | Launch an asyncio-aware REPL | Deep Python |
| `cProfile` | Profile a Python program | Deep Python |
| `profile` | Profile Python program with Python | Deep Python |
| `pstats` | Show stats on cProfile-generated file | Deep Python |
| `pickle` | Readably display pickle file contents | Deep Python |
| `pickletools` | Disassemble a pickle file | Deep Python |
| `tabnanny` | Check file for mixed tabs & spaces | Deep Python |
| `this`| Display the Zen of Python (PEP 20) | Fun |
| `__hello__` | Print `Hello world!` | Fun |
| `antigravity` | Open XKCD 353 in a web browser | Fun |
| `turtledemo` | See `turtle` module demos | Fun |
| `code` | Run a Python REPL | Python |
| `runpy` | Run a Python module as a script | Python |
| `timeit` | Time a Python expression | Python |
| `site` | See "site" information about Python | Deep Python |
| `sysconfig` | Show Python configuration details | Deep Python |
| `platform` | Display current platform information | General |
| `mimetypes` | Show file mimetype/extension details | General |
| `quopri` | Encode/decode raw email data | General |
| `filecmp` | Compare contents of 2 directories | General |
| `encodings.rot_13` | ROT-13 encode/decode text | General |

These are just the Python scripts included in the Python standard library. Any third-party module that can be run as a script can also be launched via `python -m MODULE_NAME` as well.

## References ##

* <https://www.pythonmorsels.com/cli-tools>
* <https://www.pythonmorsels.com/making-main-function-python/>
