/* CARe Auctions — service worker: offline completo, cache-first, solo same-origin.
   Nessuna richiesta esterna viene mai toccata. Versione cache: v1 */
const CACHE = 'care-auctions-v84';
const CORE = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/logo-careauctions-pulito.svg', './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './trova-asta.html',
  './trova-asta.js',
  './trova-asta.html',
  './trova-asta.js',
  './index.js',
  './aste-dati.json',
  './assets/mic.svg',
  './anteprima-prompt.html',
  './pagamento.html',
  './pagamento.js',
  './idream.html',
  './prova.html',
  './prova.js',
  './aste.html', './asta.html', './icare.html', './dashboard.html', './ipartner.html',
  './privacy.html', './galleria.html', './login.html', './terms.html', './cookie.html',
  './calcolo.js', './asta.js', './aste.js', './icare.js', './dashboard.js', './login.js',
  './ipartner.js', './privacy.js', './icare-messages.js', './analisi-store.js',
  './contatti.js', './assets/icons/icon-180.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // ANTEPRIMA LOCALE: mai servire la cache (il Mac deve vedere sempre l'ultima build)
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' ||
      location.hostname.startsWith('192.168') || location.hostname.startsWith('172.') || location.hostname.startsWith('10.')) {
    return fetch(e.request);
  }
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // NETWORK-FIRST: il sito serve sempre la versione piu recente; la cache resta solo per l offline.
  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        if (res && res.ok && e.request.method === 'GET') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      })
      .catch(function () { return caches.match(e.request).then(function (hit) { return hit || caches.match('./index.html'); }); })
  );
});
