/* Modulo DEMO: nessun invio, nessun salvataggio. Mostra solo il messaggio onesto. */
document.getElementById("apply-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("apply-msg").textContent = "Demo form - the real submission arrives with the backend.";
});
