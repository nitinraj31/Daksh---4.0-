import { $$ } from '../utils/dom.js';

const revealEls = $$('[data-reveal], .reveal[data-reveal]');
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.dataset.visible = 'true';
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.14 }
);


revealEls.forEach((el) => {
  el.classList.add('reveal');
  io.observe(el);
});

