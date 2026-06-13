import { $ } from '../utils/dom.js';

const yearEl = $('#year');
yearEl && (yearEl.textContent = new Date().getFullYear());

