/* gate.js v2 — Sam 5.0 · 5.233: il sito è APERTO, tutto visibile a tutti.
 * L'utente può vedere TUTTO (aste, buy now, iCommunity, iDream, iShop…).
 * La REGISTRAZIONE serve SOLO per USARE iCARe (la chat) e i servizi:
 * chi apre icare.html senza essere pioniere viene accompagnato a registrati.html.
 * I motori di ricerca passano sempre. */
(function () {
  try {
    var path = location.pathname.split('/').pop() || '';
    if (!/^icare(\.html)?$/.test(path)) return;              // tutto il resto: LIBERO
    var ua = navigator.userAgent || '';
    var bot = /bot|crawl|spider|slurp|bing|google|facebook|twitter|preview|scan|pinterest|embed/i.test(ua);
    if (bot) return;
    try { if (localStorage.getItem('icare-pioniere') === '1') return; } catch (e) {}
    location.replace('registrati.html?da=icare');
  } catch (e) {}
})();
