/**
 * ============================================================
 * SRICHAKRA VOCATIONAL JUNIOR COLLEGE — script.js
 * Vanilla JavaScript replacing React + Framer Motion + Lucide
 * ============================================================
 */

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 1, title: "Computer Science & Engineering", short: "CSE", category: "Technology",
    desc: "Programming, networking, databases and software development with hands-on lab practice.",
    duration: "2 Years", seats: 60, level: "Intermediate", tag: "High Demand",
    icon: "cpu", color: "#1a4231",
    img: "photo-1643199121319-b3b5695e4acb",
  },
  {
    id: 2, title: "Medical Lab Technician", short: "MLT", category: "Health Sciences",
    desc: "Clinical diagnostics, pathology, haematology and microbiology lab procedures.",
    duration: "2 Years", seats: 40, level: "Advanced", tag: "Bestseller",
    icon: "microscope", color: "#6b3fa0",
    img: "photo-1578496480240-32d3e0c04525",
  },
  {
    id: 3, title: "Multi-Purpose Health Worker", short: "MPHW", category: "Health Sciences",
    desc: "Community health services, primary care, maternal & child health for female practitioners.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "",
    icon: "stethoscope", color: "#b8340a",
    img: "photo-1631815590058-860e4f83c1e8",
  },
  {
    id: 4, title: "Crop Production & Management", short: "CPM", category: "Agriculture",
    desc: "Modern cultivation techniques, soil science, crop protection and agri-business management.",
    duration: "2 Years", seats: 50, level: "Beginner", tag: "",
    icon: "wheat", color: "#2d6a4f",
    img: "photo-1530507629858-e4977d30e9e0",
  },
  {
    id: 5, title: "Fisheries", short: "FSH", category: "Agriculture",
    desc: "Aquaculture, inland & marine fisheries, fish processing and coastal resource management.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "New",
    icon: "fish", color: "#1b6b8a",
    img: "photo-1541441056316-443fff347c40",
  },
  {
    id: 6, title: "Livestock Management & Dairying", short: "LMD", category: "Agriculture",
    desc: "Animal husbandry, dairy technology, veterinary first-aid and farm business operations.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "",
    icon: "shield", color: "#7a5c2e",
    img: "photo-1570042225831-d98fa7577f1e",
  },
  {
    id: 7, title: "Fashion & Garment Making", short: "FGM", category: "Design",
    desc: "Pattern drafting, stitching, embroidery, garment construction and fashion entrepreneurship.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "Popular",
    icon: "scissors", color: "#9b3a7a",
    img: "photo-1673201229733-69d19c5c4a87",
  },
];

const FEATURES = [
  { icon: "zap",          title: "Hands-on Practical Training",     color: "#c49a2e", desc: "Every programme is structured around industry-standard lab and field work, not just theory. Students are job-ready from day one." },
  { icon: "graduation-cap", title: "Industry Expert Faculty",       color: "#1a4231", desc: "Our lecturers are practising professionals — doctors, engineers, agronomists and designers who bring real-world experience into the classroom." },
  { icon: "layers",       title: "Modern Laboratories",             color: "#2d6a4f", desc: "State-of-the-art computer labs, medical diagnostic labs, aquaculture facilities and garment workshops equipped for current industry standards." },
  { icon: "bar-chart-2",  title: "Career Guidance & Placement",     color: "#6b3fa0", desc: "Dedicated placement cell connects graduates with local hospitals, IT firms, agri-businesses and fashion ateliers across Andhra Pradesh." },
  { icon: "award",        title: "Government Recognised",           color: "#b8340a", desc: "All programmes are approved by the Board of Intermediate Education, Andhra Pradesh, with nationally recognised vocational certificates." },
  { icon: "globe",        title: "Admissions Open 2026",            color: "#1b6b8a", desc: "Applications are now being accepted for the 2026 academic year across all seven vocational programmes. Limited seats — apply early." },
];

const TESTIMONIALS = [
  { quote: "The MLT programme at Srichakra gave me the practical skills that most college graduates lack. Within three months of completing my certificate I had a job at a private diagnostic centre in Rajahmundry.", name: "Lakshmi Devi P.", role: "Lab Technician, Rajahmundry", rating: 5 },
  { quote: "I enrolled in CSE with no prior knowledge of computers. The faculty were patient, the lab was well-equipped, and I now work as a junior developer. This college changed my career path completely.", name: "Ravi Shankar M.", role: "Junior Developer, Kakinada", rating: 5 },
  { quote: "The Fashion & Garment Making course helped me start my own tailoring business in Amalapuram. The entrepreneurship guidance was as valuable as the stitching itself.", name: "Sunitha K.", role: "Entrepreneur, Amalapuram", rating: 5 },
];

const PREFS = [
  { label: "Admission alerts",             description: "Notify when new academic year applications open",           defaultOn: true,  accent: "#1a4231" },
  { label: "New programme announcements",  description: "When Srichakra launches a new vocational course",           defaultOn: true,  accent: "#c49a2e" },
  { label: "Scholarship updates",          description: "Government and private scholarship notifications",           defaultOn: true,  accent: "#2d6a4f" },
  { label: "Event & workshop invites",     description: "Seminars, career fairs and open days",                      defaultOn: false, accent: "#6b3fa0" },
  { label: "Placement drive notices",      description: "When campus recruitment drives are scheduled",              defaultOn: false, accent: "#1a4231" },
];

/* Level colour map */
const LEVEL_COLORS = { Beginner: "#2d6a4f", Intermediate: "#1a4231", Advanced: "#6b3fa0" };

/* ──────────────────────────────────────────────────────────────
   WEB AUDIO SNAP SOUND
   Recreates the iOS-like click heard when a toggle state changes.
   ────────────────────────────────────────────────────────────── */
function playSnapSound(on) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const env = Math.exp(-t * 200) * 0.9 + Math.exp(-t * 60) * 0.3 * Math.sin(2 * Math.PI * (on ? 2200 : 1700) * t);
      data[i] = (Math.random() * 2 - 1) * env;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = on ? 3000 : 2200;
    filter.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    source.onended = () => ctx.close();
  } catch (_) { /* silent if AudioContext unavailable */ }
}

/* ──────────────────────────────────────────────────────────────
   iOS TOGGLE SWITCH
   Physics-accurate spring spring animation via CSS cubic-bezier
   and pointer drag support.
   ────────────────────────────────────────────────────────────── */
const TOGGLE_W  = 51;   // total track width  (px)
const KNOB_W    = 27;   // knob width          (px)
const TRAVEL    = TOGGLE_W - KNOB_W - 4; // = 20

/**
 * Build a single toggle DOM element and return it.
 * @param {Object} pref - { label, description, defaultOn, accent }
 * @returns {HTMLElement} The .pref-row div
 */
function createToggleRow(pref) {
  let on = pref.defaultOn;
  let dragging = false;
  let startX = 0;
  let startOn = false;
  let dragX = null; // null = not actively dragging
  let pressed = false;

  /* ── Build DOM ── */
  const row = document.createElement("div");
  row.className = "pref-row";

  const info = document.createElement("div");
  info.className = "pref-row-info";
  info.innerHTML = `<span class="pref-label">${pref.label}</span><span class="pref-desc">${pref.description}</span>`;

  const track = document.createElement("div");
  track.className = "toggle-track";
  track.setAttribute("role", "switch");
  track.setAttribute("aria-checked", String(on));
  track.setAttribute("tabindex", "0");
  track.setAttribute("aria-label", pref.label);

  const knob = document.createElement("div");
  knob.className = "toggle-knob";
  track.appendChild(knob);

  row.appendChild(info);
  row.appendChild(track);

  /* ── Helpers ── */
  function getKnobX() {
    return dragX !== null ? dragX : (on ? TRAVEL : 0);
  }

  function applyKnobStyles(immediate) {
    const x = getKnobX();
    const useSpring = dragX === null;
    if (immediate || !useSpring) {
      knob.style.transition = "none";
    } else {
      knob.style.transition = "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.15s ease";
    }
    knob.style.transform = `translateX(${x}px)`;
    knob.style.width = pressed && dragX === null ? `${KNOB_W + 4}px` : `${KNOB_W}px`;
    // Track colour
    track.style.backgroundColor = on ? pref.accent : "#d1cec6";
  }

  function commit(next) {
    dragX = null;
    const changed = next !== on;
    on = next;
    track.setAttribute("aria-checked", String(on));
    if (changed) playSnapSound(on);
    applyKnobStyles(false);
  }

  /* Initial state (no animation) */
  applyKnobStyles(true);

  /* ── Pointer events for drag + tap ── */
  track.addEventListener("pointerdown", (e) => {
    dragging = false;
    startX = e.clientX;
    startOn = on;
    dragX = null;
    pressed = true;
    track.setPointerCapture(e.pointerId);
    applyKnobStyles(false);
  });

  track.addEventListener("pointermove", (e) => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragging = true;
    if (!dragging) return;
    dragX = Math.max(0, Math.min(TRAVEL, (startOn ? TRAVEL : 0) + dx));
    applyKnobStyles(false);
  });

  track.addEventListener("pointerup", (e) => {
    pressed = false;
    if (dragging) {
      const dx = e.clientX - startX;
      commit(startOn ? dx > -(TRAVEL * 0.35) : dx > TRAVEL * 0.35);
    } else {
      commit(!on);
    }
    dragging = false;
  });

  /* Keyboard: Space / Enter */
  track.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      commit(!on);
    }
  });

  return row;
}

/* ──────────────────────────────────────────────────────────────
   RENDER HELPERS
   ────────────────────────────────────────────────────────────── */

/** Render all course cards into #coursesGrid, filtered by category */
function renderCourses(activeCategory) {
  const grid = document.getElementById("coursesGrid");
  grid.innerHTML = "";

  const filtered = activeCategory === "All"
    ? COURSES
    : COURSES.filter(c => c.category === activeCategory);

  filtered.forEach(course => {
    const levelColor = LEVEL_COLORS[course.level] || "#1a4231";
    const card = document.createElement("div");
    card.className = "course-card fade-up";
    card.innerHTML = `
      <div class="card-img">
        <img src="https://images.unsplash.com/${course.img}?w=500&h=300&fit=crop&auto=format"
             alt="${course.title}" loading="lazy" />
        <div class="card-img-overlay"></div>
        ${course.tag ? `<div class="card-tag">${course.tag}</div>` : ""}
        <div class="card-short">
          <i data-lucide="${course.icon}"></i>
          <span>${course.short}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-level" style="color:${levelColor};background:${levelColor}18">${course.level}</span>
          <span class="card-category">${course.category}</span>
        </div>
        <h3 class="card-title">${course.title}</h3>
        <p class="card-desc">${course.desc}</p>
        <div class="card-info">
          <span><i data-lucide="clock"></i> ${course.duration}</span>
          <span>·</span>
          <span><i data-lucide="users"></i> ${course.seats} seats</span>
        </div>
        <a href="#admissions" class="btn-card">Apply for this programme</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-initialise lucide icons for new DOM nodes
  lucide.createIcons();

  // Trigger scroll animation for newly added cards
  observeFadeUps();
}

/** Render feature cards */
function renderFeatures() {
  const grid = document.getElementById("featuresGrid");
  FEATURES.forEach((f, i) => {
    const card = document.createElement("div");
    card.className = "feature-card fade-up";
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="feature-icon" style="background:${f.color}28">
        <i data-lucide="${f.icon}" style="color:${f.color}"></i>
      </div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    `;
    grid.appendChild(card);
  });
  lucide.createIcons();
  observeFadeUps();
}

/** Render testimonial cards */
function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  TESTIMONIALS.forEach((t, i) => {
    const initials = t.name.split(" ").map(n => n[0]).join("").slice(0, 2);
    const stars = Array.from({ length: t.rating }, () =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    ).join("");

    const card = document.createElement("div");
    card.className = "testimonial-card fade-up";
    card.style.transitionDelay = `${i * 0.12}s`;
    card.innerHTML = `
      <div class="stars" aria-label="${t.rating} out of 5 stars">${stars}</div>
      <blockquote class="testimonial-quote">"${t.quote}"</blockquote>
      <div class="testimonial-author">
        <div class="author-avatar">${initials}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/** Render preference toggle rows */
function renderPrefs() {
  const container = document.getElementById("prefsRows");
  PREFS.forEach(pref => {
    const row = createToggleRow(pref);
    container.appendChild(row);
  });
}

/* ──────────────────────────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
   ────────────────────────────────────────────────────────────── */
let fadeObserver;

function observeFadeUps() {
  // Disconnect old observer to avoid double-watching
  if (fadeObserver) fadeObserver.disconnect();

  fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-up:not(.visible):not(.instant-visible)").forEach(el => {
    fadeObserver.observe(el);
  });
}

/* ──────────────────────────────────────────────────────────────
   MOBILE NAVIGATION
   ────────────────────────────────────────────────────────────── */
function initMobileNav() {
  const btn        = document.getElementById("menuToggleBtn");
  const menu       = document.getElementById("mobileMenu");
  const iconOpen   = document.getElementById("menuIconOpen");
  const iconClose  = document.getElementById("menuIconClose");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMenu() {
    menu.style.display = "block";
    requestAnimationFrame(() => menu.classList.add("open"));
    iconOpen.style.display  = "none";
    iconClose.style.display = "block";
    btn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("open");
    iconOpen.style.display  = "block";
    iconClose.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
    // Hide after transition
    setTimeout(() => { menu.style.display = "none"; }, 300);
  }

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when any mobile link is clicked
  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

  // Initial state
  menu.style.display = "none";
}

/* ──────────────────────────────────────────────────────────────
   PROGRAMME CATEGORY TABS
   ────────────────────────────────────────────────────────────── */
function initCategoryTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active state
      document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Re-render courses
      renderCourses(btn.dataset.category);
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   BOOTSTRAP — run everything on DOMContentLoaded
   ────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialise Lucide icons (base icons already in HTML)
  lucide.createIcons();

  // 2. Render dynamic sections
  renderCourses("All");
  renderFeatures();
  renderTestimonials();
  renderPrefs();

  // 3. Hooks
  initMobileNav();
  initCategoryTabs();

  // 4. Scroll observer (initial pass)
  observeFadeUps();

  // 5. Immediately reveal above-the-fold .instant-visible elements
  //    (they use CSS @keyframes, no observer needed)

  // 6. Smooth close mobile menu on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      const menu = document.getElementById("mobileMenu");
      menu.classList.remove("open");
      menu.style.display = "none";
      document.getElementById("menuIconOpen").style.display  = "block";
      document.getElementById("menuIconClose").style.display = "none";
      document.getElementById("menuToggleBtn").setAttribute("aria-expanded", "false");
    }
  });
});
