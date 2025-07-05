#!/usr/bin/env bash

echo "🚀 Deploying to Cloudflare Pages"

# Exit on any error
set -e

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install it first."
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/

# Build the Hugo site
echo "🏗️  Building Hugo site..."
hugo --minify

echo "✅ Build complete!"
echo "📁 Static files are in ./public/"

echo "📦 Installing wrangler for deployment..."
npm install -g wrangler

echo "🚀 Ready to deploy"
