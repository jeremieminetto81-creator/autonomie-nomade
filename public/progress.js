// Barre de progression de lecture des guides. Aucune donnée collectée.
(function () {
  var bar = document.getElementById('read-progress-bar');
  if (!bar) return;
  var ticking = false;
  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = 'scaleX(' + ratio + ')';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
