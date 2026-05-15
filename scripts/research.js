// script.js
(function () {
  // ---------- Mobile menu toggle ----------
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    function updateMenu(expanded) {
      menu.style.display = expanded ? 'flex' : 'none';
      toggle.setAttribute('aria-expanded', expanded);
      toggle.innerHTML = expanded ? '✕' : '☰';
    }
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      updateMenu(expanded);
    });
    document.addEventListener('click', (e) => {
      if (menu.style.display === 'flex' && !menu.contains(e.target) && !toggle.contains(e.target)) {
        updateMenu(false);
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && menu.style.display === 'flex') updateMenu(false);
    });
  }

  // Simple parallax / particles effect for hero
  const heroParticles = document.getElementById('heroParticles');
  if (heroParticles) {
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 8 + 4}s infinite ease-in-out;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      heroParticles.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) translateX(0px); }
        50% { transform: translateY(-20px) translateX(10px); }
        100% { transform: translateY(0px) translateX(0px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Add tilt effect for cards (simple mousemove)
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add intersection observer for fade-in cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.pillar-card, .timeline-item, .impact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();