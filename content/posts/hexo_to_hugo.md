---
date: "2025-01-13T18:16:25Z"
draft: false
title: "Migrating Hexo to Hugo"
tags:
  - WebHosting
  - Utils
  - Hugo
  - Hexo
---

This article describes the process to convert the blog from hexo to hugo motivations and conclusions

## Intro

Why change from Hexo to Hugo, you may find several pages providing insights related with performance (ex: this). Although having a site with more performance would be a plus, I was looking to simplify the look, was sick of the lack of maintenance of the extension, and needed some excuse to dive into GoLang

## Process

The main idea for this process would be to:

1. Create a new empty project in Hugo
2. Pick a similar theme
3. Make adjustments
4. Copy articles
5. Update GitHub Actions

## Init project

I've follow the [guide](https://gohugo.io/getting-started/quick-start/) and started a new project from scratch before messing up with the existing one.

This allowed me to test the existing themes, customizations and test the final look before adapting Github Actions.

## Theme

Next step was to choose a Theme that wasn't to different from the actual Look, but would preferably support Light/Dark toggle.

I found a very interesting one which not only had what I intended and also a nice configuration tool, kudos to Nuno Coracao for this, check out his space <https://themes.gohugo.io/themes/blowfish>

## Convert Articles

Articles metadata have some differences from hexo to hugo. It also will depend on the plugins you have. I taken this opportunity to clean up the metadata as the webpusher plugin was including extra info like work-counts wish I didn't like. So I copied all the articles to the `posts` dir an run the following script to correct dates and clean up metadata.

```sh
# ensure dates don't start with single quotes
for file in *.md; do awk '{
if ($1 == "date:") {
  gsub("\047", "", $0); print;
} else {
  print $0;
}
}' "$file" > temp.md && mv temp.md $file ; done

# fix the dates and add the three dashes as the first line
for file in *.md; do awk '{
  if ($1 == "date:") {
    printf("%s %sT%s:00+00:00\n", $1, $2, $3);
  } else {
    print $0;
  }
}' "$file" > temp.md && mv temp.md $file ; done

# wrap dates with quotes that aren't wrapped in quotes
for file in *.md; do awk '{
  if ($1 == "date:") {
    if ($2 ~ /^"/) {
      print $0;
    } else {
      printf("%s \"%s\"\n", $1, $2);
    }
  } else { print $0; }
}' "$file" > temp.md && mv temp.md $file; done

# Removed published
for file in *.md; do
  awk '
    {
      if ($1 == "published:" ||
          $1 == "uuid:" ||
          $1 == "webpushr:" ||
          $1 == "wordCount:" ||
          $1 == "charCount:" ||
          $1 == "imgCount:" ||
          $1 == "vidCount:" ||
          $1 == "wsCount:" ||
          $1 == "cbCount:" ||
          $1 == "readTime:") {
        next;
      }
      print;
    }
  ' "$file" > temp.md && mv temp.md $file; done

# Removed Excerpt
for file in *.md; do
  pattern="## Excerpt ##"
  sed -i "/$pattern/d" "$file"
done
```

This allowed to start the server but there are still some issues with images that needed fixing.

## Images

Tag plugins don't work so entries like `<%blockquote>` need to be changed. The same applies to images. I could do some sort of script, but I do't have much images so I did fix those manually changing for example:

```md
{% asset_img “screenshot-overview.png” %}
```

to

```md
![img-description](/images/image-name)
```

I also took the time to reorganized a bit the images

> The following section provide more details for [Page bundles](https://gohugo.io/content-management/page-bundles/) which uses a similar organization, but I opted to simplify this needs to be explored

## URLs

The hexo pages use different url paths for that hugo needed to include an extra configuration to keep the same urls

```toml
[permalinks]
  [permalinks.page]
    posts = '/:year/:month/:slug/'
```

The following section explains this more in detail in case you use a different pattern <https://gohugo.io/content-management/urls> .

That fixed keeping the same pattern.

> Not sure if that is a better alternative, but I will check later if is possible to generate lists aggregate by year/month

## Front Matter following

When using Hugo cli to create new content it generates the front matter in `toml` format, like the following example

```md
+++
date = 2024-02-02T04:14:54-08:00
draft = false
title = 'Example'
weight = 10
[params]
  author = 'John Smith'
+++
```

I tried to change the default metadata format to `yaml` with the following configuration `metaDataFormat` but seems not be working, the following [thread](https://discourse.gohugo.io/t/why-front-matter-is-always-in-yaml-i-have-metadataformat-toml/9775/8) could bring some light on the subject.

I updated the following file `archetypes/default.md` with

```md
---
date: "{{ .Date }}"
draft: true
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
lang: en
tags:
  - Linux
---
```

And that seemd to do the trick.

## GitHub Pages

In the actual GitHub Pages for Hexo I have two repos, one for the site itself and another one for the source code.

The following [page](https://gohugo.io/hosting-and-deployment/hosting-on-github/) provides detailed information on how to setup the repo for Github Pages (Hugo is way better documented than Hexo by the way ).

> **NOTE:** This next step would be destructive, as it will reset the existing repo for a clean state and use the existing local repo.

The good news is that I just need to keep a single repo and GitHubpages will deal with the rest.

### Steps

1. Deleted the github repo rramos.github.io
2. Re-create the same repo
3. Push the git content from Hugo to this new repo
4. Went into Settings and activate Github Pages
5. Included the [workflow](https://raw.githubusercontent.com/rramos/rramos.github.io/refs/heads/master/.github/workflows/hugo.yml) for Hugo

The existing Github Action pipeline for hexo takes around `36s` to build and deploy the changes.

## Build Performance Metrics

Generation time reference with Hexo

```sh
INFO  234 files generated in 283 ms
```

Generation time with Hugo

```sh
hugo v0.140.2+extended linux/amd64 BuildDate=unknown

                   | EN
-------------------+------
  Pages            | 465
  Paginator pages  |   2
  Non-page files   |  19
  Static files     |  10
  Processed images |   1
  Aliases          | 161
  Cleaned          |   0

Total in 235 ms
```

## Page Performance

Using Google PageSpeed Insights, to check changes

### Before

![before_snap](/images/rramos_before.png)

### After

![after_snap](/images/rramos_after.png)

## Analytics

Google Analytics is also working out of the box, just applying the configuration

## Conclusion

In this article I've went through the process of converting a Blog from Hexo to Hugo. Although Hexo provides simplicity and lots of plugins with was becoming hard to manage updates and I was looking for a fresher look.

Also this would be an opportunity to delve into Go.

Regarging performance there are amazing gains, specially on the build factor and the site looks more responsive as the insights also confirm.

In geral I'm happy with the transition, but let's check next months how this works out.

## Next Steps

Next steps will include some way to improve my writing pipeline. Why Hexo I consolidate all in **Code** with a Hexo plugin. I could try FrontMatter for Hugo but not sure yet if that would be the best approach.

I also will need to reconfigure Trunk and pre-commit on the repo to validate posts on grammar errors before committing changes.
