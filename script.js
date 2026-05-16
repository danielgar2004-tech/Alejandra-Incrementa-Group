// ============================================
//   SCRIPT PRINCIPAL — ALEJANDRA GARCÍA
// ============================================

(function() {
  'use strict';

  // ============================================
  //   NAVBAR SCROLL
  // ============================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const manejarScrollNav = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', manejarScrollNav, { passive: true });
    manejarScrollNav();
  }

  // ============================================
  //   MENU HAMBURGUESA
  // ============================================
  const hamburguesa = document.querySelector('.menu-hamburguesa');
  const menuMovil = document.querySelector('.navbar-menu');

  if (hamburguesa && menuMovil) {
    hamburguesa.addEventListener('click', () => {
      hamburguesa.classList.toggle('activo');
      menuMovil.classList.toggle('activo');
      document.body.style.overflow = menuMovil.classList.contains('activo') ? 'hidden' : '';
    });

    // Cerrar al hacer click en un link
    menuMovil.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburguesa.classList.remove('activo');
        menuMovil.classList.remove('activo');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  //   HERO VIDEO — Robust handling
  //   Estrategia: intentar reproducir el video.
  //   Si falla (iOS Low Power Mode, restricciones),
  //   el fallback CSS animado queda visible debajo.
  // ============================================
  const videoHero = document.querySelector('.hero-video');

  if (videoHero) {
    // Forzar atributos críticos para autoplay en móvil
    videoHero.muted = true;
    videoHero.playsInline = true;
    videoHero.setAttribute('playsinline', '');
    videoHero.setAttribute('webkit-playsinline', '');

    const intentarReproducir = () => {
      const promesa = videoHero.play();
      if (promesa !== undefined) {
        promesa.catch(() => {
          // Si falla, ocultamos el video para mostrar el fallback CSS
          videoHero.style.display = 'none';
        });
      }
    };

    // Intentar al cargar metadatos
    if (videoHero.readyState >= 2) {
      intentarReproducir();
    } else {
      videoHero.addEventListener('loadeddata', intentarReproducir, { once: true });
    }

    // Reintentar tras primer toque/click (gesto del usuario desbloquea autoplay en iOS)
    const reintentoGesto = () => {
      if (videoHero.paused) {
        intentarReproducir();
      }
      document.removeEventListener('touchstart', reintentoGesto);
      document.removeEventListener('click', reintentoGesto);
    };
    document.addEventListener('touchstart', reintentoGesto, { once: true, passive: true });
    document.addEventListener('click', reintentoGesto, { once: true });

    // Si después de 3 segundos no carga, ocultar
    setTimeout(() => {
      if (videoHero.readyState < 2) {
        videoHero.style.display = 'none';
      }
    }, 3000);

    videoHero.addEventListener('error', () => {
      videoHero.style.display = 'none';
    });
  }

  // ============================================
  //   ANIMACIONES SCROLL REVEAL
  // ============================================
  const elementosReveal = document.querySelectorAll('.reveal');

  if (elementosReveal.length > 0 && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elementosReveal.forEach(el => observador.observe(el));
  } else {
    // Fallback: mostrar todo si no hay IntersectionObserver
    elementosReveal.forEach(el => el.classList.add('visible'));
  }

  // ============================================
  //   CONTADOR ANIMADO DE ESTADÍSTICAS
  // ============================================
  const numeros = document.querySelectorAll('.estadistica-numero[data-final]');

  const animarNumero = (elemento) => {
    const final = parseFloat(elemento.dataset.final);
    const sufijo = elemento.dataset.sufijo || '';
    const prefijo = elemento.dataset.prefijo || '';
    const duracion = 2200;
    const inicio = performance.now();

    const animar = (tiempo) => {
      const transcurrido = tiempo - inicio;
      const progreso = Math.min(transcurrido / duracion, 1);
      // easing easeOutExpo
      const eased = progreso === 1 ? 1 : 1 - Math.pow(2, -10 * progreso);
      const valor = final * eased;

      let texto;
      if (final >= 1000) {
        texto = Math.floor(valor).toLocaleString('es-PE');
      } else if (Number.isInteger(final)) {
        texto = Math.floor(valor);
      } else {
        texto = valor.toFixed(1);
      }

      elemento.textContent = prefijo + texto + sufijo;

      if (progreso < 1) {
        requestAnimationFrame(animar);
      }
    };

    requestAnimationFrame(animar);
  };

  if (numeros.length > 0 && 'IntersectionObserver' in window) {
    const observadorNumeros = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          animarNumero(entrada.target);
          observadorNumeros.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });

    numeros.forEach(n => observadorNumeros.observe(n));
  } else {
    // Fallback
    numeros.forEach(n => {
      const final = parseFloat(n.dataset.final);
      const sufijo = n.dataset.sufijo || '';
      const prefijo = n.dataset.prefijo || '';
      n.textContent = prefijo + (final >= 1000 ? final.toLocaleString('es-PE') : final) + sufijo;
    });
  }

  // ============================================
  //   FILTROS DE PROYECTOS
  // ============================================
  const botonesFiltro = document.querySelectorAll('.filtro');
  const tarjetasProyectos = document.querySelectorAll('.proyecto');
  const gridProyectos = document.querySelector('.proyectos-grid');

  if (botonesFiltro.length > 0 && tarjetasProyectos.length > 0) {
    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', () => {
        const filtro = boton.dataset.filtro;

        botonesFiltro.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');

        tarjetasProyectos.forEach(tarjeta => {
          if (filtro === 'todos' || tarjeta.dataset.zona === filtro) {
            tarjeta.classList.remove('oculto');
          } else {
            tarjeta.classList.add('oculto');
          }
        });
      });
    });
  }

  // Efecto hover destacado en grid de proyectos
  if (gridProyectos && tarjetasProyectos.length > 0) {
    tarjetasProyectos.forEach(tarjeta => {
      tarjeta.addEventListener('mouseenter', () => gridProyectos.classList.add('hover-activo'));
      tarjeta.addEventListener('mouseleave', () => gridProyectos.classList.remove('hover-activo'));
    });
  }

  // ============================================
  //   FORMULARIO → WHATSAPP
  // ============================================
  const formulario = document.querySelector('#formulario-contacto');
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = formulario.querySelector('[name="nombre"]').value.trim();
      const telefono = formulario.querySelector('[name="telefono"]').value.trim();
      const proyecto = formulario.querySelector('[name="proyecto"]').value;
      const mensaje = formulario.querySelector('[name="mensaje"]').value.trim();

      let textoFinal = `¡Hola Alejandra! Mi nombre es ${nombre}.`;
      if (proyecto && proyecto !== 'general') {
        textoFinal += ` Estoy interesado en el proyecto ${proyecto}.`;
      } else {
        textoFinal += ` Estoy interesado en conocer los proyectos disponibles.`;
      }
      if (mensaje) {
        textoFinal += ` ${mensaje}`;
      }
      if (telefono) {
        textoFinal += ` Mi número es ${telefono}.`;
      }
      textoFinal += ` ¿Podemos agendar una reunión?`;

      const url = `https://wa.me/51910799332?text=${encodeURIComponent(textoFinal)}`;
      window.open(url, '_blank');
    });
  }

  // ============================================
  //   SMOOTH SCROLL para anchors
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target.length > 1) {
        const elemento = document.querySelector(target);
        if (elemento) {
          e.preventDefault();
          const offsetTop = elemento.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

})();
