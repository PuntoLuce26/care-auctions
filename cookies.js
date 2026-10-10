/* cookies.js — banner consenso (5.125): il sito non usa cookie di profilazione;
   salviamo solo la lingua scelta in localStorage. Banner legale minimo. */
(function () {
  var K = 'icare-cookie-ok';
  try { if (localStorage.getItem(K) === '1') return; } catch (e) { return; }
  var bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie notice');
  var t = document.createElement('p');
  var lx = ''; try { lx = (localStorage.getItem('icare-lingua') || '').slice(0, 2); } catch (e) {}
  t.textContent = lx === 'it' ? 'Usiamo solo cookie tecnici essenziali: ricordiamo solo la lingua scelta. Nessuna profilazione, nessun dato venduto. Continuando, accetti. ' : 'We use no profiling cookies: only your language choice is remembered. Continuing means you accept. ';
  var ok = document.createElement('button');
  ok.type = 'button';
  ok.textContent = 'OK';
  ok.addEventListener('click', function () { try { localStorage.setItem(K, '1'); } catch (e) {} bar.remove(); });
  var info = document.createElement('a');
  info.href = 'cookie.html';
  info.textContent = 'Cookie policy';
  t.appendChild(ok);
  t.appendChild(info);
  bar.appendChild(t);
  document.body.appendChild(bar);
})();
