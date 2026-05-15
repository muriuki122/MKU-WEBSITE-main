// people-script.js
(function () {
  // Mobile menu toggle
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    function update(expanded) {
      menu.style.display = expanded ? 'flex' : 'none';
      toggle.setAttribute('aria-expanded', expanded);
      toggle.innerHTML = expanded ? '✕' : '☰';
    }
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      update(expanded);
    });
    document.addEventListener('click', (e) => {
      if (menu.style.display === 'flex' && !menu.contains(e.target) && !toggle.contains(e.target)) {
        update(false);
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && menu.style.display === 'flex') update(false);
    });
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // subtle fade-in for cards (optional)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.team-card, .staff-item, .pi-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
})();