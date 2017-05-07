# hugo.grochau.com
Personal site

# Description
Uses the hugo static site generater

# Installing
* Install `golang` and the `hugo` static site generator
* run `git submodule init && git submodule update` to pull the default theme

# Developing
* run `hugo server` for live reload

# Deploying
* Install the Google Cloud SDK with `curl https://sdk.cloud.google.com | bash`
* Run `gcloud init` and configure your GCS bucket
* Edit deploy.sh with your GCS bucket
* Run deploy.sh

