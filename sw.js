self.addEventListener("fetch", function (event) {
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    (async function () {
      const cache = await caches.open("cache");
      const cachedResponse = await cache.match(event.request);

      try {
        const networkResponse = await fetch(event.request);
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        if (cachedResponse) {
          return cachedResponse;
        }
      }
    })()
  );
});
