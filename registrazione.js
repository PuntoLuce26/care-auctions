/* registrazione.js — Sam 5.0 · il flusso pionieri (5.169).
 * Fase attuale: i dati partono verso info@puntoluce26.com (mailto) e si salvano in locale;
 * appena Supabase è collegato (5.170), il flusso diventa: POST → DB → mail conferma + SMS OTP. */
(function () {
  var f = document.getElementById('forma-pioniere');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = document.getElementById('p-nome').value.trim();
    var email = document.getElementById('p-email').value.trim();
    var cel = document.getElementById('p-cel').value.trim();
    var news = document.getElementById('p-news').checked;
    var esito = document.getElementById('p-esito');
    if (!nome || !email || !cel) { esito.textContent = 'Compila tutti i campi.'; return; }
    if (!document.getElementById('p-privacy').checked) { esito.textContent = 'Serve il consenso privacy.'; return; }
    // registro locale (il database reale arriva con Supabase)
    try {
      var lista = JSON.parse(localStorage.getItem('icare-pionieri') || '[]');
      lista.push({ nome: nome, email: email, cellulare: cel, news: news, data: new Date().toISOString() });
      localStorage.setItem('icare-pionieri', JSON.stringify(lista));
      localStorage.setItem('icare-pioniere', '1');
    } catch (err) {}
    // la richiesta arriva alla casella gestita (info@puntoluce26.com)
    var oggetto = 'Nuovo pioniere iCommunity — ' + nome;
    var corpo = 'Nome: ' + nome + '\nEmail: ' + email + '\nCellulare: ' + cel + '\nConsenso privacy: SI\nAggiornamenti iUmani: ' + (news ? 'SI' : 'NO') + '\nData: ' + new Date().toISOString();
    window.location.href = 'mailto:info@puntoluce26.com?subject=' + encodeURIComponent(oggetto) + '&body=' + encodeURIComponent(corpo);
    esito.textContent = '✅ Benvenuto tra i pionieri. Conferma la mail che si è aperta: entri subito nella fase di costruzione.';
  });
})();
