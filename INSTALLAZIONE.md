# Installazione dell'app su ogni dispositivo — la verità per browser

**Regola dichiarata da Gianluca:** *"l'app si deve poter installare in Chrome e/o Safari e in tutti i browser dell'utente, e usarla da computer o da telefono."*

## La verità tecnica, browser per browser

| Browser / Dispositivo | Come si installa | Stato |
|:---|:---|:---|
| **Chrome / Edge — Android** | apre il sito → compare "**Installa app**" (o menu ⋮ → Aggiungi a schermata Home) | ✅ pronto (PWA: manifest + service worker) |
| **Chrome / Edge — computer** | icona **Installa** nella barra degli indirizzi → si apre in finestra dedicata | ✅ pronto |
| **Safari — iPhone/iPad** | **Condividi → Aggiungi a Home** (iOS non mostra un pulsante "Installa": è una scelta di Apple) | ✅ pronto (icona 180, standalone, colore) |
| **Firefox — Android** | menu ⋮ → Aggiungi alla schermata Home | ✅ funziona |
| **Firefox — computer** | ❌ Firefox non supporta l'installazione di PWA su desktop (scelta di Mozilla) — l'app si usa come sito normale | usabile, non installabile |
| **Qualsiasi altro browser** | l'app funziona comunque come sito web completo | ✅ usabile ovunque |

**La regola d'oro:** dove il browser non permette l'installazione, **l'app resta un sito completo** — nessun utente è escluso. L'installazione è un comfort in più, non un requisito.

## Come provarla SUBITO, in locale

1. `node careauctions/app/anteprima.js` → apri **http://localhost:4173**
2. Chrome desktop: nella barra degli indirizzi compare **l'icona di installazione** (✓) → cliccala
3. Android con Chrome: "Aggiungi a schermata Home" → si apre a schermo intero
4. iPhone: Condividi → Aggiungi a Home

*(localhost è già un "contesto sicuro", quindi l'installazione si può provare adesso, prima del deploy.)*

## Quando sarà online (Cloudflare, HTTPS)

Con [DEPLOY.md](DEPLOY.md) completato, l'esperienza di installazione diventa identica per gli utenti veri: HTTPS è incluso gratis, e il service worker scarica l'app per l'uso offline. Il pacchetto è già pronto (manifest, icone 180/192/512, service worker, metadati iOS su tutte le 11 pagine).

**Nota di onestà (direttiva 5.7):** gli app store (Apple/Google) costano €99+25/anno e richiedono revisioni; la PWA costa **€0** e si aggiorna in tempo reale. Se un domani servirà essere negli store, il codice è pronto per il passaggio — ma solo quando i ricavi lo giustificheranno.
