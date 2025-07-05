#!/usr/bin/env bash

echo "🚀 Deploying to Cloudflare Workers (Production)"

# Exit on any error
set -e

# Check if required tools are installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install it first."
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler is not installed. Please install it first."
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/

# Build the Hugo site
echo "🏗️  Building Hugo site..."
hugo --minify

# Deploy to Cloudflare Workers
echo "🚀 Deploying to Cloudflare Workers..."
wrangler publish

echo "✅ Deployment complete!"
echo "Visit: https://hugo-grochau-com.your-subdomain.workers.dev/"

