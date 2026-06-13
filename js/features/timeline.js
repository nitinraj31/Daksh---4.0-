import { $, $$ } from '../utils/dom.js';

const schedule = {
  day1: [
    { time: '9:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:15 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:45 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:50 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '10:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '11:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '12:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '13:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '14:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '15:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '16:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '17:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '19:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
  ],
  day2: [
    { time: '10:00 AM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '11:00 AM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '12:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '01:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '02:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '03:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '04:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '05:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '07:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '09:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
    { time: '09:00 PM', title: 'Gaming Tournament – Qualifiers', venue: 'LAN Hall', coord: 'Gaming Core' },
  ],
  day3: [
    { time: '9:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:15 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:45 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:50 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '10:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '11:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '12:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '13:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '14:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '15:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '16:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '17:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '19:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
  ],
  day4: [
    { time: '9:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:15 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:45 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '9:50 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '10:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '11:30 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '12:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '13:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '14:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '15:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '16:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '17:00 AM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
    { time: '19:00 PM', title: 'Inauguration & Cultural Warm-up', venue: 'Main Auditorium', coord: 'Riya / Team DAKSH' },
  ],
};

const timelineItems = $('#timelineItems');
const scheduleTabs = $$('.tab');

function renderTimeline(dayKey) {
  if (!timelineItems) return;
  const items = schedule[dayKey] || [];

  timelineItems.innerHTML = items
    .map(
      (it) => `
    <div class="timeline-item">
      <div class="timeline-time">${it.time}<small>${it.venue}</small></div>
      <div class="timeline-body"><b>${it.title}</b><span>Coordinator: ${it.coord}</span></div>
    </div>
  `
    )
    .join('');
}

scheduleTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    scheduleTabs.forEach((t) => (t.dataset.active = 'false'));
    tab.dataset.active = 'true';
    renderTimeline(tab.dataset.day);
  });
});

renderTimeline('day1');

