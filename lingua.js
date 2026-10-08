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
    var nostre = ['it','en','de','es','fr','ru','ja','ar','hi','ko','zh','pt','pl','uk','vi','ro','tl','el','nl','sv'];
    for (var i = 0; i < nostre.length; i++) { if (n.indexOf(nostre[i]) === 0) return nostre[i]; }
    return 'en';
  }
  // 5.176: verifica della POSIZIONE (chiede il permesso) → allinea subito alla lingua della zona
  function linguaDaZona() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (/Europe\/Rome|Europe\/Vatican|Europe\/San_Marino/.test(tz)) return 'it';
      if (/America\//.test(tz)) return 'en';
      if (/Europe\/Berlin|Europe\/Vienna|Europe\/Zurich/.test(tz)) return 'de';
      if (/Europe\/Madrid/.test(tz)) return 'es';
      if (/Europe\/Paris|Europe\/Brussels/.test(tz)) return 'fr';
      if (/Asia\/Tokyo/.test(tz)) return 'ja';
      if (/Asia\/Seoul/.test(tz)) return 'ko';
      if (/Asia\/Shanghai|Asia\/Taipei/.test(tz)) return 'zh';
      if (/Europe\/Moscow|Europe\/Kiev|Europe\/Uzhgorod/.test(tz)) return tz.indexOf('Kiev') >= 0 ? 'uk' : 'ru';
      if (/Asia\/Manila/.test(tz)) return 'tl';
      if (/Europe\/Athens/.test(tz)) return 'el';
      if (/Europe\/Amsterdam/.test(tz)) return 'nl';
      if (/Europe\/Stockholm/.test(tz)) return 'sv';
      if (/Asia\/Kolkata/.test(tz)) return 'hi';
      if (/Europe\/Warsaw/.test(tz)) return 'pl';
      if (/Europe\/Lisbon/.test(tz)) return 'pt';
      if (/Europe\/Bucharest/.test(tz)) return 'ro';
      if (/Asia\/Ho_Chi_Minh|Asia\/Hanoi/.test(tz)) return 'vi';
      if (/Asia\/Riyadh|Africa\/Cairo|Asia\/Dubai/.test(tz)) return 'ar';
    } catch (e) {}
    return null;
  }
  var scelta = leggi();
  if (!scelta) {
    scelta = linguaDaZona() || linguaDaNavigatore();
    // richiesta POSIZIONE (permesso del browser): solo per allineare la lingua; mai coordinate salvate
    if (navigator.geolocation) { try { navigator.geolocation.getCurrentPosition(function(){}, function(){}, { timeout: 4000 }); } catch (e) {} }
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
  var LINGUE = [['it','IT'],['en','EN'],['de','DE'],['es','ES'],['fr','FR'],['ru','RU'],['ja','JA'],['ar','AR'],['hi','HI'],['ko','KO'],['zh','ZH'],['pt','PT'],['pl','PL'],['uk','UK'],['vi','VI'],['ro','RO'],['tl','TL'],['el','EL'],['nl','NL'],['sv','SV']];
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
