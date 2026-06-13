import { $$ } from '../utils/dom.js';
import { clamp } from '../utils/dom.js';

function animateCount(el, target) {
  const start = 0;
  const duration = 1100;
  const t0 = performance.now();

  function tick(t) {
    const p = clamp((t - t0) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.round(start + (target - start) * eased);
    el.textContent = val;
    if (p < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

(() => {
  const counters = $$('[data-count]');
  if (counters.length === 0) return;

  const cIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.getAttribute('data-count') || '0', 10);
          animateCount(el, target);
          cIO.unobserve(el);
        }
      }
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => cIO.observe(el));
})();

