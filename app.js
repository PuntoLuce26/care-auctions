/* CARe Auctions — utility condivise da tutte le pagine (caricato nel <head>, senza defer).
   Testo grande: 3 livelli (100%, 115%, 130%) salvati in localStorage "care_fontscale".
   Il livello si ripristina qui, prima del disegno; il pulsante "Aa" nel header li fa ciclare. */
(function () {
  var LEVELS = ["1", "1.15", "1.3"];
  var PCT = { "1": "100%", "1.15": "115%", "1.3": "130%" };
  var KEY = "care_fontscale";
  var root = document.documentElement;
  var level = "1";
  try { var saved = localStorage.getItem(KEY); if (LEVELS.indexOf(saved) > -1) level = saved; } catch (e) {}
  root.setAttribute("data-scale", level);
  function nextOf(v) { return LEVELS[(LEVELS.indexOf(v) + 1) % LEVELS.length]; }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("font-scale");
    if (!btn) return;
    var out = document.getElementById("font-scale-level");
    var status = document.getElementById("font-scale-status");
    function render(announce) {
      var label = "Text size " + PCT[level] + ". Activate for " + PCT[nextOf(level)] + ".";
      out.textContent = PCT[level];
      btn.setAttribute("aria-label", label);
      btn.title = label;
      if (announce) status.textContent = "Text size " + PCT[level];
    }
    btn.addEventListener("click", function () {
      level = nextOf(level);
      root.setAttribute("data-scale", level);
      try { localStorage.setItem(KEY, level); } catch (e) {}
      render(true);
    });
    render(false);
  });
})();

// PWA: installabilità e offline completo
if ("serviceWorker" in navigator) { window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); }); }
