// Calculateur de recharge solaire. Tout se passe dans le navigateur : rien n'est envoyé ni enregistré.
(function () {
  var root = document.getElementById('solar');
  if (!root) return;
  function val(id) {
    var n = parseFloat(String(document.getElementById(id).value).replace(',', '.'));
    return isFinite(n) && n > 0 ? n : 0;
  }
  function fmt(n, d) {
    return n.toLocaleString('fr-FR', { maximumFractionDigits: d || 0 });
  }
  function update() {
    var cap = val('s-cap');
    var panel = val('s-panel');
    var coef = Math.min(val('s-coef'), 100) / 100;
    var hours = val('s-hours');
    var limit = val('s-limit');
    var real = panel * coef;
    if (limit > 0) real = Math.min(real, limit);
    var perDay = real * hours;
    document.getElementById('s-real').textContent = fmt(real) + ' W';
    document.getElementById('s-day').textContent = fmt(perDay) + ' Wh';
    document.getElementById('s-full').textContent = perDay > 0 && cap > 0
      ? fmt(cap / perDay, 1) + ' jour(s)'
      : 'à calculer';
  }
  root.addEventListener('input', update);
  update();
})();
