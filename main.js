document.addEventListener('DOMContentLoaded', () => {
  /* ================================
     Sélecteurs de base
  ================================== */
  const header = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero-aprilford');
  const burger = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  /* ================================
     Scroll states: on-hero + at-top
     - .on-hero sur le header : texte clair sur le hero
     - .at-top sur le body : styles “transparent” vs “sticky clair” dans le CSS
  ================================== */
  let ticking = false;
  function applyScrollStates() {
    if (!header) return;

    // 1) Etat "at-top" (pour le CSS body:not(.at-top) …)
    if (window.scrollY < 10) {
      document.body.classList.add('at-top');
    } else {
      document.body.classList.remove('at-top');
    }

    // 2) Etat "on-hero" (ton effet initial)
    if (heroSection) {
      const limit = heroSection.offsetHeight - header.offsetHeight;
      if (window.scrollY < Math.max(0, limit)) {
        header.classList.add('on-hero');
      } else {
        header.classList.remove('on-hero');
      }
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        applyScrollStates();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initial + écouteurs
  applyScrollStates();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => applyScrollStates());

  /* ================================
     Menu burger (ouverture/fermeture)
  ================================== */
  if (burger && nav && header) {
    // Ouverture/fermeture
    burger.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    });

    // Ferme au clic sur un lien
    nav.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.matches && t.matches('a')) {
        header.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflowY = 'auto';
      }
    });

    // Ferme avec Echap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflowY = 'auto';
      }
    });

    // Ferme si on repasse en desktop (>768px)
    const mq = window.matchMedia('(min-width: 769px)');
    mq.addEventListener
      ? mq.addEventListener('change', (ev) => {
          if (ev.matches) {
            header.classList.remove('nav-open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflowY = 'auto';
          }
        })
      : mq.addListener((ev) => {
          if (ev.matches) {
            header.classList.remove('nav-open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflowY = 'auto';
          }
