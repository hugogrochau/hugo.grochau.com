#!/usr/bin/env bash

echo "🚀 Deploying to Cloudflare Workers (Staging)"

# Clean previous build
rm -rf public/

# Build the Hugo site
hugo --environment staging --baseURL "https://hugo-grochau-com-staging.your-subdomain.workers.dev/"

# Deploy to Cloudflare Workers staging environment
wrangler publish --env staging

echo "✅ Deployed to staging!"
echo "Visit: https://hugo-grochau-com-staging.your-subdomain.workers.dev/"
