// Calculateur de capacité. Tout se passe dans le navigateur : rien n'est envoyé ni enregistré.
(function () {
  var body = document.getElementById('calc-body');
  if (!body) return;
  var margin = document.getElementById('calc-margin');
  var outDay = document.getElementById('calc-wh-day');
  var outRec = document.getElementById('calc-wh-rec');
  var outPeak = document.getElementById('calc-peak');
  var addBtn = document.getElementById('calc-add');

  function num(v) {
    var n = parseFloat(String(v).replace(',', '.'));
    return isFinite(n) && n > 0 ? n : 0;
  }

  function fmt(n) {
    return Math.round(n).toLocaleString('fr-FR');
  }

  function update() {
    var total = 0;
    var peak = 0;
    body.querySelectorAll('tr').forEach(function (tr) {
      var w = num(tr.querySelector('.w').value);
      var h = num(tr.querySelector('.h').value);
      var wh = w * h;
      tr.querySelector('.wh').textContent = fmt(wh) + ' Wh';
      total += wh;
      peak += w;
    });
    var m = Math.min(Math.max(num(margin.value), 0), 100);
    outDay.textContent = fmt(total) + ' Wh';
    outRec.textContent = fmt(total * (1 + m / 100)) + ' Wh';
    outPeak.textContent = fmt(peak) + ' W';
  }

  addBtn.addEventListener('click', function () {
    var last = body.querySelector('tr:last-child');
    var copy = last.cloneNode(true);
    copy.querySelectorAll('input').forEach(function (i) { i.value = ''; });
    body.appendChild(copy);
    update();
    copy.querySelector('.name').focus();
  });

  body.addEventListener('click', function (e) {
    if (e.target.classList.contains('del') && body.querySelectorAll('tr').length > 1) {
      e.target.closest('tr').remove();
      update();
    }
  });

  var form = document.getElementById('calc');
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('input', update);
  update();
})();
