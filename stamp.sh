#!/bin/sh
# Tag style.css, data.js and app.js in index.html with a hash of their contents,
# so browsers load the new files after every push instead of a cached copy.
# Run before committing: ./stamp.sh
cd "$(dirname "$0")" || exit 1
for f in style.css data.js app.js; do
  v=$(shasum "$f" | cut -c1-8)
  sed -i '' -E "s#(href|src)=\"$f(\?v=[0-9a-f]*)?\"#\1=\"$f?v=$v\"#" index.html
done
grep -nE 'style\.css|data\.js|app\.js' index.html
