/* contatti.js — UNICO punto dei contatti di CARe Auctions (direttiva 5.9:
   quando Gianluca dà i contatti, si modifica SOLO questo file e tutta l'app
   si aggiorna). Oggi vuoto: i pulsanti restano segnaposto onesti. */
(function () {
  window.CONTATTI = {
    email: 'info@puntoluce26.com',        // canale PUBBLICO professionale (Google Workspace) — mai email o telefoni personali di Gianluca
    telefono: '',     // formato +39 ...
    whatsapp: '',     // link wa.me
    calendly: '',     // link alla consulenza gratuita di 30 min
    indirizzo: ''     // sede operativa (quando la visura sarà pronta)
  };

  function applicaContatti() {
    var c = window.CONTATTI;
    // Testi {email} {telefono} {calendly} nei punti marcati data-contatti
    var testi = document.querySelectorAll('[data-contatti]');
    for (var i = 0; i < testi.length; i++) {
      var el = testi[i];
      var t = el.textContent;
      t = t.replace('{email}', c.email || '').replace('{telefono}', c.telefono || '').replace('{calendly}', c.calendly || '');
      el.textContent = t;
    }
    // Link: gli elementi con data-contatti-link puntano al canale indicato
    var link = document.querySelectorAll('[data-contatti-link]');
    for (var j = 0; j < link.length; j++) {
      var a = link[j];
      var chiave = a.getAttribute('data-contatti-link');
      var valore = c[chiave] || '';
      if (valore) { a.href = valore; a.removeAttribute('aria-disabled'); }
    }
  }

  document.addEventListener('DOMContentLoaded', applicaContatti);
})();
