/* icommunity.js — Sam 5.0 · i numeri vivi della Community (5.167).
 * I valori vivono in dati/comunita.json (aggiornato da Sam con l'attività reale);
 * in assenza, si parte dai valori di base. Grafico SVG puro (zero dipendenze, CSP). */
(function () {
  var BASE = { aste: 4035, membri: 1, idream: 0, caseDono: 0, crescita: [4035, 8319, 12000, 16000, 22000, 27500, 33000] };
  function imposta(d) {
    var el = function (id) { return document.getElementById(id); };
    if (el('c-aste')) el('c-aste').textContent = Number(d.aste).toLocaleString('it-IT');
    if (el('c-membri')) el('c-membri').textContent = Number(d.membri).toLocaleString('it-IT');
    if (el('c-idream')) el('c-idream').textContent = Number(d.idream).toLocaleString('it-IT');
    if (el('c-case')) el('c-case').textContent = Number(d.caseDono).toLocaleString('it-IT');
    grafico(d.crescita || BASE.crescita);
  }
  function grafico(v) {
    var g = document.getElementById('grafico');
    if (!g) return;
    var W = 640, H = 220, pad = 24;
    var max = Math.max.apply(null, v);
    var punti = v.map(function (n, i) {
      return [pad + (i * (W - pad * 2)) / (v.length - 1), H - pad - (n / max) * (H - pad * 2)];
    });
    var linea = punti.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
    var area = linea + ' ' + (W - pad) + ',' + (H - pad) + ' ' + pad + ',' + (H - pad);
    g.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="crescita"><polygon points="' + area + '" fill="rgba(15,30,58,.12)"/><polyline points="' + linea + '" fill="none" stroke="#0F1E3A" stroke-width="2.5"/></svg>';
  }
  fetch('dati/comunita.json').then(function (r) { return r.json(); }).then(imposta).catch(function () { imposta(BASE); });
})();
