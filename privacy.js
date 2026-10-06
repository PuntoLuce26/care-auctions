/* Consensi DEMO: stato salvato in localStorage "care_consensi" come { chiave: true/false }.
   Non attivano né bloccano funzioni dell'app: arriveranno con il backend. */
(function () {
  var KEY = "care_consensi";
  var boxes = document.querySelectorAll("#consent-form input[type=checkbox]");
  var status = document.getElementById("consent-status");
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  Array.prototype.forEach.call(boxes, function (box) {
    box.checked = state[box.dataset.key] === true;
    box.addEventListener("change", function () {
      state[box.dataset.key] = box.checked;
      save();
      var name = box.parentNode.textContent.trim();
      status.textContent = (box.checked ? "Allowed: " : "Revoked: ") + name;
    });
  });
  document.getElementById("revoke-all").addEventListener("click", function () {
    Array.prototype.forEach.call(boxes, function (box) {
      box.checked = false;
      state[box.dataset.key] = false;
    });
    save();
    status.textContent = "All permissions revoked.";
  });
})();
