/*
 * iCARe — calcolatore centrale (MVP, funzionalità 4: scheda asta).
 * SOLO funzioni pure: nessun DOM, nessuna rete, nessuno stato globale.
 * Funziona nel browser (window.Calcolo) e in Node (module.exports).
 *
 * Fonte delle formule: compito Harness del 05/10/2026 e
 * careauctions/verifica-step.md (riga 75: max_offer_price = (market − renovation − ancillary) / 1.05).
 * Ogni funzione restituisce anche `passi`: il calcolo passo a passo in italiano.
 */
(function (radice) {
  'use strict';

  var MARGINE = 1.05; // margine 5% della specifica MVP

  // Arrotonda ai centesimi evitando gli errori della virgola mobile (es. 3462.4422 -> 3462.44).
  function arrotonda2(x) {
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }

  // floor "sicuro": 209523.99999999997 deve dare 209523, ma 209524.0000000001 deve dare 209524.
  function floorSicuro(x) {
    return Math.floor(x + 1e-9);
  }

  function num(x, nome) {
    var n = Number(x);
    if (x === '' || x === null || x === undefined || !isFinite(n)) {
      throw new Error('Valore non valido per "' + nome + '"');
    }
    return n;
  }

  // Formattazione euro all'italiana senza dipendere da Intl (1234567.8 -> "1.234.567,80 €").
  function euro(x) {
    var segno = x < 0 ? '−' : '';
    var parti = Math.abs(arrotonda2(x)).toFixed(2).split('.');
    var intero = parti[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return segno + intero + ',' + parti[1] + ' €';
  }

  function percento(x, decimali) {
    var d = decimali === undefined ? 2 : decimali;
    return (x * 100).toFixed(d).replace('.', ',') + '%';
  }

  /*
   * Modalità semplice — formula di specifica, applicata ALLA LETTERA:
   *   max_offer_price = floor( (estimated_market_value - renovation_cost - ancillary_costs) / 1.05 )
   * Nota: qui il 5% è un margine calcolato sul solo prezzo offerto
   * (valore − ristrutturazione − accessori = 1,05 × prezzo).
   */
  function prezzoMassimoSemplice(o) {
    var v = num(o.valoreMercato, 'valoreMercato');
    var r = num(o.ristrutturazione, 'ristrutturazione');
    var a = num(o.costiAccessori, 'costiAccessori');
    var netto = v - r - a;
    var grezzo = netto / MARGINE;
    var prezzo = floorSicuro(grezzo);
    return {
      prezzoMassimo: prezzo,
      nettoDisponibile: arrotonda2(netto),
      passi: [
        'Valore di mercato stimato: ' + euro(v),
        '− Ristrutturazione: ' + euro(r),
        '− Costi accessori: ' + euro(a),
        '= Netto disponibile: ' + euro(netto),
        '÷ 1,05 (margine 5%) = ' + grezzo.toFixed(4).replace('.', ',') + ' €',
        'Arrotondato per difetto (floor): ' + euro(prezzo)
      ]
    };
  }

  /*
   * Modalità dettagliata — soluzione esatta quando la commissione è una percentuale del prezzo offerto:
   *   max_offer = floor( (market_value / 1.05 - fixed_costs - renovation_cost) / (1 + commission_rate) )
   * ASSUNZIONE: `aliquotaCommissione` è l'aliquota EFFETTIVA sul prezzo, IVA inclusa
   * (es. gestore 4% + IVA 22% = 0,04 × 1,22 = 0,0488). L'interfaccia la calcola così.
   * ASSUNZIONE: le imposte calcolate su valore catastale (prezzo-valore) non dipendono dal prezzo
   * e vanno quindi messe nei costi fissi.
   * Nota: qui il 5% è un margine sul COSTO TOTALE (valore = 1,05 × costo totale), definizione diversa
   * dalla modalità semplice. Le due formule sono quelle della specifica e non sono state "armonizzate".
   */
  function prezzoMassimoDettagliato(o) {
    var v = num(o.valoreMercato, 'valoreMercato');
    var r = num(o.ristrutturazione, 'ristrutturazione');
    var f = num(o.costiFissi, 'costiFissi');
    var c = num(o.aliquotaCommissione, 'aliquotaCommissione');
    var vDiviso = v / MARGINE;
    var disponibile = vDiviso - f - r;
    var grezzo = disponibile / (1 + c);
    var prezzo = floorSicuro(grezzo);
    var commissione = arrotonda2(prezzo * c);
    return {
      prezzoMassimo: prezzo,
      commissioneAlPrezzoMassimo: commissione,
      costoTotaleAlPrezzoMassimo: arrotonda2(prezzo + commissione + f + r),
      passi: [
        'Valore di mercato ÷ 1,05: ' + euro(v) + ' ÷ 1,05 = ' + euro(vDiviso),
        '− Costi fissi: ' + euro(f),
        '− Ristrutturazione: ' + euro(r),
        '= Disponibile per prezzo + commissione: ' + euro(disponibile),
        '÷ (1 + ' + c.toFixed(4).replace('.', ',') + ') = ' + grezzo.toFixed(4).replace('.', ',') + ' €',
        'Arrotondato per difetto (floor): ' + euro(prezzo),
        'Controllo: commissione a quel prezzo = ' + euro(commissione) +
          '; costo totale = ' + euro(prezzo + commissione + f + r)
      ]
    };
  }

  /* Valore catastale = rendita × 1,05 × (110 prima casa | 120 seconda casa), ai centesimi. */
  function valoreCatastale(o) {
    var rendita = num(o.rendita, 'rendita');
    var coeff = o.primaCasa ? 110 : 120;
    var valore = arrotonda2(rendita * 1.05 * coeff);
    return {
      valore: valore,
      coefficiente: coeff,
      passi: [
        'Rendita catastale: ' + euro(rendita),
        '× 1,05 (rivalutazione) × ' + coeff + (o.primaCasa ? ' (prima casa)' : ' (seconda casa)'),
        '= Valore catastale: ' + euro(valore)
      ]
    };
  }

  /*
   * Imposte di acquisto, con le aliquote ESATTAMENTE come indicate nel compito:
   *   registro    2% prima casa / 9% seconda casa, sul valore catastale, minimo 1.000 €
   *   ipotecaria  50 € prima casa / 2% seconda casa
   *   catastale   50 € prima casa / 1% seconda casa
   * ASSUNZIONE (base MANCANTE nel compito): il 2% e l'1% della seconda casa sono applicati
   *   allo stesso valore catastale usato per il registro.
   * DA VERIFICARE con il commercialista: nel caso reale San Pasquale (caso B di verifica.js)
   *   le "altre tasse" sono 100 € (= 50 + 50) anche come seconda casa, cioè NON 2% + 1%.
   *   Il codice applica la regola del compito e segnala la discrepanza in `note`.
   * `prezzo` non entra nelle imposte (base = valore catastale): è restituito solo per confronto.
   */
  function imposteAcquisto(o) {
    var prima = !!o.primaCasa;
    var prezzo = o.prezzo === undefined || o.prezzo === '' ? null : num(o.prezzo, 'prezzo');
    var vc = valoreCatastale({ rendita: o.rendita, primaCasa: prima });
    var aliqReg = prima ? 0.02 : 0.09;
    var registroCalcolato = arrotonda2(vc.valore * aliqReg);
    var registro = Math.max(registroCalcolato, 1000);
    var ipotecaria = prima ? 50 : arrotonda2(vc.valore * 0.02);
    var catastale = prima ? 50 : arrotonda2(vc.valore * 0.01);
    var totale = arrotonda2(registro + ipotecaria + catastale);
    var passi = vc.passi.slice();
    passi.push('Imposta di registro ' + percento(aliqReg, 0) + ' × ' + euro(vc.valore) + ' = ' +
      euro(registroCalcolato) + (registro > registroCalcolato ? ' → minimo di legge 1.000,00 €' : ''));
    passi.push('Imposta ipotecaria: ' + (prima ? 'fissa 50,00 €' : '2% × ' + euro(vc.valore) + ' = ' + euro(ipotecaria)));
    passi.push('Imposta catastale: ' + (prima ? 'fissa 50,00 €' : '1% × ' + euro(vc.valore) + ' = ' + euro(catastale)));
    passi.push('= Totale imposte: ' + euro(totale));
    var note = [];
    if (!prima) {
      note.push('Ipotecaria 2% e catastale 1% applicate come da compito (base assunta: valore catastale). ' +
        'Nel caso reale San Pasquale risultano invece 100 € fissi: da verificare con il commercialista.');
    }
    return {
      valoreCatastale: vc.valore,
      registro: registro,
      ipotecaria: ipotecaria,
      catastale: catastale,
      totale: totale,
      prezzo: prezzo,
      passi: passi,
      note: note
    };
  }

  /* Commissione del gestore dell'asta: aliquota (default 4%) + IVA 22% sulla commissione. */
  function commissioneGestoreAsta(o) {
    var prezzo = num(o.prezzo, 'prezzo');
    var aliquota = o.aliquota === undefined || o.aliquota === '' ? 0.04 : num(o.aliquota, 'aliquota');
    var aliqIva = o.iva === undefined || o.iva === '' ? 0.22 : num(o.iva, 'iva');
    var imponibile = arrotonda2(prezzo * aliquota);
    var iva = arrotonda2(imponibile * aliqIva);
    var totale = arrotonda2(imponibile + iva);
    return {
      imponibile: imponibile,
      iva: iva,
      totale: totale,
      passi: [
        'Commissione ' + percento(aliquota, 2) + ' × ' + euro(prezzo) + ' = ' + euro(imponibile),
        '+ IVA ' + percento(aliqIva, 0) + ' = ' + euro(iva),
        '= Totale commissione gestore: ' + euro(totale)
      ]
    };
  }

  /*
   * Margine dell'operazione.
   * ASSUNZIONE: `costiTotali` = tutti i costi ESCLUSO il prezzo offerto
   * (imposte, commissioni, notaio, ristrutturazione, consulenza, ...).
   * Costo totale = prezzo offerto + costiTotali. Percentuale = margine / costo totale.
   */
  function margine(o) {
    var v = num(o.valoreMercato, 'valoreMercato');
    var p = num(o.prezzoOfferto, 'prezzoOfferto');
    var c = num(o.costiTotali, 'costiTotali');
    var costoTotale = arrotonda2(p + c);
    var margineEuro = arrotonda2(v - costoTotale);
    var perc = costoTotale > 0 ? margineEuro / costoTotale : NaN;
    return {
      costoTotale: costoTotale,
      margineEuro: margineEuro,
      marginePercentuale: Math.round(perc * 10000) / 100, // es. 54.35
      passi: [
        'Prezzo offerto: ' + euro(p),
        '+ Costi (escluso prezzo): ' + euro(c),
        '= Costo totale: ' + euro(costoTotale),
        'Valore di mercato ' + euro(v) + ' − costo totale = margine ' + euro(margineEuro),
        'Margine sul costo totale: ' + euro(margineEuro) + ' ÷ ' + euro(costoTotale) + ' = ' + percento(perc, 2)
      ]
    };
  }

  /*
   * Scheda asta (scheda 4): mette insieme le funzioni sopra in un flusso unico.
   * Input `d`: campi di CAMPI_SCHEDA + primaCasa (bool) + aliquotaGestore (default 0,04).
   * '' / null / undefined = dato MANCANTE. Riepilogo e segnalazioni sono FRASI FISSE riempite con i numeri.
   * ASSUNZIONI:
   *   - rendita usata per le imposte = rendita casa + rendita box;
   *   - box, ristrutturazione, difformità, notaio e consulenza mancanti valgono 0 nel calcolo (e sono segnalati);
   *   - costi fissi = imposte + notaio + consulenza + difformità; la ristrutturazione resta separata;
   *   - prezzo di riferimento = prezzo offerto, altrimenti offerta minima, altrimenti base d'asta;
   *   - formula semplice: costi accessori = costi fissi + commissione gestore al prezzo di riferimento;
   *   - prezzo massimo = il MINORE tra formula semplice e dettagliata (scelta prudente).
   */
  var IVA_GESTORE = 0.22;
  var ESITO = {
    CONVIENE: 'CONVIENE',
    NON_CONVIENE: 'NON CONVIENE',
    ATTENZIONE: 'ATTENZIONE',
    NON_VALUTABILE: 'NON VALUTABILE'
  };
  var CAMPI_SCHEDA = [
    { k: 'tribunale', etichetta: 'Tribunale', tipo: 'testo' },
    { k: 'numeroProcedura', etichetta: 'Numero procedura', tipo: 'testo' },
    { k: 'lotto', etichetta: 'Lotto', tipo: 'testo' },
    { k: 'dataAsta', etichetta: 'Data asta', tipo: 'data' },
    { k: 'termineOfferte', etichetta: 'Termine offerte', tipo: 'data' },
    { k: 'baseAsta', etichetta: "Base d'asta", tipo: 'euro' },
    { k: 'offertaMinima', etichetta: 'Offerta minima', tipo: 'euro' },
    { k: 'deposito', etichetta: 'Deposito cauzionale', tipo: 'euro' },
    { k: 'mq', etichetta: 'Superficie (mq)', tipo: 'numero' },
    { k: 'renditaCasa', etichetta: 'Rendita catastale casa', tipo: 'euro' },
    { k: 'renditaBox', etichetta: 'Rendita catastale box', tipo: 'euro', zero: true },
    { k: 'stato', etichetta: "Stato dell'immobile", tipo: 'testo' },
    { k: 'ape', etichetta: 'APE', tipo: 'testo' },
    { k: 'valoreMercato', etichetta: 'Valore di mercato stimato', tipo: 'euro' },
    { k: 'prezzoOfferto', etichetta: 'Prezzo che si intende offrire', tipo: 'euro' },
    { k: 'ristrutturazione', etichetta: 'Ristrutturazione prevista', tipo: 'euro', zero: true },
    { k: 'difformita', etichetta: "Difformità (a carico dell'aggiudicatario)", tipo: 'euro', zero: true },
    { k: 'notaio', etichetta: 'Notaio', tipo: 'euro', zero: true },
    { k: 'consulenza', etichetta: 'Consulenza', tipo: 'euro', zero: true }
  ];

  function vuoto(x) {
    return x === '' || x === null || x === undefined;
  }

  function schedaAsta(d) {
    function opz(k) { return vuoto(d[k]) ? null : num(d[k], k); }
    function zero(k) { return vuoto(d[k]) ? 0 : num(d[k], k); }

    var mancanti = [];
    CAMPI_SCHEDA.forEach(function (c) {
      if (vuoto(d[c.k])) {
        mancanti.push(c.etichetta + (c.zero ? ' (considerato 0 € nel calcolo)' : ''));
      } else if (c.tipo === 'euro' || c.tipo === 'numero') {
        num(d[c.k], c.etichetta);
      }
    });
    if (d.ape === 'assente') mancanti.push('APE (indicato come assente)');

    var prima = !!d.primaCasa;
    var aliquota = vuoto(d.aliquotaGestore) ? 0.04 : num(d.aliquotaGestore, 'aliquotaGestore');
    var aliqEff = aliquota * (1 + IVA_GESTORE);
    var valore = opz('valoreMercato');
    var offertaMinima = opz('offertaMinima');
    var costi = {
      ristrutturazione: zero('ristrutturazione'),
      difformita: zero('difformita'),
      notaio: zero('notaio'),
      consulenza: zero('consulenza')
    };
    var rendita = vuoto(d.renditaCasa) ? null : arrotonda2(num(d.renditaCasa, 'renditaCasa') + zero('renditaBox'));

    var rif = null, nomeRif = null;
    if (!vuoto(d.prezzoOfferto)) { rif = num(d.prezzoOfferto, 'prezzoOfferto'); nomeRif = 'prezzo offerto'; }
    else if (offertaMinima !== null) { rif = offertaMinima; nomeRif = 'offerta minima'; }
    else if (!vuoto(d.baseAsta)) { rif = num(d.baseAsta, 'baseAsta'); nomeRif = "base d'asta"; }

    var imp = rendita === null ? null : imposteAcquisto({ rendita: rendita, primaCasa: prima });
    var comm = rif === null ? null : commissioneGestoreAsta({ prezzo: rif, aliquota: aliquota, iva: IVA_GESTORE });
    var costiFissi = imp ? arrotonda2(imp.totale + costi.notaio + costi.consulenza + costi.difformita) : null;
    var det = null, sem = null, m = null, prezzoMax = null;
    if (imp && valore !== null) {
      det = prezzoMassimoDettagliato({ valoreMercato: valore, ristrutturazione: costi.ristrutturazione,
        costiFissi: costiFissi, aliquotaCommissione: aliqEff });
      prezzoMax = det.prezzoMassimo;
      if (comm) {
        sem = prezzoMassimoSemplice({ valoreMercato: valore, ristrutturazione: costi.ristrutturazione,
          costiAccessori: arrotonda2(costiFissi + comm.totale) });
        prezzoMax = Math.min(prezzoMax, sem.prezzoMassimo);
        m = margine({ valoreMercato: valore, prezzoOfferto: rif,
          costiTotali: arrotonda2(costiFissi + costi.ristrutturazione + comm.totale) });
      }
    }
    var minimaSopra = prezzoMax !== null && offertaMinima !== null && offertaMinima > prezzoMax;

    // Segnalazioni di rischio: regole fisse sui numeri.
    var rischi = [];
    function segnala(tipo, testo) { rischi.push({ tipo: tipo, testo: tipo + ': ' + testo }); }
    if (prezzoMax !== null && prezzoMax <= 0) {
      segnala('NON CONVIENE', 'il prezzo massimo risulta ' + euro(prezzoMax) +
        ': i costi non lasciano un margine del 5% a nessun prezzo.');
    } else if (minimaSopra) {
      segnala('NON CONVIENE', "l'offerta minima (" + euro(offertaMinima) + ') supera il prezzo massimo (' +
        euro(prezzoMax) + ') di ' + euro(offertaMinima - prezzoMax) + '.');
    }
    if (m && m.marginePercentuale < 5) {
      segnala('AVVISO', 'con ' + nomeRif + ' di ' + euro(rif) + ' il margine è ' +
        percento(m.marginePercentuale / 100, 2) + ', sotto il 5%.');
    }
    if (prezzoMax !== null && prezzoMax > 0 && rif !== null && rif > prezzoMax && nomeRif !== 'offerta minima') {
      segnala('AVVISO', 'il ' + nomeRif + ' (' + euro(rif) + ') supera il prezzo massimo (' + euro(prezzoMax) + ').');
    }
    if (d.stato === 'da ristrutturare' && costi.ristrutturazione === 0) {
      segnala('AVVISO', 'immobile "da ristrutturare" ma ristrutturazione prevista pari a 0 €.');
    }
    if (rendita === null) {
      segnala('DATO MANCANTE', 'rendita catastale della casa (dati catastali): valore catastale e imposte non calcolabili.');
    }
    if (vuoto(d.ape)) segnala('DATO MANCANTE', 'APE non indicato.');
    else if (d.ape === 'assente') segnala('DATO MANCANTE', 'APE indicato come assente.');
    if (valore === null) segnala('DATO MANCANTE', 'valore di mercato stimato: prezzo massimo non calcolabile.');
    if (rif === null) {
      segnala('DATO MANCANTE', "nessun prezzo di riferimento (prezzo offerto, offerta minima o base d'asta): " +
        'commissione e margine non calcolabili.');
    }

    var esito;
    if (prezzoMax === null || rif === null) esito = ESITO.NON_VALUTABILE;
    else if (prezzoMax <= 0 || minimaSopra) esito = ESITO.NON_CONVIENE;
    else if (rif > prezzoMax || (m && m.marginePercentuale < 5)) esito = ESITO.ATTENZIONE;
    else esito = ESITO.CONVIENE;

    // Riepilogo: frasi fisse, solo numeri calcolati sopra.
    var frasi = [];
    if (esito === ESITO.CONVIENE) {
      frasi.push('Esito: CONVIENE. Con i numeri inseriti il prezzo di riferimento rientra nel prezzo massimo e il margine è almeno del 5%.');
    } else if (esito === ESITO.NON_CONVIENE) {
      frasi.push(prezzoMax <= 0
        ? 'Esito: NON CONVIENE. I costi non lasciano un margine del 5% a nessun prezzo.'
        : "Esito: NON CONVIENE. L'offerta minima supera il prezzo massimo offribile con margine del 5%.");
    } else if (esito === ESITO.ATTENZIONE) {
      frasi.push('Esito: ATTENZIONE. Il prezzo di riferimento supera il prezzo massimo o lascia un margine sotto il 5%: va ridotto.');
    } else {
      frasi.push('Esito: NON VALUTABILE. Mancano dati indispensabili per il calcolo (vedi dati mancanti).');
    }
    if (prezzoMax !== null && prezzoMax > 0) {
      frasi.push('Si può offrire al massimo ' + euro(prezzoMax) + (sem
        ? ' (il minore tra formula semplice ' + euro(sem.prezzoMassimo) + ' e formula dettagliata ' + euro(det.prezzoMassimo) + ').'
        : ' (solo formula dettagliata: la semplice richiede un prezzo di riferimento).'));
    }
    if (prezzoMax !== null && prezzoMax > 0 && offertaMinima !== null && !minimaSopra) {
      frasi.push("Tra offerta minima (" + euro(offertaMinima) + ') e prezzo massimo restano ' +
        euro(prezzoMax - offertaMinima) + ' di spazio per i rilanci.');
    }
    if (m) {
      frasi.push('Con ' + nomeRif + ' di ' + euro(rif) + ' il costo totale è ' + euro(m.costoTotale) +
        ' e restano di margine ' + euro(m.margineEuro) + ' (' + percento(m.marginePercentuale / 100, 2) + ' sul costo totale).');
    }
    frasi.push(mancanti.length
      ? 'Dati mancanti (' + mancanti.length + '): ' + mancanti.join('; ') + '.'
      : 'Nessun dato mancante.');

    return {
      esito: esito,
      riepilogo: frasi,
      rischi: rischi,
      mancanti: mancanti,
      note: imp ? imp.note : [],
      primaCasa: prima,
      aliquotaGestore: aliquota,
      aliquotaEffettiva: aliqEff,
      rendita: rendita,
      imposte: imp,
      commissione: comm,
      costi: costi,
      costiFissi: costiFissi,
      prezzoRiferimento: rif,
      nomeRiferimento: nomeRif,
      prezzoMassimoSemplice: sem,
      prezzoMassimoDettagliato: det,
      prezzoMassimo: prezzoMax,
      margine: m
    };
  }

  var api = {
    MARGINE: MARGINE,
    ESITO: ESITO,
    CAMPI_SCHEDA: CAMPI_SCHEDA,
    schedaAsta: schedaAsta,
    arrotonda2: arrotonda2,
    euro: euro,
    percento: percento,
    prezzoMassimoSemplice: prezzoMassimoSemplice,
    prezzoMassimoDettagliato: prezzoMassimoDettagliato,
    valoreCatastale: valoreCatastale,
    imposteAcquisto: imposteAcquisto,
    commissioneGestoreAsta: commissioneGestoreAsta,
    margine: margine
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    radice.Calcolo = api;
  }
})(typeof window !== 'undefined' ? window : this);
