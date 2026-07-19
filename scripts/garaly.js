/* ============================================
   MKU Research Gallery — Script
   ============================================ */

// ---------- Member Data ----------
const members = [
    {
        id: 1,
        name: "Prof. Grace Wanjiku",
        title: "Principal Investigator & Professor of Reproductive Health",
        category: "lead",
        roleLabel: "Lead Researcher",
        focus: "Placental Morphology & Histopathology",
        email: "g.wanjiku@mku.ac.ke",
        publications: 14,
        image: "https://picsum.photos/seed/mku-grace/600/800.jpg",
        bio: "Prof. Wanjiku leads the Placenta Research Quality Unit with over 18 years of experience in maternal-fetal medicine. Her pioneering work on placental histological grading systems has been adopted across East African teaching hospitals.",
        tags: ["Histopathology", "Morphometry", "Quality Standards", "Mentorship"]
    },
    {
        id: 2,
        name: "Dr. Samuel Ochieng",
        title: "Senior Lecturer — Department of Biomedical Sciences",
        category: "lead",
        roleLabel: "Lead Researcher",
        focus: "Placental Blood Flow & Vascular Integrity",
        email: "s.ochieng@mku.ac.ke",
        publications: 11,
        image: "https://picsum.photos/seed/mku-samuel/600/800.jpg",
        bio: "Dr. Ochieng specializes in placental vascular architecture and its correlation with intrauterine growth restriction. He coordinates the unit's imaging laboratory and supervises three PhD candidates.",
        tags: ["Vascular Biology", "Doppler Imaging", "IUGR", "Lab Management"]
    },
    {
        id: 3,
        name: "Dr. Amina Hassan",
        title: "Research Scientist — Molecular Pathology",
        category: "lead",
        roleLabel: "Lead Researcher",
        focus: "Molecular Biomarkers in Placental Quality",
        email: "a.hassan@mku.ac.ke",
        publications: 9,
        image: "https://picsum.photos/seed/mku-amina/600/800.jpg",
        bio: "Dr. Hassan's research explores protein and gene expression signatures that predict placental insufficiency. She established the unit's molecular analysis pipeline and holds a joint appointment with the Kenya Medical Research Institute.",
        tags: ["Biomarkers", "Proteomics", "Gene Expression", "KEMRI"]
    },
    {
        id: 4,
        name: "Dr. Peter Mwangi",
        title: "Post-Doctoral Fellow — Placental Immunology",
        category: "postdoc",
        roleLabel: "Post-Doctoral",
        focus: "Immune Profiling of Maternal-Fetal Interface",
        email: "p.mwangi@mku.ac.ke",
        publications: 7,
        image: "https://picsum.photos/seed/mku-peter/600/800.jpg",
        bio: "Dr. Mwangi completed his PhD at the University of Nairobi and joined MKU to investigate how immune cell populations in the placenta influence pregnancy outcomes in malaria-endemic regions of Kenya.",
        tags: ["Immunology", "Malaria", "Trophoblasts", "Flow Cytometry"]
    },
    {
        id: 5,
        name: "Dr. Faith Njeri",
        title: "Post-Doctoral Fellow — Epidemiology",
        category: "postdoc",
        roleLabel: "Post-Doctoral",
        focus: "Epidemiology of Placental Disorders",
        email: "f.njeri@mku.ac.ke",
        publications: 5,
        image: "https://picsum.photos/seed/mku-faith/600/800.jpg",
        bio: "Dr. Njeri leads the unit's population-based studies, analyzing regional data on placental abruption, previa, and accreta spectrum disorders across 12 hospitals in central Kenya.",
        tags: ["Epidemiology", "Clinical Data", "Statistics", "Public Health"]
    },
    {
        id: 6,
        name: "Kelvin Otieno",
        title: "PhD Candidate — Placental Proteomics",
        category: "phd",
        roleLabel: "PhD Scholar",
        focus: "Proteomic Signatures of Preeclampsia Placentae",
        email: "k.otieno@students.mku.ac.ke",
        publications: 3,
        image: "https://picsum.photos/seed/mku-kelvin/600/800.jpg",
        bio: "Kelvin's doctoral research uses mass spectrometry-based proteomics to identify differentially expressed proteins in placentae from preeclamptic pregnancies versus normotensive controls.",
        tags: ["Proteomics", "Mass Spectrometry", "Preeclampsia", "Bioinformatics"]
    },
    {
        id: 7,
        name: "Susan Chebet",
        title: "PhD Candidate — Placental Histomorphometry",
        category: "phd",
        roleLabel: "PhD Scholar",
        focus: "Digital Histomorphometry of Placental Villi",
        email: "s.chebet@students.mku.ac.ke",
        publications: 2,
        image: "https://picsum.photos/seed/mku-susan/600/800.jpg",
        bio: "Susan is developing automated image analysis algorithms for quantifying villous surface area, capillary density, and syncytial knotting — creating a standardized digital placental quality scoring system.",
        tags: ["Image Analysis", "Histomorphometry", "AI/ML", "Digital Pathology"]
    },
    {
        id: 8,
        name: "David Kipruto",
        title: "PhD Candidate — Placental Microbiome",
        category: "phd",
        roleLabel: "PhD Scholar",
        focus: "Microbiome Diversity in Placental Tissue",
        email: "d.kipruto@students.mku.ac.ke",
        publications: 1,
        image: "https://picsum.photos/seed/mku-david/600/800.jpg",
        bio: "David's research investigates the controversial placental microbiome using 16S rRNA sequencing, examining whether bacterial colonization patterns correlate with chorioamnionitis and preterm birth.",
        tags: ["Microbiome", "16S Sequencing", "Chorioamnionitis", "Preterm Birth"]
    },
    {
        id: 9,
        name: "Mercy Wambui",
        title: "PhD Candidate — Nutritional Placental Health",
        category: "phd",
        roleLabel: "PhD Scholar",
        focus: "Micronutrient Deficiency & Placental Development",
        email: "m.wambui@students.mku.ac.ke",
        publications: 2,
        image: "https://picsum.photos/seed/mku-mercy/600/800.jpg",
        bio: "Mercy studies how maternal iron, zinc, and folate deficiencies affect placental structural development in rural Kenyan populations, with a focus on actionable nutritional interventions.",
        tags: ["Nutrition", "Micronutrients", "Iron Deficiency", "Intervention Studies"]
    },
    {
        id: 10,
        name: "Brian Musyoka",
        title: "Research Assistant — Tissue Processing",
        category: "assistant",
        roleLabel: "Research Assistant",
        focus: "Placental Tissue Collection & Fixation",
        email: "b.musyoka@mku.ac.ke",
        publications: 1,
        image: "https://picsum.photos/seed/mku-brian/600/800.jpg",
        bio: "Brian manages the placental tissue biobank, overseeing collection, fixation, embedding, and sectioning protocols. He ensures all specimens meet the unit's stringent quality control standards.",
        tags: ["Biobanking", "Histology", "Tissue Processing", "QC"]
    },
    {
        id: 11,
        name: "Linet Atieno",
        title: "Research Assistant — Data Management",
        category: "assistant",
        roleLabel: "Research Assistant",
        focus: "Clinical Data Curation & Database Management",
        email: "l.atieno@mku.ac.ke",
        publications: 0,
        image: "https://picsum.photos/seed/mku-linet/600/800.jpg",
        bio: "Linet designs and maintains the unit's REDCap databases, ensuring data integrity across multi-site studies. She performs preliminary statistical analyses and generates reports for quarterly review meetings.",
        tags: ["REDCap", "Data Management", "Statistics", "Reporting"]
    },
    {
        id: 12,
        name: "Victor Kimutai",
        title: "Research Assistant — Laboratory Operations",
        category: "assistant",
        roleLabel: "Research Assistant",
        focus: "Molecular Lab Coordination & Reagent Management",
        email: "v.kimutai@mku.ac.ke",
        publications: 0,
        image: "https://picsum.photos/seed/mku-victor/600/800.jpg",
        bio: "Victor coordinates day-to-day molecular laboratory operations, including reagent procurement, equipment calibration, ELISA assays, and RNA extraction workflows for the biomarker studies.",
        tags: ["ELISA", "RNA Extraction", "Lab Operations", "Equipment"]
    }
];

// ---------- DOM References ----------
const galleryGrid = document.getElementById('galleryGrid');
const filterTabs = document.getElementById('filterTabs');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

// ---------- State ----------
let currentFilter = 'all';
let currentSearch = '';

// ---------- Render Cards ----------
function renderCards() {
    const filtered = members.filter(member => {
        const matchFilter = currentFilter === 'all' || member.category === currentFilter;
        const matchSearch = currentSearch === '' ||
            member.name.toLowerCase().includes(currentSearch) ||
            member.focus.toLowerCase().includes(currentSearch) ||
            member.title.toLowerCase().includes(currentSearch) ||
            member.tags.some(tag => tag.toLowerCase().includes(currentSearch));
        return matchFilter && matchSearch;
    });

    galleryGrid.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    filtered.forEach((member, index) => {
        const roleClass = {
            lead: 'card__role-tag--lead',
            postdoc: 'card__role-tag--postdoc',
            phd: 'card__role-tag--phd',
            assistant: 'card__role-tag--assistant'
        }[member.category];

        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.07}s`;
        card.setAttribute('data-id', member.id);

        card.innerHTML = `
            <div class="card__image-wrap">
                <img class="card__image" src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="card__image-gradient"></div>
                <span class="card__role-tag ${roleClass}">${member.roleLabel}</span>
                <div class="card__view-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </div>
            </div>
            <div class="card__body">
                <h3 class="card__name">${member.name}</h3>
                <p class="card__title">${member.title}</p>
                <span class="card__focus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    ${member.focus}
                </span>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(member));
        galleryGrid.appendChild(card);
    });
}

// ---------- Lightbox ----------
function getRoleBadgeStyle(category) {
    const styles = {
        lead: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: #1a1a1a;',
        postdoc: 'background: linear-gradient(135deg, #10b981, #06b6d4); color: #fff;',
        phd: 'background: rgba(139, 92, 246, 0.85); color: #fff;',
        assistant: 'background: rgba(244, 63, 94, 0.8); color: #fff;'
    };
    return styles[category] || '';
}

function openLightbox(member) {
    document.getElementById('lightboxImage').src = member.image;
    document.getElementById('lightboxImage').alt = member.name;
    document.getElementById('lightboxRole').textContent = member.roleLabel;
    document.getElementById('lightboxRole').style.cssText = getRoleBadgeStyle(member.category);
    document.getElementById('lightboxName').textContent = member.name;
    document.getElementById('lightboxTitle').textContent = member.title;
    document.getElementById('lightboxFocus').textContent = member.focus;
    document.getElementById('lightboxEmail').textContent = member.email;
    document.getElementById('lightboxPubs').textContent = member.publications > 0 ? `${member.publications} peer-reviewed papers` : 'In progress';
    document.getElementById('lightboxBio').textContent = member.bio;

    const tagsContainer = document.getElementById('lightboxTags');
    tagsContainer.innerHTML = member.tags.map(tag => `<span class="lightbox__tag">${tag}</span>`).join('');

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Re-initialize lucide icons inside lightbox
    if (window.lucide) lucide.createIcons();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
    }
});

// ---------- Filter Tabs ----------
filterTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('filter-tab--active'));
    tab.classList.add('filter-tab--active');

    currentFilter = tab.dataset.filter;
    renderCards();
});

// ---------- Search ----------
let searchDebounce;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        currentSearch = e.target.value.trim().toLowerCase();
        renderCards();
    }, 250);
});

// ---------- Mobile Menu ----------
mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const icon = mobileToggle.querySelector('[data-lucide]');
    const isOpen = mobileNav.classList.contains('open');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    if (window.lucide) lucide.createIcons();
});

// ---------- Stat Counter Animation ----------
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    });
}

// ---------- Intersection Observer for Counters ----------
const heroStats = document.querySelector('.hero__stats');
let counterAnimated = false;

if (heroStats) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
}

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    if (window.lucide) lucide.createIcons();
});