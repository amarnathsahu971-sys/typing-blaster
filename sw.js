// TYPE BLASTER - Offline Service Worker (PWA)
const CACHE_NAME = 'type-blaster-v1';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/words.js',
    './js/audio.js',
    './js/game.js',
    './js/app.js',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request).catch(() => caches.match('./index.html'));
        })
    );
});
