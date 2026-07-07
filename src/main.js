import './styles.css';

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const body = document.body;

const closeMenu = () => {
  if (!menuToggle || !navLinks || !body) return;

  menuToggle.classList.remove('active');
  navLinks.classList.remove('active');
  body.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const toggleMenu = () => {
  if (!menuToggle || !navLinks || !body) return;

  const isActive = menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active', isActive);
  body.classList.toggle('nav-open', isActive);
  menuToggle.setAttribute('aria-expanded', String(isActive));
};

if (menuToggle && navLinks && body) {
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('active')) return;

    const clickedInsideNav = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}
