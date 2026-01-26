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


