/* SW 5.314 — AUTO-DISTRUZIONE: per mettere FINE al vecchio sito perenne,
 * il nuovo SW cancella tutte le cache, si de-registra e lascia il browser libero.
 * (L'offline tornerà in futuro con un meccanismo corretto.) */
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
