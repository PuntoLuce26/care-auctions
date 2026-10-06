/* prova.js — calcolatore rapido della pagina "prova gratuita" (F1: niente inline,
   input utente solo con textContent, mai innerHTML). Testi da window.PROVA_MESSAGES. */
(function () {
  var STORAGE_KEY = 'prova_lang';
  var M = window.PROVA_MESSAGES || {};

  function savedLang() {
    try {
      var s = window.localStorage.getItem(STORAGE_KEY);
      if (s && M[s]) return s;
    } catch (e) { /* localStorage non disponibile */ }
    return 'en';
  }

  function init() {
    var C = window.Calcolo;
    var btn = document.getElementById('p-calcola');
    var out = document.getElementById('p-esito');
    var formula = document.getElementById('p-formula');
    var langButtons = document.querySelectorAll('#lang-group button');
    var lang = savedLang();
    var t = M[lang];
    var last = null; /* ultimo esito: { kind: 'ok'|'noValue'|'unavailable', massimo } */

    function renderResult() {
      if (!last || !out) return;
      if (last.kind === 'noValue') {
        out.textContent = t.errNoValue;
        formula.textContent = '';
      } else if (last.kind === 'unavailable') {
        out.textContent = t.errUnavailable;
      } else {
        out.textContent = t.result.replace('{amount}', last.massimo.toLocaleString(t.locale));
        formula.textContent = t.formula;
      }
    }

    function applyLang(code) {
      if (!M[code]) return;
      lang = code;
      t = M[code];
      var root = document.documentElement;
      root.lang = code === 'zh' ? 'zh-Hans' : code;
      root.dir = t.dir === 'rtl' ? 'rtl' : 'ltr';
      document.title = t.pageTitle;
      var meta = document.getElementById('meta-description');
      if (meta) meta.setAttribute('content', t.metaDescription);
      var logo = document.getElementById('logo-img');
      if (logo) logo.setAttribute('alt', t.logoAlt);
      var group = document.getElementById('lang-group');
      if (group) group.setAttribute('aria-label', t.langLabel);
      var trust = document.getElementById('trust-section');
      if (trust) trust.setAttribute('aria-label', t.trustLabel);
      var nodes = document.querySelectorAll('[data-i18n]');
      for (var i = 0; i < nodes.length; i++) {
        var key = nodes[i].getAttribute('data-i18n');
        if (typeof t[key] === 'string') nodes[i].textContent = t[key];
      }
      for (var j = 0; j < langButtons.length; j++) {
        var b = langButtons[j];
        b.setAttribute('aria-pressed', b.getAttribute('data-lang') === code ? 'true' : 'false');
      }
      renderResult();
    }

    for (var k = 0; k < langButtons.length; k++) {
      langButtons[k].addEventListener('click', function () {
        var code = this.getAttribute('data-lang');
        try { window.localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignora */ }
        applyLang(code);
      });
    }

    if (t) applyLang(lang);
    if (!btn || !out) return;

    btn.addEventListener('click', function () {
      var v = Number(document.getElementById('p-valore').value);
      var r = Number(document.getElementById('p-ristr').value) || 0;
      var a = Number(document.getElementById('p-altri').value) || 0;

      if (!(v > 0)) {
        out.className = 'notice';
        last = { kind: 'noValue' };
        renderResult();
        return;
      }
      var res = C ? C.prezzoMassimoSemplice({ valoreMercato: v, ristrutturazione: r, costiAccessori: a }) : null;
      if (!res) {
        last = { kind: 'unavailable' };
        renderResult();
        return;
      }
      var massimo = Number(res.prezzoMassimo);
      out.className = 'notice notice-good';
      last = { kind: 'ok', massimo: massimo };
      renderResult();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
