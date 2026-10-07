/* lingua.js — la lingua scelta in home definisce TUTTO (5.128):
   - si salva la scelta; - le pagine localizzate si aprono nella lingua giusta;
   - la chat di iCARe risponde nella lingua scelta. */
(function () {
  var K = 'icare-lingua';
  function leggi() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function salva(l) { try { localStorage.setItem(K, l); } catch (e) {} }
  // Espone la lingua scelta a tutto il sito
  // RICONOSCE LA LINGUA DAL DISPOSITIVO/NAVIGATORE (posizione e impostazioni) (5.129)
  function linguaDaNavigatore() {
    var n = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var nostre = ['it','en','de','es','fr','ru','ja','ar','hi','ko','zh','pt','pl','uk','vi','ro'];
    for (var i = 0; i < nostre.length; i++) { if (n.indexOf(nostre[i]) === 0) return nostre[i]; }
    return 'en';
  }
  var scelta = leggi();
  if (!scelta) {
    scelta = linguaDaNavigatore();
    salva(scelta);
    // sulla home radice: va subito alla homepage localizzata
    if (location.pathname === '/' && scelta !== 'en') { window.location.replace(scelta + '/index.html'); }
  }
  window.ICAReLingua = scelta;
  // Selettori lingua: cliccando si salva e si va alla homepage localizzata
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest ? ev.target.closest('[data-lingua]') : null;
    if (t && t.getAttribute('data-lingua')) {
      var l = t.getAttribute('data-lingua');
      salva(l);
      var base = window.ICARePercorsoBase || (l + '/index.html');
      window.location.href = base;
    }
  });
  // Barra lingua sulle pagine core (per cambiare in ogni momento)
  var LINGUE = [['it','IT'],['en','EN'],['de','DE'],['es','ES'],['fr','FR'],['ru','RU'],['ja','JA'],['ar','AR'],['hi','HI'],['ko','KO'],['zh','ZH'],['pt','PT'],['pl','PL'],['uk','UK'],['vi','VI'],['ro','RO']];
  var bar = document.getElementById('barra-lingua');
  if (bar && !bar.children.length) {
    LINGUE.forEach(function (p) {
      var a = document.createElement('a');
      a.href = '#'; a.setAttribute('data-lingua', p[0]); a.textContent = p[1];
      a.setAttribute('aria-label', 'Lingua ' + p[1]);
      bar.appendChild(a);
      bar.appendChild(document.createTextNode(' · '));
    });
  }
})();
