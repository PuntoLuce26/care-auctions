/*
 * CARe Auctions — archivio locale delle analisi salvate dalla scheda asta.
 * Usa SOLO localStorage, chiave 'care_analisi' (mai per login o dati di account).
 * Nessun DOM, nessuna rete. Espone window.ANALISI_STORE = { salva, elenco, rimuovi, carica }.
 *
 * Analisi: { id, data (ISO), nomeAsta, tribunale, procedura, esito,
 *            prezzoMassimo, margineEuro, marginePct, costoTotale, campi }
 * Gli importi non calcolabili restano null (mai inventati).
 */
(function (radice) {
  'use strict';

  var CHIAVE = 'care_analisi';

  function leggi() {
    try {
      var testo = radice.localStorage.getItem(CHIAVE);
      var lista = testo ? JSON.parse(testo) : [];
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return []; // archivio assente, illeggibile o localStorage non disponibile
    }
  }

  // Lancia un errore se il browser non permette di scrivere (es. spazio esaurito, modalità privata).
  function scrivi(lista) {
    radice.localStorage.setItem(CHIAVE, JSON.stringify(lista));
  }

  function numeroONull(x) {
    return typeof x === 'number' && isFinite(x) ? x : null;
  }

  function testo(x) {
    return x === null || x === undefined ? '' : String(x);
  }

  function nuovoId() {
    return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // Salva una nuova analisi e la restituisce (con id e data). Tiene solo i campi previsti.
  function salva(analisi) {
    var a = analisi || {};
    var campi = {};
    if (a.campi && typeof a.campi === 'object') {
      Object.keys(a.campi).forEach(function (k) {
        var v = a.campi[k];
        campi[k] = typeof v === 'boolean' ? v : testo(v);
      });
    }
    var record = {
      id: nuovoId(),
      data: new Date().toISOString(),
      nomeAsta: testo(a.nomeAsta),
      tribunale: testo(a.tribunale),
      procedura: testo(a.procedura),
      esito: testo(a.esito),
      prezzoMassimo: numeroONull(a.prezzoMassimo),
      margineEuro: numeroONull(a.margineEuro),
      marginePct: numeroONull(a.marginePct),
      costoTotale: numeroONull(a.costoTotale),
      campi: campi
    };
    var lista = leggi();
    lista.push(record);
    scrivi(lista);
    return record;
  }

  // Tutte le analisi, dalla più recente.
  function elenco() {
    return leggi().slice().sort(function (x, y) {
      return testo(y.data).localeCompare(testo(x.data));
    });
  }

  // Rimuove l'analisi con quell'id; restituisce true se l'ha trovata.
  function rimuovi(id) {
    var lista = leggi();
    var resto = lista.filter(function (a) { return a.id !== id; });
    if (resto.length === lista.length) return false;
    scrivi(resto);
    return true;
  }

  // L'analisi con quell'id, oppure null.
  function carica(id) {
    var lista = leggi();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) return lista[i];
    }
    return null;
  }

  radice.ANALISI_STORE = { salva: salva, elenco: elenco, rimuovi: rimuovi, carica: carica };
})(window);
