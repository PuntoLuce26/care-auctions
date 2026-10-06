/* trova-asta.js — iCARe seleziona le aste in TUTTA Italia per esigenze.
   L'utente non deve conoscere i paesi: sogno (mare/lago/montagna/città),
   tipo, scopo, budget. Con i dati demo mostra avviso onesto. */
(function () {
  'use strict';
  var form = document.getElementById('match-form');
  if (!form) return;

  function soldi(t) { return t.toLocaleString('en-GB', { maximumFractionDigits: 0 }); }

  // selezione a pillola: un solo valore attivo per gruppo
  ['m-zona', 'm-tipo', 'm-scopo'].forEach(function (id) {
    var g = document.getElementById(id);
    if (!g) return;
    g.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      g.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
    });
  });

  function scelta(id) {
    var g = document.getElementById(id);
    var b = g && g.querySelector('button[aria-pressed="true"]');
    return (b && b.getAttribute('data-v')) || 'any';
  }

  function fraseScopo(s) {
    return { investimento: 'an investment', vacanza: 'a holiday home', abitare: 'a home to live in' }[s] || 'a property';
  }
  function fraseZona(z) {
    return { mare: 'by the sea', lago: 'by a lake', montagna: 'in the mountains', citta: 'in the city', any: 'anywhere in Italy' }[z] || 'anywhere in Italy';
  }
  function fraseTipo(t) {
    return { casa: 'houses', appartamento: 'apartments', terreno: 'land', garage: 'garages', any: 'properties' }[t] || 'properties';
  }

  function rendi(lista, dati, budget, zona, tipo, scopo) {
    lista.textContent = '';
    var prezzi = dati.aste.filter(function (a) { return isFinite(Number(a.prezzoBase)); });
    if (!prezzi.length) {
      var li = document.createElement('li');
      li.className = 'card';
      li.textContent = 'The live feed is not connected yet: iCARe is showing you the journey, not the fish. Ask iCARe for help.';
      lista.appendChild(li);
      lista.hidden = false;
      return;
    }
    var adatte = dati.aste.filter(function (a) {
      if (!isFinite(Number(a.prezzoBase)) || Number(a.prezzoBase) > budget) return false;
      if (tipo !== 'any' && a.tipo && a.tipo !== tipo) return false;
      if (zona !== 'any' && a.zona && a.zona !== zona) return false;
      return true;
    }).sort(function (a, b) { return Number(a.prezzoBase) - Number(b.prezzoBase); });

    if (!adatte.length) {
      var li2 = document.createElement('li');
      li2.className = 'card';
      li2.textContent = 'No ' + fraseTipo(tipo) + ' ' + fraseZona(zona) + ' under €' + soldi(budget) + ' right now. Raise the budget or tell iCARe what you need.';
      lista.appendChild(li2);
      lista.hidden = false;
      return;
    }
    adatte.forEach(function (a) {
      var li3 = document.createElement('li');
      li3.className = 'card';
      var h = document.createElement('h3');
      h.textContent = a.id + ' · ' + a.titolo;
      li3.appendChild(h);
      var p = document.createElement('p');
      p.textContent = 'Court: ' + a.tribunale + ' · Starting price: €' + soldi(Number(a.prezzoBase));
      li3.appendChild(p);
      var az = document.createElement('div');
      az.className = 'actions';
      var b = document.createElement('a');
      b.className = 'btn btn-secondary';
      b.href = 'asta.html';
      b.textContent = 'Open auction sheet';
      az.appendChild(b);
      li3.appendChild(az);
      lista.appendChild(li3);
    });
    lista.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cash = Number(document.getElementById('m-cash').value) || 0;
    var loan = Number(document.getElementById('m-loan').value) || 0;
    var budget = cash + loan;
    var zona = scelta('m-zona'), tipo = scelta('m-tipo'), scopo = scelta('m-scopo');
    var esito = document.getElementById('match-esito');
    var lista = document.getElementById('match-lista');
    if (budget <= 0) { esito.textContent = 'Enter at least one number.'; return; }
    esito.textContent = 'Budget €' + soldi(budget) + ' · ' + fraseTipo(tipo) + ' ' + fraseZona(zona) + ' for ' + fraseScopo(scopo) + '. iCARe is searching all of Italy…';
    fetch('./aste-dati.json')
      .then(function (r) { if (!r.ok) throw new Error('no feed'); return r.json(); })
      .then(function (dati) { rendi(lista, dati, budget, zona, tipo, scopo); })
      .catch(function () { esito.textContent = 'Auction data unavailable right now.'; });
  });
})();
