/* visita.js — Sam 5.0 · beacon di traffico PRIVATO (5.179): pagina + lingua, mai dati personali. */
(function () {
  try {
    var lingua = (window.ICAReLingua || (navigator.language || 'it').slice(0, 2).toLowerCase());
    fetch('https://icare-ai.misty-mode-1cbc.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ azione: 'visita', pagina: location.pathname.slice(0, 120), lingua: lingua }),
    }).catch(function () {});
  } catch (e) {}
})();
