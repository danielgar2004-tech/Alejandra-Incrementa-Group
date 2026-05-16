/* Carrusel de galería de proyecto — sin temporizador, desplazamiento manual */
(function() {
  'use strict';

  function initCarrusel(carrusel) {
    const pista = carrusel.querySelector('.carrusel-pista');
    const slides = carrusel.querySelectorAll('.carrusel-slide');
    const btnPrev = carrusel.querySelector('.carrusel-boton-prev');
    const btnNext = carrusel.querySelector('.carrusel-boton-next');
    const indicadores = carrusel.querySelectorAll('.carrusel-indicador');
    if (!pista || slides.length === 0) return;

    function getSlideAncho() {
      if (slides.length < 2) return slides[0].offsetWidth;
      const r1 = slides[0].getBoundingClientRect();
      const r2 = slides[1].getBoundingClientRect();
      return r2.left - r1.left;
    }

    function indiceActual() {
      const anchoSlide = getSlideAncho();
      if (!anchoSlide) return 0;
      return Math.round(pista.scrollLeft / anchoSlide);
    }

    function actualizarEstado() {
      const idx = indiceActual();
      const maxIdx = slides.length - 1;
      if (btnPrev) btnPrev.disabled = pista.scrollLeft <= 4;
      if (btnNext) btnNext.disabled = pista.scrollLeft >= pista.scrollWidth - pista.clientWidth - 4;
      indicadores.forEach((ind, i) => ind.classList.toggle('activo', i === idx));
    }

    function irA(idx) {
      const anchoSlide = getSlideAncho();
      pista.scrollTo({ left: anchoSlide * idx, behavior: 'smooth' });
    }

    if (btnPrev) btnPrev.addEventListener('click', () => irA(Math.max(0, indiceActual() - 1)));
    if (btnNext) btnNext.addEventListener('click', () => irA(Math.min(slides.length - 1, indiceActual() + 1)));
    indicadores.forEach((ind, i) => ind.addEventListener('click', () => irA(i)));

    let scrollTimeout;
    pista.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(actualizarEstado, 80);
    }, { passive: true });
    window.addEventListener('resize', actualizarEstado);
    actualizarEstado();
  }

  /* Lightbox */
  function abrirLightbox(src, tipo) {
    const lb = document.getElementById('galeria-lightbox');
    const cont = document.getElementById('galeria-lightbox-contenido');
    if (!lb || !cont) return;
    if (tipo === 'video') {
      cont.innerHTML = '<video src="' + src + '" controls autoplay playsinline></video>';
    } else {
      cont.innerHTML = '<img src="' + src + '" alt="Galería">';
    }
    lb.classList.add('activo');
    document.body.style.overflow = 'hidden';
  }

  function cerrarLightbox(e) {
    const lb = document.getElementById('galeria-lightbox');
    if (!lb) return;
    if (!e || e.target === lb || (e.currentTarget && e.currentTarget.classList && e.currentTarget.classList.contains('galeria-lightbox-cerrar'))) {
      lb.classList.remove('activo');
      const cont = document.getElementById('galeria-lightbox-contenido');
      if (cont) cont.innerHTML = '';
      document.body.style.overflow = '';
    }
  }

  window.abrirLightbox = abrirLightbox;
  window.cerrarLightbox = cerrarLightbox;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.carrusel').forEach(initCarrusel);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') cerrarLightbox();
    });
  });
})();
