/* ═══════════════════════════════════════════════════════════
   main.js — Aditi Singh Rathore Portfolio
   PERFORMANCE-OPTIMISED · No count-up · No autoplay · No glow
═══════════════════════════════════════════════════════════ */

/* ─── NAVBAR ──────────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Throttled scroll for navbar only
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) navbar.classList.add('scrolled');
  else         navbar.classList.remove('scrolled');
  lastScroll = y;
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── INSTANT ANCHOR NAVIGATION ──────────────────────────── */
// Override browser smooth-scroll with instant jump offset by navbar height
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 0;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'instant' });
  });
});

/* ─── STATIC STATS — display instantly, no counting ──────── */
// Hero stat numbers: read data-target + data-suffix and render immediately
document.querySelectorAll('.stat-number, .count-up').forEach(el => {
  const target = el.dataset.target;
  const suffix = el.dataset.suffix || '';
  if (!target) return;
  const t = parseFloat(target);
  let label;
  if (t >= 1000000) label = (t / 1000000).toFixed(0);
  else if (t >= 1000) label = (t / 1000).toFixed(1);
  else                label  = t;
  el.textContent = label + suffix;
});

/* ─── SCROLL REVEAL (lightweight, no stagger delays) ──────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Reveal hero immediately on load
const heroContent = document.querySelector('.hero-content');
if (heroContent) heroContent.classList.add('revealed');

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  if (el !== heroContent) revealObserver.observe(el);
});

/* ─── NAV ACTIVE STATE ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav-active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── PROGRESS BARS (Insights) ────────────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.age-bar, .loc-bar').forEach(bar => {
        bar.style.width = (bar.dataset.w || '0') + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.insight-card').forEach(card => barObserver.observe(card));

/* ─── ENGAGEMENT RING ──────────────────────────────────────── */
// Inject SVG gradient once
const svgNS  = 'http://www.w3.org/2000/svg';
const firstRingSVG = document.querySelector('.engage-ring svg');
if (firstRingSVG) {
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'ringGrad');
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
  [['0%','#F7B7A3'],['100%','#D46A6A']].forEach(([offset, color]) => {
    const stop = document.createElementNS(svgNS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', color);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  firstRingSVG.prepend(defs);
}

const ringObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.ring-fill').forEach(ring => {
        const pct = parseFloat(ring.closest('.engage-ring').dataset.pct || '0');
        ring.style.strokeDashoffset = 264 - (pct / 100) * 264;
      });
      ringObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const insightsSec = document.querySelector('#insights');
if (insightsSec) ringObserver.observe(insightsSec);

/* ─── CAROUSEL (manual only, no autoplay) ────────────────── */
const carousel      = document.getElementById('carousel');
const prevBtn       = document.getElementById('carousel-prev');
const nextBtn       = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
const cards     = carousel ? [...carousel.querySelectorAll('.carousel-card')] : [];
const cardCount = cards.length;

if (dotsContainer && cardCount > 0) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots(index) {
  dotsContainer && dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function scrollToCard(index) {
  if (!carousel) return;
  currentIndex = Math.max(0, Math.min(index, cardCount - 1));
  const card = cards[currentIndex];
  const padLeft = parseInt(getComputedStyle(carousel).paddingLeft) || 0;
  carousel.scrollTo({ left: card.offsetLeft - padLeft, behavior: 'smooth' });
  updateDots(currentIndex);
}

prevBtn && prevBtn.addEventListener('click', () => scrollToCard(currentIndex - 1));
nextBtn && nextBtn.addEventListener('click', () => scrollToCard(currentIndex + 1));

// Sync dots on manual scroll (passive)
let scrollTicking = false;
carousel && carousel.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const padLeft  = parseInt(getComputedStyle(carousel).paddingLeft) || 0;
    const scrollLeft = carousel.scrollLeft;
    let closest = 0, minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - padLeft - scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== currentIndex) { currentIndex = closest; updateDots(currentIndex); }
    scrollTicking = false;
  });
}, { passive: true });

/* ─── SHOWCASE VIDEO CARDS — click to play ────────────────── */
// If a .card-media contains a <video> element, clicking the play icon plays it
document.querySelectorAll('.carousel-card').forEach(card => {
  const video = card.querySelector('video');
  const playIcon = card.querySelector('.play-icon');
  if (!video || !playIcon) return;

  playIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      playIcon.style.opacity = '0';
    } else {
      video.pause();
      playIcon.style.opacity = '1';
    }
  });

  video.addEventListener('click', () => {
    if (video.paused) { video.play(); playIcon.style.opacity = '0'; }
    else              { video.pause(); playIcon.style.opacity = '1'; }
  });

  video.addEventListener('ended', () => { playIcon.style.opacity = '1'; });
});

/* ─── MAGNETIC BUTTON HOVER ──────────────────────────────── */
// Buttons subtly follow cursor on hover (max 6px shift)
const magneticBtns = document.querySelectorAll(
  '.nav-cta, .cta-btn, .cta-email, .social-btn, #hero-cta, .btn-primary, .btn-outline, .btn-sm, .carousel-btn'
);

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxShift = 6;
    const dx = (x / rect.width) * maxShift * 2;
    const dy = (y / rect.height) * maxShift * 2;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
