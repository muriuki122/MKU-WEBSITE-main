// script.js
(function () {
  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggleBtn && mobileMenu) {
    function updateMenu(expanded) {
      mobileMenu.style.display = expanded ? 'flex' : 'none';
      toggleBtn.setAttribute('aria-expanded', expanded);
      toggleBtn.innerHTML = expanded ? '✕' : '☰';
    }
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = toggleBtn.getAttribute('aria-expanded') !== 'true';
      updateMenu(expanded);
    });
    document.addEventListener('click', (e) => {
      if (mobileMenu.style.display === 'flex' && !mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        updateMenu(false);
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && mobileMenu.style.display === 'flex') {
        updateMenu(false);
      }
    });
  }

  // Tab switching functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  function switchTab(tabId) {
    panels.forEach(panel => panel.classList.remove('active-panel'));
    const activePanel = document.getElementById(tabId);
    if (activePanel) activePanel.classList.add('active-panel');
    tabBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isActive);
    });
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });
  // Set default active tab (malaria)
  switchTab('malaria');

  // Looping stats counter
  const statsElements = document.querySelectorAll('.stat-number');
  statsElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    let current = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = target / totalFrames;

    const animate = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        setTimeout(() => {
          current = 0;
          animate();
        }, 4000); // Pause for 4s before restarting
      } else {
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(animate);
      }
    };
    animate();
  });

  // Scroll reveal animation using Intersection Observer
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animClass = entry.target.getAttribute('data-animation') || 'reveal-up';
        entry.target.classList.add('active', animClass);
        // Once animated, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });


  // Storytelling Journey Tabs
  const storyTabs = document.querySelectorAll('.story-tab-btn');
  const storyPanels = document.querySelectorAll('.story-panel');

  storyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-story');

      // Update tabs
      storyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      storyPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `story-${target}`) {
          panel.classList.add('active');
        }
      });
    });
  });

})();