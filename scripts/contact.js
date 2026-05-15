// contact-script.js
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
    { id: 'counterCountries', target: 24, current: 0 },
    { id: 'counterProjects', target: 18, current: 0 },
    { id: 'counterResponse', target: 24, current: 0 },
    { id: 'counterPartners', target: 42, current: 0 }
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
        if (c.id === 'counterResponse') {
          const el = document.getElementById(c.id);
          if (el) el.innerHTML = val + '<span style="font-size:1.6rem;">hrs</span>';
        } else {
          const el = document.getElementById(c.id);
          if (el) el.innerText = val.toLocaleString();
        }
      });
      if (progress < 1) requestAnimationFrame(update);
      else {
        counters.forEach(c => {
          if (c.id === 'counterResponse') {
            const el = document.getElementById(c.id);
            if (el) el.innerHTML = c.target + '<span style="font-size:1.6rem;">hrs</span>';
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

  // ---------- Advanced Form Validation & Submission ----------
  const form = document.getElementById('advancedContactForm');
  const feedbackDiv = document.getElementById('formFeedback');

  function showError(inputId, message) {
    const errorDiv = document.querySelector(`.error-msg[data-for="${inputId}"]`);
    if (errorDiv) {
      errorDiv.innerText = message;
      errorDiv.style.display = 'block';
    }
  }

  function clearError(inputId) {
    const errorDiv = document.querySelector(`.error-msg[data-for="${inputId}"]`);
    if (errorDiv) {
      errorDiv.innerText = '';
      errorDiv.style.display = 'none';
    }
  }

  function validateField(field) {
    const value = field.value.trim();
    const id = field.id;
    clearError(id);
    if (field.hasAttribute('required') && !value) {
      showError(id, 'This field is required');
      return false;
    }
    if (id === 'email' && value && !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(value)) {
      showError(id, 'Please enter a valid email address');
      return false;
    }
    if (id === 'phone' && value && !/^[\+\d\s\-\(\)]{8,}$/.test(value)) {
      showError(id, 'Please enter a valid phone number');
      return false;
    }
    return true;
  }

  if (form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearError(input.id));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!validateField(field)) isValid = false;
      });
      if (isValid) {
        feedbackDiv.innerHTML = '<div style="background:#d4edda; color:#155724; padding:1rem; border-radius:0.8rem;">✅ Thank you! Your message has been sent. We will respond within 24 hours.</div>';
        form.reset();
        // Reset floating labels manually
        inputs.forEach(input => {
          if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
          }
        });
        setTimeout(() => {
          feedbackDiv.innerHTML = '';
        }, 5000);
      } else {
        feedbackDiv.innerHTML = '<div style="background:#f8d7da; color:#721c24; padding:1rem; border-radius:0.8rem;">⚠️ Please fix the errors above before submitting.</div>';
        setTimeout(() => {
          if (feedbackDiv.innerHTML.includes('fix the errors')) feedbackDiv.innerHTML = '';
        }, 4000);
      }
    });
  }

  // ---------- Interactive Map (Leaflet) ----------
  if (typeof L !== 'undefined') {
    const mapElement = document.getElementById('interactiveMap');
    if (mapElement) {
      const map = L.map('interactiveMap').setView([-1.0438, 37.0616], 13); // Coordinates near Thika Road, Nairobi
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3
      }).addTo(map);
      L.marker([-1.0438, 37.0616]).addTo(map)
        .bindPopup('<b>MKU Centre for Placenta Research</b><br>Mount Kenya University, Thika Road')
        .openPopup();
    }
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