// script.js
(function () {
  // ---- publication data (aligned with CPR research) ----
  const publications = [
    { title: "Single-cell atlas of the human placenta in malaria infection", authors: "Doe J, Kimani R, Gitaka J et al.", journal: "Nature Medicine", year: "2024", category: "malaria", impact: "nature", tags: "Single‑cell RNAseq", pdf: "pdfs/fmicb-12-777343.pdf" },
    { title: "Rapid point-of-care diagnostic for congenital syphilis", authors: "Kimani S, Ochieng M, Gitaka J", journal: "Science Translational Medicine", year: "2024", category: "diagnostics", impact: "high", tags: "CRISPR, POC", pdf: "pdfs/Rapid-point-of-care-diagnostic-for-congenital-syphilis.pdf" },
    { title: "Genomic surveillance of artemisinin resistance in Kenyan placenta isolates", authors: "Kanoi B, Wandera E, Shiluli C", journal: "The Lancet Microbe", year: "2025", category: "genomics", impact: "high", tags: "NGS, resistance", pdf: "pdfs/Genomic-surveillance-of-artemisinin-resistance-in-Kenyan-placenta-isolates.pdf" },
    { title: "Placental histopathology patterns associated with adverse birth outcomes", authors: "Kobia F, Mbugua S, Wanjiru G", journal: "Placenta", year: "2024", category: "malaria", tags: "Histopathology" },
    { title: "Machine learning for predicting preterm birth from placental images", authors: "Ochieng M, Kimani S, Kijogi C", journal: "Nature Digital Medicine", year: "2024", category: "maternal", tags: "AI, imaging", pdf: "pdfs/Accurate-single-molecule-spot-detection-for-image-.pdf" },
    { title: "CRISPR-Cas13 based field test for placental malaria", authors: "Shiluli C, Kanoi B, Gitaka J", journal: "BMC Medicine", year: "2025", category: "diagnostics", tags: "CRISPR, LFA", pdf: "pdfs/CRISPR-Cas13-based-field-test-for-placental-malaria.pdf" },
    { title: "Maternal mortality and placental dysfunction: systematic review", authors: "Wanjiru G, Kobia F, Gitaka J", journal: "The Lancet Global Health", year: "2024", category: "maternal", tags: "epidemiology", pdf: "pdfs/Maternal-mortality.pdf" },
    { title: "Long-read sequencing reveals novel Plasmodium variants", authors: "Kanoi B, Wandera E, Nding'uri P", journal: "Genome Medicine", year: "2025", category: "genomics", tags: "ONT, variants", pdf: "pdfs/Long-read-sequencing-reveals-novel-Plasmodium-variants.pdf" },
    { title: "Community‑based screening for congenital syphilis in rural Kenya", authors: "Mbugua S, Kimani S, Mutua M", journal: "BMJ Global Health", year: "2024", category: "diagnostics", tags: "implementation", pdf: "pdfs/Community‑based-screening-for-congenital-syphilis in-rural Kenya.pdf" },
    { title: "Immunology of placental malaria: new therapeutic targets", authors: "Kijogi C, Gitaka J, Ochieng M", journal: "Trends in Parasitology", year: "2025", category: "malaria", tags: "immunology", pdf: "pdfs/Immunology-of-placental-malaria-newtherapeuti- targets.pdf" },
    { title: "Socio‑economic impact of placental diseases in East Africa", authors: "Wanjiru G, Mbugua S, Kobia F", journal: "PLOS Global Public Health", year: "2024", category: "maternal", tags: "health economics", pdf: "pdfs/Socio‑economic-impact-of-placental-diseases-in-East-Africa.pdf" },
    { title: "Mobile‑integrated RDT for malaria in pregnancy", authors: "Ochieng M, Shiluli C, Kimani S", journal: "The Lancet Digital Health", year: "2025", category: "diagnostics", tags: "digital health", pdf: "pdfs/Mobile‑integrated-RDT-for-malaria-in-pregnancy.pdf" }
  ];

  // render publications based on filter
  function renderPublications(filter = "all") {
    const grid = document.getElementById("pubsGrid");
    if (!grid) return;
    const filtered = publications.filter(pub => filter === "all" || pub.category === filter);
    grid.innerHTML = filtered.map(pub => `
      <div class="pub-card" data-category="${pub.category}">
        <div class="pub-tag">${pub.tags}</div>
        <div class="pub-title">${pub.title}</div>
        <div class="pub-authors">${pub.authors}</div>
        <div class="pub-journal">${pub.journal} ● ${pub.year}</div>
        <div class="pub-meta"><span>📄 ${pub.impact ? (pub.impact === 'nature' ? 'Nature Portfolio' : 'High Impact') : 'Peer reviewed'}</span></div>
        <button class="pub-link" ${pub.pdf ? `onclick="openPdf('${pub.pdf}', '${pub.title}')"` : 'onclick="alert(\'Abstract arriving soon!\')"'} style="background:none; border:none; cursor:pointer;">
          ${pub.pdf ? 'Read Full Story →' : 'Read abstract →'}
        </button>
      </div>
    `).join("");
  }

  // Counter animation with Intersection Observer (continuous counting once)
  const counters = [
    { id: "counterPubs", target: 52, current: 0 },
    { id: "counterImpact", target: 18, current: 0 },
    { id: "counterCitations", target: 2840, current: 0 },
    { id: "counterCountries", target: 24, current: 0 }
  ];
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    const duration = 2000; // ms
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      counters.forEach(c => {
        const val = Math.floor(progress * c.target);
        const el = document.getElementById(c.id);
        if (el) el.innerText = val.toLocaleString();
      });
      if (progress < 1) requestAnimationFrame(update);
      else {
        counters.forEach(c => {
          const el = document.getElementById(c.id);
          if (el) el.innerText = c.target.toLocaleString();
        });
      }
    }
    requestAnimationFrame(update);
  }

  // observer for stats section
  const statsSection = document.querySelector(".stats-row");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        startCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else { startCounters(); }

  // tab switching & filter setup
  function setupTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter");
        renderPublications(filter);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  }
  // ---------- PDF Modal Logic ----------
  const pdfModal = document.getElementById('pdfModal');
  const pdfFrame = document.getElementById('pdfFrame');
  const modalTitle = document.getElementById('modalTitle');
  const closeBtn = document.getElementById('closeModal');

  window.openPdf = function (url, title) {
    if (pdfModal && pdfFrame && modalTitle) {
      pdfFrame.src = url;
      modalTitle.innerText = title;
      pdfModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (pdfModal && closeBtn) {
    function closeModalFunc() {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { if (pdfFrame) pdfFrame.src = ''; }, 300);
    }
    closeBtn.addEventListener('click', closeModalFunc);
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) closeModalFunc();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfModal.classList.contains('active')) closeModalFunc();
    });
  }

  renderPublications("all");
  setupTabs();

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

  // extra: smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();