// Amélioration du menu burger (details/summary) : Échap, clic à l'extérieur, fermeture au passage en grand écran.
(function () {
  var d = document.getElementById('burger');
  if (!d) return;
  function close(focus) {
    if (!d.open) return;
    d.open = false;
    if (focus) d.querySelector('summary').focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(true); });
  document.addEventListener('click', function (e) { if (!d.contains(e.target)) close(false); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) { if (m.matches) close(false); });
})();
