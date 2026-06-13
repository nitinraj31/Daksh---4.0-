import { $, } from '../utils/dom.js';
import { safeGet, safeSet } from '../utils/storage.js';

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  safeSet('daksh-theme', theme);

  if (themeIcon) themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#F8FAFC' : '#0F172A');
}

(function initTheme() {
  const saved = safeGet('daksh-theme');
  const systemPrefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches;
  const theme = saved || (systemPrefersLight ? 'light' : 'dark');
  setTheme(theme);
})();

themeToggle?.addEventListener('click', () => {
  const curr = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  setTheme(curr === 'light' ? 'dark' : 'light');
});

