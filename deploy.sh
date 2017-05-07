#!/usr/bin/env bash

rm -rf public/

hugo


gsutil -m rm 'gs://hugo.grochau.com/**'

gsutil -m -h "Cache-Control:public,max-age=3600" cp -z "js, css, html, svg, otf" -r 'public/*' 'gs://hugo.grochau.com'

