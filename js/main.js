// ========================
// Theme
// ========================
const ThemeManager = {
  KEY: 'portfolio-theme',

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(this.KEY, next);
  }
};

// ========================
// Navbar
// ========================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.navbar__link');

  function closeMobileMenu() {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    document.querySelectorAll('.section').forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === section.id);
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute('href').substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        history.pushState(null, null, link.getAttribute('href'));
        closeMobileMenu();
      }
    });
  });

  document.getElementById('themeToggle')?.addEventListener('click', () => ThemeManager.toggle());

  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMobileMenu(); });
  document.addEventListener('click', e => { if (!navbar.contains(e.target)) closeMobileMenu(); });
}

// ========================
// Scroll Animations
// ========================
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ========================
// Init
// ========================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
});
