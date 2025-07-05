# hugo.grochau.com
Personal site deployed on Cloudflare Workers

# Description
Uses the Hugo static site generator and deploys to Cloudflare Workers for global edge performance.

# Installing
* Install `golang` and the `hugo` static site generator
* Install `node.js` and `npm`
* Install Wrangler CLI: `npm install -g wrangler`

# Developing
* Install dependencies: `npm install`
* Run `hugo server` for live reload during development
* Run `wrangler dev` to test the worker locally

# Deploying
* Login to Cloudflare: `wrangler login`
* Create a KV namespace: `wrangler kv:namespace create "CACHE"`
* Update the KV namespace ID in `wrangler.toml`
* Run `./deploy.sh` or `npm run build:deploy`

# Configuration
* Edit `wrangler.toml` to configure your worker settings
* Update the worker name and routes as needed
* Configure custom domains in the Cloudflare dashboard

