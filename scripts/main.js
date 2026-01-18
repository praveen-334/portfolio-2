/**
 * PRAVEEN P - PORTFOLIO INTERACTIONS
 * Theme toggle, scroll animations, mobile navigation
 */

// ==========================================================================
// Theme Management
// ==========================================================================

const ThemeManager = {
  STORAGE_KEY: 'portfolio-theme',
  DARK: 'dark',
  LIGHT: 'light',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? this.DARK : this.LIGHT);
    this.setTheme(theme);
    this.bindEvents();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleIcon(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === this.DARK ? this.LIGHT : this.DARK;
    this.setTheme(newTheme);
  },

  updateToggleIcon(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    toggle.innerHTML = theme === this.DARK 
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
         </svg>`;
  },

  bindEvents() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  }
};

// ==========================================================================
// Scroll Animations
// ==========================================================================

const ScrollAnimations = {
  init() {
    this.observeElements();
    this.handleHeaderScroll();
  },

  observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  },

  handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
};

// ==========================================================================
// Mobile Navigation
// ==========================================================================

const MobileNav = {
  init() {
    this.toggle = document.querySelector('.mobile-menu-btn');
    this.nav = document.querySelector('.mobile-nav');
    this.links = document.querySelectorAll('.mobile-nav-links a');
    
    if (!this.toggle || !this.nav) return;
    
    this.bindEvents();
  },

  bindEvents() {
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeMenu();
    });
  },

  toggleMenu() {
    this.nav.classList.toggle('active');
    document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
  },

  closeMenu() {
    this.nav.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// ==========================================================================
// Smooth Scroll
// ==========================================================================

const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};

// ==========================================================================
// Active Navigation
// ==========================================================================

const ActiveNav = {
  init() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    sections.forEach(section => observer.observe(section));
  }
};

// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  ScrollAnimations.init();
  MobileNav.init();
  SmoothScroll.init();
  ActiveNav.init();
});
