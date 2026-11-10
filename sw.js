// TYPE BLASTER - Self-Destructing Cache-Busting Service Worker
// Automatically purges old caches and unregisters itself so users always get the latest game

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => caches.delete(key)));
        }).then(() => {
            return self.registration.unregister();
        }).then(() => {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Pass straight to live network — never intercept or serve stale cache!
    e.respondWith(fetch(e.request));
});
