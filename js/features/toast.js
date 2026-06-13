import { $ } from '../utils/dom.js';

const toastWrap = $('#toastWrap');

export function toast(title, message, icon = '✨') {
  if (!toastWrap) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.innerHTML = `
    <div class="ticon" aria-hidden="true">${icon}</div>
    <div>
      <b>${title}</b>
      <span>${message}</span>
    </div>
  `;

  toastWrap.appendChild(t);

  setTimeout(() => {
    t.style.transition = 'opacity .25s var(--ease), transform .25s var(--ease)';
    t.style.opacity = '0';
    t.style.transform = 'translateY(8px)';
    setTimeout(() => t.remove(), 280);
  }, 3400);
}

