document.addEventListener('DOMContentLoaded', () => {
  // MENU BURGER
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.main-nav');

  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // FERMER LE MENU AU CLIC SUR UN LIEN
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // THÈME TOGGLE (si tu as un bouton #theme-toggle)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });

  // HEADER TRANSPARENT SUR HERO
  const header = document.querySelector('.site-header');
  const hero = document.getElementById('hero-aprilford');

  const toggleHeaderOnHero = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom > 80) {
      header.classList.add('on-hero');
    } else {
      header.classList.remove('on-hero');
    }
  };

  window.addEventListener('scroll', toggleHeaderOnHero);
  toggleHeaderOnHero(); // au chargement
});
