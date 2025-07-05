# Cloudflare Pages Deployment Guide

## Quick Start

1. **Build your site:**
   ```bash
   ./build.sh
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your Git repository
   - Configure build settings (see below)

3. **Push to deploy:**
   ```bash
   git push
   ```

## Detailed Setup

### Prerequisites
- Hugo static site generator
- Cloudflare account
- Git repository (GitHub, GitLab, or Bitbucket)

### Step-by-Step Setup

1. **Connect your repository to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your Git provider
   - Select your repository

2. **Configure build settings:**
   - Build command: `hugo --minify`
   - Build output directory: `public`
   - Root directory: `/` (leave empty)
   - Environment variables: `HUGO_VERSION=0.115.0` (or your preferred version)

3. **Deploy:**
   - Click "Save and Deploy"
   - Your site will be built and deployed automatically

## Available Commands

- `hugo server` - Start Hugo development server
- `./build.sh` - Build the site locally
- `hugo --minify` - Build with minification

## Custom Domain Setup

1. **Add your domain to Cloudflare:**
   - Add your domain to your Cloudflare account
   - Update DNS records to point to Cloudflare

2. **Configure custom domain in Pages:**
   - Go to your Pages project
   - Click "Custom domains"
   - Add your domain (e.g., `hugo.grochau.com`)
   - Cloudflare will automatically handle SSL certificates

## CI/CD Integration

Cloudflare Pages automatically deploys when you push to your repository:
- **Production**: Deploys from your main branch
- **Preview**: Deploys from pull requests and other branches
- **Rollbacks**: Easy rollback to previous deployments

## Environment Variables

You can set environment variables in the Cloudflare Pages dashboard:
- `HUGO_VERSION` - Specify Hugo version (e.g., `0.115.0`)
- `HUGO_ENV` - Set to `production` for production builds

## Troubleshooting

### Common Issues

1. **Build errors:**
   - Check Hugo version compatibility
   - Verify build command and output directory
   - Check build logs in Cloudflare Pages dashboard

2. **Domain not working:**
   - Check DNS settings in Cloudflare
   - Verify custom domain configuration in Pages

3. **404 errors:**
   - Hugo generates clean URLs by default
   - Cloudflare Pages handles this automatically

### Getting Help

- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Hugo docs: https://gohugo.io/documentation/
