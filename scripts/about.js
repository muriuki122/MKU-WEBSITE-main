// about-script.js
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

  // ---------- Animated Counters ----------
  const counters = [
    { id: 'counterPapers', target: 52, current: 0 },
    { id: 'counterCommunities', target: 48, current: 0 },
    { id: 'counterResearchers', target: 25, current: 0 },
    { id: 'counterFunding', target: 4.2, current: 0, suffix: 'M' }
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
        let val = progress * c.target;
        let display;
        if (c.id === 'counterFunding') {
          display = val.toFixed(1) + c.suffix;
        } else {
          display = Math.floor(val).toLocaleString();
        }
        const el = document.getElementById(c.id);
        if (el) el.innerText = display;
      });
      if (progress < 1) requestAnimationFrame(update);
      else {
        // Loop: reset and restart after a pause
        setTimeout(() => {
          countersStarted = false;
          startCounters();
        }, 4000);
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