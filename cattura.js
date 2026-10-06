/* cattura.js — il contatto diventa TUO (5.36): form elegante, senza backend.
   All'invio: apre l'email precompilata a info@puntoluce26.com (canale pubblico)
   e salva la richiesta in locale. A go-live: lo stesso form passa dal worker. */
(function () {
  'use strict';
  var box = document.getElementById('lead-capture');
  if (!box) return;

  var h = document.createElement('div');
  h.className = 'lead-capture-card';
  h.innerHTML = '';
  var tit = document.createElement('h2');
  tit.textContent = 'Diventa nostro. iCARe ti trova casa.';
  h.appendChild(tit);
  var sotto = document.createElement('p');
  sotto.textContent = 'Lascia la tua email e il tuo sogno: iCARe ti scrive personalmente con le aste giuste. Gratis, zero impegni.';
  h.appendChild(sotto);

  var form = document.createElement('form');
  form.setAttribute('novalidate', '');
  var email = document.createElement('input');
  email.type = 'email'; email.id = 'c-email'; email.placeholder = 'La tua email'; email.required = true;
  var sogno = document.createElement('select');
  sogno.id = 'c-sogno';
  [['mare', 'Sogno: mare'], ['lago', 'Sogno: lago'], ['montagna', 'Sogno: montagna'], ['citta', 'Sogno: città'], ['reddito', 'Voglio una rendita'], ['prima-casa', 'Prima casa']].forEach(function (o) {
    var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; sogno.appendChild(op);
  });
  var budget = document.createElement('input');
  budget.type = 'number'; budget.id = 'c-budget'; budget.placeholder = 'Budget (€)'; budget.min = '0'; budget.inputMode = 'decimal';
  var invia = document.createElement('button');
  invia.type = 'submit'; invia.className = 'btn btn-primary'; invia.textContent = 'Invia a iCARe — gratis';
  var esito = document.createElement('p');
  esito.className = 'small'; esito.id = 'c-esito'; esito.setAttribute('role', 'status');

  form.appendChild(email); form.appendChild(sogno); form.appendChild(budget); form.appendChild(invia);
  h.appendChild(form); h.appendChild(esito);
  box.appendChild(h);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var em = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { esito.textContent = 'Scrivi un\u0027email valida, così iCARe ti trova.'; return; }
    var messaggio = 'Nuovo contatto da careauctions.co%0A' +
      'Email: ' + encodeURIComponent(em) + '%0A' +
      'Sogno: ' + encodeURIComponent(sogno.value) + '%0A' +
      'Budget: ' + encodeURIComponent(budget.value || 'non indicato');
    try { localStorage.setItem('icare-lead', JSON.stringify({ email: em, sogno: sogno.value, budget: budget.value, data: new Date().toISOString() })); } catch (x) {}
    window.location.href = 'mailto:info@puntoluce26.com?subject=' + encodeURIComponent('Nuovo contatto — ' + em) + '&body=' + messaggio;
    esito.textContent = '✅ Fatto! L\u0027email è pronta: premi invia nel tuo client. iCARe ti risponde personalmente.';
  });
})();
