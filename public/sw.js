// public/sw.js

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. BYPASS: If the request is for Vite's internal dev tools, let it go straight to the network
  if (
    url.pathname.startsWith('/@') || 
    url.pathname.includes('node_modules') ||
    url.search.includes('t=') // This catches the timestamped dev requests
  ) {
    return; // Do nothing, let the browser handle it normally
  }

  // 2. Your existing cache logic goes here...
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
