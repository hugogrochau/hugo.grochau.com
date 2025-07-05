#!/usr/bin/env bash

echo "🚀 Setting up Hugo site for Cloudflare Workers deployment"

# Check if required tools are installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install it first."
    echo "   macOS: brew install hugo"
    echo "   Other: https://gohugo.io/installation/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

echo "📦 Installing dependencies..."
npm install

echo "🔑 Please login to Cloudflare..."
wrangler login

echo "🗂️  Creating KV namespace..."
echo "Run the following command and update wrangler.toml with the namespace ID:"
echo "wrangler kv:namespace create \"CACHE\""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the namespace ID in wrangler.toml"
echo "2. Run 'hugo server' to develop locally"
echo "3. Run './deploy.sh' to deploy to Cloudflare Workers"
echo "4. Configure custom domains in the Cloudflare dashboard"
