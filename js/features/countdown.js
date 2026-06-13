import { $ } from '../utils/dom.js';

const targetISO = (() => {
  const now = new Date();
  let year = now.getFullYear();
  const candidate = new Date(`${year}-01-18T17:00:00`);
  if (candidate.getTime() < now.getTime()) year += 1;
  return `${year}-01-18T17:00:00`;
})();

const cdDays = $('#cdDays');
const cdHours = $('#cdHours');
const cdMins = $('#cdMins');
const cdSecs = $('#cdSecs');

function updateCountdown() {
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, target - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const pad2 = (n) => String(n).padStart(2, '0');
  if (cdDays) cdDays.textContent = pad2(days);
  if (cdHours) cdHours.textContent = pad2(hours);
  if (cdMins) cdMins.textContent = pad2(mins);
  if (cdSecs) cdSecs.textContent = pad2(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

