import { $, $$ } from '../utils/dom.js';
import { toast } from './toast.js';

const eventsData = [
  {
    cat: 'Cultural Events',
    emoji: '🕺',
    title: 'Dance & Music',
    items: [
      'Solo Dance Competition',
      'Group Dance Competition',
      'Solo Singing Competition',
      'Duet Singing Competition',
      'Battle of Bands',
      'Beatboxing Competition',
      'Instrumental Music Competition',
      'Rap Battle',
      'DJ Battle',
      'Folk Dance Competition',
      'Classical Dance Competition',
      'Western Dance Competition',
    ],
  },
  {
    cat: 'Performance Arts',
    emoji: '🎭',
    title: 'Performance Arts',
    items: [
      'Drama Competition',
      'Street Play (Nukkad Natak)',
      'Fashion Show',
      'Mime Show',
      'Stand-Up Comedy',
      'Poetry Recitation',
      'Shayari Competition',
      'Storytelling Contest',
      'Talent Hunt',
      'Mono Acting',
      'Skit Competition',
      'Mock Press Conference',
      'Anchoring Competition',
      'Voice of the Campus',
      'Cultural Parade',
      'Flash Mob',
      'Cultural Quiz',
      'Celebrity Night',
    ],
  },
  {
    cat: 'Creative Arts Events',
    emoji: '🎨',
    title: 'Creative Arts Events',
    items: [
      'Painting Competition',
      'Sketching Competition',
      'Rangoli Competition',
      'Face Painting',
      'Poster Making',
      'Graffiti Art',
      'Mandala Art',
      'Photography Contest',
      'Short Film Competition',
      'Reel Making Contest',
      'Meme Creation Contest',
      'Digital Art Competition',
      'Clay Modeling',
      'Best Out of Waste',
      'Calligraphy Competition',
    ],
  },
  {
    cat: 'Fun & Entertainment Events',
    emoji: '🎮',
    title: 'Fun & Entertainment Events',
    items: [
      'Treasure Hunt',
      'Escape Room Challenge',
      'Gaming Tournament',
      'LAN Gaming Competition',
      'BGMI Tournament',
      'Free Fire Tournament',
      'FIFA Tournament',
      'Chess Competition',
      'Tambola',
      'Fun Fair',
      'Minute to Win It',
      'Dumb Charades',
      'Pictionary',
      'Spin the Wheel',
      'Lucky Draw',
    ],
  },
  {
    cat: 'Literary & Intellectual Events',
    emoji: '📚',
    title: 'Literary & Intellectual Events',
    items: [
      'Debate Competition',
      'Group Discussion',
      'Extempore Speech',
      'Public Speaking Contest',
      'Essay Writing',
      'Creative Writing',
      'Quiz Competition',
      'Mock Parliament',
      'Business Pitch Competition',
      'Startup Idea Challenge',
    ],
  },
];

const eventCards = $('#eventCards');
const eventSearch = $('#eventSearch');
const chips = $$('.chip');

function renderEvents(filterCat = 'all', query = '') {
  if (!eventCards) return;
  const q = query.trim().toLowerCase();

  const items = eventsData.filter((e) => filterCat === 'all' || e.cat === filterCat);

  const filtered = items
    .map((group) => {
      if (!q) return group;
      const matched = group.items.filter(
        (it) => it.toLowerCase().includes(q) || group.title.toLowerCase().includes(q)
      );
      return { ...group, items: matched };
    })
    .filter((g) => g.items.length > 0 || !q);

  eventCards.innerHTML = filtered
    .map((group) => {
      return `
      <article class="event-card" aria-label="${group.cat} - ${group.title}">
        <div class="event-top">
          <div>
            <div class="pill" style="display:inline-flex; align-items:center; gap:8px">
              <span aria-hidden="true">🏷️</span> ${group.cat}
            </div>
            <h3>${group.title}</h3>
          </div>
          <div class="emoji" aria-hidden="true">${group.emoji}</div>
        </div>
        <ul>
          ${group.items.map((x) => `<li>${x}</li>`).join('')}
        </ul>
        <div class="form-actions" style="margin-top: 12px">
          <button class="btn primary" type="button" data-register="${group.cat}">
            <span aria-hidden="true">🧾</span> Register for this Category
            <span class="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </article>
    `;
    })
    .join('');

  $$('[data-register]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-register');
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const sel = $('#eventSelection');
      if (sel) {
        sel.value = cat;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }

      toast('Category selected', `You picked: ${cat}. Fill the form and submit.`, '✅');
    });
  });
}

function currentFilter() {
  const active = chips.find((c) => c.dataset.active === 'true');
  return active ? active.dataset.filter : 'all';
}

chips.forEach((ch) => {
  ch.addEventListener('click', () => {
    chips.forEach((x) => (x.dataset.active = 'false'));
    ch.dataset.active = 'true';
    renderEvents(ch.dataset.filter, eventSearch?.value || '');
  });
});

eventSearch?.addEventListener('input', () => {
  renderEvents(currentFilter(), eventSearch.value);
});

renderEvents('all', '');

// Registration select options
const eventSelection = $('#eventSelection');
if (eventSelection) {
  const options = eventsData.map((e) => `<option value="${e.cat}">${e.cat}</option>`).join('');
  eventSelection.insertAdjacentHTML('beforeend', options);
}

// Lazy init: defer heavy rendering until near #events
const _lazy = (() => {
  const IO = window.IntersectionObserver;
  if (!IO) return (el, fn) => {
    try {
      fn();
    } catch (_) {}
  };

  return (el, fn, opts) => {
    if (!el) return;
    const obs = new IO(
      (entries) => {
        for (const ent of entries) {
          if (ent.isIntersecting) {
            obs.disconnect();
            try {
              fn();
            } catch (_) {}
            return;
          }
        }
      },
      opts || { threshold: 0.15 }
    );
    obs.observe(el);
  };
})();

const _eventsSection = $('#events');
let _eventsRendered = false;
_lazy(_eventsSection, () => {
  if (_eventsRendered) return;
  _eventsRendered = true;
  renderEvents('all', '');
});

