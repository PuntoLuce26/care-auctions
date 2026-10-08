/* registrazione.js v2 — Sam 5.0 · pionieri + profilo completo (5.171):
 * età (fascia), città, gusti (aste, buy now, iHouse, iShop, investimento, prima casa).
 * Geolocalizzazione a livello di città (mai coordinate precise: privacy). Consenso GDPR. */
(function () {
  var f = document.getElementById('forma-pioniere');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var V = function (id) { var x = document.getElementById(id); return x ? x.value.trim() : ''; };
    var nome = V('p-nome'), email = V('p-email'), cel = V('p-cel'), eta = V('p-eta'), citta = V('p-citta');
    var esito = document.getElementById('p-esito');
    if (!nome || !email || !cel) { esito.textContent = 'Compila tutti i campi.'; return; }
    if (!document.getElementById('p-privacy').checked) { esito.textContent = 'Serve il consenso privacy.'; return; }
    var gusti = [];
    ['g-aste', 'g-buynow', 'g-ihouse', 'g-ishop', 'g-invest', 'g-primacasa'].forEach(function (id) {
      var x = document.getElementById(id);
      if (x && x.checked) gusti.push(id.slice(2));
    });
    var news = document.getElementById('p-news').checked;
    var pioniere = { nome: nome, email: email, cellulare: cel, eta: eta, citta: citta, gusti: gusti, news: news, data: new Date().toISOString() };
    try {
      var lista = JSON.parse(localStorage.getItem('icare-pionieri') || '[]');
      lista.push(pioniere);
      localStorage.setItem('icare-pionieri', JSON.stringify(lista));
      localStorage.setItem('icare-pioniere', '1');
    } catch (err) {}
    var corpo = 'Nome: ' + nome + '\nEmail: ' + email + '\nCellulare: ' + cel + '\nEtà: ' + eta + '\nCittà: ' + citta + '\nGusti: ' + (gusti.join(', ') || '—') + '\nAggiornamenti: ' + (news ? 'SI' : 'NO') + '\nData: ' + new Date().toISOString();
    window.location.href = 'mailto:info@puntoluce26.com?subject=' + encodeURIComponent('Nuovo pioniere iCommunity — ' + nome) + '&body=' + encodeURIComponent(corpo);
    esito.textContent = '✅ Benvenuto tra i pionieri. Conferma la mail che si è aperta.';
  });
})();
