(function () {
  'use strict';
  var C = window.Calcolo, S = window.ANALISI_STORE;
  function $(id) { return document.getElementById(id); }

  // Stessi esiti, testi e classi della scheda asta (asta.html).
  var VERDICT = {
    'CONVIENE': { cls: 'v-go', text: 'GO' },
    'NON CONVIENE': { cls: 'v-no', text: 'NO GO' },
    'ATTENZIONE': { cls: 'v-warn', text: 'CAUTION' },
    'NON VALUTABILE': { cls: 'v-na', text: 'CANNOT BE ASSESSED' }
  };

  function orMissing(s) { return s ? s : 'MISSING'; }
  function money(x) { return typeof x === 'number' ? C.euro(x) : 'cannot be calculated'; }
  function two(n) { return ('0' + n).slice(-2); }
  function dateTime(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return 'MISSING';
    return two(d.getDate()) + '/' + two(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + two(d.getHours()) + ':' + two(d.getMinutes());
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function fact(dl, label, value) {
    dl.appendChild(el('dt', '', label));
    dl.appendChild(el('dd', '', value));
  }
  function status(text) { $('d-status').textContent = text; }

  function render() {
    var items = S.elenco(), list = $('d-list');
    list.textContent = '';
    $('d-empty').hidden = items.length > 0;
    list.hidden = items.length === 0;
    $('d-count').textContent = items.length ? '(' + items.length + ')' : '';

    items.forEach(function (a) {
      var v = VERDICT[a.esito] || { cls: 'v-na', text: 'MISSING' };
      var name = orMissing(a.nomeAsta);
      var li = el('li', 'card analysis');

      var head = el('div', 'analysis-head');
      head.appendChild(el('h3', '', name));
      var badge = el('span', 'badge ' + v.cls, v.text);
      if (a.esito) badge.appendChild(el('span', 'visually-hidden', ' (engine verdict: ' + a.esito + ')'));
      head.appendChild(badge);
      li.appendChild(head);

      var meta = el('p', 'small');
      meta.appendChild(document.createTextNode('Saved on '));
      var t = el('time', '', dateTime(a.data));
      t.dateTime = a.data || '';
      meta.appendChild(t);
      meta.appendChild(document.createTextNode(' · Court: ' + orMissing(a.tribunale) + ' · Case: ' + orMissing(a.procedura)));
      li.appendChild(meta);

      var dl = el('dl', 'facts');
      fact(dl, 'Maximum price', money(a.prezzoMassimo));
      fact(dl, 'Margin', typeof a.margineEuro === 'number'
        ? C.euro(a.margineEuro) + (typeof a.marginePct === 'number' ? ' (' + C.percento(a.marginePct / 100, 2) + ')' : '')
        : 'cannot be calculated');
      li.appendChild(dl);

      var actions = el('div', 'actions');
      var open = el('button', 'btn btn-primary', 'Open');
      open.type = 'button';
      open.setAttribute('aria-label', 'Open ' + name);
      open.addEventListener('click', function () {
        try {
          window.localStorage.setItem('care_analisi_apri', a.id);
        } catch (e) {
          status('Cannot open: this browser does not allow local storage.');
          return;
        }
        window.location.href = 'asta.html';
      });
      var del = el('button', 'btn btn-secondary', 'Delete');
      del.type = 'button';
      del.setAttribute('aria-label', 'Delete ' + name);
      del.addEventListener('click', function () {
        if (!window.confirm('Delete the analysis "' + name + '"? This cannot be undone.')) return;
        var ok = false;
        try { ok = S.rimuovi(a.id); } catch (e) { ok = false; }
        render();
        status(ok ? 'Deleted "' + name + '".' : 'Could not delete "' + name + '".');
        $('saved-title').focus(); // il pulsante premuto non esiste più: il focus torna al titolo
      });
      actions.appendChild(open);
      actions.appendChild(del);
      li.appendChild(actions);

      list.appendChild(li);
    });
  }

  render();
})();
