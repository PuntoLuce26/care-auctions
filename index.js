(function () {
  'use strict';
  // Microfono della home: l'utente PARLA e iCARe ascolta (riconoscimento vocale nativo).
  // Se il browser non lo supporta, il pulsante porta comunque alla chat.
  var mic = document.getElementById('home-mic');
  if (!mic) return;
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  mic.addEventListener('click', function (e) {
    if (!SR) { return; } // senza riconoscimento: link normale alla chat
    e.preventDefault();
    try {
      var rec = new SR();
      rec.lang = 'en-US'; // lingua di partenza; in chat l'utente cambia lingua
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = function (ev) {
        var testo = (ev.results[0] && ev.results[0][0]) ? ev.results[0][0].transcript : '';
        if (testo) location.href = 'icare.html?q=' + encodeURIComponent(testo);
      };
      rec.onerror = function () { location.href = 'icare.html'; };
      rec.start();
    } catch (err) { location.href = 'icare.html'; }
  });
})();
