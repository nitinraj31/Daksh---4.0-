(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let rafId = 0;
  let running = false;
  let w = 0,
    h = 0,
    DPR = 1,
    ctx = null;
  let particlesArr = [];

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(rect.height);
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function initParticles() {
    const colors = [
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim(),
    ];

    const raw = Math.floor((w * h) / 38000);
    const count = Math.max(30, Math.min(120, raw));

    particlesArr = [];
    for (let i = 0; i < count; i++) {
      particlesArr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.2 + Math.random() * 2.1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: colors[i % colors.length],
        a: 0.35 + Math.random() * 0.35,
      });
    }
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    // Grid shimmer (cheap)
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    for (let x = 0; x < w; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 120) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const maxDist = 90;

    for (let i = 0; i < particlesArr.length; i++) {
      const p = particlesArr[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Reduce connections work by sampling every 2nd particle (approx)
      for (let j = i + 2; j < particlesArr.length; j += 2) {
        const q = particlesArr[j];
        const dx = p.x - q.x,
          dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.strokeStyle = p.c;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  const start = () => {
    if (running) return;
    ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    DPR = Math.min(2, window.devicePixelRatio || 1);
    resize();
    initParticles();
    running = true;
    rafId = requestAnimationFrame(draw);
  };

  const hero = canvas.closest('.hero-card') || canvas.parentElement;
  if (hero && 'IntersectionObserver' in window) {
    const hIO = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e && e.isIntersecting) {
          start();
          hIO.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    hIO.observe(hero);
  } else {
    const t = setTimeout(start, 800);
    window.addEventListener(
      'beforeunload',
      () => clearTimeout(t),
      { once: true }
    );
  }

  window.addEventListener('resize', () => {
    if (!running) return;
    resize();
    initParticles();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!running) start();
  });
})();

