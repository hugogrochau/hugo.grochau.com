# Cloudflare Workers Deployment Guide

## Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Create KV namespace:**
   ```bash
   wrangler kv:namespace create "CACHE"
   ```

3. **Update wrangler.toml with the namespace ID from step 2**

4. **Deploy:**
   ```bash
   ./deploy.sh
   ```

## Detailed Setup

### Prerequisites
- Hugo static site generator
- Node.js and npm
- Cloudflare account

### Step-by-Step Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Create KV namespace for caching:**
   ```bash
   wrangler kv:namespace create "CACHE"
   wrangler kv:namespace create "CACHE" --preview
   ```

4. **Update wrangler.toml:**
   - Replace `your-kv-namespace-id` with the production namespace ID
   - Replace `your-kv-namespace-preview-id` with the preview namespace ID

5. **Test locally:**
   ```bash
   npm run dev:worker
   ```

6. **Deploy to staging:**
   ```bash
   npm run build:deploy:staging
   ```

7. **Deploy to production:**
   ```bash
   npm run build:deploy
   ```

## Available Commands

- `npm run dev` - Start Hugo development server
- `npm run dev:worker` - Start Wrangler development server
- `npm run build` - Build Hugo site
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run deploy:staging` - Deploy to staging environment
- `npm run build:deploy` - Build and deploy to production
- `npm run clean` - Clean build artifacts

## Custom Domain Setup

1. **Add your domain to Cloudflare:**
   - Add your domain to your Cloudflare account
   - Update DNS records to point to Cloudflare

2. **Configure routes in wrangler.toml:**
   ```toml
   [env.production]
   routes = [
     { pattern = "hugo.grochau.com/*", zone_name = "grochau.com" },
     { pattern = "www.hugo.grochau.com/*", zone_name = "grochau.com" }
   ]
   ```

3. **Deploy with custom domain:**
   ```bash
   npm run build:deploy
   ```

## Environment Variables

For CI/CD (GitHub Actions), set these secrets:
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## Troubleshooting

### Common Issues

1. **KV namespace not found:**
   - Make sure you've created the KV namespace
   - Update the namespace IDs in wrangler.toml

2. **Domain not working:**
   - Check DNS settings in Cloudflare
   - Verify route configuration in wrangler.toml

3. **Build errors:**
   - Run `npm run clean` to clear build artifacts
   - Check Hugo configuration in config.toml

### Getting Help

- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Hugo docs: https://gohugo.io/documentation/
- Wrangler CLI docs: https://developers.cloudflare.com/workers/wrangler/
