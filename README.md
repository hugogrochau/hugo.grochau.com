# hugo.grochau.com
Personal site deployed on Cloudflare Pages

# Description
Uses the Hugo static site generator and deploys to Cloudflare Pages for global edge performance.

# Installing
* Install `golang` and the `hugo` static site generator

# Developing
* Run `hugo server` for live reload during development

# Building
* Run `./build.sh` to build the site locally
* Static files will be generated in the `public/` directory

# Deploying
* Connect your repository to Cloudflare Pages in the Cloudflare dashboard
* Configure build settings:
  - Build command: `hugo --minify`
  - Build output directory: `public`
  - Root directory: `/` (default)
* Push to your repository to trigger automatic deployment

# Configuration
* Edit `config.toml` to configure your Hugo site
* Configure custom domains in the Cloudflare Pages dashboard

