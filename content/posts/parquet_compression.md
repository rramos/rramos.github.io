---
title: Parquet Compression
date: "2024-02-19T22:00:00+00:00"
lang: en
tags:
  - Data Engineering
  - DataLake
---

In this article I will go through the topic of Parquet Compression

## Intro ##

Was reading this [article](https://mastodon.social/@severo/111957633001467414) where Philippe Rivière and Éric Mauvière optimized a **200GB** Parquet data and prepare it to **549kB**.

Now this work touch some very relevant points regarding Data Engineering procedures and best practises, I would suggest going on the article as it explains in detail what they applied in each stage and how.

## Use Case ##

> This new fascinating dataset just dropped on Hugging Face. French public domain newspapers 🤗 references about 3 million newspapers and periodicals with their full text OCR’ed and some meta-data. The data is stored in 320 large parquet files. The data loader for this Observable framework project uses DuckDB to read these files (altogether about 200GB) and combines a minimal subset of their metadata — title and year of publication, most importantly without the text contents —, into a single highly optimized parquet file.

Undoubtedly, this dataset proves immensely valuable for training and processing Language Model (LLM) models

## Best Practises ##

I firmly believe that these best practices should be applied not only to Parquet but also to other columnar formats.

These are the key factors you should have into consideration:

### Select only the Columns That you will use ###

This is one of simplest optimizations that you can do. Remember that data is stored in a columnar way so picking the columns that matter not only will will filter out very quickly as it will reduce significantly the volume

### Apply the most appropriate Compression algorithm ###

The majority of contemporary data formats support compression. When examining the most common ones for Parquet—such as LZO, Snappy, and Gzip—we observe several notable differences (ref: [sheet](https://github.com/apache/parquet-format/blob/master/Compression.md))

For instance gzip cannot be split, which means if you are going to process the data with a distributed process like Spark for instance you must use the driver to deal with all the uncompression.

LZO strikes a better balance between speed and compression rate when compared to Snappy. In this specific case, I would also recommend exploring Brotli as the datasets seem to contain text. Choosing an effective algorithm is crucial.

### Sort the data ###

While it may not seem immediately relevant, aligning the rows in this manner results in extended streaks of constant values across multiple columns, enhancing the compaction ratio applied by the compression algorithm

## Thoughts ## ## ##

They took it a step further by implementing additional optimizations, such as increasing the row_group_size. What's crucial to highlight here is the significant gains achievable through the application of good engineering practices, resulting in faster and more cost-effective processes.

Additionally, DuckDB is exceptionally fast for executing these types of processes. While I'm eager to test it out, unfortunately, I find myself short on both time and disk space!

## References ##

* <https://mastodon.social/@severo/111957633001467414>
* <https://github.com/apache/parquet-format/blob/master/Compression.md>
* <https://huggingface.co/spaces/observablehq/fpdn>
* <https://dev.to/alexmercedcoder/parquet-file-compression-for-everyone-zstd-brotli-lz4-gzip-snappy-5gb8>
