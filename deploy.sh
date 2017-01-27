#!/usr/bin/env bash

rm -rf public/

hugo

gsutil -m rsync -R -d public/ 'gs://hugo.grochau.com'

