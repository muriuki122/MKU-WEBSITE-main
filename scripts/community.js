// community-script.js
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

  // ---------- Animated Counters (Intersection Observer) ----------
  const counters = [
    { id: 'counterLives', target: 12580, current: 0 },
    { id: 'counterCommunities', target: 48, current: 0 },
    { id: 'counterTrained', target: 542, current: 0 },
    { id: 'counterSuccess', target: 85, current: 0 }
  ];
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    const duration = 2000;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      counters.forEach(c => {
        let val = Math.floor(progress * c.target);
        if (c.id === 'counterSuccess') {
          const el = document.getElementById(c.id);
          if (el) el.innerHTML = val + '<span style="font-size:1.8rem;">%</span>';
        } else {
          const el = document.getElementById(c.id);
          if (el) el.innerText = val.toLocaleString();
        }
      });
      if (progress < 1) requestAnimationFrame(update);
      else {
        counters.forEach(c => {
          if (c.id === 'counterSuccess') {
            const el = document.getElementById(c.id);
            if (el) el.innerHTML = c.target + '<span style="font-size:1.8rem;">%</span>';
          } else {
            const el = document.getElementById(c.id);
            if (el) el.innerText = c.target.toLocaleString();
          }
        });
      }
    }
    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector('.stats-row');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) startCounters();
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    startCounters();
  }

  // ---------- Program Buttons (demonstration alerts, can be replaced with actual links) ----------
  const programBtns = document.querySelectorAll('.btn-program');
  programBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'contact.html#advancedContactForm';
    });
  });

  // ---------- Get Involved Buttons ----------
  const involvedBtns = document.querySelectorAll('.involved-btn');
  involvedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'contact.html#advancedContactForm';
    });
  });

  // ---------- Newsletter Form ----------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing! You will receive our community newsletter.');
      newsletterForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();