(function () {
      var I = document.getElementById('m-importo'), A = document.getElementById('m-anni'), T = document.getElementById('m-tasso'), E = document.getElementById('m-esito');
      function calc() {
        var P = Number(I.value), n = Number(A.value) * 12, r = Number(T.value) / 100 / 12;
        if (!P || !n || r < 0) { E.textContent = 'Rata indicativa: —'; return; }
        var rata = (P * r) / (1 - Math.pow(1 + r, -n));
        E.textContent = 'Rata indicativa: ' + rata.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }) + '/mese';
      }
      [I, A, T].forEach(function (x) { x.addEventListener('input', calc); });
      calc();
      var F = document.getElementById('form-mutuo');
      F.addEventListener('submit', function (e) {
        e.preventDefault();
        var oggetto = 'Richiesta mutuo — ' + document.getElementById('r-nome').value;
        var corpo = 'Nome: ' + document.getElementById('r-nome').value + '\nEmail: ' + document.getElementById('r-email').value + '\nImporto: €' + document.getElementById('r-importo').value + '\nNote: ' + (document.getElementById('r-note').value || '—');
        window.location.href = 'mailto:info@puntoluce26.com?subject=' + encodeURIComponent(oggetto) + '&body=' + encodeURIComponent(corpo);
      });
    })();
