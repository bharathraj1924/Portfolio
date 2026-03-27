/* ═══════════════════════════════════════════
   script.js — Portfolio Interactions
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Custom Cursor ─── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animFollower);
    })();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });
  }


  /* ─── Navbar scroll behaviour ─── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ─── Mobile nav toggle ─── */
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  /* ─── Smooth scroll for all anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ─── Scroll Reveal (IntersectionObserver) ─── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ─── Skill Bar Animation (trigger on scroll) ─── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        const fill = bar.querySelector('.skill-bar-fill');
        if (fill) {
          // Small delay so reveal animation completes first
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 400);
        }
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));


  /* ─── Hero text stagger on load ─── */
  window.addEventListener('load', () => {
    // Trigger hero reveals with a slight initial delay
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 120);
      });
    }, 100);
  });


  /* ─── Active nav highlight on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.remove('active-section');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active-section');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));


  /* ─── Project Card Lightbox ─── */
  const projectData = [
    { title: 'Brand Commercial',       desc: 'Wall sticker · After Effects',                                 youtube: 'r7aXxT8nONE', bg: '#180808' },
    { title: 'Travel Memory Edit',     desc: 'Multiple Vertical Video Edit · Premiere Pro',                  youtube: 'x_idm0DTf5E', bg: '#1a0505' },
    { title: 'GYM Reel Edit',          desc: 'After Effects · Using Transitions',                            youtube: '7mP8-GfJcqs', bg: '#050510' },
    { title: 'Social Media Influencer',desc: 'Pandian Vilas · Premiere Pro',                                 youtube: 'HCpikfbJYBw', bg: '#0a0505' },
    { title: 'using SFX Video for reel',desc: 'Colour-graded narrative · Premiere Pro',                      youtube: 'fTUxFd4FeWU', bg: '#060010' },
    { title: 'Trip Edit',              desc: 'Memory Long-form narrative · Premiere Pro',                    youtube: 'Vh2T0WlH30M', bg: '#080808' },
  ];

  const overlay      = document.getElementById('lightboxOverlay');
  const lbTitle      = document.getElementById('lightboxTitle');
  const lbDesc       = document.getElementById('lightboxDesc');
  const lbVideo      = document.getElementById('lightboxVideo');
  const lbYoutube    = document.getElementById('lightboxYoutube');
  const lbClose      = document.getElementById('lightboxClose');

  function openLightbox(index) {
    const d = projectData[index] || {};
    lbTitle.textContent   = d.title || '';
    lbDesc.textContent    = d.desc  || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (d.youtube) {
      if (lbVideo) {
        lbVideo.pause();
        lbVideo.style.display = 'none';
      }
      if (lbYoutube) {
        lbYoutube.src = `https://www.youtube.com/embed/${d.youtube}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080`;
        lbYoutube.style.display = '';
      }
    } else {
      if (lbYoutube) {
        lbYoutube.src = '';
        lbYoutube.style.display = 'none';
      }
      if (lbVideo) {
        if (d.video) {
          lbVideo.src = d.video;
          lbVideo.style.display = '';
        } else {
          lbVideo.removeAttribute('src');
          lbVideo.style.display = 'none';
        }
        lbVideo.currentTime = 0;
        lbVideo.play().catch(e => console.log('Video autoplay blocked:', e));
      }
    }
  }
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lbVideo) {
      lbVideo.pause();
    }
    if (lbYoutube) {
      lbYoutube.src = '';
    }
  }

  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });


  /* ─── Marquee / ticker setup (optional fun detail) ─── */
  // Creates a subtle repeating ticker in the skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const ticker = document.createElement('div');
    ticker.className = 'section-ticker';
    ticker.innerHTML = `
      <div class="ticker-track">
        ${Array(12).fill('<span>Premiere Pro · After Effects · Photoshop · </span>').join('')}
      </div>
    `;

    // Inject styles for ticker
    const tickerStyle = document.createElement('style');
    tickerStyle.textContent = `
      .section-ticker {
        overflow: hidden;
        background: var(--red);
        padding: 0.6rem 0;
        white-space: nowrap;
        position: relative;
        margin-top: 0;
      }
      .ticker-track {
        display: inline-flex;
        gap: 0;
        animation: tickerScroll 28s linear infinite;
      }
      .ticker-track span {
        font-family: var(--font-condensed);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--black);
        padding: 0 1.5rem;
        flex-shrink: 0;
      }
      @keyframes tickerScroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(tickerStyle);

    // Insert after the section header
    const skillsInner = skillsSection.querySelector('.section-inner');
    skillsSection.insertBefore(ticker, skillsInner);
  }

})();
