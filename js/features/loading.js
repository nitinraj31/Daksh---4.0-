import { $ } from '../utils/dom.js';

(() => {
  const loading = $('#loading');
  if (!loading) return;

  const hide = () => {
    loading.style.transition = 'opacity .35s var(--ease), transform .35s var(--ease)';
    loading.style.opacity = '0';
    loading.style.transform = 'translateY(-8px)';
    setTimeout(() => loading.remove(), 380);
  };

  // Hide after DOM is ready; do not wait for full window load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 250), { once: true });
  } else {
    setTimeout(hide, 250);
  }
})();

