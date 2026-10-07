/* aste.js — lista aste per regione (piuma: carica SOLO il file della regione scelta).
   Fonte: registro ufficiale pvp.giustizia.it via the official register. Zero doppioni per costruzione. */
(function () {
  'use strict';
  var list = document.getElementById('aste-list');
  if (!list) return;

  function caricaRegione(r) {
    return fetch('./aste-dati-' + r + '.json').then(function (res) {
      if (!res.ok) throw new Error('no feed');
      return res.json();
    });
  }

  function render(dati) {
    if (!dati.aste || !dati.aste.length) { list.textContent = ''; return; }
    list.textContent = '';
    var scelte = dati.scelteICAre || [];
    var tagEl = document.getElementById('lista-tag');
    if (tagEl) tagEl.textContent = 'Live · ' + (dati.regione || 'Italia');
    dati.aste.forEach(function (a) {
      var li = document.createElement('li');
      li.className = 'card';
      if (scelte.indexOf(a.id) !== -1) {
        var pk = document.createElement('p');
        var pkT = document.createElement('span');
        pkT.className = 'tag tag-solid';
        pkT.textContent = '⭐ iCARe\u0027s pick · score ' + (a.punteggio || '—');
        pk.appendChild(pkT); li.appendChild(pk);
      }
      if (a.immagine) {
        var img = document.createElement('img');
        img.src = a.immagine;
        img.alt = '';
        img.loading = 'lazy';
        img.className = 'aste-img';
        li.appendChild(img);
      } else {
        var ph = document.createElement('p');
        ph.className = 'aste-foto-placeholder';
        ph.innerHTML = ''; // nessuna immagine inline (CSP)
        var ic = document.createElement('span'); ic.className = 'aste-foto-ico'; ic.textContent = '🏠';
        var tx = document.createElement('span'); tx.className = 'aste-foto-note'; tx.textContent = 'Photos are in the official appraisal file — iCARe sends them to you on request.';
        ph.appendChild(ic); ph.appendChild(tx);
        li.appendChild(ph);
      }
      if (!aste.length) {
        var vuoto = document.createElement('p');
        vuoto.className = 'small';
        vuoto.textContent = 'No verified opportunities in this region right now — every auction must pass the full screening before being published. Try another region.';
        listEl.appendChild(vuoto);
      }
      if (a.professionisti && a.professionisti.length) {
        var prof = document.createElement('p');
        prof.className = 'small';
        prof.textContent = '📞 Procedure professionals: ' + a.professionisti.map(function (s) { return (s.nome + ' ' + (s.cognome || '')).trim() + (s.telefono ? ' — ' + s.telefono : '') + (s.ruolo ? ' (' + s.ruolo + ')' : ''); }).join(' · ');
        li.appendChild(prof);
      }
      if (a.lat && a.lon) {
        var sv = document.createElement('p');
        sv.className = 'small';
        var linkSv = document.createElement('a');
        linkSv.href = 'https://maps.google.com/maps?q=' + a.lat + ',' + a.lon + '&layer=c&cbll=' + a.lat + ',' + a.lon + '&cbp=11,0,0,0,0';
        linkSv.target = '_blank';
        linkSv.rel = 'noopener';
        linkSv.textContent = '🛣️ Street View della zona →';
        sv.appendChild(linkSv);
        li.appendChild(sv);
      }
      if (a.documenti && a.documenti.length) {
        var doc = document.createElement('p');
        doc.className = 'small';
        doc.textContent = '📎 Documents: ' + a.documenti.map(function (x) { return x.nome; }).join(' · ');
        li.appendChild(doc);
        var daz = document.createElement('div');
        daz.className = 'actions';
        a.documenti.slice(0, 3).forEach(function (x) {
          var dl = document.createElement('a');
          dl.className = 'btn btn-secondary';
          dl.href = x.link; dl.target = '_blank'; dl.rel = 'noopener';
          dl.textContent = x.nome.length > 28 ? x.nome.slice(0, 28) + '…' : x.nome;
          daz.appendChild(dl);
        });
        li.appendChild(daz);
      }
      var h3 = document.createElement('h3');
      h3.textContent = a.id + ' · ' + a.titolo;
      li.appendChild(h3);
      var tab = document.createElement('table');
      var tb = document.createElement('tbody');
      function euro(v) { return v === undefined || v === null ? '—' : '€ ' + Number(v).toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
      [['Court', a.tribunale], ['Market base', euro(a.prezzoBase)], ['Minimum offer to join', euro(a.minima)], ['Discount', a.scontoPct ? a.scontoPct + '%' : '—'], ['Occupancy', a.occupazione || '—'], ['Auction date', a.dataAsta]].forEach(function (riga) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td'); td1.textContent = riga[0];
        var td2 = document.createElement('td'); td2.textContent = riga[1];
        tr.appendChild(td1); tr.appendChild(td2); tb.appendChild(tr);
      });
      tab.appendChild(tb); li.appendChild(tab);
      var az = document.createElement('div');
      az.className = 'actions';
      var b = document.createElement('a');
      b.className = 'btn btn-primary';
      b.href = 'valutazione.html?id=' + encodeURIComponent(a.id);
      b.textContent = 'iCARe valuation — resale & rental margins';
      az.appendChild(b);
      var b2 = document.createElement('a');
      b2.className = 'btn btn-secondary';
      b2.href = 'asta.html';
      b2.textContent = 'Open auction sheet';
      az.appendChild(b2);
      if (a.link) {
        var lnk = document.createElement('a');
        lnk.className = 'btn btn-secondary';
        lnk.href = a.link;
        lnk.target = '_blank';
        lnk.rel = 'noopener';
        lnk.textContent = 'Official notice & documents';
        az.appendChild(lnk);
      }
      li.appendChild(az);
      list.appendChild(li);
    });
  }

  // selettore costruito dal master: tutte le regioni disponibili
  fetch('./aste-master.json').then(function (r) { return r.json(); }).then(function (master) {
    var g = document.getElementById('regione-group');
    if (!g || !master.regioni) return;
    master.regioni.forEach(function (reg) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-r', reg);
      b.setAttribute('aria-pressed', reg === 'lazio' ? 'true' : 'false');
      b.textContent = reg.charAt(0).toUpperCase() + reg.slice(1).replace(/-/g, ' ');
      g.appendChild(b);
    });
  }).catch(function () {});
  var gruppo = document.getElementById('regione-group');
  if (gruppo) {
    gruppo.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      gruppo.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      caricaRegione(b.getAttribute('data-r')).then(render).catch(function () {
        list.textContent = '';
        var li = document.createElement('li');
        li.className = 'card';
        li.textContent = 'This region is being prepared — iCARe is collecting it.';
        list.appendChild(li);
      });
    });
  }

  caricaRegione('lazio').then(render).catch(function () { /* righe statiche di riserva */ });

  var form = document.getElementById('filter-form');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });
})();
