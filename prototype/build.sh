#!/usr/bin/env bash
# Inlines app.js into _template.html -> index.html (self-contained, artifact-ready)
set -e
cd "$(dirname "$0")"
awk '
  /<script src="app.js"><\/script>/ {
    print "<script>";
    while ((getline line < "app.js") > 0) print line;
    close("app.js");
    print "</script>";
    next
  }
  { print }
' _template.html > index.html
echo "Built index.html ($(wc -c < index.html) bytes)"
