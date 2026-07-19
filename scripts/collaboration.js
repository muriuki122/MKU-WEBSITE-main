// ==============================================
// script.js — MKU Placenta Hub Global Collaboration
// Three.js + data + interactions
// ==============================================

import * as THREE from 'three';

/* ==============================================
   DATA — Placenta Research Collaborators
   ============================================== */
const collaboratorData = {
  "USA": {
    color: "#00CEC9", members: [
      { name: "Dr. Sarah Mitchell", role: "Placental Pathologist", city: "Boston, Massachusetts", contribution: "Pioneering histopathological classification of placental disorders and developing diagnostic criteria for placental insufficiency syndromes.", website: "https://www.harvard.edu" },
      { name: "Prof. James Thornton", role: "Maternal-Fetal Medicine Specialist", city: "Baltimore, Maryland", contribution: "Leading multi-center clinical trials on placental insufficiency interventions and novel ultrasound assessment protocols.", website: "https://www.jhu.edu" },
      { name: "Dr. Emily Chen", role: "Placental Stem Cell Biologist", city: "Stanford, California", contribution: "Isolation and characterization of placental mesenchymal stem cells for potential regenerative medicine applications.", website: "https://www.stanford.edu" }
    ]
  },
  "UK": {
    color: "#A29BFE", members: [
      { name: "Dr. Oliver Bennett", role: "Reproductive Immunologist", city: "London", contribution: "Decidual immune cell profiling in normal and pathological pregnancies, focusing on NK cell interactions at the maternal-fetal interface.", website: "https://www.ucl.ac.uk" },
      { name: "Prof. Hannah Clarke", role: "Placental Physiologist", city: "Cambridge", contribution: "Nutrient transport mechanisms across the syncytiotrophoblast and their dysregulation in fetal growth restriction.", website: "https://www.cam.ac.uk" },
      { name: "Dr. Michael Okafor", role: "Perinatal Epidemiologist", city: "Oxford", contribution: "Global burden of placenta-mediated pregnancy complications across diverse populations and healthcare settings.", website: "https://www.ox.ac.uk" }
    ]
  },
  "Nigeria": {
    color: "#FF7675", members: [
      { name: "Dr. Amina Yusuf", role: "Obstetrician & Researcher", city: "Lagos", contribution: "Maternal health outcomes and placental malaria pathology in West African populations, with focus on primigravidae.", website: "https://unilag.edu.ng" },
      { name: "Prof. Chinedu Okafor", role: "Molecular Biologist", city: "Abuja", contribution: "Genetic variants affecting placental development in African populations and their association with preeclampsia.", website: "https://www.uniabuja.edu.ng" },
      { name: "Dr. Fatima Ali", role: "Histopathologist", city: "Kano", contribution: "Placental histopathology patterns in Nigerian pregnancies and correlation with maternal nutritional status.", website: "https://www.buk.edu.ng" }
    ]
  },
  "France": {
    color: "#A29BFE", members: [
      { name: "Prof. Marie Dubois", role: "Developmental Biologist", city: "Paris", contribution: "Trophoblast differentiation and placental morphogenesis during first trimester development." },
      { name: "Dr. Laurent Martin", role: "Bioengineer", city: "Lyon", contribution: "Placenta-on-a-chip microfluidic models for studying drug transport and pathogen interactions." }
    ]
  },
  "Germany": {
    color: "#A29BFE", members: [
      { name: "Prof. Hans Weber", role: "Placental Pharmacologist", city: "Munich", contribution: "Drug transport across the placental barrier and development of safety prediction models for pharmaceutical compounds." },
      { name: "Dr. Anna Schmidt", role: "Placental Geneticist", city: "Berlin", contribution: "Epigenetic regulation of placental gene expression and intergenerational transmission of metabolic programming." }
    ]
  },
  "China": {
    color: "#55EFC4", members: [
      { name: "Prof. Wei Zhang", role: "Reproductive Biologist", city: "Beijing", contribution: "Placental proteomics in gestational diabetes mellitus and identification of novel biomarker panels." },
      { name: "Dr. Li Mei", role: "Neonatologist", city: "Shanghai", contribution: "Placental biomarkers for neonatal outcome prediction in preterm birth scenarios." }
    ]
  },
  "India": {
    color: "#55EFC4", members: [
      { name: "Dr. Priya Sharma", role: "Maternal-Fetal Medicine", city: "New Delhi", contribution: "Placental pathology in preeclampsia among South Asian women and development of region-specific risk scores." },
      { name: "Prof. Rajesh Patel", role: "Stem Cell Researcher", city: "Mumbai", contribution: "Placental-derived exosomes for regenerative medicine and their characterization as therapeutic agents." }
    ]
  },
  "Brazil": {
    color: "#FDCB6E", members: [
      { name: "Prof. Carlos Silva", role: "Perinatal Pathologist", city: "Sao Paulo", contribution: "Placental lesions in Zika virus infection and their impact on fetal neurodevelopment outcomes." },
      { name: "Dr. Ana Oliveira", role: "Perinatal Epidemiologist", city: "Rio de Janeiro", contribution: "Socioeconomic determinants of placental health disparities across Latin American populations." }
    ]
  },
  "Japan": {
    color: "#55EFC4", members: [
      { name: "Prof. Kenji Tanaka", role: "Placental Biologist", city: "Tokyo", contribution: "Molecular mechanisms of placental angiogenesis and vascular remodeling in normal and complicated pregnancies." },
      { name: "Dr. Yuki Sato", role: "Molecular Pathologist", city: "Kyoto", contribution: "Placental transcriptomics in fetal growth restriction using single-cell RNA sequencing approaches." }
    ]
  },
  "South Africa": {
    color: "#FF7675", members: [
      { name: "Dr. Thabo Mokoena", role: "Obstetric Researcher", city: "Johannesburg", contribution: "Placental malaria and HIV co-infection effects on maternal-fetal outcomes in Southern Africa." },
      { name: "Prof. Naledi Dlamini", role: "Reproductive Immunologist", city: "Cape Town", contribution: "Immune tolerance mechanisms at the maternal-fetal interface in the context of high infectious disease burden." }
    ]
  },
  "Australia": {
    color: "#FD79A8", members: [
      { name: "Prof. David Wilson", role: "Developmental Physiologist", city: "Melbourne", contribution: "Placental oxygen sensing and fetal adaptation mechanisms in hypoxic conditions." },
      { name: "Dr. Sarah Thompson", role: "Tissue Engineer", city: "Sydney", contribution: "3D bioprinting of placental tissue constructs for drug testing and disease modeling." }
    ]
  },
  "Canada": {
    color: "#00CEC9", members: [
      { name: "Dr. Marie-Claire Tremblay", role: "Placental Endocrinologist", city: "Toronto, Ontario", contribution: "Hormonal regulation of placental development and endocrine disruption effects on placental function." },
      { name: "Prof. Robert Kim", role: "Bioinformatician", city: "Vancouver, British Columbia", contribution: "Single-cell RNA sequencing analysis of placental cell populations in health and disease." }
    ]
  },
  "South Korea": {
    color: "#55EFC4", members: [
      { name: "Dr. Jisoo Park", role: "Reproductive Biologist", city: "Seoul", contribution: "Placental extracellular vesicles as non-invasive biomarkers for pregnancy complications." }
    ]
  },
  "Kenya": {
    color: "#FF7675", members: [
      { name: "Dr. Grace Wanjiku", role: "Maternal Health Researcher", city: "Nairobi", contribution: "Placental pathology in high-altitude pregnancies and adaptation mechanisms in East African populations.", website: "https://crid.mku.ac.ke" }
    ]
  },
  "Italy": {
    color: "#A29BFE", members: [
      { name: "Prof. Giulia Rossi", role: "Placental Morphologist", city: "Rome", contribution: "3D reconstruction of placental villous architecture using advanced imaging and morphometric analysis." }
    ]
  },
  "Netherlands": {
    color: "#A29BFE", members: [
      { name: "Dr. Lars de Vries", role: "Perinatal Epidemiologist", city: "Amsterdam", contribution: "Population-based cohort studies on placental pathology and long-term child health outcomes." }
    ]
  },
  "Sweden": {
    color: "#A29BFE", members: [
      { name: "Prof. Erik Lindgren", role: "Placental Physiologist", city: "Stockholm", contribution: "Fetal programming and placental function in relation to cardiovascular disease risk in later life." }
    ]
  },
  "Saudi Arabia": {
    color: "#55EFC4", members: [
      { name: "Dr. Fatima Al-Rashid", role: "Reproductive Geneticist", city: "Riyadh", contribution: "Consanguinity effects on placental development and genetic disorders in placental tissue." }
    ]
  },
  "Egypt": {
    color: "#FF7675", members: [
      { name: "Dr. Ahmed Hassan", role: "Placental Pathologist", city: "Cairo", contribution: "Placental histopathological changes in maternal thyroid disorders and iodine deficiency." }
    ]
  },
  "Mexico": {
    color: "#00CEC9", members: [
      { name: "Dr. Sofia Rodriguez", role: "Maternal-Fetal Specialist", city: "Mexico City", contribution: "Placental adaptations in maternal obesity and metabolic syndrome across Mexican populations." }
    ]
  },
  "Thailand": {
    color: "#55EFC4", members: [
      { name: "Dr. Somchai Poonperm", role: "Placental Researcher", city: "Bangkok", contribution: "Placental biomarkers for preterm birth prediction in Southeast Asian cohorts." }
    ]
  },
  "Malaysia": {
    color: "#55EFC4", members: [
      { name: "Dr. Aisha Binti Rahman", role: "Reproductive Immunologist", city: "Kuala Lumpur", contribution: "Immune profiling of placental macrophages in malaria-endemic regions of Southeast Asia." }
    ]
  },
  "Singapore": {
    color: "#55EFC4", members: [
      { name: "Dr. Wei Lin Tan", role: "Stem Cell Scientist", city: "Singapore", contribution: "Placental stem cell banking protocols and therapeutic applications in tissue repair." }
    ]
  },
  "Argentina": {
    color: "#FDCB6E", members: [
      { name: "Prof. Maria Gonzalez", role: "Reproductive Immunologist", city: "Buenos Aires", contribution: "Maternal immune adaptation mechanisms in placental development and autoimmune pregnancy complications." }
    ]
  },
  "Colombia": {
    color: "#FDCB6E", members: [
      { name: "Dr. Juan Pablo Ramirez", role: "Placental Physiologist", city: "Bogota", contribution: "High-altitude placental adaptation and its effects on fetal growth in Andean populations." }
    ]
  }
};

/* City coordinates [lat, lng] for marker placement */
const cityCoords = {
  "Boston, Massachusetts": [42.36, -71.06], "Baltimore, Maryland": [39.30, -76.61],
  "Stanford, California": [37.43, -122.17], "London": [51.51, -0.13],
  "Cambridge": [52.20, 0.12], "Oxford": [51.75, -1.26],
  "Lagos": [6.52, 3.38], "Abuja": [9.06, 7.49], "Kano": [12.00, 8.59],
  "Paris": [48.86, 2.35], "Lyon": [45.76, 4.84],
  "Munich": [48.14, 11.58], "Berlin": [52.52, 13.41],
  "Beijing": [39.90, 116.40], "Shanghai": [31.23, 121.47],
  "New Delhi": [28.61, 77.21], "Mumbai": [19.08, 72.88],
  "Sao Paulo": [-23.55, -46.63], "Rio de Janeiro": [-22.91, -43.17],
  "Tokyo": [35.68, 139.69], "Kyoto": [35.01, 135.77],
  "Johannesburg": [-26.20, 28.05], "Cape Town": [-33.93, 18.42],
  "Melbourne": [-37.81, 144.96], "Sydney": [-33.87, 151.21],
  "Toronto, Ontario": [43.65, -79.38], "Vancouver, British Columbia": [49.28, -123.12],
  "Seoul": [37.57, 126.98], "Nairobi": [-1.29, 36.82],
  "Rome": [41.90, 12.50], "Amsterdam": [52.37, 4.90],
  "Stockholm": [59.33, 18.07], "Riyadh": [24.71, 46.68],
  "Cairo": [30.04, 31.24], "Mexico City": [19.43, -99.13],
  "Bangkok": [13.76, 100.50], "Kuala Lumpur": [3.14, 101.69],
  "Singapore": [1.35, 103.82], "Buenos Aires": [-34.60, -58.38],
  "Bogota": [4.71, -74.07]
};

/* Country center coordinates (fallback) */
const countryCenters = {
  "USA": [39.8, -98.5], "UK": [54.0, -2.0], "Nigeria": [9.1, 8.7],
  "France": [46.2, 2.2], "Germany": [51.2, 10.4], "China": [35.9, 104.2],
  "India": [20.6, 78.9], "Brazil": [-14.2, -51.9], "Japan": [36.2, 138.3],
  "South Africa": [-30.6, 22.9], "Australia": [-25.3, 133.8],
  "Canada": [56.1, -106.3], "South Korea": [35.9, 127.8],
  "Kenya": [-0.02, 37.9], "Italy": [41.9, 12.6],
  "Netherlands": [52.1, 5.3], "Sweden": [60.1, 18.6],
  "Saudi Arabia": [23.9, 45.1], "Egypt": [26.8, 30.8],
  "Mexico": [23.6, -102.6], "Thailand": [15.9, 100.9],
  "Malaysia": [4.2, 101.9], "Singapore": [1.35, 103.8],
  "Argentina": [-38.4, -63.6], "Colombia": [4.6, -74.3]
};

/* ==============================================
   THREE.JS SETUP
   ============================================== */
const GLOBE_RADIUS = 1.2;
const container = document.getElementById('globeWrap');
let scene, camera, renderer;
let globeGroup, globeMesh, atmosphereMesh;
let markerGroups = [];
let activeCountry = null;
let activeCollabIndex = -1;
let autoRotate = true;
let autoRotateTimeout = null;

function setAutoRotate(value) {
  autoRotate = value;
  const toggle = document.getElementById('rotateToggle');
  if (toggle) toggle.checked = value;
}
let targetRotY = null;
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let rotVel = { x: 0, y: 0 };
let cameraZ = 3.4;
let touchStartPos = null;
let touchMoved = false;
let hoveredMarker = null;

const raycaster = new THREE.Raycaster();
const mouseVec = new THREE.Vector2();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, cameraZ);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x060A12, 1);
  container.appendChild(renderer.domElement);

  globeGroup = new THREE.Group();
  scene.add(globeGroup);

  createGlobe();
  createAtmosphere();
  createStars();
  createAllMarkers();

  // Events  renderer.domElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
  renderer.domElement.addEventListener('click', onGlobeClick);

  renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
  renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: true });
  renderer.domElement.addEventListener('touchend', onTouchEnd);

  window.addEventListener('resize', onResize);

  animate();
  animateStats();
}

/* ---- Globe ---- */
function createGlobe() {
  const fallbackTex = createFallbackTexture();
  const geo = new THREE.SphereGeometry(GLOBE_RADIUS, 80, 80);
  const mat = new THREE.MeshPhongMaterial({
    map: fallbackTex,
    specular: new THREE.Color(0x111822),
    shininess: 15
  });
  globeMesh = new THREE.Mesh(geo, mat);
  globeGroup.add(globeMesh);

  const loader = new THREE.TextureLoader();
  loader.load(
    'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-night.jpg',
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      globeMesh.material.map = tex;
      globeMesh.material.needsUpdate = true;
    },
    undefined,
    () => {}
  );

  const ambient = new THREE.AmbientLight(0x334466, 1.2);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 3, 5);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0x00E5CC, 0.15);
  dirLight2.position.set(-5, -2, -5);
  scene.add(dirLight2);
}

function createFallbackTexture() {
  const c = document.createElement('canvas');
  c.width = 2048; c.height = 1024;
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, '#0a1628');
  grad.addColorStop(0.5, '#0c1a30');
  grad.addColorStop(1, '#0a1628');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  ctx.strokeStyle = 'rgba(0, 229, 204, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 36; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 2048 / 36, 0);
    ctx.lineTo(i * 2048 / 36, 1024);
    ctx.stroke();
  }
  for (let i = 0; i <= 18; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 1024 / 18);
    ctx.lineTo(2048, i * 1024 / 18);
    ctx.stroke();
  }

  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 1024;
    ctx.fillStyle = `rgba(0, 229, 204, ${Math.random() * 0.03})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return new THREE.CanvasTexture(c);
}

/* ---- Atmosphere ---- */
function createAtmosphere() {
  const geo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.18, 64, 64);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(0.0, 0.9, 0.8, 1.0) * intensity * 0.9;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  });
  atmosphereMesh = new THREE.Mesh(geo, mat);
  globeGroup.add(atmosphereMesh);
}

/* ---- Stars ---- */
function createStars() {
  const count = 4000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 30 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xCCDDFF,
    size: 0.08,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7
  });
  scene.add(new THREE.Points(geo, mat));
}

/* ---- Markers ---- */
const glowTextures = {};

function getGlowTexture(r, g, b) {
  const key = `${r}_${g}_${b}`;
  if (glowTextures[key]) return glowTextures[key];

  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.15, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  glowTextures[key] = tex;
  return tex;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createAllMarkers() {
  for (const [country, data] of Object.entries(collaboratorData)) {
    data.members.forEach((member, idx) => {
      const coords = cityCoords[member.city] || countryCenters[country] || [0, 0];
      const pos = latLngToVec3(coords[0], coords[1], GLOBE_RADIUS + 0.015);
      const [r, g, b] = hexToRgb(data.color);

      const group = new THREE.Group();
      group.position.copy(pos);
      group.userData = { country, index: idx, data: member, color: data.color };

      const dotGeo = new THREE.SphereGeometry(0.012, 10, 10);
      const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(data.color), transparent: true, opacity: 0.25 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      group.add(dot);

      const spriteMat = new THREE.SpriteMaterial({
        map: getGlowTexture(r, g, b),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.15
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.08, 0.08, 1);
      group.add(sprite);

      const hitGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitbox = new THREE.Mesh(hitGeo, hitMat);
      group.add(hitbox);

      group.visible = false;
      globeGroup.add(group);

      markerGroups.push({ group, dot, sprite, hitbox, country, index: idx, data: member, color: data.color });
    });
  }
}

function showCountryMarkers(country) {
  markerGroups.forEach(m => {
    if (m.country === country) {
      m.group.visible = true;
      m.dot.material.opacity = 1;
      m.sprite.material.opacity = 0.9;
      m.sprite.scale.set(0.2, 0.2, 1);
      m.group.scale.set(0.01, 0.01, 0.01);
      animateScale(m.group, 1.0, 500);
    } else {
      m.group.visible = false;
    }
  });
}

function hideAllMarkers() {
  markerGroups.forEach(m => { m.group.visible = false; });
}

function animateScale(obj, target, duration) {
  const start = performance.now();
  const initial = obj.scale.x;
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const s = initial + (target - initial) * eased;
    obj.scale.set(s, s, s);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function highlightMarker(country, index) {
  markerGroups.forEach(m => {
    if (m.country === country && m.index === index) {
      m.dot.material.color.set(0xFF5252);
      m.sprite.material.map = getGlowTexture(255, 82, 82);
      m.sprite.material.needsUpdate = true;
      m.sprite.scale.set(0.3, 0.3, 1);
      m.dot.scale.set(1.5, 1.5, 1.5);
    } else if (m.country === country) {
      const [r, g, b] = hexToRgb(m.color);
      m.dot.material.color.set(m.color);
      m.sprite.material.map = getGlowTexture(r, g, b);
      m.sprite.material.needsUpdate = true;
      m.sprite.scale.set(0.2, 0.2, 1);
      m.dot.scale.set(1, 1, 1);
    }
  });
}

function resetMarkerColors(country) {
  markerGroups.forEach(m => {
    if (m.country === country) {
      const [r, g, b] = hexToRgb(m.color);
      m.dot.material.color.set(m.color);
      m.sprite.material.map = getGlowTexture(r, g, b);
      m.sprite.material.needsUpdate = true;
      m.sprite.scale.set(0.2, 0.2, 1);
      m.dot.scale.set(1, 1, 1);
    }
  });
}

/* ---- Globe rotation ---- */
function rotateToCountry(country) {
  const coords = countryCenters[country];
  if (!coords) return;
  setAutoRotate(false);
  clearTimeout(autoRotateTimeout);

  let target = -coords[1] * (Math.PI / 180);
  let current = globeGroup.rotation.y;
  let diff = target - current;
  diff = diff % (2 * Math.PI);
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  targetRotY = current + diff;
}

/* ---- Mouse interaction ---- */
function onMouseDown(e) {
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
  targetRotY = null;
}

function onMouseMove(e) {
  updateHover(e.clientX, e.clientY);
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  rotVel.y = dx * 0.004;
  rotVel.x = dy * 0.004;
  globeGroup.rotation.y += rotVel.y;
  globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + rotVel.x));
  prevMouse = { x: e.clientX, y: e.clientY };
  setAutoRotate(false);
  clearTimeout(autoRotateTimeout);
}

function onMouseUp() {
  isDragging = false;
  autoRotateTimeout = setTimeout(() => { setAutoRotate(true); }, 4000);
}

function onWheel(e) {
  e.preventDefault();
  cameraZ += e.deltaY * 0.003;
  cameraZ = Math.max(2, Math.min(6, cameraZ));
}

function onGlobeClick(e) {
  mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouseVec, camera);

  const hitboxes = markerGroups.filter(m => m.group.visible).map(m => m.hitbox);
  const intersects = raycaster.intersectObjects(hitboxes);

  if (intersects.length > 0) {
    const { country, index } = intersects[0].object.parent.userData;
    selectCollaborator(country, index);
  }
}

function updateHover(cx, cy) {
  mouseVec.x = (cx / window.innerWidth) * 2 - 1;
  mouseVec.y = -(cy / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouseVec, camera);

  const hitboxes = markerGroups.filter(m => m.group.visible).map(m => m.hitbox);
  const intersects = raycaster.intersectObjects(hitboxes);

  if (hoveredMarker && activeCountry) {
    const prevCard = document.querySelector(`.ccard[data-idx="${hoveredMarker.index}"]`);
    if (prevCard) prevCard.classList.remove('globe-hover');
  }

  if (intersects.length > 0) {
    const { country, index } = intersects[0].object.parent.userData;
    hoveredMarker = { country, index };
    renderer.domElement.style.cursor = 'pointer';
    if (activeCountry === country) {
      const card = document.querySelector(`.ccard[data-idx="${index}"]`);
      if (card) card.classList.add('globe-hover');
    }
  } else {
    hoveredMarker = null;
    renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
  }
}

/* ---- Touch ---- */
function onTouchStart(e) {
  if (e.touches.length === 1) {
    const t = e.touches[0];
    touchStartPos = { x: t.clientX, y: t.clientY };
    touchMoved = false;
    isDragging = true;
    prevMouse = { x: t.clientX, y: t.clientY };
    targetRotY = null;
  }
}

function onTouchMove(e) {
  if (e.touches.length !== 1 || !isDragging) return;
  const t = e.touches[0];
  if (touchStartPos) {
    const dx = t.clientX - touchStartPos.x;
    const dy = t.clientY - touchStartPos.y;
    if (Math.sqrt(dx * dx + dy * dy) > 10) touchMoved = true;
  }
  const dx = t.clientX - prevMouse.x;
  const dy = t.clientY - prevMouse.y;
  globeGroup.rotation.y += dx * 0.005;
  globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + dy * 0.005));
  prevMouse = { x: t.clientX, y: t.clientY };
  setAutoRotate(false);
  clearTimeout(autoRotateTimeout);
}

function onTouchEnd(e) {
  isDragging = false;
  if (!touchMoved && touchStartPos) {
    mouseVec.x = (touchStartPos.x / window.innerWidth) * 2 - 1;
    mouseVec.y = -(touchStartPos.y / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVec, camera);
    const hitboxes = markerGroups.filter(m => m.group.visible).map(m => m.hitbox);
    const intersects = raycaster.intersectObjects(hitboxes);
    if (intersects.length > 0) {
      const { country, index } = intersects[0].object.parent.userData;
      selectCollaborator(country, index);
    }
  }
  touchStartPos = null;
  autoRotateTimeout = setTimeout(() => { setAutoRotate(true); }, 4000);
}

/* ---- Resize ---- */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ---- Animation loop ---- */
function animate() {
  requestAnimationFrame(animate);

  if (autoRotate && !isDragging && targetRotY === null) {
    globeGroup.rotation.y += 0.0015;
  }

  if (targetRotY !== null) {
    const diff = targetRotY - globeGroup.rotation.y;
    if (Math.abs(diff) < 0.003) {
      globeGroup.rotation.y = targetRotY;
      targetRotY = null;
      autoRotateTimeout = setTimeout(() => { setAutoRotate(true); }, 5000);
    } else {
      globeGroup.rotation.y += diff * 0.045;
    }
  }

  if (!isDragging) {
    rotVel.x *= 0.94;
    rotVel.y *= 0.94;
    if (Math.abs(rotVel.x) > 0.0001 || Math.abs(rotVel.y) > 0.0001) {
      globeGroup.rotation.y += rotVel.y;
      globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + rotVel.x));
    }
  }

  camera.position.z += (cameraZ - camera.position.z) * 0.08;

  const time = performance.now() * 0.003;
  markerGroups.forEach(m => {
    if (m.group.visible && m.country === activeCountry) {
      const pulse = 0.2 + Math.sin(time + m.index * 1.5) * 0.04;
      if (m.index !== activeCollabIndex) {
        m.sprite.scale.set(pulse, pulse, 1);
      }
    }
  });

  renderer.render(scene, camera);
}

/* ==============================================
   SEARCH FUNCTIONALITY
   ============================================== */
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const clearBtn = document.getElementById('clearSearch');
let highlightIdx = -1;
let filteredList = [];

const allCountries = Object.keys(collaboratorData).sort();

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  clearBtn.style.display = q ? 'block' : 'none';
  highlightIdx = -1;
  if (!q) { searchResults.style.display = 'none'; return; }
  filteredList = allCountries.filter(c => c.toLowerCase().includes(q));
  renderSearchResults();
});

searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim()) {
    filteredList = allCountries.filter(c => c.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
    renderSearchResults();
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    highlightIdx = Math.min(highlightIdx + 1, filteredList.length - 1);
    renderSearchResults();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    highlightIdx = Math.max(highlightIdx - 1, 0);
    renderSearchResults();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (highlightIdx >= 0 && filteredList[highlightIdx]) {
      selectCountry(filteredList[highlightIdx]);
    } else if (filteredList.length === 1) {
      selectCountry(filteredList[0]);
    }
  } else if (e.key === 'Escape') {
    searchResults.style.display = 'none';
    searchInput.blur();
    closePanel();
  }
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  searchResults.style.display = 'none';
  searchInput.focus();
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#searchWrap')) {
    searchResults.style.display = 'none';
  }
});

function renderSearchResults() {
  if (filteredList.length === 0) {
    searchResults.innerHTML = '<div class="sr-empty">No matching countries found</div>';
    searchResults.style.display = 'block';
    return;
  }

  searchResults.innerHTML = filteredList.map((c, i) => {
    const data = collaboratorData[c];
    return `
      <div class="sr-item ${i === highlightIdx ? 'highlighted' : ''}" role="option" data-country="${c}">
        <span class="sr-dot" style="background:${data.color}"></span>
        <span class="sr-name">${c}</span>
        <span class="sr-count">${data.members.length} collaborator${data.members.length > 1 ? 's' : ''}</span>
      </div>
    `;
  }).join('');

  searchResults.style.display = 'block';

  searchResults.querySelectorAll('.sr-item').forEach(el => {
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      selectCountry(el.dataset.country);
    });
  });
}

/* ==============================================
   COUNTRY & COLLABORATOR SELECTION
   ============================================== */
function selectCountry(country) {
  activeCountry = country;
  activeCollabIndex = -1;
  searchResults.style.display = 'none';
  searchInput.value = country;
  clearBtn.style.display = 'block';
  document.getElementById('hint').classList.add('hidden');
  rotateToCountry(country);
  showCountryMarkers(country);
  showPanel(country);
}

function selectCollaborator(country, index) {
  if (activeCountry !== country) {
    selectCountry(country);
    setTimeout(() => expandCard(index), 200);
    return;
  }
  activeCollabIndex = index;
  highlightMarker(country, index);
  expandCard(index);
}

function expandCard(index) {
  document.querySelectorAll('.ccard').forEach((el, i) => {
    if (i === index) {
      el.classList.add('active');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      el.classList.remove('active');
    }
  });
  highlightMarker(activeCountry, index);
}

/* ==============================================
   SIDE PANEL
   ============================================== */
const sidePanel = document.getElementById('sidePanel');
const panelTitle = document.getElementById('panelTitle');
const panelSubtitle = document.getElementById('panelSubtitle');
const panelBody = document.getElementById('panelBody');

function showPanel(country) {
  const data = collaboratorData[country];
  panelTitle.textContent = country;
  panelSubtitle.innerHTML = `<i class="fas fa-users"></i> ${data.members.length} collaborator${data.members.length > 1 ? 's' : ''} registered`;

  const avatarColors = ['#FF6B6B', '#4ECDC4', '#FFB800', '#A29BFE', '#FD79A8', '#00CEC9', '#55EFC4', '#FF7675'];

  panelBody.innerHTML = data.members.map((m, i) => {
    const initials = m.name.split(' ').filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join('');
    const bg = avatarColors[i % avatarColors.length];
    const websiteUrl = m.website || "https://crid.mku.ac.ke";
    const websiteLabel = m.website ? "University Profile" : "Partner Center";
    return `
      <div class="ccard" data-idx="${i}">
        <div class="ccard-head">
          <div class="ccard-avatar" style="background:${bg}">${initials}</div>
          <div class="ccard-info">
            <div class="ccard-name">${m.name}</div>
            <div class="ccard-role">${m.role}</div>
          </div>
          <i class="fas fa-chevron-down ccard-arrow"></i>
        </div>
        <div class="ccard-detail">
          <div class="ccard-city"><i class="fas fa-map-marker-alt"></i> ${m.city}</div>
          <div class="ccard-contrib-label">Contribution</div>
          <p class="ccard-contrib">${m.contribution}</p>
          <div class="ccard-website">
            <a href="${websiteUrl}" target="_blank" onclick="event.stopPropagation();">
              <i class="fas fa-external-link-alt"></i> ${websiteLabel}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  panelBody.querySelectorAll('.ccard').forEach((el, i) => {
    el.addEventListener('click', () => {
      const wasActive = el.classList.contains('active');
      panelBody.querySelectorAll('.ccard').forEach(c => c.classList.remove('active'));
      if (!wasActive) {
        el.classList.add('active');
        activeCollabIndex = i;
        highlightMarker(activeCountry, i);
      } else {
        activeCollabIndex = -1;
        resetMarkerColors(activeCountry);
      }
    });

    el.addEventListener('mouseenter', () => {
      if (activeCollabIndex === -1) {
        const m = markerGroups.find(mg => mg.country === activeCountry && mg.index === i);
        if (m) {
          m.sprite.scale.set(0.32, 0.32, 1);
          m.dot.scale.set(1.5, 1.5, 1.5);
        }
      }
    });
    el.addEventListener('mouseleave', () => {
      const m = markerGroups.find(mg => mg.country === activeCountry && mg.index === i);
      if (m && m.index !== activeCollabIndex) {
        m.sprite.scale.set(0.2, 0.2, 1);
        m.dot.scale.set(1, 1, 1);
      }
    });
  });

  sidePanel.classList.add('open');
}

function closePanel() {
  sidePanel.classList.remove('open');
  activeCountry = null;
  activeCollabIndex = -1;
  hideAllMarkers();
  searchInput.value = '';
  clearBtn.style.display = 'none';
  document.getElementById('hint').classList.remove('hidden');
}

document.getElementById('closePanel').addEventListener('click', closePanel);

/* ==============================================
   STATS ANIMATION
   ============================================== */
function animateStats() {
  const countryCount = Object.keys(collaboratorData).length;
  const collabCount = Object.values(collaboratorData).reduce((s, c) => s + c.members.length, 0);
  const continentSet = new Set();
  const continentMap = {
    "USA": "NA", "Canada": "NA", "Mexico": "NA",
    "UK": "EU", "France": "EU", "Germany": "EU", "Italy": "EU", "Netherlands": "EU", "Sweden": "EU",
    "Nigeria": "AF", "Kenya": "AF", "South Africa": "AF", "Egypt": "AF",
    "China": "AS", "India": "AS", "Japan": "AS", "South Korea": "AS",
    "Saudi Arabia": "AS", "Thailand": "AS", "Malaysia": "AS", "Singapore": "AS",
    "Brazil": "SA", "Argentina": "SA", "Colombia": "SA",
    "Australia": "OC"
  };
  Object.keys(collaboratorData).forEach(c => continentSet.add(continentMap[c] || "OT"));

  countUp('sCountries', countryCount, 1200);
  countUp('sCollabs', collabCount, 1400);
  countUp('sContinents', continentSet.size, 800);
}

function countUp(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ==============================================
   MOBILE MENU TOGGLE
   ============================================== */
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
    if (window.innerWidth > 768 && mobileMenu.style.display === 'flex') {
      updateMenu(false);
    }
  });
}

/* ==============================================
   GLOBE SETTINGS TOGGLES
   ============================================== */
const rotateToggle = document.getElementById('rotateToggle');
if (rotateToggle) {
  rotateToggle.addEventListener('change', (e) => {
    autoRotate = e.target.checked;
    if (!autoRotate) {
      clearTimeout(autoRotateTimeout);
    }
  });
}

const atmosphereToggle = document.getElementById('atmosphereToggle');
if (atmosphereToggle) {
  atmosphereToggle.addEventListener('change', (e) => {
    if (atmosphereMesh) {
      atmosphereMesh.visible = e.target.checked;
    }
  });
}

/* ==============================================
   INIT
   ============================================== */
init();