---
title: CITATION.cff
date: "2024-05-28T21:00:00+00:00"
lang: en
tags:
  - GitHub
  - Utils
---

Article explaining the CITATION.cff file in GitHub

## Intro ##

When producing software, especially in the open-source space, it is common for articles to reference that work, much like how books or articles are cited in academic papers. GitHub provides a way for you to specify how you would like others to cite your work.

## How ##

You need to include a `CITATION.cff` file on your repo

## Example ##

The following example is shared on the reference [documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files) page.

```text
cff-version: 1.2.0
message: "If you use this software, please cite it as below."
authors:
- family-names: "Lisa"
  given-names: "Mona"
  orcid: "https://orcid.org/0000-0000-0000-0000"
- family-names: "Bot"
  given-names: "Hew"
  orcid: "https://orcid.org/0000-0000-0000-0000"
title: "My Research Software"
version: 2.0.4
doi: 10.5281/zenodo.1234
date-released: 2017-12-18
url: "https://github.com/github-linguist/linguist"
```

## What does this provide ##

When you add a `CITATION.cff` file to the default branch of your repository, a link is automatically added to the repository landing page in the right sidebar, with the label "Cite this repository." This makes it easy for other users to cite your software project, using the information you've provided.

You could cite other resources like datasets for instance

**NOTE:** The file must exist on the root folder of your repository

Check the original [article](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files) if you would like to know more.

## References ##

* <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files>
* <https://citation-file-format.github.io/>
