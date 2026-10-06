/* iCARe — testi della demo guidata in 11 lingue (EN, IT, DE, ES, FR, RU, JA, AR, HI, KO, ZH).
   Registro: tu informale in ogni lingua (du, tu, tú, ты, giapponese informale, أنتَ, तुम, 해체, 你).
   Stessa struttura di chiavi per ogni lingua. Nessun numero o contatto inventato:
   solo fatti già stabiliti in ../MVP-iCARe.md e index.html.
   L'arabo (ar) si legge da destra a sinistra: la direzione è gestita in icare.html. */
window.ICARE_MESSAGES = {
  en: {
    name: "English",
    langLegend: "Language",
    tag: "Guided demo",
    note: "Guided demo - the AI assistant arrives with the backend.",
    bot: "iCARe",
    you: "You",
    welcome: [
      "Hi. I'm iCARe — your way into Italian court auctions.",
      "Tell me what you want to know, or pick a topic."
    ],
    menuPrompt: "What's next?",
    menuLabel: "Topics",
    inputLabel: "Your message",
    placeholder: "Type here…",
    send: "Send",
    fallback: "I'm a guided demo - use the buttons above. The real iCARe arrives with the backend.",
    topics: {
      a: {
        label: "Browse auctions",
        paragraphs: [
          "The list you see today is demo data. The rows are examples, not real properties.",
          "Real auctions will come from Italy's public sales portal (Portale delle Vendite Pubbliche) once the backend is connected."
        ],
        steps: [],
        link: { href: "aste.html", text: "Open the auction list" }
      },
      b: {
        label: "Analyze an auction",
        paragraphs: [
          "The rule: your maximum price is the highest bid that still leaves you a 5% margin after taxes, fees and costs.",
          "Open the auction sheet and tap \"Load real example (San Pasquale)\". You'll see the full calculation on a real case."
        ],
        steps: [],
        link: { href: "asta.html", text: "Open the auction sheet" }
      },
      c: {
        label: "What does it cost",
        paragraphs: [
          "Zero fees until you win. Before the award, you pay nothing.",
          "Win, and you pay a 1.5% success fee — securely via Stripe (coming soon).",
          "Need CARe consulting? Fees are transparent and agreed in writing."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "How buying works",
        paragraphs: ["Five steps. All from your dashboard:"],
        steps: [
          "Sign up with email and password.",
          "Follow the auctions that interest you.",
          "Analyze each auction: iCARe calculates the maximum price that keeps a 5% margin.",
          "Place your bid.",
          "If the property is awarded to you, pay the 1.5% success fee."
        ],
        after: "You can try step 3 today in the auction sheet. The other steps arrive with the backend.",
        link: { href: "dashboard.html", text: "Preview the dashboard" }
      },
      e: {
        label: "Talk to a human",
        paragraphs: [
          "CARe Auctions is self-service. You can do everything yourself, with iCARe guiding you.",
          "Gianluca steps in only when it's truly needed.",
          "Direct contact goes live with the backend. No email or phone contact is active in this demo."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Request a visit",
        paragraphs: [
          "In Italian court auctions, visits follow the sale notice. In many procedures, you can't see the inside before the award.",
          "The notice tells you who to contact (often the custodian) and the rules.",
          "iCARe will prepare your visit request from the notice. We never promise a visit the notice doesn't allow."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Prepare your offer",
        paragraphs: ["Six steps. The sale notice always prevails — check every detail there."],
        steps: [
          "Read the whole sale notice: deadlines, methods and forms.",
          "Prepare the deposit as the sale notice states — usually 10% of your offer, returned if you don't win.",
          "Get the required ID documents ready, as the sale notice states.",
          "Fill in the offer form exactly as the sale notice requires.",
          "Check the offer deadline in the sale notice.",
          "Submit your offer through the official channel in the sale notice (often electronic)."
        ],
        link: null
      },
      h: {
        label: "What am I buying?",
        paragraphs: [
          "In a court auction, you buy exactly what the sale notice says. CARe handles full ownership (piena proprietà) and, at most, bare ownership (nuda proprietà).",
          "Before you bid, check the notice and the appraisal for constraints that survive the sale. Servitudes, usufruct, condominium charges and urban planning limits are NOT cancelled by the auction.",
          "iCARe shows you every one of them — before your offer, never after the award."
        ],
        steps: [],
        link: null
      }
    }
  },

  it: {
    name: "Italiano",
    langLegend: "Lingua",
    tag: "Demo guidata",
    note: "Demo guidata - l'assistente AI arriva con il backend.",
    bot: "iCARe",
    you: "Tu",
    welcome: [
      "Ciao. Sono iCARe — la tua porta sulle aste giudiziarie italiane.",
      "Dimmi cosa vuoi sapere, o scegli un argomento."
    ],
    menuPrompt: "Cosa facciamo adesso?",
    menuLabel: "Argomenti",
    inputLabel: "Il tuo messaggio",
    placeholder: "Scrivi qui…",
    send: "Invia",
    fallback: "Sono una demo guidata: usa i pulsanti qui sopra. Il vero iCARe arriva con il backend.",
    topics: {
      a: {
        label: "Sfoglia le aste",
        paragraphs: [
          "La lista che vedi oggi contiene dati demo. Le righe sono esempi, non immobili reali.",
          "Le aste reali arriveranno dal Portale delle Vendite Pubbliche, appena il backend sarà collegato."
        ],
        steps: [],
        link: { href: "aste.html", text: "Apri la lista delle aste" }
      },
      b: {
        label: "Analizza un'asta",
        paragraphs: [
          "La regola: il tuo prezzo massimo è l'offerta più alta che ti lascia ancora un margine del 5% dopo imposte, commissioni e costi.",
          "Apri la scheda asta e premi \"Load real example (San Pasquale)\". Vedrai il calcolo completo su un caso reale."
        ],
        steps: [],
        link: { href: "asta.html", text: "Apri la scheda asta" }
      },
      c: {
        label: "Quanto costa",
        paragraphs: [
          "Zero commissioni finché non vinci. Prima dell'aggiudicazione non paghi nulla.",
          "Se vinci, paghi una success fee dell'1,5%, in modo sicuro tramite Stripe (in arrivo).",
          "Ti serve la consulenza CARe? Compensi trasparenti, definiti per iscritto."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "Come funziona l'acquisto",
        paragraphs: ["Cinque passi. Tutti dalla tua dashboard:"],
        steps: [
          "Registrati con email e password.",
          "Segui le aste che ti interessano.",
          "Analizza ogni asta: iCARe calcola il prezzo massimo che ti mantiene un margine del 5%.",
          "Fai la tua offerta.",
          "Se l'immobile ti viene aggiudicato, paghi la success fee dell'1,5%."
        ],
        after: "Il passo 3 puoi già provarlo oggi nella scheda asta. Gli altri arrivano con il backend.",
        link: { href: "dashboard.html", text: "Anteprima della dashboard" }
      },
      e: {
        label: "Parla con una persona",
        paragraphs: [
          "CARe Auctions è self-service: fai tutto in autonomia, con iCARe al tuo fianco.",
          "Gianluca interviene solo quando serve davvero.",
          "Il contatto diretto arriva quando il backend sarà attivo. In questa demo non c'è nessun contatto email o telefonico attivo."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Richiedi una visita",
        paragraphs: [
          "Nelle aste giudiziarie italiane le visite seguono l'avviso di vendita. In molte procedure non puoi visitare l'interno prima dell'aggiudicazione.",
          "L'avviso ti dice chi contattare (spesso il custode) e quali regole seguire.",
          "iCARe preparerà la tua richiesta di visita partendo dall'avviso. Non ti promettiamo mai una visita che l'avviso non consente."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Prepara la tua offerta",
        paragraphs: ["Sei passi. Vale sempre l'avviso di vendita: verifica lì ogni dettaglio."],
        steps: [
          "Leggi tutto l'avviso di vendita: termini, modalità e moduli.",
          "Prepara la cauzione come indica l'avviso di vendita: di solito il 10% dell'offerta, restituita se non vinci.",
          "Tieni pronti i documenti di identità richiesti dall'avviso di vendita.",
          "Compila il modulo di offerta esattamente come chiede l'avviso di vendita.",
          "Controlla il termine per l'offerta indicato nell'avviso di vendita.",
          "Presenta l'offerta tramite il canale ufficiale indicato nell'avviso di vendita (spesso telematico)."
        ],
        link: null
      },
      h: {
        label: "Cosa sto comprando?",
        paragraphs: [
          "In un'asta giudiziaria compri esattamente ciò che dice l'avviso di vendita. CARe tratta la piena proprietà e, al massimo, la nuda proprietà.",
          "Prima di offrire, controlla nell'avviso e nella perizia i vincoli che sopravvivono alla vendita: servitù, usufrutto, oneri condominiali e vincoli urbanistici NON vengono cancellati dall'asta.",
          "iCARe te li mostra tutti — prima dell'offerta, mai dopo l'aggiudicazione."
        ],
        steps: [],
        link: null
      }
    }
  },

  de: {
    name: "Deutsch",
    langLegend: "Sprache",
    tag: "Geführte Demo",
    note: "Geführte Demo - der KI-Assistent kommt mit dem Backend.",
    bot: "iCARe",
    you: "Du",
    welcome: [
      "Hallo. Ich bin iCARe — dein Zugang zu italienischen Gerichtsversteigerungen.",
      "Sag mir, was du wissen willst, oder wähl ein Thema."
    ],
    menuPrompt: "Was machen wir als Nächstes?",
    menuLabel: "Themen",
    inputLabel: "Deine Nachricht",
    placeholder: "Hier schreiben …",
    send: "Senden",
    fallback: "Ich bin eine geführte Demo - nutz einfach die Schaltflächen oben. Das echte iCARe kommt mit dem Backend.",
    topics: {
      a: {
        label: "Auktionen durchsuchen",
        paragraphs: [
          "Die Liste, die du heute siehst, enthält Demodaten. Die Einträge sind Beispiele, keine echten Immobilien.",
          "Echte Auktionen kommen aus dem öffentlichen italienischen Versteigerungsportal (Portale delle Vendite Pubbliche), sobald das Backend angebunden ist."
        ],
        steps: [],
        link: { href: "aste.html", text: "Auktionsliste öffnen" }
      },
      b: {
        label: "Auktion analysieren",
        paragraphs: [
          "Die Regel: Dein Höchstpreis ist das höchste Gebot, das dir nach Steuern, Gebühren und Kosten noch eine Marge von 5 % lässt.",
          "Öffne das Auktionsblatt und klick auf „Load real example (San Pasquale)“. Du siehst die komplette Berechnung an einem echten Fall."
        ],
        steps: [],
        link: { href: "asta.html", text: "Auktionsblatt öffnen" }
      },
      c: {
        label: "Was kostet es",
        paragraphs: [
          "Keine Gebühren, bis du gewinnst. Vor dem Zuschlag zahlst du nichts.",
          "Gewinnst du, zahlst du eine Erfolgsprovision von 1,5 % – sicher über Stripe (demnächst verfügbar).",
          "Brauchst du die CARe-Beratung? Transparente Honorare, schriftlich vereinbart."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "So funktioniert der Kauf",
        paragraphs: ["Fünf Schritte. Alle über dein Dashboard:"],
        steps: [
          "Registrier dich mit E-Mail und Passwort.",
          "Folge den Auktionen, die dich interessieren.",
          "Analysiere jede Auktion: iCARe berechnet den Höchstpreis, der dir eine Marge von 5 % sichert.",
          "Gib dein Gebot ab.",
          "Erhältst du den Zuschlag, zahlst du die Erfolgsprovision von 1,5 %."
        ],
        after: "Schritt 3 kannst du schon heute im Auktionsblatt ausprobieren. Die übrigen Schritte kommen mit dem Backend.",
        link: { href: "dashboard.html", text: "Dashboard-Vorschau" }
      },
      e: {
        label: "Mit einem Menschen sprechen",
        paragraphs: [
          "CARe Auctions ist Self-Service: Du erledigst alles selbst, geführt von iCARe.",
          "Gianluca greift nur ein, wenn es wirklich nötig ist.",
          "Direkter Kontakt kommt, sobald das Backend live ist. In dieser Demo ist kein Kontakt per E-Mail oder Telefon aktiv."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Besichtigung anfragen",
        paragraphs: [
          "Bei italienischen Gerichtsversteigerungen richten sich Besichtigungen nach der Verkaufsbekanntmachung. In vielen Verfahren kannst du das Innere vor dem Zuschlag nicht besichtigen.",
          "Die Bekanntmachung sagt dir, wen du kontaktieren kannst (häufig den gerichtlich bestellten Verwahrer) und welche Regeln gelten.",
          "iCARe bereitet deine Besichtigungsanfrage anhand der Bekanntmachung vor. Wir versprechen dir nie eine Besichtigung, die die Bekanntmachung nicht zulässt."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Gebot vorbereiten",
        paragraphs: ["Sechs Schritte. Maßgeblich ist immer die Verkaufsbekanntmachung – prüf dort jedes Detail."],
        steps: [
          "Lies die Verkaufsbekanntmachung vollständig: Fristen, Verfahren und Formulare.",
          "Bereite die Sicherheitsleistung gemäß der Verkaufsbekanntmachung vor: meist 10 % des Gebots – du bekommst sie zurück, wenn du nicht gewinnst.",
          "Halte die erforderlichen Ausweisdokumente gemäß der Verkaufsbekanntmachung bereit.",
          "Füll das Gebotsformular genau so aus, wie es die Verkaufsbekanntmachung verlangt.",
          "Prüf die Gebotsfrist in der Verkaufsbekanntmachung.",
          "Reich dein Gebot über den offiziellen Kanal ein, den die Verkaufsbekanntmachung nennt (häufig elektronisch)."
        ],
        link: null
      },
      h: {
        label: "Was kaufe ich?",
        paragraphs: [
          "Bei einer Gerichtsversteigerung kaufst du genau das, was in der Verkaufsbekanntmachung steht. CARe befasst sich mit dem Volleigentum (piena proprietà) und höchstens mit dem nackten Eigentum ohne Nutzungsrecht (nuda proprietà).",
          "Prüf vor deinem Gebot in der Bekanntmachung und im Gutachten, welche Belastungen den Verkauf überdauern: Dienstbarkeiten, Nießbrauch, Wohnungseigentumskosten und baurechtliche Beschränkungen werden durch die Versteigerung NICHT gelöscht.",
          "iCARe zeigt dir jede einzelne davon — vor dem Gebot, niemals nach dem Zuschlag."
        ],
        steps: [],
        link: null
      }
    }
  },

  es: {
    name: "Español",
    langLegend: "Idioma",
    tag: "Demo guiada",
    note: "Demo guiada - el asistente de IA llegará con el backend.",
    bot: "iCARe",
    you: "Tú",
    welcome: [
      "Hola. Soy iCARe — tu puerta al mundo de las subastas judiciales italianas.",
      "Dime qué quieres saber, o elige un tema."
    ],
    menuPrompt: "¿Qué hacemos ahora?",
    menuLabel: "Temas",
    inputLabel: "Tu mensaje",
    placeholder: "Escribe aquí…",
    send: "Enviar",
    fallback: "Soy una demo guiada - usa los botones de arriba. El verdadero iCARe llegará con el backend.",
    topics: {
      a: {
        label: "Ver subastas",
        paragraphs: [
          "La lista que ves hoy contiene datos de demostración. Las filas son ejemplos, no inmuebles reales.",
          "Las subastas reales llegarán del portal público italiano de ventas judiciales (Portale delle Vendite Pubbliche) cuando el backend esté conectado."
        ],
        steps: [],
        link: { href: "aste.html", text: "Abrir la lista de subastas" }
      },
      b: {
        label: "Analizar una subasta",
        paragraphs: [
          "La regla: tu precio máximo es la oferta más alta que aún te deja un margen del 5 % después de impuestos, comisiones y costes.",
          "Abre la ficha de la subasta y pulsa «Load real example (San Pasquale)». Verás el cálculo completo de un caso real."
        ],
        steps: [],
        link: { href: "asta.html", text: "Abrir la ficha de la subasta" }
      },
      c: {
        label: "Cuánto cuesta",
        paragraphs: [
          "Cero comisiones hasta que ganes. Antes de la adjudicación no pagas nada.",
          "Si ganas, pagas una comisión de éxito del 1,5 %, con pago seguro a través de Stripe (próximamente).",
          "¿Necesitas la consultoría de CARe? Honorarios transparentes, definidos por escrito."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "Cómo funciona la compra",
        paragraphs: ["Cinco pasos. Todos desde tu panel:"],
        steps: [
          "Regístrate con email y contraseña.",
          "Sigue las subastas que te interesan.",
          "Analiza cada subasta: iCARe calcula el precio máximo que te mantiene un margen del 5 %.",
          "Presenta tu oferta.",
          "Si se te adjudica el inmueble, pagas la comisión de éxito del 1,5 %."
        ],
        after: "El paso 3 ya puedes probarlo hoy en la ficha de la subasta. Los demás llegarán con el backend.",
        link: { href: "dashboard.html", text: "Vista previa del panel" }
      },
      e: {
        label: "Hablar con una persona",
        paragraphs: [
          "CARe Auctions es autoservicio: lo haces todo por tu cuenta, con iCARe guiándote.",
          "Gianluca interviene solo cuando de verdad hace falta.",
          "El contacto directo llegará cuando el backend esté activo. En esta demo no hay ningún contacto por email ni por teléfono activo."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Solicitar una visita",
        paragraphs: [
          "En las subastas judiciales italianas, las visitas se rigen por el anuncio de venta. En muchos procedimientos no puedes visitar el interior antes de la adjudicación.",
          "El anuncio te dice a quién contactar (a menudo, el depositario judicial) y qué normas seguir.",
          "iCARe preparará tu solicitud de visita a partir del anuncio. Nunca te prometemos una visita que el anuncio no permita."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Prepara tu oferta",
        paragraphs: ["Seis pasos. Prevalece siempre el anuncio de venta: verifica allí cada detalle."],
        steps: [
          "Lee el anuncio de venta completo: plazos, modalidades y formularios.",
          "Prepara la fianza según el anuncio de venta: normalmente el 10 % de la oferta, que te devuelven si no ganas.",
          "Ten listos los documentos de identidad que pide el anuncio de venta.",
          "Rellena el formulario de oferta exactamente como lo exige el anuncio de venta.",
          "Comprueba el plazo de la oferta indicado en el anuncio de venta.",
          "Presenta tu oferta por el canal oficial indicado en el anuncio de venta (a menudo telemático)."
        ],
        link: null
      },
      h: {
        label: "¿Qué estoy comprando?",
        paragraphs: [
          "En una subasta judicial compras exactamente lo que dice el anuncio de venta. CARe trabaja con la plena propiedad (piena proprietà) y, como máximo, con la nuda propiedad (nuda proprietà).",
          "Antes de pujar, revisa en el anuncio y en la tasación pericial las cargas que subsisten tras la venta: las servidumbres, el usufructo, los gastos de comunidad y las limitaciones urbanísticas NO se cancelan con la subasta.",
          "iCARe te las muestra todas — antes de la oferta, nunca después de la adjudicación."
        ],
        steps: [],
        link: null
      }
    }
  },

  fr: {
    name: "Français",
    langLegend: "Langue",
    tag: "Démo guidée",
    note: "Démo guidée - l'assistant IA arrivera avec le backend.",
    bot: "iCARe",
    you: "Toi",
    welcome: [
      "Salut. Je suis iCARe — ta porte d'entrée dans le monde des enchères judiciaires italiennes.",
      "Dis-moi ce que tu veux savoir, ou choisis un sujet."
    ],
    menuPrompt: "Et maintenant, on fait quoi ?",
    menuLabel: "Sujets",
    inputLabel: "Ton message",
    placeholder: "Écris ici…",
    send: "Envoyer",
    fallback: "Je suis une démo guidée - utilise les boutons ci-dessus. Le vrai iCARe arrivera avec le backend.",
    topics: {
      a: {
        label: "Parcourir les enchères",
        paragraphs: [
          "La liste que tu vois aujourd'hui contient des données de démonstration. Les lignes sont des exemples, pas de vrais biens.",
          "Les vraies enchères viendront du portail public italien des ventes judiciaires (Portale delle Vendite Pubbliche) dès que le backend sera connecté."
        ],
        steps: [],
        link: { href: "aste.html", text: "Ouvrir la liste des enchères" }
      },
      b: {
        label: "Analyser une enchère",
        paragraphs: [
          "La règle : ton prix maximum est l'offre la plus élevée qui te laisse encore une marge de 5 % après impôts, frais et coûts.",
          "Ouvre la fiche de l'enchère et appuie sur « Load real example (San Pasquale) ». Tu verras le calcul complet sur un cas réel."
        ],
        steps: [],
        link: { href: "asta.html", text: "Ouvrir la fiche de l'enchère" }
      },
      c: {
        label: "Combien ça coûte",
        paragraphs: [
          "Zéro frais tant que tu ne gagnes pas. Avant l'adjudication, tu ne paies rien.",
          "Si tu gagnes, tu paies une commission de succès de 1,5 %, réglée en toute sécurité via Stripe (bientôt disponible).",
          "Besoin du conseil CARe ? Honoraires transparents, définis par écrit."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "Comment se passe l'achat",
        paragraphs: ["Cinq étapes. Toutes depuis ton tableau de bord :"],
        steps: [
          "Inscris-toi avec un e-mail et un mot de passe.",
          "Suis les enchères qui t'intéressent.",
          "Analyse chaque enchère : iCARe calcule le prix maximum qui te garde une marge de 5 %.",
          "Dépose ton offre.",
          "Si le bien t'est adjugé, tu paies la commission de succès de 1,5 %."
        ],
        after: "Tu peux déjà essayer l'étape 3 dans la fiche de l'enchère. Les autres étapes arriveront avec le backend.",
        link: { href: "dashboard.html", text: "Aperçu du tableau de bord" }
      },
      e: {
        label: "Parler à un humain",
        paragraphs: [
          "CARe Auctions fonctionne en libre-service : tu fais tout toi-même, avec l'aide d'iCARe.",
          "Gianluca n'intervient que quand c'est vraiment nécessaire.",
          "Le contact direct sera disponible dès que le backend sera en ligne. Aucun contact par e-mail ou téléphone n'est actif dans cette démo."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Demander une visite",
        paragraphs: [
          "Dans les ventes judiciaires italiennes, les visites suivent l'avis de vente. Dans de nombreuses procédures, tu ne peux pas visiter l'intérieur avant l'adjudication.",
          "L'avis t'indique qui contacter (souvent le gardien judiciaire) et les règles à suivre.",
          "iCARe préparera ta demande de visite à partir de l'avis. On ne te promet jamais une visite que l'avis ne permet pas."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Préparer ton offre",
        paragraphs: ["Six étapes. L'avis de vente prévaut toujours : vérifies-y chaque détail."],
        steps: [
          "Lis l'avis de vente en entier : délais, modalités et formulaires.",
          "Prépare la caution comme indiqué dans l'avis de vente : généralement 10 % de l'offre, restituée si tu ne gagnes pas.",
          "Prépare les pièces d'identité requises, comme indiqué dans l'avis de vente.",
          "Remplis le formulaire d'offre exactement comme l'exige l'avis de vente.",
          "Vérifie la date limite de dépôt de l'offre, comme indiqué dans l'avis de vente.",
          "Dépose ton offre par le canal officiel indiqué dans l'avis de vente (souvent par voie télématique)."
        ],
        link: null
      },
      h: {
        label: "Qu'est-ce que j'achète ?",
        paragraphs: [
          "Dans une vente judiciaire, tu achètes exactement ce qu'indique l'avis de vente. CARe traite la pleine propriété (piena proprietà) et, au plus, la nue-propriété (nuda proprietà).",
          "Avant d'enchérir, vérifie dans l'avis et dans le rapport d'expertise les charges qui subsistent après la vente : les servitudes, l'usufruit, les charges de copropriété et les contraintes d'urbanisme ne sont PAS purgées par l'enchère.",
          "iCARe te les montre toutes — avant l'offre, jamais après l'adjudication."
        ],
        steps: [],
        link: null
      }
    }
  },

  ru: {
    name: "Русский",
    langLegend: "Язык",
    tag: "Пошаговая демонстрация",
    note: "Пошаговая демонстрация - ИИ-ассистент появится вместе с бэкендом.",
    bot: "iCARe",
    you: "Ты",
    welcome: [
      "Привет. Я iCARe — твой вход в мир итальянских судебных аукционов.",
      "Скажи, что хочешь узнать, или выбери тему."
    ],
    menuPrompt: "Что дальше?",
    menuLabel: "Темы",
    inputLabel: "Твоё сообщение",
    placeholder: "Напиши здесь…",
    send: "Отправить",
    fallback: "Я пошаговая демонстрация - используй кнопки выше. Настоящий iCARe появится вместе с бэкендом.",
    topics: {
      a: {
        label: "Смотреть аукционы",
        paragraphs: [
          "Список, который ты видишь сегодня, — это демонстрационные данные. Строки — примеры, а не реальные объекты недвижимости.",
          "Реальные аукционы будут поступать с итальянского государственного портала публичных торгов (Portale delle Vendite Pubbliche) после подключения бэкенда."
        ],
        steps: [],
        link: { href: "aste.html", text: "Открыть список аукционов" }
      },
      b: {
        label: "Проанализировать аукцион",
        paragraphs: [
          "Правило: твоя максимальная цена — это самая высокая ставка, которая после налогов, комиссий и расходов всё ещё оставляет тебе маржу 5%.",
          "Открой карточку аукциона и нажми «Load real example (San Pasquale)». Увидишь полный расчёт на реальном примере."
        ],
        steps: [],
        link: { href: "asta.html", text: "Открыть карточку аукциона" }
      },
      c: {
        label: "Сколько это стоит",
        paragraphs: [
          "Никаких комиссий, пока ты не выиграешь. До присуждения объекта ты ничего не платишь.",
          "Если выиграешь, платишь комиссию за успех 1,5% — через защищённую оплату Stripe (скоро).",
          "Нужна консультация CARe? Прозрачные тарифы, согласованные в письменной форме."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "Как проходит покупка",
        paragraphs: ["Пять шагов. Все — из твоей панели управления:"],
        steps: [
          "Зарегистрируйся по электронной почте и паролю.",
          "Следи за аукционами, которые тебе интересны.",
          "Анализируй каждый аукцион: iCARe рассчитывает максимальную цену, сохраняющую маржу 5%.",
          "Сделай ставку.",
          "Если объект присуждён тебе, оплати комиссию за успех 1,5%."
        ],
        after: "Шаг 3 можно попробовать уже сегодня в карточке аукциона. Остальные шаги появятся вместе с бэкендом.",
        link: { href: "dashboard.html", text: "Предпросмотр панели управления" }
      },
      e: {
        label: "Связаться с человеком",
        paragraphs: [
          "CARe Auctions — это самообслуживание: всё можно сделать самостоятельно с помощью iCARe.",
          "Джанлука подключается, только когда это действительно нужно.",
          "Прямая связь появится после запуска бэкенда. В этой демонстрации связь по электронной почте или телефону не активна."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "Запросить осмотр",
        paragraphs: [
          "На итальянских судебных аукционах осмотры проводятся по извещению о продаже. Во многих процедурах осмотреть объект изнутри до присуждения нельзя.",
          "В извещении указано, к кому можно обратиться (часто к судебному хранителю) и какие действуют правила.",
          "iCARe подготовит твой запрос на осмотр на основе извещения. Мы никогда не обещаем осмотр, который извещение не допускает."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "Подготовить предложение",
        paragraphs: ["Шесть шагов. Решающее значение всегда имеет извещение о продаже — проверяй в нём каждую деталь."],
        steps: [
          "Прочитай извещение о продаже целиком: сроки, порядок подачи и формы.",
          "Подготовь задаток, как указано в извещении о продаже: обычно 10% от суммы предложения; если не выиграешь, его вернут.",
          "Подготовь документы, удостоверяющие личность, как указано в извещении о продаже.",
          "Заполни форму предложения точно так, как требует извещение о продаже.",
          "Проверь срок подачи предложения, указанный в извещении о продаже.",
          "Подай предложение через официальный канал, указанный в извещении о продаже (часто в электронной форме)."
        ],
        link: null
      },
      h: {
        label: "Что я покупаю?",
        paragraphs: [
          "На судебном аукционе ты покупаешь ровно то, что указано в извещении о продаже. CARe работает с правом полной собственности (piena proprietà) и, самое большее, с правом собственности без права пользования (nuda proprietà).",
          "Прежде чем делать ставку, проверь в извещении и в экспертном заключении об оценке обременения, которые сохраняются после продажи: сервитуты, узуфрукт, расходы на содержание общего имущества и градостроительные ограничения аукцион НЕ отменяет.",
          "iCARe покажет тебе каждое из них — до подачи предложения, никогда не после присуждения."
        ],
        steps: [],
        link: null
      }
    }
  },

  ja: {
    name: "日本語",
    langLegend: "言語",
    tag: "ガイド付きデモ",
    note: "ガイド付きデモ - AIアシスタントはバックエンドと一緒に登場するよ。",
    bot: "iCARe",
    you: "あなた",
    welcome: [
      "やあ。iCARe だよ — イタリアの裁判所競売の世界への入り口。",
      "知りたいことを教えて。トピックを選んでもいいよ。"
    ],
    menuPrompt: "次はどうする？",
    menuLabel: "トピック",
    inputLabel: "メッセージ",
    placeholder: "ここに入力…",
    send: "送信",
    fallback: "これはガイド付きデモだよ - 上のボタンを使ってね。本物の iCARe はバックエンドと一緒に登場するよ。",
    topics: {
      a: {
        label: "競売物件を見る",
        paragraphs: [
          "今の競売一覧はデモデータ。各行は例で、実在の物件じゃないよ。",
          "バックエンドがつながったら、イタリアの公的競売ポータル（Portale delle Vendite Pubbliche）から本物の競売情報が届くよ。"
        ],
        steps: [],
        link: { href: "aste.html", text: "競売一覧を開く" }
      },
      b: {
        label: "競売を分析する",
        paragraphs: [
          "ルール：上限価格は、税金・手数料・諸費用を引いたあとも 5% の利益率が残る最高入札額。",
          "競売シートを開いて「Load real example (San Pasquale)」を押してみて。実例での計算をまるごと見られるよ。"
        ],
        steps: [],
        link: { href: "asta.html", text: "競売シートを開く" }
      },
      c: {
        label: "費用について",
        paragraphs: [
          "落札するまで手数料はゼロ。落札決定前は何も払わなくていい。",
          "落札したら、1.5% の成功報酬を Stripe で安全に支払う（近日対応）。",
          "CARe のコンサルティングが必要なら、料金は明瞭で、書面で取り決めるよ。"
        ],
        steps: [],
        link: null
      },
      d: {
        label: "購入の流れ",
        paragraphs: ["5つのステップ。全部ダッシュボードからできる："],
        steps: [
          "メールアドレスとパスワードで登録する。",
          "気になる競売をフォローする。",
          "各競売を分析する。iCARe が 5% の利益率を確保できる上限価格を計算する。",
          "入札する。",
          "物件を落札したら、1.5% の成功報酬を支払う。"
        ],
        after: "ステップ3は、今すぐ競売シートで試せるよ。ほかのステップはバックエンドと一緒に登場する。",
        link: { href: "dashboard.html", text: "ダッシュボードのプレビュー" }
      },
      e: {
        label: "人と話す",
        paragraphs: [
          "CARe Auctions はセルフサービス。iCARe のガイドで、全部自分で進められるよ。",
          "ジャンルカが出てくるのは、本当に必要なときだけ。",
          "直接の連絡は、バックエンドが動き出してから使えるようになるよ。このデモでは、メールや電話での連絡は受け付けていない。"
        ],
        steps: [],
        link: null
      },
      f: {
        label: "内覧を申し込む",
        paragraphs: [
          "イタリアの裁判所競売では、内覧は売却公告に従う。多くの手続きでは、落札決定前に物件の中は見られないよ。",
          "公告には、連絡できる人（多くは裁判所が選んだ保管人）とルールが書いてある。",
          "iCARe は公告をもとに内覧の申込みを準備するよ。公告で認められていない内覧を約束することは絶対にない。"
        ],
        steps: [],
        link: null
      },
      g: {
        label: "入札を準備する",
        paragraphs: ["6ステップのチェックリスト。いつでも売却公告が優先。細かいところは全部公告で確認してね。"],
        steps: [
          "売却公告を最後まで読む（期限、方法、書式）。",
          "売却公告のとおりに保証金を用意する。ふつうは入札額の 10% で、落札できなかったら返ってくる。",
          "売却公告のとおりに、必要な本人確認書類を用意する。",
          "売却公告の指定どおりに、入札書式を正確に記入する。",
          "売却公告に書かれた入札期限を確認する。",
          "売却公告に書かれた公式の方法で入札を出す（多くは電子提出）。"
        ],
        link: null
      },
      h: {
        label: "何を買うの？",
        paragraphs: [
          "裁判所競売では、売却公告に書かれたものをそのまま買うことになる。CARe が扱うのは完全所有権（piena proprietà）で、最大でも虚有権（nuda proprietà）まで。",
          "入札の前に、売却後も残る負担を公告と評価書で確認して。地役権、用益権、管理費などの負担、都市計画上の制限は、競売では消えないよ。",
          "iCARe はそれを全部見せるよ — 落札決定後じゃなく、必ず入札前に。"
        ],
        steps: [],
        link: null
      }
    }
  },

  ar: {
    name: "العربية",
    langLegend: "اللغة",
    tag: "عرض توضيحي موجَّه",
    note: "عرض توضيحي موجَّه - يصل مساعد الذكاء الاصطناعي مع تشغيل الواجهة الخلفية.",
    bot: "iCARe",
    you: "أنتَ",
    welcome: [
      "أهلًا. أنا iCARe — بابك إلى عالم المزادات القضائية الإيطالية.",
      "قل لي ماذا تريد أن تعرف، أو اختر موضوعًا."
    ],
    menuPrompt: "ماذا نفعل الآن؟",
    menuLabel: "المواضيع",
    inputLabel: "رسالتك",
    placeholder: "اكتب هنا…",
    send: "إرسال",
    fallback: "أنا عرض توضيحي موجَّه - استخدم الأزرار في الأعلى. iCARe الحقيقي يصل مع تشغيل الواجهة الخلفية.",
    topics: {
      a: {
        label: "تصفّح المزادات",
        paragraphs: [
          "القائمة التي تراها اليوم بيانات تجريبية: الصفوف أمثلة، وليست عقارات حقيقية.",
          "المزادات الحقيقية ستأتي من البوابة الإيطالية العامة للبيوع القضائية (Portale delle Vendite Pubbliche) عند ربط الواجهة الخلفية."
        ],
        steps: [],
        link: { href: "aste.html", text: "افتح قائمة المزادات" }
      },
      b: {
        label: "حلّل مزادًا",
        paragraphs: [
          "القاعدة: سعرك الأقصى هو أعلى عرض يترك لك هامشًا بنسبة 5% بعد الضرائب والرسوم والتكاليف.",
          "افتح بطاقة المزاد واضغط «Load real example (San Pasquale)‎». سترى الحساب الكامل لحالة حقيقية."
        ],
        steps: [],
        link: { href: "asta.html", text: "افتح بطاقة المزاد" }
      },
      c: {
        label: "كم يكلّف؟",
        paragraphs: [
          "لا عمولات حتى تفوز. قبل الترسية لا تدفع شيئًا.",
          "إذا فزت، تدفع رسوم نجاح بنسبة 1.5% عبر دفع آمن من خلال Stripe (قريبًا).",
          "تحتاج إلى استشارات CARe؟ أتعاب شفافة متفق عليها كتابيًا."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "كيف يتم الشراء",
        paragraphs: ["خمس خطوات، كلها من لوحة التحكم الخاصة بك:"],
        steps: [
          "سجّل بالبريد الإلكتروني وكلمة المرور.",
          "تابع المزادات التي تهمّك.",
          "حلّل كل مزاد: يحسب iCARe السعر الأقصى الذي يحافظ على هامش 5%.",
          "قدّم عرضك.",
          "إذا رسا عليك العقار، تدفع رسوم النجاح بنسبة 1.5%."
        ],
        after: "تستطيع تجربة الخطوة 3 اليوم في بطاقة المزاد. بقية الخطوات تصل مع تشغيل الواجهة الخلفية.",
        link: { href: "dashboard.html", text: "معاينة لوحة التحكم" }
      },
      e: {
        label: "تحدّث إلى شخص",
        paragraphs: [
          "CARe Auctions خدمة ذاتية: تستطيع القيام بكل شيء بنفسك بإرشاد من iCARe.",
          "جانلوكا لا يتدخل إلا عند الحاجة الفعلية.",
          "التواصل المباشر سيتوفر عند تشغيل الواجهة الخلفية. لا توجد في هذا العرض التوضيحي أي وسيلة تواصل نشطة عبر البريد الإلكتروني أو الهاتف."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "اطلب معاينة",
        paragraphs: [
          "في المزادات القضائية الإيطالية، تخضع المعاينات لإعلان البيع. في كثير من الإجراءات لا يمكنك معاينة العقار من الداخل قبل الترسية.",
          "الإعلان يخبرك بمن يمكنك التواصل معه (غالبًا الحارس القضائي) وبالقواعد المتبعة.",
          "سيُعِدّ iCARe طلب المعاينة الخاص بك استنادًا إلى الإعلان. ولا نَعِدك أبدًا بمعاينة لا يسمح بها الإعلان."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "حضّر عرضك",
        paragraphs: ["ست خطوات. إعلان البيع هو المرجع دائمًا: تحقّق من كل تفصيل فيه."],
        steps: [
          "اقرأ إعلان البيع كاملًا: المواعيد النهائية والطرق والنماذج.",
          "جهّز التأمين كما ينص إعلان البيع: عادةً 10% من قيمة العرض، ويُرَدّ إليك إذا لم تفز.",
          "جهّز وثائق إثبات الهوية المطلوبة كما ينص إعلان البيع.",
          "املأ نموذج العرض تمامًا كما يشترط إعلان البيع.",
          "تحقّق من الموعد النهائي لتقديم العرض المحدد في إعلان البيع.",
          "قدّم عرضك عبر القناة الرسمية المحددة في إعلان البيع (غالبًا إلكترونيًا)."
        ],
        link: null
      },
      h: {
        label: "ماذا أشتري؟",
        paragraphs: [
          "في المزاد القضائي تشتري بالضبط ما ينص عليه إعلان البيع. يتعامل CARe مع الملكية التامة (piena proprietà)‎، وعلى الأكثر مع ملكية الرقبة (nuda proprietà)‎.",
          "قبل أن تقدّم عرضك، تحقّق في الإعلان وفي تقرير الخبرة من القيود التي تبقى قائمة بعد البيع: حقوق الارتفاق وحق الانتفاع ورسوم الملكية المشتركة والقيود العمرانية لا يُلغيها المزاد إطلاقًا.",
          "سيعرض لك iCARe كل واحد منها — قبل العرض، وليس بعد الترسية أبدًا."
        ],
        steps: [],
        link: null
      }
    }
  },

  hi: {
    name: "हिन्दी",
    langLegend: "भाषा",
    tag: "गाइडेड डेमो",
    note: "गाइडेड डेमो - AI सहायक बैकएंड के साथ आएगा।",
    bot: "iCARe",
    you: "तुम",
    welcome: [
      "नमस्ते। मैं iCARe हूँ — इटली की अदालती नीलामियों की दुनिया में तुम्हारा दरवाज़ा।",
      "बताओ तुम्हें क्या जानना है, या कोई विषय चुनो।"
    ],
    menuPrompt: "अब क्या करें?",
    menuLabel: "विषय",
    inputLabel: "तुम्हारा संदेश",
    placeholder: "यहाँ लिखो…",
    send: "भेजो",
    fallback: "मैं एक गाइडेड डेमो हूँ - ऊपर दिए बटन इस्तेमाल करो। असली iCARe बैकएंड के साथ आएगा।",
    topics: {
      a: {
        label: "नीलामियाँ देखो",
        paragraphs: [
          "आज की नीलामी सूची में डेमो डेटा है: पंक्तियाँ सिर्फ़ उदाहरण हैं, असली संपत्तियाँ नहीं।",
          "बैकएंड जुड़ते ही असली नीलामियाँ इटली के सार्वजनिक बिक्री पोर्टल (Portale delle Vendite Pubbliche) से आएँगी।"
        ],
        steps: [],
        link: { href: "aste.html", text: "नीलामी सूची खोलो" }
      },
      b: {
        label: "नीलामी का विश्लेषण करो",
        paragraphs: [
          "नियम: अधिकतम मूल्य वह सबसे ऊँची बोली है जो करों, शुल्कों और लागतों के बाद भी तुम्हारे लिए 5% का मार्जिन छोड़ती है।",
          "नीलामी शीट खोलो और \"Load real example (San Pasquale)\" दबाओ। किसी असली मामले पर पूरी गणना दिखेगी।"
        ],
        steps: [],
        link: { href: "asta.html", text: "नीलामी शीट खोलो" }
      },
      c: {
        label: "इसकी लागत कितनी है",
        paragraphs: [
          "जीतने तक कोई शुल्क नहीं। आवंटन से पहले तुम्हें कुछ नहीं देना।",
          "जीतने पर 1.5% सक्सेस फ़ीस देनी होती है, Stripe से सुरक्षित भुगतान (जल्द उपलब्ध)।",
          "CARe परामर्श चाहिए? पारदर्शी फ़ीस, लिखित में तय।"
        ],
        steps: [],
        link: null
      },
      d: {
        label: "खरीद कैसे होती है",
        paragraphs: ["पाँच चरण, सब तुम्हारे डैशबोर्ड से:"],
        steps: [
          "ईमेल और पासवर्ड से साइन अप करो।",
          "जो नीलामियाँ तुम्हें दिलचस्प लगें, उन्हें फ़ॉलो करो।",
          "हर नीलामी का विश्लेषण करो: iCARe वह अधिकतम मूल्य निकालता है जो 5% का मार्जिन बनाए रखता है।",
          "अपनी बोली लगाओ।",
          "अगर संपत्ति तुम्हें आवंटित होती है, तो 1.5% सक्सेस फ़ीस चुकाओ।"
        ],
        after: "चरण 3 आज ही नीलामी शीट में आज़माओ; बाकी चरण बैकएंड के साथ आएँगे।",
        link: { href: "dashboard.html", text: "डैशबोर्ड का पूर्वावलोकन" }
      },
      e: {
        label: "किसी इंसान से बात करो",
        paragraphs: [
          "CARe Auctions सेल्फ-सर्विस है: iCARe के मार्गदर्शन में सब कुछ ख़ुद करो।",
          "जियानलुका सिर्फ़ तभी आते हैं जब सच में ज़रूरत हो।",
          "बैकएंड लाइव होने पर सीधा संपर्क उपलब्ध होगा। इस डेमो में कोई ईमेल या फ़ोन संपर्क सक्रिय नहीं है।"
        ],
        steps: [],
        link: null
      },
      f: {
        label: "निरीक्षण का अनुरोध करो",
        paragraphs: [
          "इटली की अदालती नीलामियों में निरीक्षण बिक्री सूचना के हिसाब से होता है: कई प्रक्रियाओं में आवंटन से पहले संपत्ति के अंदर का निरीक्षण संभव नहीं होता।",
          "सूचना बताती है कि किससे संपर्क करना है (अक्सर अदालत द्वारा नियुक्त संरक्षक) और कौन-से नियम लागू हैं।",
          "iCARe सूचना के आधार पर तुम्हारा निरीक्षण अनुरोध तैयार करेगा। हम कभी ऐसे निरीक्षण का वादा नहीं करते जिसकी सूचना अनुमति नहीं देती।"
        ],
        steps: [],
        link: null
      },
      g: {
        label: "अपना प्रस्ताव तैयार करो",
        paragraphs: ["छह चरणों की चेकलिस्ट। बिक्री सूचना ही हमेशा मान्य है: हर विवरण वहीं जाँचो।"],
        steps: [
          "बिक्री सूचना पूरी पढ़ो: समय-सीमाएँ, प्रक्रियाएँ और फ़ॉर्म।",
          "बिक्री सूचना के अनुसार जमानत राशि तैयार करो: आमतौर पर प्रस्ताव का 10%, जो न जीतने पर लौटा दी जाती है।",
          "बिक्री सूचना के अनुसार ज़रूरी पहचान दस्तावेज़ तैयार रखो।",
          "प्रस्ताव फ़ॉर्म ठीक वैसे ही भरो जैसा बिक्री सूचना में माँगा गया है।",
          "बिक्री सूचना में दी गई प्रस्ताव की अंतिम तिथि जाँचो।",
          "बिक्री सूचना में बताए गए आधिकारिक माध्यम से अपना प्रस्ताव जमा करो (अक्सर इलेक्ट्रॉनिक रूप से)।"
        ],
        link: null
      },
      h: {
        label: "मेरी खरीद में क्या शामिल है?",
        paragraphs: [
          "अदालती नीलामी में ठीक वही खरीदा जाता है जो बिक्री सूचना में लिखा है। CARe पूर्ण स्वामित्व (piena proprietà) और, अधिकतम, उपभोग-अधिकार रहित स्वामित्व (nuda proprietà) के मामले संभालता है।",
          "बोली लगाने से पहले, सूचना और मूल्यांकन रिपोर्ट में वे भार जाँचो जो बिक्री के बाद भी बने रहते हैं: सुखाधिकार, उपभोग अधिकार, कॉन्डोमिनियम शुल्क और शहरी नियोजन संबंधी प्रतिबंध नीलामी से समाप्त नहीं होते।",
          "iCARe तुम्हें इनमें से हर एक दिखाएगा — प्रस्ताव से पहले, आवंटन के बाद कभी नहीं।"
        ],
        steps: [],
        link: null
      }
    }
  },

  ko: {
    name: "한국어",
    langLegend: "언어",
    tag: "가이드 데모",
    note: "가이드 데모 - AI 어시스턴트는 백엔드와 함께 나와.",
    bot: "iCARe",
    you: "너",
    welcome: [
      "안녕. 나는 iCARe야 — 이탈리아 법원 경매의 세계로 들어가는 문이지.",
      "알고 싶은 걸 말해 줘. 아니면 주제를 골라 봐."
    ],
    menuPrompt: "다음엔 뭘 할까?",
    menuLabel: "주제",
    inputLabel: "메시지",
    placeholder: "여기에 입력해…",
    send: "보내기",
    fallback: "나는 가이드 데모야 - 위에 있는 버튼을 써 줘. 진짜 iCARe는 백엔드와 함께 나와.",
    topics: {
      a: {
        label: "경매 둘러보기",
        paragraphs: [
          "지금 보이는 경매 목록은 데모 데이터야. 각 행은 예시고, 실제 부동산이 아니야.",
          "백엔드가 연결되면 이탈리아 공공 매각 포털(Portale delle Vendite Pubbliche)에서 실제 경매 정보를 가져와."
        ],
        steps: [],
        link: { href: "aste.html", text: "경매 목록 열기" }
      },
      b: {
        label: "경매 분석하기",
        paragraphs: [
          "규칙: 최대 가격은 세금, 수수료, 비용을 빼고도 5% 마진이 남는 가장 높은 입찰가야.",
          "경매 시트를 열고 \"Load real example (San Pasquale)\" 버튼을 눌러 봐. 실제 사례로 전체 계산을 볼 수 있어."
        ],
        steps: [],
        link: { href: "asta.html", text: "경매 시트 열기" }
      },
      c: {
        label: "비용은 얼마야?",
        paragraphs: [
          "낙찰될 때까지 수수료는 0이야. 낙찰 전에는 아무것도 안 내.",
          "낙찰되면 1.5% 성공 수수료를 Stripe로 안전하게 결제해(출시 예정).",
          "CARe 컨설팅이 필요하면, 서면으로 정한 투명한 보수가 적용돼."
        ],
        steps: [],
        link: null
      },
      d: {
        label: "구매 절차",
        paragraphs: ["다섯 단계, 전부 대시보드에서:"],
        steps: [
          "이메일과 비밀번호로 가입해.",
          "관심 있는 경매를 팔로우해.",
          "각 경매를 분석해. iCARe가 5% 마진을 지키는 최대 가격을 계산해 줘.",
          "입찰해.",
          "부동산이 낙찰되면 1.5% 성공 수수료를 내."
        ],
        after: "3단계는 지금 바로 경매 시트에서 해 볼 수 있어. 나머지 단계는 백엔드와 함께 나와.",
        link: { href: "dashboard.html", text: "대시보드 미리 보기" }
      },
      e: {
        label: "사람과 이야기하기",
        paragraphs: [
          "CARe Auctions는 셀프서비스야. iCARe의 안내를 따라 모든 걸 직접 할 수 있어.",
          "잔루카는 꼭 필요할 때만 나서.",
          "직접 연락은 백엔드가 가동되면 가능해. 이 데모에서는 이메일이나 전화 연락이 활성화돼 있지 않아."
        ],
        steps: [],
        link: null
      },
      f: {
        label: "방문 신청하기",
        paragraphs: [
          "이탈리아 법원 경매에서 방문은 매각 공고를 따라. 많은 절차에서 낙찰 전에는 부동산 내부를 볼 수 없어.",
          "공고에는 연락할 수 있는 사람(대개 법원이 선임한 관리인)과 규칙이 나와 있어.",
          "iCARe가 공고를 바탕으로 방문 신청을 준비해 줄게. 공고가 허용하지 않는 방문은 절대 약속하지 않아."
        ],
        steps: [],
        link: null
      },
      g: {
        label: "입찰 준비하기",
        paragraphs: ["6단계 체크리스트야. 항상 매각 공고가 우선이야. 세부 사항은 전부 공고에서 확인해."],
        steps: [
          "매각 공고를 끝까지 읽어(기한, 방법, 서식).",
          "매각 공고에 나온 대로 보증금을 준비해. 보통 입찰가의 10%고, 낙찰 안 되면 돌려받아.",
          "매각 공고에 나온 대로 필요한 신분증명 서류를 준비해.",
          "매각 공고가 요구하는 그대로 입찰 서식을 작성해.",
          "매각 공고에 나온 입찰 기한을 확인해.",
          "매각 공고에 나온 공식 채널로 입찰서를 제출해(대개 전자 방식)."
        ],
        link: null
      },
      h: {
        label: "내가 사는 건 뭐야?",
        paragraphs: [
          "법원 경매에서는 매각 공고에 적힌 그대로를 사게 돼. CARe가 다루는 건 완전 소유권(piena proprietà)이고, 최대 허유권(nuda proprietà)까지야.",
          "입찰 전에 공고와 감정평가서에서 매각 후에도 남는 부담을 확인해. 지역권, 용익권, 공동주택 관리비, 도시계획상 제한은 경매로 없어지지 않아.",
          "iCARe가 이걸 전부 보여 줄게 — 낙찰 후가 아니라, 꼭 입찰 전에."
        ],
        steps: [],
        link: null
      }
    }
  },

  zh: {
    name: "简体中文",
    langLegend: "语言",
    tag: "引导式演示",
    note: "引导式演示 - AI 助手会随后端一起推出。",
    bot: "iCARe",
    you: "你",
    welcome: [
      "你好。我是 iCARe —— 你通往意大利司法拍卖世界的大门。",
      "告诉我你想了解什么，或者选一个主题。"
    ],
    menuPrompt: "接下来想做什么？",
    menuLabel: "主题",
    inputLabel: "你的消息",
    placeholder: "在这里输入…",
    send: "发送",
    fallback: "我是引导式演示 - 用上面的按钮就好。真正的 iCARe 会随后端一起推出。",
    topics: {
      a: {
        label: "浏览拍卖",
        paragraphs: [
          "你现在看到的拍卖列表是演示数据：每一行都是示例，不是真实房产。",
          "后端接入后，真实拍卖信息将来自意大利公共拍卖门户网站（Portale delle Vendite Pubbliche）。"
        ],
        steps: [],
        link: { href: "aste.html", text: "打开拍卖列表" }
      },
      b: {
        label: "分析拍卖",
        paragraphs: [
          "规则：最高价格，就是扣除税费、佣金和各项成本后，仍能给你留下 5% 利润空间的最高出价。",
          "打开拍卖详情页，点“Load real example (San Pasquale)”，就能看到一个真实案例的完整计算。"
        ],
        steps: [],
        link: { href: "asta.html", text: "打开拍卖详情页" }
      },
      c: {
        label: "费用说明",
        paragraphs: [
          "竞得之前零佣金：拍定之前，你什么都不用付。",
          "如果竞得成功，你需支付 1.5% 的成功费，通过 Stripe 安全支付（即将推出）。",
          "需要 CARe 咨询服务？费用透明，书面约定。"
        ],
        steps: [],
        link: null
      },
      d: {
        label: "购买流程",
        paragraphs: ["五个步骤，全在你的控制面板里完成："],
        steps: [
          "用电子邮箱和密码注册。",
          "关注你感兴趣的拍卖。",
          "分析每场拍卖：iCARe 会算出能保住 5% 利润空间的最高价格。",
          "提交你的出价。",
          "如果房产拍定给你，支付 1.5% 的成功费。"
        ],
        after: "第 3 步现在就能在拍卖详情页里试试；其他步骤会随后端一起推出。",
        link: { href: "dashboard.html", text: "预览控制面板" }
      },
      e: {
        label: "找真人聊聊",
        paragraphs: [
          "CARe Auctions 是自助服务平台：在 iCARe 的引导下，你可以独立完成所有操作。",
          "只有真正需要时，詹卢卡才会介入。",
          "后端上线后会提供直接联系方式。本演示中没有启用任何电子邮件或电话联系渠道。"
        ],
        steps: [],
        link: null
      },
      f: {
        label: "申请看房",
        paragraphs: [
          "在意大利法院拍卖中，看房须遵循拍卖公告：在许多程序中，拍定之前无法进入房产内部查看。",
          "公告会写明可以联系谁（通常是法院指定的保管人）以及相关规则。",
          "iCARe 会根据公告帮你准备看房申请；公告不允许的看房，我们绝不承诺。"
        ],
        steps: [],
        link: null
      },
      g: {
        label: "准备你的出价",
        paragraphs: ["六步核对清单。一切以拍卖公告为准：每个细节都在公告里核实。"],
        steps: [
          "完整读一遍拍卖公告：期限、方式和表格。",
          "按拍卖公告的规定准备保证金：通常为出价的 10%，没竞得会退还给你。",
          "按拍卖公告的规定准备所需的身份证明文件。",
          "严格按拍卖公告的要求填写出价表。",
          "核实拍卖公告规定的出价截止期限。",
          "通过拍卖公告指定的官方渠道提交出价（通常为电子方式）。"
        ],
        link: null
      },
      h: {
        label: "我买的到底是什么？",
        paragraphs: [
          "在法院拍卖中，你买到的正是拍卖公告写明的内容。CARe 处理完全所有权（piena proprietà），最多涉及虚有权（nuda proprietà）。",
          "出价之前，请在公告和评估报告中核实拍卖后仍然存续的负担：地役权、用益权、公寓共有费用及城市规划限制都不会因拍卖而消除。",
          "iCARe 会把它们一一列给你看 — 在出价之前，绝不在拍定之后。"
        ],
        steps: [],
        link: null
      }
    }
  }
};
