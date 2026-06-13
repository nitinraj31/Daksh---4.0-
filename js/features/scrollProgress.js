import { $ } from '../utils/dom.js';

const progress = $('#progress');
const backToTop = $('#backToTop');

function onScroll() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;

  if (progress) progress.style.width = pct + '%';
  if (backToTop) backToTop.dataset.show = doc.scrollTop > 600 ? 'true' : 'false';
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

