# App iCARe — prima versione (CARe Auctions)

Web app statica, in inglese, costruita sul design system vincolante (`../design-system.md`) e sulle 6 funzionalità dell'MVP (`../MVP-iCARe.md`).
Nessuna libreria JS, nessun CDN, nessun tracker, nessuna richiesta di rete: funziona offline.

## Come avviarla

```bash
node careauctions/app/anteprima.js
```

Poi apri **http://localhost:4173** nel browser. Ctrl+C per fermare. Serve solo Node (nessuna installazione).

## Pagine

| File | Cosa contiene | Stato |
|:---|:---|:---|
| `index.html` | Home: logo, tagline, CTA verso il login, 7 card delle funzionalità (la 7ª è iPartner), footer | Reale (testi) |
| `ipartner.html` | Sezione iPartner: hero "iPartner - trusted professionals, one network", 4 livelli in card (Professional €240/anno; Service €120/anno; Agency €0 + reciprocità 20–30% sulla segnalazione, da definire per iscritto; **via preferenziale disabilità** €0 per associazioni non profit, −50% per professionisti del settore, con badge dedicato e card in evidenza), modulo di candidatura, FAQ (3 domande), footer legale. Prezzi da `../../puntoluce/dati/piano-finanziario-5-anni.md` §2, dichiarati "proposed" (IPOTESI nel piano) | Testi reali; **modulo DEMO**: al click mostra solo "Demo form - the real submission arrives with the backend.", nulla viene inviato né salvato |
| `privacy.html` | Pagina **Permissions & privacy** (principio "iCARe = Sam", `../requisiti-v4.md` §3): le 6 regole (consenso per scopo, minimizzazione, trasparenza, revoca, firma dell'utente per le azioni esterne, riservatezza GDPR); distinzione legale (dati delle aste pubblici, consenso per dati personali e azioni per conto dell'utente); 5 consensi con checkbox, scopo e `<label>` (avviso di vendita, perizia, salvataggio analisi sul dispositivo, sintesi vocale, email "Phase 2") + pulsante **Revoke all**; registro accessi con 3 esempi fissi etichettati Demo; footer legale | **DEMO**: i consensi sono salvati in `localStorage` `care_consensi` (`{ saleNotice, appraisal, saveDevice, voice, email }` → true/false) ma **non** attivano né bloccano funzioni dell'app; il registro è fisso. Nota in pagina: "Demo - the real consent system arrives with the backend." |
| `login.html` | Modulo email + password con validazione nel browser | **DEMO**: nessun backend, nulla viene inviato né salvato |
| `aste.html` | Lista di 3 aste | **DEMO DATA** (righe fittizie DEMO-001/002/003); filtro disattivato, marcato **TODO** |
| `asta.html` | Scheda asta: prezzo massimo con margine 5%, imposte, commissione gestore, esito, stampa A4 | **REALE e funzionante** (usa `calcolo.js`) |
| `icare.html` | Guida self-service a risposte rapide: selettore lingua a 11 pulsanti che va a capo sugli schermi stretti (EN/IT/DE/ES/FR/RU/JA/AR/HI/KO/ZH, iniziale EN; con AR la chat passa a `dir="rtl"`), menu di argomenti (8 in inglese: incluso "What am I buying?", 7 nelle altre lingue in attesa della traduzione programmata) (letti dalle chiavi `topics` di `icare-messages.js`) con link alle pagine giuste dove previsti, campo libero con risposta fallback, pulsante **Listen/Stop** (voce demo del browser) sotto ogni messaggio di iCARe | **GUIDED DEMO**: deterministica, nessuna AI, nessun backend |
| `icare-messages.js` | Tutti i testi della guida nelle 11 lingue, dizionario `{en, it, de, es, fr, ru, ja, ar, hi, ko, zh}` con le stesse chiavi | Modificare qui i testi, non in `icare.html` |
| `dashboard.html` | Elenco delle analisi salvate dalla scheda asta (nome, data, badge esito, prezzo massimo, margine) con **Open** e **Delete**; stato vuoto con istruzioni self-service. Sotto, segnaposto "Coming with accounts" (aste seguite, offerte, esiti) | **REALE in locale** (analisi salvate); il resto placeholder |
| `analisi-store.js` | `window.ANALISI_STORE = { salva, elenco, rimuovi, carica }` su `localStorage`, chiave `care_analisi`. Nessun DOM, nessuna rete | Reale |
| `styles.css` | Palette `#323C37` monocromatica, font di sistema, componenti, regole di stampa A4 | — |
| `calcolo.js` | Copia **identica** di `../prototipo/calcolatore/calcolo.js` | Non modificare: le correzioni vanno fatte nell'originale e ricopiate |
| `app.js` | Utility condivise: pulsante "Aa" (testo grande), usato da tutte le 12 pagine | Reale |
| `asta.js`, `dashboard.js`, `icare.js`, `login.js`, `aste.js`, `ipartner.js`, `privacy.js` | Logica di ciascuna pagina (prima era in script inline nell'HTML) | Vedi la pagina corrispondente |
| `galleria.html` | Galleria foto/video con **slot etichettati**: finché un file non è verificato (visione Claude Code + conversione + posizionamento in `assets/foto/`), lo slot resta un segnaposto dichiarato. Video tour atteso dopo lo staging | **In attesa dei contenuti** (nessuna immagine entra senza verifica) |
| `prova.html` + `prova.js` | Pagina della **prova gratuita** (destinazione SEO): 3 input → prezzo massimo a margine 5% in 60 secondi, CTA alla scheda completa, trust row, nessun account | **REALE e funzionante** (usa `window.Calcolo`) |
| `terms.html` / `cookie.html` | Pagine legali **bozze oneste**: nessun cookie né tracker nell'app (solo localStorage dichiarato); da far rivedere da un professionista prima della pubblicazione | Bozza dichiarata |
| `contatti.js` | **Unico punto dei contatti** (email, telefono, whatsapp, calendly, indirizzo): oggi vuoti; quando Gianluca li fornisce si compila solo questo file | Pronto, non collegato |
| `sw.js` / `manifest.webmanifest` / icone 180/192/512 | **PWA**: installazione su Chrome/Edge/Safari/Firefox, offline completo (cache-first, solo same-origin) | Reale |
| `sitemap.xml` / `robots.txt` / `_headers` / `_redirects` | SEO e sicurezza al deploy: sitemap 12 pagine, robot, header F1 (CSP+HSTS+nosniff), redirect root | Pronti per Cloudflare |

## Cosa è reale e cosa è demo

**Reale**
- I calcoli della scheda asta (`asta.html`): stesse formule e stessi campi della scheda 4 del prototipo, eseguiti da `calcolo.js`.
- Il pulsante **"Load real example (San Pasquale)"** carica i dati verificati: valore di mercato 235.000, prezzo offerto 126.000, rendita casa 227,24, rendita box 78,09, seconda casa, ristrutturazione 2.000, difformità 8.000, notaio 1.500, commissione gestore 4% + IVA, consulenza 5.040. Gli altri campi restano vuoti e vengono segnalati come MISSING.
- La stampa A4 del riepilogo (pulsante "Print A4 summary").
- **Analisi salvate (scheda asta → dashboard)**, tutto nel browser:
  - In `asta.html` il pulsante **"Save analysis"** salva campi e risultati correnti con `ANALISI_STORE.salva` e mostra "Saved - see your dashboard" (area `role="status"`) con link a `dashboard.html`. Per salvare servono **Auction name**, **Court** e **Case number** (campi marcati "required to save"); se mancano compare un avviso (`role="alert"`) e nulla viene salvato. Anche con input non validi non si salva.
  - Record salvato: `{ id, data (ISO), nomeAsta, tribunale, procedura, esito, prezzoMassimo, margineEuro, marginePct, costoTotale, campi }`. `esito` è quello di `calcolo.js` (CONVIENE / NON CONVIENE / ATTENZIONE / NON VALUTABILE); gli importi non calcolabili sono `null` e la dashboard li mostra come "cannot be calculated". `campi` contiene i valori inseriti con le chiavi di `calcolo.js`, più `primaCasa` (booleano) e `aliquotaGestorePct` (commissione gestore in %, come inserita).
  - In `dashboard.html` **Open** scrive l'id in `localStorage` `care_analisi_apri` e apre `asta.html`, che al caricamento ricarica i campi, ricalcola e rimuove la chiave. Salvare di nuovo crea una **nuova** analisi (non sovrascrive). **Delete** chiede conferma e rimuove.
  - `localStorage` è usato **solo** per le analisi salvate (chiavi `care_analisi` e `care_analisi_apri`) e per la preferenza del testo grande (`care_fontscale`, vedi sotto), mai per login o account. I dati restano su questo browser/dispositivo: cancellare i dati del browser li elimina.
- **Testo grande (tutte le 7 pagine, compresa `ipartner.html`)**: nel header c'è il pulsante **"Aa"** con il livello corrente visibile accanto (100% → 115% → 130% → 100%). Al click imposta `data-scale` su `<html>` (`1`, `1.15`, `1.3`) e salva il livello in `localStorage` `care_fontscale`; al caricamento il livello viene ripristinato da `app.js`, caricato nel `<head>`, prima del disegno della pagina. In `styles.css`: `html[data-scale='1.15'] { font-size: 115% }` e `html[data-scale='1.3'] { font-size: 130% }`; tutto il resto è in `rem`/`em` e scala insieme. Accessibilità: `aria-label` con livello attuale e successivo (es. "Text size 100%. Activate for 115%."), annuncio del nuovo livello in un'area `role="status"`, area di tocco ≥44×44 px. Ritocchi per il 130%: il modulo della chat va a capo, l'elenco dati della dashboard (`.facts`) manda a capo i testi lunghi. In stampa il testo torna al 100%. Il codice sta in un solo file, `app.js`, condiviso da tutte le 8 pagine.

**Demo / non ancora attivo**
- Registrazione e login: nessun account viene creato.
- Lista aste: righe fittizie; l'import Apify PVP non è collegato.
- Chat iCARe (11 lingue: inglese `en`, italiano `it`, tedesco `de`, spagnolo `es`, francese `fr`, russo `ru`, giapponese `ja`, arabo standard moderno `ar`, hindi `hi`, coreano `ko`, cinese semplificato `zh`): **demo guidata**. Lingua e direzione sono impostate solo sul contenitore della chat (`lang`, `dir`): con l'arabo `dir="rtl"`, con le altre `dir="ltr"`; il resto della pagina resta in inglese. Le risposte sono testi fissi in `icare-messages.js`, scelti con i pulsanti (A Browse auctions, B Analyze an auction, C What does it cost, D How buying works, E Talk to a human, F Request a visit, G Prepare your offer). Il menu si costruisce dalle chiavi di `topics` nell'ordine in cui sono scritte: per aggiungere un argomento basta aggiungerlo in tutte le 11 lingue in `icare-messages.js`. **F e G sono sempre subordinati all'avviso di vendita**: F spiega che le visite seguono l'avviso (in molte procedure niente visita interna prima dell'aggiudicazione; l'avviso indica chi contattare, spesso il custode) e che iCARe preparerà la richiesta di visita dall'avviso senza mai promettere una visita che l'avviso non consente, nessun contatto indicato; G è una checklist di 6 passi (leggere tutto l'avviso, cauzione di solito 10% dell'offerta restituita se non si vince, documenti d'identità, modulo d'offerta, termine, canale ufficiale spesso telematico), ciascuno rinviato all'avviso di vendita. Qualunque testo digitato riceve la stessa risposta onesta: "I am a guided demo - use the buttons above. The real iCARe is coming with the backend." (tradotta nella lingua scelta). Cambiare lingua riavvia la conversazione. Nessun dato viene salvato (niente localStorage) né inviato. Nessun numero o contatto inventato: i testi usano solo fatti già fissati (margine 5%, zero commissioni fino all'aggiudicazione, success fee 1,5% via Stripe in arrivo, consulenza CARe con compensi definiti per iscritto). L'assistente AI vero arriva con il backend.
- **Voce di iCARe (demo)**: sotto ogni messaggio di iCARe c'è il pulsante **Listen** (icona altoparlante SVG in linea). Legge il messaggio (paragrafi e passi, senza pulsanti) con `window.speechSynthesis` / `SpeechSynthesisUtterance` nella lingua scelta: usa la prima voce installata il cui `voice.lang` inizia col codice lingua (`en`, `it`, `de`, `es`, `fr`, `ru`, `ja`, `ar`, `hi`, `ko`, `zh`), altrimenti la voce predefinita del browser. Mentre parla, al posto di Listen compare **Stop** (il focus si sposta di conseguenza); avviare un altro messaggio o cambiare lingua ferma la lettura in corso. Se il browser non ha `speechSynthesis`, i pulsanti non compaiono e si vede la nota "Voice not supported in this browser". Riga onesta fissa nella chat: "Demo voice - the final human voice comes with the backend." Le voci disponibili e la loro qualità dipendono da sistema operativo e browser (alcune voci di sistema possono essere servizi online del browser: non è l'app a fare richieste di rete). Nessun audio viene salvato o inviato dall'app.
- Success fee 1,5% con Stripe: non attiva.
- Dashboard: aste seguite, offerte ed esiti restano segnaposto (arrivano con gli account).
- Link legali nel footer: segnaposto, tranne "Privacy Policy" in `index.html` e `privacy.html`, che punta a `privacy.html` (pagina demo dei permessi, non è ancora l'informativa art. 13 GDPR). Il link "Privacy" nella navigazione è solo in `index.html` e `privacy.html`; le altre pagine non sono state toccate.
- `localStorage` `care_consensi`: usato solo da `privacy.html` per lo stato dei consensi demo.
- iPartner: modulo di candidatura solo client-side (nessun backend, nessun localStorage). Il link "iPartner" è nella navigazione di `index.html` e `ipartner.html`; le altre pagine non sono state toccate e non lo mostrano ancora. Stili nuovi in `styles.css`: `.price`, `.card-pref`, `.badge-pref`, `.tiers` (griglia 2×2).

## Sicurezza (standard F1, `../standard-f1.md`)

- **CSP rigorosa su tutte le 8 pagine**, come prima `<meta>` dopo charset/viewport/referrer:
  `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'">` — **niente `unsafe-inline`, niente `unsafe-eval`**.
- **Zero script inline e zero handler inline** (`onclick=`, `onsubmit=`, ecc.): tutto il JavaScript sta in file `.js` della cartella, gli eventi si collegano con `addEventListener`. I due `onsubmit="return false"` (`aste.html`, `asta.html`) sono diventati `addEventListener('submit', e => e.preventDefault())` in `aste.js` e `asta.js`.
- **Zero stili inline**: niente blocchi `<style>` né attributi `style=""` (vietati da `style-src 'self'`). L'unico che c'era (`index.html`, azioni centrate nella hero) è ora la classe `.actions-center` in `styles.css`.
- **Ordine di caricamento**:
  - `app.js` nel `<head>` **senza `defer`**, su tutte le pagine: deve impostare `data-scale` su `<html>` prima del primo disegno, altrimenti chi usa il testo al 130% vedrebbe la pagina "saltare". È un file locale di poche centinaia di byte.
  - Poi, nel `<head>` con `defer` (eseguiti in ordine, a DOM completo): prima i file dati (`calcolo.js`, `analisi-store.js` oppure `icare-messages.js`), poi lo script della pagina (`asta.js`, `dashboard.js`, `icare.js`, `login.js`, `aste.js`, `ipartner.js`, `privacy.js`). `index.html` usa solo `app.js`.
- **Input utente mai in `innerHTML`**: chat, nomi delle analisi, tribunale, numero di procedura, messaggi di stato usano `textContent` / `createTextNode`. Restano due `innerHTML` con **sole costanti statiche** del codice (nessun dato dell'utente): il messaggio di esito di `login.js` e le icone SVG dei pulsanti voce in `icare.js`.
- **Come verificare**: avviare con `node careauctions/app/anteprima.js` e aprire la console del browser: con la CSP attiva, qualunque script o stile inline verrebbe bloccato e segnalato lì. Aprendo i file direttamente da disco (`file://`) alcuni browser trattano `'self'` in modo diverso: usare l'anteprima locale.
- File da non modificare (dati/motore): `calcolo.js`, `icare-messages.js`, `analisi-store.js`.

## Note tecniche

- **Lingua**: l'interfaccia è in inglese. `calcolo.js` produce testi in italiano: esito, riepilogo, segnalazioni e nota fiscale sono riscritti in inglese in `asta.html` a partire dai numeri del risultato; il "calcolo passo a passo" è mostrato com'è (in italiano) e lo dichiara.
- **Importi**: formattati da `calcolo.js` all'italiana (es. `126.000,00 €`).
- **Logo**: si usa il file `assets/logo-careauctions.svg` così com'è. Il file è 1280×1024 con molto sfondo: la classe `.logo-crop` in `styles.css` mostra solo la zona della scritta. Nella barra resta visibile una leggera fascia grigia (il gradiente del file).
- **Esiti**: distinti da testo e stile del bordo, non solo dal colore (palette monocromatica).
- **Non è un parere fiscale né legale**: aliquote e regole sono assunzioni del calcolatore (vedi i commenti in `calcolo.js`).

## Modalità guidata (wizard)

- Sulla scheda asta c'è l'interruttore **Guided / Full form**: la modalità guidata fa **una domanda alla volta** (6 passi: immobile → asta → costi → mercato → condizioni → risultato), con barra di avanzamento, pulsanti Back/Next grandi (≥44px) e focus visibili — pensata per chi usa l'app per la prima volta, un anziano o un bambino.
- I calcoli sono **gli stessi** della modalità completa (stessa funzione `schedaAsta` di `calcolo.js`): la wizard cambia solo il modo di chiedere i dati.

## Galleria (galleria.html)

- Pagina galleria foto/video con **slot etichettati** (copertina, facciata, interni, panorama mare, vista aerea, planimetrie, video): finché un file non è **verificato** (visione Claude Code, conversione, posizionamento in `assets/foto/`), lo slot resta un segnaposto dichiarato — *nessuna immagine entra nell'app senza verifica*.
- La navigazione è **identica su tutte le 9 pagine** (normalizzata con `careauctions/.tools/nav-uniforme.js`).

## Pagine legali

- `terms.html` e `cookie.html`: bozze oneste (nessun cookie né tracker nell app; solo localStorage dichiarato). Da far rivedere da un professionista prima della pubblicazione.
