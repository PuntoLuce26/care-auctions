/* traduci.js v1 — Sam 5.0 · 5.235: TUTTO il sito parla la lingua scelta.
 * Copre: navigazione + footer (20 lingue) + titoli chiave delle pagine principali
 * (it/en/de/es/fr completi, le altre 15 lingue usano l'inglese come ponte).
 * Attiva: data-i18n sugli elementi; la lingua viene da icare-lingua o dal selettore. */
(function () {
  var L = {
    nav: {
      it: { Auctions: 'Aste', 'Buy Now': 'Compra ora', iCARe: 'iCARe', Mortgages: 'Mutui', Mutui: 'Mutui', 'Collective Auction': 'iAuction', 'iAsta Collettiva': 'iAuction', iAuction: 'iAuction', About: 'Chi siamo', Manifesto: 'Manifesto', Privacy: 'Privacy', Cookies: 'Cookie', Terms: 'Termini', 'iCommunity': 'iCommunity', iShop: 'iShop', iHouse: 'iHouse', iDream: 'iDream', 'Tell iCARe your budget — find your auctions': 'Dì il tuo budget a iCARe — trova le tue aste' },
      en: {}, de: { Auctions: 'Auktionen', 'Buy Now': 'Jetzt kaufen', Mortgages: 'Hypotheken', Mutui: 'Hypotheken', 'Collective Auction': 'Kollektive Auktion', 'iAsta Collettiva': 'Kollektive Auktion', iAuction: 'iAuction', About: 'Über uns', Manifesto: 'Manifest', Privacy: 'Datenschutz', Cookies: 'Cookies', Terms: 'Bedingungen' },
      es: { Auctions: 'Subastas', 'Buy Now': 'Comprar ahora', Mortgages: 'Hipotecas', Mutui: 'Hipotecas', 'Collective Auction': 'Subasta colectiva', 'iAsta Collettiva': 'Subasta colectiva', iAuction: 'iAuction', About: 'Sobre nosotros', Manifesto: 'Manifiesto', Privacy: 'Privacidad', Cookies: 'Cookies', Terms: 'Términos' },
      fr: { Auctions: 'Enchères', 'Buy Now': 'Acheter', Mortgages: 'Prêts', Mutui: 'Prêts', 'Collective Auction': 'Enchère collective', 'iAsta Collettiva': 'Enchère collective', iAuction: 'iAuction', About: 'À propos', Manifesto: 'Manifeste', Privacy: 'Confidentialité', Cookies: 'Cookies', Terms: 'Conditions' },
      ru: { Auctions: 'Аукционы', 'Buy Now': 'Купить сейчас', Mortgages: 'Ипотека', About: 'О нас', Manifesto: 'Манифест', Privacy: 'Конфиденциальность', Terms: 'Условия' },
      ja: { Auctions: 'オークション', 'Buy Now': '今すぐ購入', Mortgages: 'ローン', About: '私たちについて', Manifesto: 'マニフェスト', Privacy: 'プライバシー', Terms: '利用規約' },
      ar: { Auctions: 'المزادات', 'Buy Now': 'اشترِ الآن', Mortgages: 'التمويل', About: 'من نحن', Manifesto: 'البيان', Privacy: 'الخصوصية', Terms: 'الشروط' },
      zh: { Auctions: '拍卖', 'Buy Now': '立即购买', Mortgages: '贷款', About: '关于我们', Manifesto: '宣言', Privacy: '隐私', Terms: '条款' },
      pt: { Auctions: 'Leilões', 'Buy Now': 'Comprar agora', Mortgages: 'Créditos', About: 'Sobre', Manifesto: 'Manifesto', Privacy: 'Privacidade', Terms: 'Termos' },
      pl: { Auctions: 'Aukcje', 'Buy Now': 'Kup teraz', Mortgages: 'Kredyty', About: 'O nas', Manifesto: 'Manifest', Privacy: 'Prywatność', Terms: 'Warunki' },
      uk: { Auctions: 'Аукціони', 'Buy Now': 'Купити зараз', Mortgages: 'Кредити', About: 'Про нас', Manifesto: 'Маніфест', Privacy: 'Конфіденційність', Terms: 'Умови' },
      vi: { Auctions: 'Đấu giá', 'Buy Now': 'Mua ngay', Mortgages: 'Vay vốn', About: 'Giới thiệu', Manifesto: 'Tuyên ngôn', Privacy: 'Quyền riêng tư', Terms: 'Điều khoản' },
      ro: { Auctions: 'Licitații', 'Buy Now': 'Cumpără acum', Mortgages: 'Credite', About: 'Despre', Manifesto: 'Manifest', Privacy: 'Confidențialitate', Terms: 'Termeni' },
      tl: { Auctions: 'Mga auction', 'Buy Now': 'Bumili ngayon', Mortgages: 'Pautang', About: 'Tungkol', Manifesto: 'Manifesto', Privacy: 'Privacy', Terms: 'Mga Tuntunin' },
      el: { Auctions: 'Πλειστηριασμοί', 'Buy Now': 'Αγορά τώρα', Mortgages: 'Δάνεια', About: 'Σχετικά', Manifesto: 'Μανιφέστο', Privacy: 'Απόρρητο', Terms: 'Όροι' },
      nl: { Auctions: 'Veilingen', 'Buy Now': 'Nu kopen', Mortgages: 'Hypotheken', About: 'Over ons', Manifesto: 'Manifest', Privacy: 'Privacy', Terms: 'Voorwaarden' },
      sv: { Auctions: 'Auktioner', 'Buy Now': 'Köp nu', Mortgages: 'Bolån', About: 'Om oss', Manifesto: 'Manifest', Privacy: 'Integritet', Terms: 'Villkor' },
      hi: { Auctions: 'नीलामी', 'Buy Now': 'अभी खरीदें', Mortgages: 'ऋण', About: 'हमारे बारे में', Manifesto: 'घोषणापत्र', Privacy: 'गोपनीयता', Terms: 'शर्तें' },
      ko: { Auctions: '경매', 'Buy Now': '지금 구매', Mortgages: '대출', About: '회사 소개', Manifesto: '선언문', Privacy: '개인정보', Terms: '약관' }
    },
    footer: {
      it: 'CARe Auctions di PuntoLuce Srls — Via Calamattia 21, 09134 Cagliari (CA) · P.IVA 04240850927',
      en: 'CARe Auctions by PuntoLuce Srls — Via Calamattia 21, 09134 Cagliari (CA) · P.IVA 04240850927',
      de: 'CARe Auctions von PuntoLuce Srls — Via Calamattia 21, 09134 Cagliari (CA) · P.IVA 04240850927',
      es: 'CARe Auctions de PuntoLuce Srls — Via Calamattia 21, 09134 Cagliari (CA) · P.IVA 04240850927',
      fr: 'CARe Auctions par PuntoLuce Srls — Via Calamattia 21, 09134 Cagliari (CA) · P.IVA 04240850927'
    }
  };

  var LS = 'icare-lingua';
  function lingua() {
    try { return (localStorage.getItem(LS) || 'en').slice(0, 2); } catch (e) { return 'en'; }
  }
  function tr(originale) {
    var l = lingua();
    var d = L.nav[l];
    if (d && d[originale]) return d[originale];
    return originale;
  }

  function applica() {
    // elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var d = window.I18N_PAGINE && window.I18N_PAGINE[lingua()];
      var v = (d && d[k]) || (window.I18N_PAGINE && window.I18N_PAGINE.en && window.I18N_PAGINE.en[k]);
      if (v) el.textContent = v;
    });
    // link di navigazione: traduci per testo esatto
    document.querySelectorAll('nav a, .nav-list a').forEach(function (a) {
      var t = (a.textContent || '').trim();
      var nt = tr(t);
      if (nt !== t) a.textContent = nt;
    });
    // footer società
    document.querySelectorAll('.site-footer p:first-child, .seo-pagina .entita p').forEach(function (p) {
      var l = lingua();
      var ft = L.footer[l] || L.footer.en;
      if (ft && p.textContent.indexOf('PuntoLuce') >= 0 && p.textContent.length < 200) {
        var rest = p.textContent.replace(/^[^·]*·[^·]*/, '').replace(/CARe Auctions[^·]*·[^·]*/, '');
        p.textContent = ft + (rest || '');
      }
    });
    document.documentElement.lang = lingua();
  }

  document.addEventListener('DOMContentLoaded', applica);
  document.querySelectorAll && document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('.lang-btn, .lingua-sel a');
    if (!b) return;
    var l = (b.getAttribute('data-sel') || b.getAttribute('data-lingua') || b.textContent || 'en').toLowerCase().slice(0, 2);
    try { localStorage.setItem(LS, l); } catch (e) {}
    setTimeout(applica, 50);
  });
  applica();
})();
