(function () {
  'use strict';
  var C = window.Calcolo;
  function $(id) { return document.getElementById(id); }

  // Chiavi di calcolo.js -> id dei campi. Stessi campi della scheda 4 del prototipo.
  var FIELDS = {
    tribunale: 'a-tribunale', numeroProcedura: 'a-procedura', lotto: 'a-lotto', dataAsta: 'a-data',
    termineOfferte: 'a-termine', baseAsta: 'a-base', offertaMinima: 'a-minima', deposito: 'a-deposito',
    mq: 'a-mq', renditaCasa: 'a-rcasa', renditaBox: 'a-rbox', stato: 'a-stato', ape: 'a-ape',
    ristrutturazione: 'a-ristr', difformita: 'a-diff', valoreMercato: 'a-valore', prezzoOfferto: 'a-offerto',
    notaio: 'a-notaio', consulenza: 'a-consul'
  };
  var LABELS_EN = {
    tribunale: 'Court', numeroProcedura: 'Case number', lotto: 'Lot', dataAsta: 'Auction date',
    termineOfferte: 'Bid deadline', baseAsta: 'Starting price', offertaMinima: 'Minimum bid',
    deposito: 'Security deposit', mq: 'Floor area (m²)', renditaCasa: 'Cadastral income — home',
    renditaBox: 'Cadastral income — garage', stato: 'Condition', ape: 'Energy certificate (APE)',
    valoreMercato: 'Estimated market value', prezzoOfferto: 'Price you intend to bid',
    ristrutturazione: 'Planned renovation', difformita: 'Non-compliance (regularisation)',
    notaio: 'Notary', consulenza: 'Advisory fee'
  };
  var VALUES_EN = { 'ottimo': 'Excellent', 'buono': 'Good', 'da ristrutturare': 'Needs renovation', 'presente': 'Available', 'assente': 'Not available' };
  var REF_EN = { 'prezzo offerto': 'your bid price', 'offerta minima': 'minimum bid', "base d'asta": 'starting price' };
  var VERDICT = {
    'CONVIENE': { cls: 'v-go', text: 'GO — worth bidding' },
    'NON CONVIENE': { cls: 'v-no', text: 'NO GO — not worth it' },
    'ATTENZIONE': { cls: 'v-warn', text: 'CAUTION — lower your bid' },
    'NON VALUTABILE': { cls: 'v-na', text: 'CANNOT BE ASSESSED — data missing' }
  };
  // Caso reale San Pasquale (dati verificati, gli stessi del prototipo). Tutti gli altri campi restano vuoti = MISSING.
  var SAN_PASQUALE = {
    // caso reale: San Pasquale, Santa Teresa di Gallura — tribunale di PADOVA, proc. 49/2024 (archivio Giglia Dal Santo)
    valoreMercato: 220000, prezzoOfferto: 126000, renditaCasa: 227.24, renditaBox: 78.09,
    ristrutturazione: 2000, difformita: 8000, notaio: 1500, consulenza: 5040
  };

  var E = C.euro;
  function pct(x) { return C.percento(x / 100, 2); }
  function orNA(x) { return x === null || x === undefined ? 'cannot be calculated' : E(x); }
  function dateEn(s) { var p = s.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : s; }

  function readData() {
    var d = {};
    Object.keys(FIELDS).forEach(function (k) { d[k] = $(FIELDS[k]).value.trim(); });
    d.primaCasa = $('a-prima').checked;
    var a = $('a-aliq').value;
    d.aliquotaGestore = a === '' ? '' : Number(a) / 100;
    return d;
  }
  function show(c, v) {
    if (v === '') return 'MISSING';
    if (c.tipo === 'euro') return E(Number(v));
    if (c.tipo === 'data') return dateEn(v);
    return VALUES_EN[v] || v;
  }
  function row(tbody, label, text, cls) {
    var tr = document.createElement('tr');
    if (cls) tr.className = cls;
    var a = document.createElement('td'); a.textContent = label;
    var b = document.createElement('td'); b.textContent = text; b.className = 'amount';
    tr.appendChild(a); tr.appendChild(b); tbody.appendChild(tr);
  }
  function list(id, items) {
    var el = $(id);
    el.textContent = '';
    items.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; el.appendChild(li); });
  }

  // Le segnalazioni le decide calcolo.js; qui si traducono in inglese con i numeri del risultato.
  function riskEn(x, r, d) {
    var t = x.testo, ref = REF_EN[r.nomeRiferimento] || r.nomeRiferimento;
    var tag = { 'NON CONVIENE': 'NO GO', 'AVVISO': 'WARNING', 'DATO MANCANTE': 'MISSING DATA' }[x.tipo] || x.tipo;
    var msg = null;
    if (t.indexOf('il prezzo massimo risulta') !== -1) msg = 'the maximum price is ' + E(r.prezzoMassimo) + ': costs leave no 5% margin at any price.';
    else if (t.indexOf("l'offerta minima (") !== -1) msg = 'the minimum bid (' + E(Number(d.offertaMinima)) + ') is above the maximum price (' + E(r.prezzoMassimo) + ') by ' + E(Number(d.offertaMinima) - r.prezzoMassimo) + '.';
    else if (t.indexOf('sotto il 5%') !== -1) msg = 'with a ' + ref + ' of ' + E(r.prezzoRiferimento) + ' the margin is ' + pct(r.margine.marginePercentuale) + ', below 5%.';
    else if (t.indexOf('supera il prezzo massimo') !== -1) msg = 'the ' + ref + ' (' + E(r.prezzoRiferimento) + ') is above the maximum price (' + E(r.prezzoMassimo) + ').';
    else if (t.indexOf('da ristrutturare') !== -1) msg = 'property "needs renovation" but planned renovation is €0.';
    else if (t.indexOf('rendita catastale') !== -1) msg = 'cadastral income of the home: cadastral value and taxes cannot be calculated.';
    else if (t.indexOf('APE non indicato') !== -1) msg = 'energy certificate (APE) not stated.';
    else if (t.indexOf('APE indicato come assente') !== -1) msg = 'energy certificate (APE) marked as not available.';
    else if (t.indexOf('valore di mercato stimato') !== -1) msg = 'estimated market value: maximum price cannot be calculated.';
    else if (t.indexOf('nessun prezzo di riferimento') !== -1) msg = 'no reference price (your bid, minimum bid or starting price): fee and margin cannot be calculated.';
    return msg ? tag + ': ' + msg : t; // testo originale se la frase non è riconosciuta
  }

  function summaryEn(r, d) {
    var s = [], max = r.prezzoMassimo, min = d.offertaMinima === '' ? null : Number(d.offertaMinima);
    var ref = REF_EN[r.nomeRiferimento] || r.nomeRiferimento;
    if (r.esito === 'CONVIENE') s.push('With these figures the reference price is within the maximum price and the margin is at least 5%.');
    else if (r.esito === 'NON CONVIENE') s.push(max <= 0 ? 'Costs leave no 5% margin at any price.' : 'The minimum bid is above the maximum price that keeps a 5% margin.');
    else if (r.esito === 'ATTENZIONE') s.push('The reference price is above the maximum price or leaves a margin below 5%: lower your bid.');
    else s.push('Some essential data is missing: fill in the fields listed below.');
    if (max !== null && max > 0) {
      s.push('You can bid up to ' + E(max) + (r.prezzoMassimoSemplice
        ? ' (the lower of simple formula ' + E(r.prezzoMassimoSemplice.prezzoMassimo) + ' and detailed formula ' + E(r.prezzoMassimoDettagliato.prezzoMassimo) + ').'
        : ' (detailed formula only: the simple one needs a reference price).'));
      if (min !== null && min <= max) s.push('Between the minimum bid (' + E(min) + ') and the maximum price there is ' + E(max - min) + ' of room for raises.');
    }
    if (r.margine) {
      s.push('With a ' + ref + ' of ' + E(r.prezzoRiferimento) + ' the total cost is ' + E(r.margine.costoTotale) +
        ' and the margin is ' + E(r.margine.margineEuro) + ' (' + pct(r.margine.marginePercentuale) + ' of total cost).');
    }
    var missing = C.CAMPI_SCHEDA.filter(function (c) { return d[c.k] === ''; })
      .map(function (c) { return LABELS_EN[c.k] + (c.zero ? ' (counted as €0)' : ''); });
    if (d.ape === 'assente') missing.push('Energy certificate (marked as not available)');
    s.push(missing.length ? 'Missing data (' + missing.length + '): ' + missing.join('; ') + '.' : 'No missing data.');
    return s;
  }

  var lastResult = null; // ultimo risultato valido di calcolo.js, usato da "Save analysis"

  function calc() {
    lastResult = null;
    var d = readData();
    var now = new Date();
    $('a-header').textContent = 'Court: ' + (d.tribunale || 'MISSING') + ' · Case: ' + (d.numeroProcedura || 'MISSING') +
      ' · Lot: ' + (d.lotto || 'MISSING') + ' · Generated on ' +
      ('0' + now.getDate()).slice(-2) + '/' + ('0' + (now.getMonth() + 1)).slice(-2) + '/' + now.getFullYear();
    var tData = $('a-data-table'), tCalc = $('a-calc-table');
    tData.textContent = ''; tCalc.textContent = '';
    try {
      var r = C.schedaAsta(d);
      lastResult = r;
      var v = VERDICT[r.esito];
      $('a-verdict').className = 'verdict ' + v.cls;
      $('a-verdict').textContent = '';
      $('a-verdict').appendChild(document.createTextNode(v.text));
      var small = document.createElement('small');
      small.textContent = 'Engine verdict: ' + r.esito;
      $('a-verdict').appendChild(small);
      list('a-summary', summaryEn(r, d));
      var risks = r.rischi.length ? r.rischi.map(function (x) { return riskEn(x, r, d); }) : [];
      // Vincoli che sopravvivono alla vendita + tipo di acquisto (regola di Gianluca)
      risks.push('Check the sale notice: constraints that survive the sale (servitudes, usufruct, condominium charges) are NOT cancelled by the auction.');
      var tipo = $('a-tipo') ? $('a-tipo').value : 'piena';
      if (tipo === 'nuda') risks.push('Bare ownership selected: verify the usufructuary and the value basis in the notice; taxes on bare ownership differ.');
      if (!risks.length) risks = ['No flags.'];
      list('a-risks', risks);

      C.CAMPI_SCHEDA.forEach(function (c) {
        row(tData, LABELS_EN[c.k], show(c, d[c.k]), d[c.k] === '' ? 'missing' : '');
          row(tData, 'Tax regime', r.primaCasa ? 'Main residence (prima casa)' : 'Second home (seconda casa)');
      });

      var imp = r.imposte, m = r.margine;
      row(tCalc, 'Total cadastral income (home + garage)', orNA(r.rendita));
      row(tCalc, 'Cadastral value', orNA(imp && imp.valoreCatastale));
      row(tCalc, 'Registration tax', orNA(imp && imp.registro));
      row(tCalc, 'Mortgage tax', orNA(imp && imp.ipotecaria));
      row(tCalc, 'Cadastral tax', orNA(imp && imp.catastale));
      row(tCalc, 'Total purchase taxes', orNA(imp && imp.totale), 'total');
      row(tCalc, 'Auction platform fee ' + C.percento(r.aliquotaGestore, 2) + ' + VAT' +
        (r.nomeRiferimento ? ' (on ' + REF_EN[r.nomeRiferimento] + ')' : ''), orNA(r.commissione && r.commissione.totale));
      row(tCalc, 'Notary', E(r.costi.notaio));
      row(tCalc, 'Advisory fee', E(r.costi.consulenza));
      row(tCalc, 'Non-compliance (regularisation)', E(r.costi.difformita));
      row(tCalc, 'Renovation', E(r.costi.ristrutturazione));
      row(tCalc, 'Reference price' + (r.nomeRiferimento ? ' (' + REF_EN[r.nomeRiferimento] + ')' : ''), orNA(r.prezzoRiferimento));
      row(tCalc, 'Total cost', orNA(m && m.costoTotale), 'total');
      row(tCalc, 'Maximum price — simple formula', orNA(r.prezzoMassimoSemplice && r.prezzoMassimoSemplice.prezzoMassimo));
      row(tCalc, 'Maximum price — detailed formula', orNA(r.prezzoMassimoDettagliato && r.prezzoMassimoDettagliato.prezzoMassimo));
      row(tCalc, 'Maximum bid (the lower of the two)', orNA(r.prezzoMassimo), 'total');
      row(tCalc, 'Resulting margin', m ? E(m.margineEuro) + ' (' + pct(m.marginePercentuale) + ')' : 'cannot be calculated', 'total');

      $('a-notes').textContent = r.note.length
        ? 'Note: second-home mortgage tax 2% and cadastral tax 1% are applied on the cadastral value, as specified. ' +
          'In the real San Pasquale case they were a fixed €100 instead: to be checked with an accountant.'
        : '';
      list('p-tax', imp ? imp.passi : ['Cannot be calculated: cadastral income missing.']);
      list('p-fee', r.commissione ? r.commissione.passi : ['Cannot be calculated: no reference price.']);
      list('p-sim', r.prezzoMassimoSemplice ? r.prezzoMassimoSemplice.passi : ['Cannot be calculated.']);
      list('p-det', r.prezzoMassimoDettagliato ? r.prezzoMassimoDettagliato.passi : ['Cannot be calculated.']);
      list('p-mar', m ? m.passi : ['Cannot be calculated.']);
    } catch (e) {
      $('a-verdict').className = 'verdict v-no';
      $('a-verdict').textContent = 'Check your input: ' + e.message;
      list('a-summary', []);
      list('a-risks', []);
      $('a-notes').textContent = '';
    }
  }

  // Messaggi di salvataggio/apertura: testo e link creati come nodi (mai innerHTML con dati dell'utente).
  function message(id, parts) {
    var el = $(id);
    el.textContent = '';
    parts.forEach(function (p) { el.appendChild(typeof p === 'string' ? document.createTextNode(p) : p); });
  }
  function clearMessages() { message('a-save-ok', []); message('a-save-warn', []); message('w-msg', []); }
  function dashboardLink(text) {
    var a = document.createElement('a');
    a.href = 'dashboard.html';
    a.textContent = text;
    return a;
  }

  // Campi obbligatori SOLO per salvare (il calcolo funziona anche senza).
  var REQUIRED = [['a-nome', 'Auction name'], ['a-tribunale', 'Court (Tribunale)'], ['a-procedura', 'Case number']];

  function saveAnalysis() {
    clearMessages();
    calc();
    var missing = REQUIRED.filter(function (f) { return $(f[0]).value.trim() === ''; });
    if (missing.length) {
      var warn = 'Not saved: fill in ' + missing.map(function (f) { return f[1]; }).join(', ') +
        ' first, so you can recognise this analysis in your dashboard.';
      message('a-save-warn', [warn]);
      if (guided) showFieldStep(missing[0][0], warn);
      $(missing[0][0]).focus();
      return;
    }
    if (!lastResult) {
      message('a-save-warn', ['Not saved: some values are not valid. Check the fields and try again.']);
      return;
    }
    var d = readData(), r = lastResult, m = r.margine;
    var campi = {};
    Object.keys(FIELDS).forEach(function (k) { campi[k] = d[k]; });
    campi.primaCasa = d.primaCasa;
    campi.aliquotaGestorePct = $('a-aliq').value.trim(); // come inserito (in %)
    campi.tipoProprieta = $('a-tipo').value; // piena | nuda
    try {
      window.ANALISI_STORE.salva({
        nomeAsta: $('a-nome').value.trim(),
        tribunale: d.tribunale,
        procedura: d.numeroProcedura,
        esito: r.esito,
        prezzoMassimo: r.prezzoMassimo,
        margineEuro: m ? m.margineEuro : null,
        marginePct: m ? m.marginePercentuale : null,
        costoTotale: m ? m.costoTotale : null,
        campi: campi
      });
    } catch (e) {
      message('a-save-warn', ['Not saved: this browser does not allow local storage (private mode or storage full). ' +
        'Use "Print A4 summary" to keep a copy.']);
      return;
    }
    message('a-save-ok', ['Saved - see your dashboard. ', dashboardLink('Open your dashboard')]);
  }

  // Apertura dalla dashboard: 'care_analisi_apri' contiene l'id; si caricano i campi e si rimuove la chiave.
  function openFromDashboard() {
    var id = null;
    try {
      id = window.localStorage.getItem('care_analisi_apri');
      window.localStorage.removeItem('care_analisi_apri');
    } catch (e) { return; }
    if (!id) return;
    var a = window.ANALISI_STORE.carica(id);
    if (!a) {
      message('a-open-msg', ['The saved analysis was not found (it may have been deleted). ', dashboardLink('Back to your dashboard')]);
      return;
    }
    var c = a.campi || {};
    Object.keys(FIELDS).forEach(function (k) { $(FIELDS[k]).value = c.hasOwnProperty(k) ? c[k] : ''; });
    $('a-nome').value = a.nomeAsta || '';
    $('a-prima').checked = c.primaCasa === true;
    $('a-aliq').value = c.hasOwnProperty('aliquotaGestorePct') ? c.aliquotaGestorePct : 4;
    $('a-tipo').value = c.hasOwnProperty('tipoProprieta') ? c.tipoProprieta : 'piena';
    message('a-open-msg', ['Loaded your saved analysis "' + (a.nomeAsta || 'MISSING') + '". ' +
      'Change any figure to recalculate; "Save analysis" stores a new copy. ', dashboardLink('Back to your dashboard')]);
  }

  // Modalità guidata: una domanda alla volta. Le etichette ORIGINALI del modulo (stessi input, stessi id,
  // stessi listener che chiamano calc) vengono spostate nello step corrente e poi rimesse al loro posto:
  // calcolo e salvataggio sono esattamente quelli della modalità completa.
  // Non presenti negli step (restano solo nel modulo completo): a-data, a-termine, a-base, a-deposito.
  var STEPS = [
    { name: 'The property', q: 'Tell us about the home.',
      help: 'You find these numbers in the expert report (perizia) and in the land registry record. Leave a box empty if you don\'t know.',
      ids: ['a-tipo', 'a-mq', 'a-rcasa', 'a-rbox', 'a-prima'] },
    { name: 'The auction', q: 'Which auction is it?',
      help: 'Copy these from the court notice (avviso di vendita).',
      ids: ['a-tribunale', 'a-procedura', 'a-lotto', 'a-minima'] },
    { name: 'The costs', q: 'How much will you spend besides the price?',
      help: 'Work, paperwork and fees. An empty box counts as €0.',
      ids: ['a-ristr', 'a-diff', 'a-notaio', 'a-aliq'] },
    { name: 'The market', q: 'How much is the home worth, and how much do you want to offer?',
      help: 'The market value is what the home would sell for today.',
      ids: ['a-valore', 'a-offerto', 'a-consul'] },
    { name: 'The condition', q: 'What condition is the home in?',
      help: 'Choose "— not stated —" if the documents don\'t say.',
      ids: ['a-stato', 'a-ape'] },
    { name: 'Your result', q: 'Here is your result.',
      help: 'Read the verdict below. To save it, give the analysis a name. Auction date, bid deadline, starting price and security deposit are only in the full form.',
      ids: ['a-nome'] }
  ];
  var guided = false, step = 0, PLACE = {};
  STEPS.forEach(function (s) {
    s.ids.forEach(function (id) {
      var label = $(id).closest('label'), ph = document.createComment('w:' + id);
      label.parentNode.insertBefore(ph, label);
      PLACE[id] = { label: label, ph: ph };
    });
  });
  function putBack() {
    Object.keys(PLACE).forEach(function (id) {
      var p = PLACE[id];
      p.ph.parentNode.insertBefore(p.label, p.ph.nextSibling);
    });
  }
  function showStep(n, focus) {
    var s = STEPS[n], last = n === STEPS.length - 1;
    step = n;
    putBack();
    s.ids.forEach(function (id) { $('w-fields').appendChild(PLACE[id].label); });
    $('w-count').textContent = 'Step ' + (n + 1) + ' of ' + STEPS.length;
    $('w-legend').textContent = s.name;
    $('w-question').textContent = s.q;
    $('w-help').textContent = s.help;
    document.querySelectorAll('#w-progress li').forEach(function (li, i) {
      if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      li.className = i < n ? 'done' : '';
    });
    $('w-back').disabled = n === 0;
    $('w-next').hidden = last;
    $('w-next').textContent = n === STEPS.length - 2 ? 'See my result' : 'Next';
    $('w-full').hidden = !last;
    $('a-result').hidden = !last;
    message('w-msg', []);
    if (last) calc();
    if (focus) $('w-question').focus();
  }
  // Salvataggio in modalità guidata con campo obbligatorio vuoto: si torna allo step del campo.
  function showFieldStep(id, text) {
    for (var i = 0; i < STEPS.length; i++) {
      if (STEPS[i].ids.indexOf(id) !== -1 && i !== step) { showStep(i, false); message('w-msg', [text]); return; }
    }
  }
  function setMode(g) {
    if (g === guided) return;
    guided = g;
    $('mode-guided').setAttribute('aria-pressed', String(g));
    $('mode-full').setAttribute('aria-pressed', String(!g));
    $('w-wizard').hidden = !g;
    $('a-form').hidden = g;
    if (g) {
      showStep(0, true);
    } else {
      putBack();
      $('a-result').hidden = false;
      message('w-msg', []);
    }
  }
  $('mode-guided').addEventListener('click', function () { setMode(true); });
  $('mode-full').addEventListener('click', function () { setMode(false); });
  $('w-full').addEventListener('click', function () { setMode(false); $('mode-full').focus(); });
  $('w-back').addEventListener('click', function () { if (step > 0) showStep(step - 1, true); });
  $('w-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (step < STEPS.length - 1) showStep(step + 1, true);
  });

  // Il modulo non si invia mai: ogni campo ricalcola da solo (sostituisce onsubmit="return false").
  $('a-form').addEventListener('submit', function (e) { e.preventDefault(); });
  $('a-example').addEventListener('click', function () {
    Object.keys(FIELDS).forEach(function (k) {
      $(FIELDS[k]).value = SAN_PASQUALE.hasOwnProperty(k) ? SAN_PASQUALE[k] : '';
    });
    $('a-nome').value = '';
    $('a-prima').checked = false; // seconda casa
    $('a-aliq').value = 4;
    clearMessages();
    calc();
  });
  $('a-clear').addEventListener('click', function () {
    Object.keys(FIELDS).forEach(function (k) { $(FIELDS[k]).value = ''; });
    $('a-nome').value = '';
    $('a-prima').checked = false;
    $('a-aliq').value = 4;
    clearMessages();
    calc();
  });
  $('a-save').addEventListener('click', saveAnalysis);
  $('a-print').addEventListener('click', function () { window.print(); });
  document.querySelectorAll('#a-form input, #a-form select').forEach(function (i) {
    i.addEventListener('input', calc);
    i.addEventListener('change', calc);
    i.addEventListener('input', function () { message('a-save-ok', []); });
  });
  openFromDashboard();
  calc();
})();

