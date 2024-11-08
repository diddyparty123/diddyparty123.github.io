const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/icon-192x192.png',
    '/index.js',
    '/config.js',
    '/icon-512x512.png',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// self updating, 
self.addEventListener('fetch', (event) => {
    const { request } = event;

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            // dont update index.html, just in case it lets goguardian in
            if (request.url.endsWith('/index.html') && cachedResponse) {
                return cachedResponse;
            }

            // fetch and update the cache if the response differs
            return fetch(request).then((networkResponse) => {
                if (cachedResponse && networkResponse.ok) {
                    const cachedText = cachedResponse.clone().text();
                    const networkText = networkResponse.clone().text();

                    return Promise.all([cachedText, networkText]).then(([cachedData, networkData]) => {
                        if (cachedData !== networkData) {
                            // update cache if different
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, networkResponse.clone());
                            });
                        }
                        return networkResponse;
                    });
                }

                // no cached version. add to cache and return network response
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => cachedResponse || fetch(request));
        })
    );
});
