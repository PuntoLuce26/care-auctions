/* Demo guidata deterministica: nessuna AI, nessuna rete, nessun salvataggio. */
(function () {
  var M = window.ICARE_MESSAGES;
  /* Ordine e numero degli argomenti dalle chiavi di topics (a-g): un nuovo argomento in icare-messages.js compare da solo nel menu. */
  function topicKeys() { return Object.keys(M[lang].topics); }
  /* Lingue scritte da destra a sinistra; codice lang BCP 47 dove serve una variante. */
  var RTL = { ar: true };
  var LANG_TAG = { zh: "zh-Hans" };
  var lang = "en";
  var chat = document.getElementById("chat");
  var log = document.getElementById("chat-log");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var langButtons = document.querySelectorAll("#lang-group button");
  /* Voce demo: sintesi vocale del browser (window.speechSynthesis), nessuna rete da parte dell'app. */
  var synth = ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) ? window.speechSynthesis : null;
  /* Icone SVG statiche (costanti, mai testo dell'utente). */
  var ICON_LISTEN = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
  var ICON_STOP = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* Prima voce con voice.lang che inizia col codice lingua (es. "it" → "it-IT"); altrimenti null = voce predefinita. */
  function pickVoice(code) {
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
      var l = (voices[i].lang || "").toLowerCase().replace("_", "-");
      if (l === code || l.indexOf(code + "-") === 0) return voices[i];
    }
    return null;
  }

  /* Testo del messaggio: tutti i paragrafi e i passi, senza il nome "iCARe" e senza i pulsanti voce. */
  function messageText(li) {
    var parts = [];
    Array.prototype.forEach.call(li.children, function (child, i) {
      if (i === 0 || child.className === "voice-row") return;
      if (child.tagName === "OL") {
        Array.prototype.forEach.call(child.children, function (step) { parts.push(step.textContent); });
      } else {
        parts.push(child.textContent);
      }
    });
    return parts.join("\n");
  }

  function voiceButton(icon, text, label) {
    var b = el("button", "btn btn-secondary voice-btn");
    b.type = "button";
    b.lang = "en";
    b.innerHTML = icon;
    b.appendChild(el("span", null, text));
    b.setAttribute("aria-label", label);
    return b;
  }

  /* Pulsanti Listen / Stop sotto un messaggio di iCARe, da chiamare quando il messaggio è completo. */
  function addVoice(li) {
    if (!synth) return;
    var code = lang;
    var row = el("div", "voice-row");
    var listen = voiceButton(ICON_LISTEN, "Listen", "Listen to this message");
    var stop = voiceButton(ICON_STOP, "Stop", "Stop the voice");
    stop.hidden = true;

    function idle() {
      var hadFocus = document.activeElement === stop;
      stop.hidden = true;
      listen.hidden = false;
      if (hadFocus) listen.focus();
    }

    listen.addEventListener("click", function () {
      synth.cancel();
      var u = new SpeechSynthesisUtterance(messageText(li));
      u.lang = code + (code === 'en' ? '-US' : code === 'it' ? '-IT' : code === 'zh' ? '-CN' : '');
      var voice = pickVoice(code);
      if (voice) u.voice = voice;
      u.lang = voice ? voice.lang : (LANG_TAG[code] || code);
      u.addEventListener("end", idle);
      u.addEventListener("error", idle);
      listen.hidden = true;
      stop.hidden = false;
      stop.focus();
      synth.speak(u);
    });
    stop.addEventListener("click", function () { synth.cancel(); idle(); });

    row.appendChild(listen);
    row.appendChild(stop);
    li.appendChild(row);
  }

  function addBubble(lines, who) {
    var t = M[lang];
    var li = el("li", who === "user" ? "bubble bubble-user" : "bubble");
    var name = el("p");
    name.appendChild(el("strong", null, who === "user" ? t.you : t.bot));
    li.appendChild(name);
    lines.forEach(function (line) { li.appendChild(el("p", null, line)); });
    log.appendChild(li);
    return li;
  }

  function addMenu(prompt) {
    var old = log.querySelector(".chips");
    if (old) old.parentNode.removeChild(old);
    var t = M[lang];
    var li = el("li", "chips");
    li.appendChild(el("p", "small", prompt));
    var group = el("div", "chip-row");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", t.menuLabel);
    topicKeys().forEach(function (key) {
      var b = el("button", "btn btn-secondary chip", t.topics[key].label);
      b.type = "button";
      b.setAttribute("aria-label", t.topics[key].label);
      b.addEventListener("click", function () { answer(key); });
      group.appendChild(b);
    });
    li.appendChild(group);
    log.appendChild(li);
    li.scrollIntoView({ block: "nearest" });
  }

  function answer(key) {
    var topic = M[lang].topics[key];
    addBubble([topic.label], "user");
    var li = addBubble(topic.paragraphs, "bot");
    if (topic.steps.length) {
      var ol = el("ol");
      topic.steps.forEach(function (s) { ol.appendChild(el("li", null, s)); });
      li.appendChild(ol);
    }
    if (topic.after) li.appendChild(el("p", null, topic.after));
    if (topic.link) {
      var p = el("p");
      var a = el("a", null, topic.link.text);
      a.href = topic.link.href;
      p.appendChild(a);
      li.appendChild(p);
    }
    addVoice(li);
    addMenu(M[lang].menuPrompt);
  }

  function setLang(code) {
    lang = code;
    var t = M[lang];
    /* Lingua e direzione solo sul contenitore della chat: il resto della pagina resta in inglese (LTR). */
    chat.lang = LANG_TAG[code] || code;
    chat.dir = RTL[code] ? "rtl" : "ltr";
    langButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === code ? "true" : "false");
    });
    document.getElementById("lang-group").setAttribute("aria-label", t.langLegend);
    document.getElementById("chat-tag").textContent = t.tag;
    document.getElementById("chat-note").textContent = t.note;
    document.getElementById("chat-input-label").textContent = t.inputLabel;
    input.placeholder = t.placeholder;
    var send = document.getElementById("chat-send");
    send.textContent = t.send;
    send.setAttribute("aria-label", t.send);
    if (synth) synth.cancel();
    log.textContent = "";
    addVoice(addBubble(t.welcome, "bot"));
    addMenu(t.menuPrompt);
  }

  langButtons.forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    // Testo dell'utente: solo textContent (in addBubble → el), mai innerHTML.
    addBubble([text], "user").lastChild.dir = "auto";
    addVoice(addBubble([M[lang].fallback], "bot"));
    input.value = "";
    addMenu(M[lang].menuPrompt);
  });

  if (synth) {
    /* Alcuni browser (Safari) caricano le voci in ritardo: le si richiede subito e si ascolta levento. */
    synth.getVoices();
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', function () { synth.getVoices(); });
    window.addEventListener("pagehide", function () { synth.cancel(); });
  } else {
    document.getElementById("voice-unsupported").hidden = false;
  }

  setLang("en");

  // Microfono nella chat: l'utente parla e iCARe ascolta (riconoscimento nativo del browser).
  var mic = document.getElementById("chat-mic");
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var LINGUE_VOCE = { en: "en-US", it: "it-IT", de: "de-DE", es: "es-ES", fr: "fr-FR", ru: "ru-RU", ja: "ja-JP", ar: "ar-SA", hi: "hi-IN", ko: "ko-KR", zh: "zh-CN" };
  if (mic && SR) {
    mic.addEventListener("click", function () {
      try {
        var rec = new SR();
        rec.lang = LINGUE_VOCE[lang] || "en-US";
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        rec.onresult = function (ev) {
          var testo = (ev.results[0] && ev.results[0][0]) ? ev.results[0][0].transcript : "";
          if (testo) { input.value = testo; form.dispatchEvent(new Event("submit", { cancelable: true })); }
        };
        rec.start();
      } catch (err) { /* nessuna azione: il campo di testo resta disponibile */ }
    });
  } else if (mic) {
    mic.addEventListener("click", function () {
      addBubble([M[lang].voiceUnavailable || "Voice input is not supported in this browser: type your message instead."], "bot");
    });
  }

  // Domanda arrivata dalla home (?q=...): iCARe risponde subito.
  var q = new URLSearchParams(location.search).get("q");
  if (q) {
    input.value = q;
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  }
})();
