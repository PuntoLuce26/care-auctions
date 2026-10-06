#!/usr/bin/env node
/**
 * anteprima.js — Sam 5.0 · server locale a COSTO ZERO per vedere l'app
 *
 * Serve i file statici della cartella in cui si trova (careauctions/app/),
 * senza installare nulla: solo Node, che è già sul Mac.
 *
 * Uso:
 *   node careauctions/app/anteprima.js
 *   → apri http://localhost:4173 nel browser
 *   → Ctrl+C per fermare
 *
 * iSuper (5 ottobre 2026): MAI più versioni vecchie in cache né ricaricamenti
 * forzati — ogni risorsa arriva con "no-store", quindi il browser mostra
 * SEMPRE l'ultima build. Inoltre il server ascolta su tutta la rete locale:
 * dal telefono (stesso Wi-Fi) si apre l'app con l'indirizzo stampato qui sotto.
 *
 * Nessuna rete esterna, nessuna dipendenza, nessun dato inviato altrove.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const BACK = require('path').join(__dirname, '..', 'backoffice');
const ILUCE = require('path').join(__dirname, '..', '..', 'puntoluce', 'iluce');
const PORT = Number(process.env.PORT) || 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.indexOf('\0') !== -1) { res.writeHead(400); res.end(); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
  let radice = ROOT;
  if (p.startsWith('/backoffice/')) { radice = BACK; p = p.replace('/backoffice/', '/'); }
  if (p.startsWith('/iluce/')) { radice = ILUCE; p = p.replace('/iluce/', '/'); }
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(radice, p));
  // protezione: mai servire file fuori dalla cartella dell'app
  if ((!file.startsWith(ROOT + path.sep) && file !== ROOT && !file.startsWith(BACK + path.sep) && file !== BACK && !file.startsWith(ILUCE + path.sep) && file !== ILUCE) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — file non trovato');
    return;
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '0.0.0.0', () => {
  // indirizzo IP locale: il telefono sullo stesso Wi-Fi può aprire l'app
  const ifaces = os.networkInterfaces();
  const ips = [];
  for (const nome of Object.keys(ifaces)) {
    for (const i of ifaces[nome] || []) {
      if (i.family === 'IPv4' && !i.internal) ips.push(i.address);
    }
  }
  console.log('─────────────────────────────────────────────');
  console.log('  CARe Auctions — anteprima locale (iSuper)');
  console.log('  Sul Mac:    http://localhost:' + PORT);
  ips.forEach((ip) => console.log('  Sul TELEFONO (stesso Wi-Fi): http://' + ip + ':' + PORT));
  console.log('  Ogni ricaricamento mostra l\u0027ultima build: niente più cache.');
  console.log('  Per fermare: Ctrl+C');
  console.log('─────────────────────────────────────────────');
});
