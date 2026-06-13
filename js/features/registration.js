import { $, $$ } from '../utils/dom.js';
import { toast } from './toast.js';
import { safeSet } from '../utils/storage.js';

const regForm = $('#regForm');
const regStatus = $('#regStatus');
const regSummary = $('#regSummary');
const qrBtn = $('#qrBtn');

function showFieldError(input, msg) {
  input.setCustomValidity(msg);
  input.classList.add('err');
}

function clearFieldError(input) {
  input.setCustomValidity('');
  input.classList.remove('err');
}

function validatePhone(s) {
  return /^\d{10}$/.test(String(s || ''));
}

regForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (regStatus) regStatus.textContent = '';

  const fullName = $('#fullName');
  const collegeName = $('#collegeName');
  const branch = $('#branch');
  const semester = $('#semester');
  const email = $('#email');
  const phone = $('#phone');
  const gender = $('#gender');
  const eventSelection = $('#eventSelection');

  const fields = [fullName, collegeName, branch, semester, email, phone, gender, eventSelection];
  fields.forEach((f) => clearFieldError(f));

  let ok = true;

  if (!fullName.value || fullName.value.trim().length < 2) {
    ok = false;
    showFieldError(fullName, 'Enter a valid full name (min 2 chars).');
  }
  if (!collegeName.value || collegeName.value.trim().length < 2) {
    ok = false;
    showFieldError(collegeName, 'Enter a valid college name.');
  }
  if (!branch.value || branch.value.trim().length < 2) {
    ok = false;
    showFieldError(branch, 'Enter a valid branch.');
  }
  if (!semester.value) {
    ok = false;
    showFieldError(semester, 'Select semester.');
  }
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    ok = false;
    showFieldError(email, 'Enter a valid email address.');
  }
  if (!validatePhone(phone.value)) {
    ok = false;
    showFieldError(phone, 'Phone must be exactly 10 digits.');
  }
  if (!gender.value) {
    ok = false;
    showFieldError(gender, 'Select gender.');
  }
  if (!eventSelection.value) {
    ok = false;
    showFieldError(eventSelection, 'Choose an event category.');
  }

  if (!ok) {
    toast('Fix form errors', 'Please review the highlighted fields and try again.', '⚠️');
    const focusEl =
      fields.find((f) => f && (f.validationMessage || (f.getCustomValidity && f.getCustomValidity()))) ||
      fields.find((f) => f && !f.checkValidity());
    focusEl?.focus?.();
    return;
  }

  const payload = {
    fullName: fullName.value.trim(),
    collegeName: collegeName.value.trim(),
    branch: branch.value.trim(),
    semester: semester.value,
    email: email.value.trim(),
    phone: phone.value.trim(),
    gender: gender.value,
    eventCategory: eventSelection.value,
  };

  safeSet('daksh-registration', JSON.stringify({ payload, at: Date.now() }));

  const ref = 'DAKSH-' + Math.random().toString(16).slice(2, 8).toUpperCase();

  if (regStatus) regStatus.textContent = 'Registration successful!';
  if (regSummary) {
    regSummary.style.display = 'block';
    regSummary.innerHTML = `
      <b>Registration Summary</b><br/>
      <span class="help" style="margin-top:6px; display:block">Reference ID: <b>${ref}</b></span>
      <span class="help" style="margin-top:6px; display:block">Category: <b>${payload.eventCategory}</b></span>
      <span class="help" style="margin-top:6px; display:block">Name: <b>${payload.fullName}</b> • ${payload.collegeName}</span>
      <span class="help" style="margin-top:6px; display:block">We’ll announce further details on the official schedule updates.</span>
    `;
  }

  toast('Registration confirmed', `Welcome, ${payload.fullName.split(' ')[0]}! Your reference ID: ${ref}`, '✅');
  if (qrBtn) qrBtn.dataset.lastRef = ref;
});

