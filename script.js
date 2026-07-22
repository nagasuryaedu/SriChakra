/**
 * ============================================================
 * SRICHAKRA — script.js  |  Advanced Vanilla JavaScript
 * Features:
 *   1. Custom magnetic cursor
 *   2. Scroll progress bar
 *   3. Parallax hero background
 *   4. Animated number counters
 *   5. 3D card tilt (mouse tracking)
 *   6. Ripple effect on buttons/links
 *   7. iOS toggle switch with spring physics + Web Audio snap
 *   8. Toast notification system
 *   9. Mobile nav + scroll-activated nav shadow
 *  10. Category filter tabs
 *  11. IntersectionObserver scroll reveal
 *  12. Typing effect on hero heading
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
    icon: "cpu", color: "#1a4231", img: "photo-1643199121319-b3b5695e4acb"
  },
  {
    id: 2, title: "Medical Lab Technician", short: "MLT", category: "Health Sciences",
    desc: "Clinical diagnostics, pathology, haematology and microbiology lab procedures.",
    duration: "2 Years", seats: 40, level: "Advanced", tag: "Bestseller",
    icon: "microscope", color: "#6b3fa0", img: "photo-1578496480240-32d3e0c04525"
  },
  {
    id: 3, title: "Multi-Purpose Health Worker", short: "MPHW", category: "Health Sciences",
    desc: "Community health services, primary care, maternal & child health for female practitioners.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "",
    icon: "stethoscope", color: "#b8340a", img: "photo-1631815590058-860e4f83c1e8"
  },
  {
    id: 4, title: "Crop Production & Management", short: "CPM", category: "Agriculture",
    desc: "Modern cultivation techniques, soil science, crop protection and agri-business management.",
    duration: "2 Years", seats: 50, level: "Beginner", tag: "",
    icon: "wheat", color: "#2d6a4f", img: "photo-1530507629858-e4977d30e9e0"
  },
  {
    id: 5, title: "Fisheries", short: "FSH", category: "Agriculture",
    desc: "Aquaculture, inland & marine fisheries, fish processing and coastal resource management.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "New",
    icon: "fish", color: "#1b6b8a", img: "photo-1541441056316-443fff347c40"
  },
  {
    id: 6, title: "Livestock Management & Dairying", short: "LMD", category: "Agriculture",
    desc: "Animal husbandry, dairy technology, veterinary first-aid and farm business operations.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "",
    icon: "shield", color: "#7a5c2e", img: "photo-1570042225831-d98fa7577f1e"
  },
  {
    id: 7, title: "Fashion & Garment Making", short: "FGM", category: "Design",
    desc: "Pattern drafting, stitching, embroidery, garment construction and fashion entrepreneurship.",
    duration: "2 Years", seats: 40, level: "Beginner", tag: "Popular",
    icon: "scissors", color: "#9b3a7a", img: "photo-1673201229733-69d19c5c4a87"
  },
];

const FEATURES = [
  { icon: "zap", title: "Hands-on Practical Training", color: "#c49a2e", desc: "Every programme is structured around industry-standard lab and field work, not just theory. Students are job-ready from day one." },
  { icon: "graduation-cap", title: "Industry Expert Faculty", color: "#1a4231", desc: "Our lecturers are practising professionals — doctors, engineers, agronomists and designers who bring real-world experience into the classroom." },
  { icon: "layers", title: "Modern Laboratories", color: "#2d6a4f", desc: "State-of-the-art computer labs, medical diagnostic labs, aquaculture facilities and garment workshops equipped for current industry standards." },
  { icon: "bar-chart-2", title: "Career Guidance & Placement", color: "#6b3fa0", desc: "Dedicated placement cell connects graduates with local hospitals, IT firms, agri-businesses and fashion ateliers across Andhra Pradesh." },
  { icon: "award", title: "Government Recognised", color: "#b8340a", desc: "All programmes are approved by the Board of Intermediate Education, Andhra Pradesh, with nationally recognised vocational certificates." },
  { icon: "globe", title: "Admissions Open 2026", color: "#1b6b8a", desc: "Applications are now being accepted for the 2026 academic year across all seven vocational programmes. Limited seats — apply early." },
];

const TESTIMONIALS = [
  { quote: "The MLT programme at Srichakra gave me the practical skills that most college graduates lack. Within three months of completing my certificate I had a job at a private diagnostic centre in Rajahmundry.", name: "Lakshmi Devi P.", role: "Lab Technician, Rajahmundry", rating: 5 },
  { quote: "I enrolled in CSE with no prior knowledge of computers. The faculty were patient, the lab was well-equipped, and I now work as a junior developer. This college changed my career path completely.", name: "Ravi Shankar M.", role: "Junior Developer, Kakinada", rating: 5 },
  { quote: "The Fashion & Garment Making course helped me start my own tailoring business in Amalapuram. The entrepreneurship guidance was as valuable as the stitching itself.", name: "Sunitha K.", role: "Entrepreneur, Amalapuram", rating: 5 },
];

const PREFS = [
  { label: "Admission alerts", description: "Notify when new academic year applications open", defaultOn: true, accent: "#1a4231" },
  { label: "New programme announcements", description: "When Srichakra launches a new vocational course", defaultOn: true, accent: "#c49a2e" },
  { label: "Scholarship updates", description: "Government and private scholarship notifications", defaultOn: true, accent: "#2d6a4f" },
  { label: "Event & workshop invites", description: "Seminars, career fairs and open days", defaultOn: false, accent: "#6b3fa0" },
  { label: "Placement drive notices", description: "When campus recruitment drives are scheduled", defaultOn: false, accent: "#1a4231" },
];

const LEVEL_COLORS = { Beginner: "#2d6a4f", Intermediate: "#1a4231", Advanced: "#6b3fa0" };

/* ══════════════════════════════════════════════════════════════
   1. CUSTOM MAGNETIC CURSOR
   ══════════════════════════════════════════════════════════════ */
function initCursor() {
  const ring = document.getElementById("customCursor");
  const dot = document.getElementById("customCursorDot");
  if (!ring || !dot) return;

  // Smooth lagging ring position
  let ringX = -100, ringY = -100;
  let mouseX = -100, mouseY = -100;
  let raf;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    ringX = lerp(ringX, mouseX, 0.15);
    ringY = lerp(ringY, mouseY, 0.15);
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    raf = requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
  });

  // Expand ring on interactive elements
  const hoverTargets = "a, button, .toggle-track, .tab-btn, .course-card, .contact-card, .feature-card, .testimonial-card";
  document.body.addEventListener("mouseover", e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add("cursor-hover");
    }
  });
  document.body.addEventListener("mouseout", e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove("cursor-hover");
    }
  });
  document.body.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
  document.body.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));

  // Hide / show cursor when leaving/entering window
  document.addEventListener("mouseleave", () => { ring.style.opacity = "0"; dot.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { ring.style.opacity = "1"; dot.style.opacity = "1"; });
}

/* ══════════════════════════════════════════════════════════════
   2. SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   3. PARALLAX HERO BACKGROUND
   ══════════════════════════════════════════════════════════════ */
function initParallax() {
  const heroBg = document.querySelector(".hero-bg-img");
  if (!heroBg) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.06) translateY(${y * 0.22}px)`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   4. ANIMATED NUMBER COUNTERS
   Targets elements with [data-count="<number>"] attribute.
   ══════════════════════════════════════════════════════════════ */
function animateCounter(el) {
  if (el.dataset._counted) return;
  el.dataset._counted = "1";

  const raw = el.dataset.count || "0";
  const suffix = raw.replace(/[\d.]/g, "");    // e.g. "+", "%"
  const target = parseFloat(raw);
  const isInt = Number.isInteger(target);
  const duration = 1800;
  const start = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = target * easeOut(progress);
    el.textContent = (isInt ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counterEls = document.querySelectorAll("[data-count]");
  if (!counterEls.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   5. 3D CARD TILT (mouse tracking per card)
   Rotates card up to ±10° based on mouse position inside the card.
   ══════════════════════════════════════════════════════════════ */
function initCardTilt() {
  const MAX_TILT = 10; // degrees

  function attach(card) {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rx = (-dy / (rect.height / 2)) * MAX_TILT;
      const ry = (dx / (rect.width / 2)) * MAX_TILT;

      // Mouse position in % for radial glow
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      card.style.setProperty("--mx", mx + "%");
      card.style.setProperty("--my", my + "%");
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "box-shadow 0.35s, border-color 0.35s";
    });

    card.addEventListener("mousemove", () => {
      card.style.transition = "box-shadow 0.35s, border-color 0.35s"; // No transform transition while dragging
    });
  }

  // Attach to current cards, called again after filter re-render
  window._attachCardTilt = function () {
    document.querySelectorAll(".course-card").forEach(attach);
  };
  window._attachCardTilt();
}

/* ══════════════════════════════════════════════════════════════
   6. RIPPLE EFFECT
   ══════════════════════════════════════════════════════════════ */
function createRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

function initRipple() {
  document.body.addEventListener("click", e => {
    const target = e.target.closest(".btn-hero-primary, .btn-apply, .btn-cta-white, .btn-apply-mobile, .btn-card");
    if (target) {
      if (!target.classList.contains("ripple-host")) target.classList.add("ripple-host");
      createRipple(e, target);
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   7. WEB AUDIO SNAP SOUND
   ══════════════════════════════════════════════════════════════ */
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
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start();
    source.onended = () => ctx.close();
  } catch (_) { /* silent */ }
}

/* ══════════════════════════════════════════════════════════════
   8. TOAST NOTIFICATION SYSTEM
   ══════════════════════════════════════════════════════════════ */
function showToast(message, icon = "check-circle", variant = "default", duration = 3200) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${variant === "accent" ? "toast-accent" : ""}`;
  toast.innerHTML = `<i data-lucide="${icon}" class="toast-icon"></i><span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons({ nodes: [toast] });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ══════════════════════════════════════════════════════════════
   9. iOS TOGGLE SWITCH
   ══════════════════════════════════════════════════════════════ */
const TOGGLE_W = 51, KNOB_W = 27, TRAVEL = TOGGLE_W - KNOB_W - 4;

function createToggleRow(pref) {
  let on = pref.defaultOn;
  let dragging = false;
  let startX = 0;
  let startOn = false;
  let dragX = null;
  let pressed = false;

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

  // ── helpers ──
  function getKnobX() { return dragX !== null ? dragX : (on ? TRAVEL : 0); }

  function applyKnobStyles(immediate) {
    const x = getKnobX();
    knob.style.transition = (!immediate && dragX === null)
      ? "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.15s ease"
      : "none";
    knob.style.transform = `translateX(${x}px)`;
    knob.style.width = (pressed && dragX === null) ? `${KNOB_W + 4}px` : `${KNOB_W}px`;
    track.style.backgroundColor = on ? pref.accent : "#d1cec6";
  }

  function commit(next) {
    dragX = null;
    const changed = next !== on;
    on = next;
    track.setAttribute("aria-checked", String(on));
    if (changed) {
      playSnapSound(on);
      showToast(
        on ? `${pref.label} enabled` : `${pref.label} disabled`,
        on ? "bell" : "bell-off"
      );
    }
    applyKnobStyles(false);
  }

  applyKnobStyles(true); // initial state (no animation)

  // Pointer events
  track.addEventListener("pointerdown", e => {
    dragging = false; startX = e.clientX; startOn = on;
    dragX = null; pressed = true;
    track.setPointerCapture(e.pointerId);
    applyKnobStyles(false);
  });
  track.addEventListener("pointermove", e => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragging = true;
    if (!dragging) return;
    dragX = Math.max(0, Math.min(TRAVEL, (startOn ? TRAVEL : 0) + dx));
    applyKnobStyles(false);
  });
  track.addEventListener("pointerup", e => {
    pressed = false;
    if (dragging) {
      const dx = e.clientX - startX;
      commit(startOn ? dx > -(TRAVEL * 0.35) : dx > TRAVEL * 0.35);
    } else {
      commit(!on);
    }
    dragging = false;
  });
  track.addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); commit(!on); }
  });

  return row;
}

/* ══════════════════════════════════════════════════════════════
   10. MOBILE NAVIGATION + NAV SCROLL SHADOW
   ══════════════════════════════════════════════════════════════ */
function initMobileNav() {
  const btn = document.getElementById("menuToggleBtn");
  const menu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("menuIconOpen");
  const iconClose = document.getElementById("menuIconClose");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const nav = document.querySelector(".nav");

  function openMenu() {
    menu.style.display = "block";
    requestAnimationFrame(() => menu.classList.add("open"));
    iconOpen.style.display = "none";
    iconClose.style.display = "block";
    btn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.classList.remove("open");
    iconOpen.style.display = "block";
    iconClose.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
    setTimeout(() => { menu.style.display = "none"; }, 350);
  }

  btn.addEventListener("click", () => menu.classList.contains("open") ? closeMenu() : openMenu());
  mobileLinks.forEach(l => l.addEventListener("click", closeMenu));
  menu.style.display = "none";

  // Nav shadow on scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Resize cleanup
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      menu.classList.remove("open");
      menu.style.display = "none";
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   11. SCROLL REVEAL
   ══════════════════════════════════════════════════════════════ */
let fadeObserver;
function observeFadeUps() {
  if (fadeObserver) fadeObserver.disconnect();
  fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade-up:not(.visible):not(.instant-visible)").forEach(el => {
    fadeObserver.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   12. HERO TYPING EFFECT
   Types the italic part of the h1 letter by letter.
   ══════════════════════════════════════════════════════════════ */
function initTypingEffect() {
  const em = document.querySelector(".hero h1 em");
  if (!em) return;
  const fullText = em.textContent.trim();
  em.textContent = "";
  em.style.borderRight = "2px solid var(--accent)"; // blinking cursor
  em.style.paddingRight = "2px";
  em.style.animation = "blink 0.75s step-end infinite";

  // Add blink keyframes dynamically if not in CSS
  if (!document.getElementById("blink-style")) {
    const s = document.createElement("style");
    s.id = "blink-style";
    s.textContent = `@keyframes blink { 0%,100%{border-color:var(--accent)} 50%{border-color:transparent} }`;
    document.head.appendChild(s);
  }

  let i = 0;
  const delay = 800; // start delay ms
  const speed = 60;  // ms per character

  setTimeout(() => {
    const interval = setInterval(() => {
      em.textContent = fullText.slice(0, ++i);
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          em.style.borderRight = "none";
          em.style.animation = "none";
        }, 1200);
      }
    }, speed);
  }, delay);
}

/* ══════════════════════════════════════════════════════════════
   RENDER HELPERS
   ══════════════════════════════════════════════════════════════ */
function renderCourses(activeCategory) {
  const grid = document.getElementById("coursesGrid");
  grid.innerHTML = "";

  const filtered = activeCategory === "All" ? COURSES : COURSES.filter(c => c.category === activeCategory);

  filtered.forEach(course => {
    const levelColor = LEVEL_COLORS[course.level] || "#1a4231";
    const card = document.createElement("div");
    card.className = "course-card fade-up";
    card.innerHTML = `
      <div class="card-img">
        <img src="https://images.unsplash.com/${course.img}?w=500&h=300&fit=crop&auto=format" alt="${course.title}" loading="lazy" />
        <div class="card-img-overlay"></div>
        ${course.tag ? `<div class="card-tag">${course.tag}</div>` : ""}
        <div class="card-short"><i data-lucide="${course.icon}"></i><span>${course.short}</span></div>
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
        <a href="#admissions" class="btn-card ripple-host">Apply for this programme</a>
      </div>`;
    grid.appendChild(card);
  });

  lucide.createIcons();
  observeFadeUps();
  if (window._attachCardTilt) window._attachCardTilt();
}

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
      <p>${f.desc}</p>`;
    grid.appendChild(card);
  });
  lucide.createIcons();
  observeFadeUps();
}

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
      </div>`;
    grid.appendChild(card);
  });
}

function renderPrefs() {
  const container = document.getElementById("prefsRows");
  PREFS.forEach(pref => container.appendChild(createToggleRow(pref)));
}

/* ══════════════════════════════════════════════════════════════
   CATEGORY TABS
   ══════════════════════════════════════════════════════════════ */
function initCategoryTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Collapse grid with a quick fade before re-render
      const grid = document.getElementById("coursesGrid");
      grid.style.opacity = "0";
      grid.style.transform = "translateY(8px)";
      grid.style.transition = "opacity 0.2s, transform 0.2s";

      setTimeout(() => {
        renderCourses(btn.dataset.category);
        requestAnimationFrame(() => {
          grid.style.opacity = "1";
          grid.style.transform = "translateY(0)";
        });
      }, 200);
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   BOOTSTRAP
   ══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  // Inject UI elements needed by JS
  if (!document.getElementById("customCursor")) {
    const ring = document.createElement("div");
    ring.id = "customCursor";
    document.body.appendChild(ring);
    const dot = document.createElement("div");
    dot.id = "customCursorDot";
    document.body.appendChild(dot);
  }
  if (!document.getElementById("scrollProgress")) {
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.prepend(bar);
  }
  if (!document.getElementById("toastContainer")) {
    const tc = document.createElement("div");
    tc.id = "toastContainer";
    tc.setAttribute("aria-live", "polite");
    tc.setAttribute("aria-atomic", "true");
    document.body.appendChild(tc);
  }

  // Init Lucide (base pass)
  lucide.createIcons();

  // Render dynamic content
  renderCourses("All");
  renderFeatures();
  renderTestimonials();
  renderPrefs();

  // Init all advanced features
  initCursor();
  initScrollProgress();
  initParallax();
  initCounters();
  initCardTilt();
  initRipple();
  initMobileNav();
  initCategoryTabs();
  initTypingEffect();
  observeFadeUps();
});

