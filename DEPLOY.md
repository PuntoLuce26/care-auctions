# Deploy su Cloudflare Pages — PERCORSO SCELTO (decisione di Gianluca, 5 ottobre 2026)

**Scelta:** Cloudflare Pages Free (€0). Dominio già registrato su **design.com** — resta lì, cambiano solo i nameserver.

## L'ordine esatto (6 passi, ~30 minuti totali)

1. **Account Cloudflare** — https://dash.cloudflare.com/sign-up → registrati (piano **Free**, €0). Email e password tue.
2. **Aggiungi il sito** — "Add a site" → scrivi `careauctions.co` → scegli il piano **Free** → Cloudflare ti mostra **due nameserver** (es. `xxx.ns.cloudflare.com`).
3. **Nameserver su design.com** — entra in design.com → gestione del dominio careauctions.co → sezione **DNS / Nameservers** → sostituisci i nameserver attuali con i due di Cloudflare. Attendi la conferma via email (minuti/ore).
4. **Crea il progetto** — in Cloudflare: **Workers & Pages → Create → Pages → Direct Upload** → nome progetto `care-auctions` → trascina **TUTTI i file della cartella** `careauctions/app` (non la cartella, i file dentro: gli .html, gli .js, la cartella assets, _headers, _redirects, manifest, sw.js, robots.txt, sitemap.xml) → **Deploy**.
5. **Dominio personalizzato** — nel progetto: **Custom domains → Set up a custom domain** → `careauctions.co` (e `www.careauctions.co`). Con i nameserver già su Cloudflare (passo 3) funziona da solo.
6. **Verifica** — apri https://careauctions.co dal telefono → deve comparire "Installa app". Poi dimmi *"pubblicato"* e faccio io le verifiche tecniche (hash, header, sitemap).

## Come trascinare i file (passo 4, senza errori)

- Finder → **⌘+Shift+G** → incolla `/Users/gianlucagenco/Documents/deepseek-harness/default-workspace/careauctions/app`
- **⌘+A** per selezionare tutto → trascina tutto nella zona di upload di Cloudflare.

## Cosa verifico io dopo la pubblicazione

- `shasum -a 256 -c careauctions/deploy/checksums.sha256` (integrità dei file)
- header di sicurezza (CSP, HSTS, X-Frame-Options) presenti
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` → 200
- l'installazione PWA dal telefono

## La via a UN comando (consigliata ora: 15.886 pagine non si trascinano)

Con la capillarità SEO (15.886 pagine) il caricamento a mano non ha senso. **Cloudflare Wrangler** carica tutto con un comando:

```
cd /Users/gianlucagenco/Documents/deepseek-harness/default-workspace/careauctions/app
npx wrangler pages deploy . --project-name=care-auctions
```

Al primo uso chiede di fare login (apri il link che mostra e autorizza col tuo account Cloudflare). Poi: ogni aggiornamento = un comando, tutti i file salgono. €0.

## Fallback (se design.com non lascia cambiare i nameserver)

In quel caso si usa il **CNAME setup**: nel progetto Pages, Cloudflare mostra un target CNAME; si creano su design.com due record: `www → <progetto>.pages.dev` (CNAME) e, se design.com lo supporta, un ALIAS/ANAME per la radice. Me lo dici e ti guido sui record esatti.
