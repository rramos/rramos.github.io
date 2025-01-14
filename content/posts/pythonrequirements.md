---
title: Python requirements.txt
date: "2024-06-13T14:00:00+00:00"
lang: en
tags:
  - Python
  - Utils
---

In this article we will go through the best way to generate the python `requirements.txt` file.

## Intro ##

In this article we will go through the best way to generate the python `requirements.txt` file.

## About ##

When you execute a python program you probably already bump with this types of errors

```sh
Traceback (most recent call last):
  File "mountain.py", line 28, in ?
    from toolkit.interface import interface
ImportError: No module named toolkit.interface
```

This means that your python environment is missing a Dependency/Module.

In order to solve this types of issues you probably would start by adding the missing modules with the [pip](https://tldr.inbrowser.app/pages/common/pip) command.

```sh
pip install <missing_module>
```

But this is hard to handle if the python project as a lot of dependencies, it would be useful if one had a list of all the modules required and let pip install all at once. Well that is where `requirements.txt` comes into action.

```sh
pip install -r requirements.txt
```

## Benefits ##

The usage of `requirements.txt` brings the following benefits:

* **Managing dependencies**: By listing the dependencies of your project in a `requirements.txt` file, you can easily see what packages are required and what versions they need to be.
* **Sharing your project with others**: If you share your project with others, you can include the `requirements.txt` file so that they can easily install the required packages. This can save them time and frustration and can help to ensure that everyone is using the same versions of the packages.

## How to create it ##

You can always create the requirements.txt in a manual way, but let's check other options.

### pip freeze ###

[pip freeze](https://tldr.inbrowser.app/pages/common/pip-freeze) outputs installed packages in requirements format. One can execute the following

```sh
pip freeze > requirements.txt
```

#### Why not pip freeze? ####

`pip freeze` only saves the packages that are installed with pip install in your environment.

pip freeze saves all packages in the environment including those that you don’t use in your current project (if you don’t have virtualenv) and sometimes you just need to create requirements.txt for a new project without installing modules.

Based on the previous using the next approach might be a better option.

### pipreqs ###

The `pipreqs` module was created specifically to generate a `requirements.txt` based on imports used in a project

One can execute the following:

```sh
python -m pipreqs.pipreqs --encoding utf-8  /path/to/project
```

Check the following [article](https://rramos.github.io/2024/06/04/pythonutils/) if you would like to know more about python modules `-m` option.

### conda ####

If you are using conda to manage your python environment, you can execute the following command:

```sh
conda list -e > requirements.txt
```

## Conclusion ##

In this article we have seen the importance of using `requirements.txt` to manage python dependencies for a given project and several options to generate that list.

## References ##

* <https://pypi.org/project/pipreqs>
* <https://pip.pypa.io/en/stable/cli/pip/>
* <https://tldr.inbrowser.app/pages/common/pip>
* <https://www.freecodecamp.org/news/python-requirementstxt-explained/>
