window.addEventListener('load', () => { // wait for all assets, including images
  const ball = document.querySelector('.ball');
  const hero = document.querySelector('.hero');

  const BALL_SIZE = 250; // matches CSS

  // Random start position & velocity
  let x = Math.random() * (hero.clientWidth - BALL_SIZE);
  let y = Math.random() * (hero.clientHeight - BALL_SIZE);
  let vx = (Math.random() - 0.5) * 4;
  let vy = (Math.random() - 0.5) * 4;

  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
  ball.style.width = BALL_SIZE + 'px';
  ball.style.height = BALL_SIZE + 'px';

  function animate() {
    x += vx;
    y += vy;

    if (x <= 0 || x >= hero.clientWidth - BALL_SIZE) vx *= -1;
    if (y <= 0 || y >= hero.clientHeight - BALL_SIZE) vy *= -1;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    requestAnimationFrame(animate);
  }

  animate();

  // Mobile menu toggle
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  toggleBtn?.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });
});

window.addEventListener('load', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const hero = document.querySelector('.hero');
  const ball = document.querySelector('.ball');

  function closeNav() {
    if (!toggleBtn || !nav) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('show');
  }

  // Close nav when a link is clicked (mobile)
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeNav());
    });
  }

  // Toggle with keyboard (Enter / Space)
  if (toggleBtn) {
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  }

  // Close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Click outside to close nav
  document.addEventListener('click', (e) => {
    if (!nav || !toggleBtn) return;
    if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) closeNav();
  });

  // Keep the ball inside the hero on resize/orientation changes
  function clampBallIntoHero() {
    if (!hero || !ball) return;
    const BALL_SIZE = ball.getBoundingClientRect().width || 250;
    const maxX = Math.max(0, hero.clientWidth - BALL_SIZE);
    const maxY = Math.max(0, hero.clientHeight - BALL_SIZE);

    const parsePos = (v) => {
      const n = parseFloat(v);
      return Number.isFinite(n) ? n : 0;
    };

    let x = parsePos(ball.style.left);
    let y = parsePos(ball.style.top);

    x = Math.min(Math.max(0, x), maxX);
    y = Math.min(Math.max(0, y), maxY);

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
  }

  window.addEventListener('resize', () => {
    clampBallIntoHero();
    // ensure nav is closed on larger viewports
    if (window.innerWidth > 768) closeNav();
  });

  window.addEventListener('orientationchange', clampBallIntoHero);

  // Initial clamp in case sizes changed after first load
  clampBallIntoHero();
});


/* ================= HERO SLIDER ================= */

let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");

function nextHero() {
  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");

  // Background crossfade
  if (currentSlide === 0) {
    bg1.style.opacity = "1";
    bg2.style.opacity = "0";
  } else {
    bg1.style.opacity = "0";
    bg2.style.opacity = "1";
  }
}

/* Auto slide every 7 seconds */
setInterval(nextHero, 7000);


