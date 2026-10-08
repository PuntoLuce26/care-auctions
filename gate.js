/* gate.js — Sam 5.0 · il portale in fase costruzione: accesso solo ai pionieri (5.169).
 * I motori di ricerca (crawler) passano sempre: l'indicizzazione resta intatta.
 * Chi non è registrato viene accompagnato a registrati.html. */
(function () {
  try {
    var ua = navigator.userAgent || '';
    var bot = /bot|crawl|spider|slurp|bing|google|facebook|twitter|preview|scan|pinterest|embed/i.test(ua);
    var pagineLibere = /(registrati|privacy|cookie|terms|about|manifesto|madre-e-cervello|reset)\.html/.test(location.pathname);
    if (bot || pagineLibere) return;
    if (location.pathname === '/registrati.html') return;
    if (localStorage.getItem('icare-pioniere') !== '1') {
      location.replace('registrati.html');
    }
  } catch (e) {}
})();
