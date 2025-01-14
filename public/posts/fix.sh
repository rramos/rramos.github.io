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
