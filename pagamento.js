/* pagamento.js — PayPal (sandbox per ora: demo, €0).
   In LIVE si sostituisce SOLO il client-id (direttiva 5.26: live solo con
   visura + conto aziendale — mai su conti di terzi). */
(function () {
  'use strict';
  var form = document.getElementById('pag-form');
  var box = document.getElementById('paypal-button-container');
  var esito = document.getElementById('p-esito');
  if (!form || !box) return;

  var CLIENT_ID = 'sb'; // sandbox pubblico; il client-id reale arriva da developer.paypal.com

  function mostraPulsante() {
    box.textContent = '';
    if (!window.paypal) { esito.textContent = 'PayPal non si è caricato. Ricarica la pagina.'; return; }
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: function (data, actions) {
        var importo = Number(document.getElementById('p-importo').value);
        var causale = document.getElementById('p-causale').value;
        return actions.order.create({
          purchase_units: [{
            description: causale === 'idream' ? 'iDream donation' : 'CARe Auctions success fee',
            amount: { value: importo.toFixed(2), currency_code: 'EUR' }
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function () {
          esito.textContent = 'Grazie! Pagamento ricevuto (sandbox). In live riceverai la ricevuta via email.';
        });
      },
      onError: function () {
        esito.textContent = 'Il pagamento non è andato a buon fine. Riprova.';
      }
    }).render(box);
  }

  if (window.paypal) mostraPulsante();
  // il pulsante appare quando l'utente inserisce un importo (scelta elegante)
  form.addEventListener('input', function () {
    if (!window.paypal) {
      var s = document.createElement('script');
      s.src = 'https://www.paypal.com/sdk/js?client-id=' + CLIENT_ID + '&currency=EUR';
      s.onload = mostraPulsante;
      document.head.appendChild(s);
    } else mostraPulsante();
  });
})();
