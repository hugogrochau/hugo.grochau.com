#!/usr/bin/env bash

# Uploads hugo site to aws s3
# Need to set the following env variables
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_CLOUDFRONT_DISTRIBUTION_ID
# AWS_BUCKET

rm -rf public/

hugo

source ./.env

aws s3 rm s3://$AWS_BUCKET --recursive
aws s3 cp public/ s3://$AWS_BUCKET --recursive --acl public-read

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

