/* valutazione.js — iCARe calcola TUTTO da solo (5.34): l'utente non tocca nulla.
   Due marginalità, automatiche: RIVENDITA e MESSA A REDDITO.
   Metodo dichiarato: mercato = base × 1,25 · canone = 5%/anno del valore ·
   netto reddito = canone × 0,85 · rendimento = netto / costo totale. */
(function () {
  'use strict';
  var form = document.getElementById('v-form');
  var lista = document.getElementById('v-lista');
  var sezione = document.getElementById('v-risultato');
  if (!form || !lista) return;
  var C = window.Calcolo;

  function n(id) { return Number(document.getElementById(id).value) || 0; }
  function euro(v) { return '€ ' + Number(v).toLocaleString('it-IT'); }
  var asta = null;
  var pronto = false;

  // COMPARABILI (5.38/5.39): prova di mercato per comune, se disponibile
  function caricaComparabili(comune) {
    if (!comune) return;
    var slug = comune.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
    fetch('./comparabili-' + slug + '.json').then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).then(function (d) {
      if (!d.comparabili || !d.comparabili.length) return;
      var sez = document.getElementById('v-comparabili');
      if (!sez) return;
      sez.hidden = false;
      var p = document.getElementById('v-comp-testo');
      var tot = d.comparabili.reduce(function (s, x) { return s + x.prezzo; }, 0);
      var med = Math.round(tot / d.comparabili.length / 100) * 100;
      p.textContent = 'Market evidence · ' + d.comune + ': ' + d.comparabili.length + ' comparables, average price €' + med.toLocaleString('it-IT') + ', average ' + d.euroMqMedio + ' €/m². Source: idealista (declared). Use it to confirm the value.';
    }).catch(function () {});
  }
  function autoCompila() {
    if (!asta) return;
    var base = Number(asta.prezzoBase) || 0;
    var mercato = Math.round(base * 1.25 / 100) * 100;
    document.getElementById('v-mercato').value = mercato;
    // ristrutturazione automatica: categoria in abbandono/rustico → 15% del mercato, altrimenti 5%
    var titolo = (asta.titolo || '').toLowerCase();
    var pct = /abbandon|rustico|da ristrutturar|fabbricato/.test(titolo) ? 0.15 : 0.05;
    document.getElementById('v-ristr').value = Math.round(mercato * pct / 100) * 100;
    // rendita catastale stimata: valore mercato ÷ 126 (seconda casa, coeff 120 × 1,05)
    document.getElementById('v-rendita').value = Math.round(mercato / 126 / 10) * 10;
    pronto = true;
    calcola();
    if (asta && asta.titolo) {
      var mm = asta.titolo.match(/· ([^·]+)$/);
      if (mm) caricaComparabili(mm[1].trim());
    }
  }

  function righe(etichetta, valore, classe) {
    var li = document.createElement('li');
    li.className = 'card';
    var h = document.createElement('h3'); h.textContent = etichetta;
    var p = document.createElement('p');
    p.textContent = valore;
    if (classe) p.className = classe;
    li.appendChild(h); li.appendChild(p);
    lista.appendChild(li);
  }
  function dettaglio(t, passi) {
    titolo(t);
    passi.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'card card-passo';
      li.textContent = p;
      lista.appendChild(li);
    });
  }
  function titolo(t) {
    var li = document.createElement('li');
    li.className = 'card card-titolo';
    var h = document.createElement('h2'); h.textContent = t;
    li.appendChild(h);
    lista.appendChild(li);
  }

  // TUTELA (5.35): il file su misura si sblocca solo con l'accettazione
  function sbloccato() {
    var em = document.getElementById('v-email');
    return !!document.getElementById('v-accetto') && document.getElementById('v-accetto').checked && em && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value);
  }
  function calcola() {
    lista.textContent = '';
    var mercato = n('v-mercato');
    var ristr = n('v-ristr');
    var notaio = n('v-notaio');
    var rendita = n('v-rendita');
    var prima = document.getElementById('v-prima').checked;
    var gestoreEff = (n('v-gestore') / 100) * 1.22;
    var bisogno = document.getElementById('v-bisogno').value;

    var max = C.prezzoMassimoDettagliato({ valoreMercato: mercato, ristrutturazione: ristr, costiFissi: notaio, aliquotaCommissione: gestoreEff });
    var imposte = C.imposteAcquisto({ rendita: rendita, primaCasa: prima, prezzo: max.prezzoMassimo });
    var gestore = C.commissioneGestoreAsta({ prezzo: max.prezzoMassimo, aliquota: n('v-gestore') / 100, iva: 0.22 });
    var feeICAre = Math.round(max.prezzoMassimo * 0.015 * 100) / 100;
    var costoTotale = max.prezzoMassimo + imposte.totale + gestore.totale + feeICAre + notaio + ristr;

    // MARGINALITÀ 1: RIVENDITA
    var margRivendita = Math.round((mercato - costoTotale) * 100) / 100;
    var pctRivendita = costoTotale > 0 ? (margRivendita / costoTotale) * 100 : 0;

    // MARGINALITÀ 2: MESSA A REDDITO (automatica)
    var canone = Math.round(mercato * 0.05 / 12 / 10) * 10; // 5% annuo del valore
    var canoneNetto = Math.round(canone * 0.85); // −15% vacanze/IMU/manutenzione (dichiarato)
    var renditaAnnua = canoneNetto * 12;
    var rendimento = costoTotale > 0 ? (renditaAnnua / costoTotale) * 100 : 0;
    var anni = renditaAnnua > 0 ? costoTotale / renditaAnnua : 0;

    var acc = sbloccato();
    titolo('I numeri di iCARe — già calcolati per te');
    if (asta) righe('Auction', asta.id + ' · ' + asta.titolo + (asta.minima ? ' · minimum offer €' + Number(asta.minima).toLocaleString('it-IT') : ''));
    righe('Current value (iCARe estimate)', euro(mercato));
    righe('Your safe maximum offer', euro(max.prezzoMassimo));
    if (asta && asta.minima) righe('Minimum covered?', Number(max.prezzoMassimo) >= Number(asta.minima) ? 'Yes — you can join.' : 'No — iCARe will find you a better lot.');
    righe('TOTAL COST (all expenses)', euro(costoTotale));

    titolo('Marginality 1 · RESALE');
    righe('Resale at current value', euro(mercato));
    righe('NET RESALE MARGIN', euro(margRivendita) + ' = ' + (pctRivendita >= 0 ? '+' : '') + pctRivendita.toFixed(1) + '% on cost', 'lead');

    titolo('Marginality 2 · RENTAL');
    righe('Estimated monthly rent', euro(canone) + ' (5% of value per year, iCARe method)');
    righe('Net rent (after 15% allowance)', euro(canoneNetto) + '/month = ' + euro(renditaAnnua) + '/year');
    righe('RENTAL YIELD on your cost', rendimento.toFixed(1) + '% per year — cost recovered in ~' + anni.toFixed(1) + ' years', 'lead');

    if (!acc) {
      righe('Unlock the full file', 'Write your email and ✅ accept the CARe Service Agreement: the success fee (1.5% on the award) applies even if I bid directly on this lot. The full numbers and the personal file unlock with the acceptance below.', 'lead');
      sezione.hidden = false;
      return;
    }
    var v = bisogno === 'reddito' ? 'Rental: ' + rendimento.toFixed(1) + '% yield' : bisogno === 'rivendita' ? 'Resale: ' + euro(margRivendita) + ' net margin' : 'First home: your safe offer is ' + euro(max.prezzoMassimo);
    righe('iCARe says (for your goal: ' + bisogno + ')', (margRivendita > 0 || rendimento >= 4 ? '✅ ' : '⚠️ ') + v + ' — numbers computed on official data, confirm with the appraisal.');

    // TUTTI I VALORI DETTAGLIATI, passo per passo
    dettaglio('Detail 1 · Your safe maximum offer', max.passi);
    dettaglio('Detail 2 · Taxes', imposte.passi);
    dettaglio('Detail 3 · Auction manager fee', gestore.passi);
    dettaglio('Detail 4 · Resale margin', [
      'Value at resale: ' + euro(mercato),
      '− Total cost: ' + euro(costoTotale),
      '= Net resale margin: ' + euro(margRivendita) + ' (' + (pctRivendita >= 0 ? '+' : '') + pctRivendita.toFixed(1) + '% on cost)',
      'Breakdown of cost: offer ' + euro(max.prezzoMassimo) + ' + taxes ' + euro(imposte.totale) + ' + manager ' + euro(gestore.totale) + ' + iCARe fee ' + euro(feeICAre) + ' + notary ' + euro(notaio) + ' + renovation ' + euro(ristr)
    ]);
    dettaglio('Detail 5 · Rental', [
      'Value: ' + euro(mercato),
      '× 5% per year (market yield) = ' + euro(mercato * 0.05),
      '÷ 12 = gross monthly rent: ' + euro(mercato * 0.05 / 12),
      'Net (× 0,85 after vacancy/IMU/maintenance): ' + euro(canoneNetto) + '/month',
      'Net yearly: ' + euro(renditaAnnua),
      'Yield on your cost: ' + rendimento.toFixed(2) + '%/year',
      'Payback: cost ' + euro(costoTotale) + ' ÷ net ' + euro(renditaAnnua) + ' = ' + anni.toFixed(1) + ' years'
    ]);
    if (imposte.note && imposte.note.length) righe('Note (verified method)', imposte.note[0]);
    sezione.hidden = false;
  }

  // precompila dall'asta e calcola SUBITO (l'utente non fa nulla)
  var idAsta = new URLSearchParams(window.location.search).get('id');
  if (idAsta) {
    fetch('./aste-master.json').then(function (r) { return r.json(); }).then(function (master) {
      asta = master.aste.find(function (a) { return a.id === idAsta; });
      if (asta) autoCompila();
    }).catch(function () {});
  } else if (n('v-mercato') > 0) calcola();

  form.addEventListener('submit', function (e) { e.preventDefault(); calcola(); });
  form.addEventListener('input', function () { if (pronto) calcola(); });
  document.getElementById('v-stampa').addEventListener('click', function () { window.print(); });
})();
