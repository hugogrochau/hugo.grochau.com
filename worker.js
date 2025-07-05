import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const request = event.request;
  const url = new URL(request.url);
  
  try {
    // Handle asset requests
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: req => {
        // Handle clean URLs (remove trailing slash and add .html)
        const url = new URL(req.url);
        let pathname = url.pathname;
        
        // Remove trailing slash
        if (pathname.endsWith('/') && pathname !== '/') {
          pathname = pathname.slice(0, -1);
        }
        
        // Add .html extension for clean URLs
        if (!pathname.includes('.') && pathname !== '/') {
          pathname += '.html';
        }
        
        // Default to index.html for root
        if (pathname === '/') {
          pathname = '/index.html';
        }
        
        return new Request(url.origin + pathname, req);
      }
    });

    // Set cache headers for static assets
    const response = new Response(page.body, page);
    
    // Cache static assets for 1 hour
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf)$/)) {
      response.headers.set('Cache-Control', 'public, max-age=3600');
    } else {
      // Cache HTML for 5 minutes
      response.headers.set('Cache-Control', 'public, max-age=300');
    }
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  } catch (e) {
    // Handle 404 errors
    if (e.status === 404) {
      try {
        const notFoundAsset = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req)
        });
        return new Response(notFoundAsset.body, { ...notFoundAsset, status: 404 });
      } catch (notFoundError) {
        return new Response('Not Found', { status: 404 });
      }
    }
    
    return new Response('Internal Server Error', { status: 500 });
  }
}
