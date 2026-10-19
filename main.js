/* ==========================================================
   OUTFIRE S.A. — Interacciones del sitio
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Carrusel del hero ----------
     Cada diapositiva corresponde, en orden, a una imagen .hero__bg del HTML. */
  var SLIDES = [
    { kicker: 'Protección contra incendio', title: 'Sistemas de alta confiabilidad para proteger lo que importa', text: 'Diseñamos, instalamos y mantenemos sistemas de detección y extinción para industrias, edificios y riesgos especiales.', cta: 'Solicitar asesoría', label: 'Sala de bombas' },
    { kicker: 'Extinción por agua', title: 'Rociadores automáticos que actúan al instante', text: 'Redes de rociadores, espuma y diluvio diseñadas según NFPA para cada tipo de riesgo.', cta: 'Cotizar un proyecto', label: 'Rociadores' },
    { kicker: 'Detección y alarma', title: 'Detección temprana para actuar antes', text: 'Centrales convencionales e inteligentes, detección por aspiración y evacuación por audio.', cta: 'Solicitar asesoría', label: 'Detección de incendios' },
    { kicker: 'Ingeniería y auditoría', title: 'Soluciones integrales en todo el ciclo del proyecto', text: 'Hidrantes, salas de bombas y dirección de obra, bajo normas NFPA e IRAM.', cta: 'Cotizar un proyecto', label: 'Hidrantes' },
    { kicker: 'Riesgos especiales', title: 'Agentes limpios para proteger equipos críticos', text: 'Sistemas de FM200, Novec 1230, Inergen y CO2 para data centers, archivos y salas eléctricas.', cta: 'Solicitar asesoría', label: 'Agentes limpios' }
  ];
  var INTERVALO = 6000; // ms entre diapositivas

  var hero = document.querySelector('.hero');
  if (hero) {
    var bgs = hero.querySelectorAll('.hero__bg');
    var dotsBox = hero.querySelector('[data-hero-dots]');
    var counter = hero.querySelector('[data-hero-counter]');
    var fields = {};
    hero.querySelectorAll('[data-slide-text]').forEach(function (el) {
      fields[el.getAttribute('data-slide-text')] = el;
    });
    var n = Math.min(SLIDES.length, bgs.length);
    var current = 0;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dots = [];
    for (var k = 0; k < n; k++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hero__dot' + (k === 0 ? ' is-active' : '');
      b.setAttribute('aria-label', 'Ir a diapositiva ' + (k + 1));
      b.addEventListener('click', (function (idx) { return function () { go(idx, true); }; })(k));
      dotsBox.appendChild(b);
      dots.push(b);
    }

    function pad(x) { return (x < 10 ? '0' : '') + x; }

    function go(i, user) {
      i = (i + n) % n;
      if (i === current) return;
      bgs[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = i;
      bgs[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      counter.textContent = pad(current + 1) + ' / ' + pad(n);

      hero.classList.add('is-changing');
      setTimeout(function () {
        var s = SLIDES[current];
        Object.keys(fields).forEach(function (key) { if (s[key] != null) fields[key].textContent = s[key]; });
        hero.classList.remove('is-changing');
      }, 300);

      if (user) restart();
    }

    function restart() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(current + 1); }, INTERVALO);
    }

    hero.querySelector('[data-hero-prev]').addEventListener('click', function () { go(current - 1, true); });
    hero.querySelector('[data-hero-next]').addEventListener('click', function () { go(current + 1, true); });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    counter.textContent = pad(1) + ' / ' + pad(n);
    restart();
  }

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Año del footer ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
