---
title: UV
date: "2025-05-10T22:00:00+00:00"
lang: en
tags:
  - Python
  - Development
---

In this article we will go through uv, an extremely fast Python package and project manager, written in Rust.

## Intro

uv provides essential features for Python development — from installing Python and hacking on simple scripts to working on large projects that support multiple Python versions and platforms.

uv's performance is continually benchmarked against previous releases, and regularly compared to other tools in the space, like pip and Poetry. [ref](https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md)

## Features

### Projects 

Creating and working on Python projects, i.e., with a pyproject.toml.

* `uv init`: Create a new Python project.
* `uv add`: Add a dependency to the project.
* `uv remove`: Remove a dependency from the project.
* `uv sync`: Sync the project's dependencies with the environment.
* `uv lock`: Create a lockfile for the project's dependencies.
* `uv run`: Run a command in the project environment.
* `uv tree`: View the dependency tree for the project.
* `uv build`: Build the project into distribution archives.
* `uv publish`: Publish the project to a package index.

### Python versions

Installing and managing Python itself.

* `uv python install`: Install Python versions.
* `uv python list`: View available Python versions.
* `uv python find`: Find an installed Python version.
* `uv python pin`: Pin the current project to use a specific Python version.
* `uv python uninstall`: Uninstall a Python version.

### Scripts

Executing standalone Python scripts, e.g., example.py.

* `uv run`: Run a script.
* `uv add --script`: Add a dependency to a script
* `uv remove --script`: Remove a dependency from a script

### Tools

Running and installing tools published to Python package indexes, e.g., ruff or black.

* `uvx / uv tool run`: Run a tool in a temporary environment.
* `uv tool install`: Install a tool user-wide.
* `uv tool uninstall`: Uninstall a tool.
* `uv tool list`: List installed tools.
* `uv tool update-shell`: Update the shell to include tool executables.

### The pip interface

Manually managing environments and packages — intended to be used in legacy workflows or cases where the high-level commands do not provide enough control.

Creating virtual environments (replacing venv and virtualenv):

* `uv venv`: Create a new virtual environment.

Managing packages in an environment (replacing pip and pipdeptree):

* `uv pip install`: Install packages into the current environment.
* `uv pip show`: Show details about an installed package.
* `uv pip freeze`: List installed packages and their versions.
* `uv pip check`: Check that the current environment has compatible packages.
* `uv pip list`: List installed packages.
* `uv pip uninstall`: Uninstall packages.
* `uv pip tree`: View the dependency tree for the environment.

Locking packages in an environment (replacing pip-tools):

* `uv pip compile`: Compile requirements into a lockfile.
* `uv pip sync`: Sync an environment with a lockfile.

### Utility

Managing and inspecting uv's state, such as the cache, storage directories, or performing a self-update:

* `uv cache clean`: Remove cache entries.
* `uv cache prune`: Remove outdated cache entries.
* `uv cache dir`: Show the uv cache directory path.
* `uv tool dir`: Show the uv tool directory path.
* `uv python dir`: Show the uv installed Python versions path.
* `uv self update`: Update uv to the latest version.

The uvx command invokes a tool without installing it.

For example to run ruff

```sh
uvx ruff
```

## Instalation

```sh
sudo pacman -S python-uv
```

## Init Environement

The following example creates an environment

```sh
uv init example
```

To install a specific python version

```sh
uv python install 3.12
```

To view available and installed Python versions:

```sh
uv python list
```

To run scripts which don't have dependencies

```python
# example.py
print("Hello world")
```

```sh
uv run example.py
```

One can include dependencies with `--with` argument 

```python
# example.py
import time
from rich.progress import track

for i in track(range(20), description="For example:"):
    time.sleep(0.05)
```

```sh
uv run --with rich example.py
```

One can add inline metadata like dependencies

```sh
uv add --script example.py 'rich'
```

uv supports locking dependecnies, they need to be explecity locked

```sh
uv lock --script example.py
```

In order to add dependencies from a requirements.txt

```sh
uv add -r requirements.txt -c constraints.txt
```

To remove a package

```sh
uv remove requests
```

To upgrade a package, run uv lock with the `--upgrade-package` flag:

```sh
uv lock --upgrade-package requests
```

To run flask

```sh
uv add flask
uv run -- flask run -p 3000
```

Build your package with uv build:

```sh
uv build
```

By default, uv build will build the project in the current directory, and place the built artifacts in a dist/ subdirectory.


## Conclusion

uv is an extremely fast Python package and project manager written in Rust. This article highlights some of the most commonly used arguments, but that only scratches the surface of what uv can do. I highly recommend checking out the [official documentation](https://docs.astral.sh/uv) and giving it a try if you haven't already, you'll be amazed by its speed.


## References

* <https://github.com/astral-sh/uv>
* <https://docs.astral.sh/uv/>