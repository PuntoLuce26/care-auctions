(function () {
  'use strict';
  // SOLO DEMO client-side: nessun invio, nessun salvataggio (né rete, né localStorage, né cookie).
  var form = document.getElementById('login');
  var email = document.getElementById('email');
  var pw = document.getElementById('password');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    document.getElementById('email-err').textContent = '';
    document.getElementById('pw-err').textContent = '';
    email.removeAttribute('aria-invalid');
    pw.removeAttribute('aria-invalid');
    if (!email.validity.valid || email.value.trim() === '') {
      document.getElementById('email-err').textContent = 'Enter a valid email address, e.g. name@example.com.';
      email.setAttribute('aria-invalid', 'true');
      ok = false;
    }
    if (pw.value.length < 8) {
      document.getElementById('pw-err').textContent = 'The password must be at least 8 characters.';
      pw.setAttribute('aria-invalid', 'true');
      ok = false;
    }
    if (!ok) { (email.getAttribute('aria-invalid') ? email : pw).focus(); return; }
    var box = document.getElementById('result');
    box.hidden = false;
    // Testo fisso (nessun dato dell'utente): innerHTML qui contiene solo markup statico.
    box.innerHTML = '<p><strong>Demo complete.</strong> The form is valid, but nothing was sent or saved: real accounts are coming soon.</p>' +
      '<p>What to do now: <a href="aste.html">browse the auction list</a> or <a href="asta.html">open the auction sheet</a>.</p>';
    pw.value = '';
  });
})();
