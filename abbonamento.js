/* abbonamento.js — Sam 5.0 · firma elettronica con OTP (5.163).
 * Flusso: OTP → consenso → firma registrata (FES art. 20 CAD). FaceID conferma sul dispositivo.
 * Fase attuale: simulazione locale; l'invio OTP reale si attiva con il gateway (PayPal/pagamenti) in lista. */
(function () {
  var btnOtp = document.getElementById('btn-otp');
  var btnFirma = document.getElementById('btn-firma');
  var esito = document.getElementById('f-esito');
  if (!btnOtp || !btnFirma) return;
  var codice = null;

  btnOtp.addEventListener('click', function () {
    var cel = document.getElementById('f-cel');
    if (!cel.value || cel.value.length < 8) { esito.textContent = 'Inserisci un cellulare valido.'; return; }
    codice = String(Math.floor(100000 + Math.random() * 900000));
    // DEMO: il codice appare qui; col gateway reale arriva via SMS
    esito.textContent = 'OTP DEMO: ' + codice + ' (con il gateway reale arriva via SMS).';
  });

  btnFirma.addEventListener('click', function () {
    var otp = document.getElementById('f-otp');
    var ok = document.getElementById('f-ok');
    var nome = document.getElementById('f-nome');
    if (!ok.checked) { esito.textContent = 'Devi accettare il contratto.'; return; }
    if (!otp.value || otp.value !== codice) { esito.textContent = 'Codice OTP non valido.'; return; }
    var atto = {
      contratto: 'incarico-consulenza-aste-e-servizi',
      successFee: '1,90% prima casa · 2,90% seconda · rivendita 1,50%/2,50%',
      nome: nome.value,
      cellulare: document.getElementById('f-cel').value,
      firma: 'OTP verificato',
      dispositivo: navigator.userAgent.slice(0, 120),
      data: new Date().toISOString()
    };
    try {
      var lista = JSON.parse(localStorage.getItem('icare-contratti') || '[]');
      lista.push(atto);
      localStorage.setItem('icare-contratti', JSON.stringify(lista));
      localStorage.setItem('icare-abbonato', '1');
      window.ICAReAbbonato = true;
    } catch (e) {}
    esito.textContent = '✅ FIRMATO con OTP. Servizi sbloccati. Buona caccia alla casa.';
  });
})();
