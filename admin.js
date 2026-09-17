/* ============================================================
   admin.js — CMS-logica voor het beheerpaneel.
   Werkt met een in-memory kopie van de data die pas bij het
   klikken op "Wijzigingen opslaan" naar localStorage wordt
   geschreven (data.js: saveCmsData / loadCmsData).
   ============================================================ */

let workingData = loadCmsData();

/* ---------- Tabs ---------- */
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
  });
});

/* ---------- Helpers ---------- */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function showBanner(msg, type = 'success') {
  const el = document.getElementById('admin-status');
  el.innerHTML = `<div class="banner ${type}">${msg}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 4000);
}

/* ================= HERO ================= */
function fillHeroForm() {
  document.getElementById('hero-kicker-input').value = workingData.hero.kicker;
  document.getElementById('hero-title-input').value = workingData.hero.title;
  document.getElementById('hero-sub-input').value = workingData.hero.subtitle;
  document.getElementById('hero-image-input').value = workingData.hero.image;
  document.getElementById('hero-image-alt-input').value = workingData.hero.imageAlt || '';
  document.getElementById('hero-image-preview').src = workingData.hero.image;
}

document.getElementById('hero-kicker-input').addEventListener('input', e => workingData.hero.kicker = e.target.value);
document.getElementById('hero-title-input').addEventListener('input', e => workingData.hero.title = e.target.value);
document.getElementById('hero-sub-input').addEventListener('input', e => workingData.hero.subtitle = e.target.value);
document.getElementById('hero-image-alt-input').addEventListener('input', e => workingData.hero.imageAlt = e.target.value);
document.getElementById('hero-image-input').addEventListener('input', e => {
  workingData.hero.image = e.target.value;
  document.getElementById('hero-image-preview').src = e.target.value;
});
document.getElementById('hero-image-upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const dataUrl = await fileToDataUrl(file);
  workingData.hero.image = dataUrl;
  document.getElementById('hero-image-input').value = dataUrl.slice(0, 60) + '... (geüploade afbeelding)';
  document.getElementById('hero-image-preview').src = dataUrl;
});

/* ================= AFTELKLOK ================= */
function fillCountdownForm() {
  document.getElementById('countdown-label-input').value = workingData.countdown.label;
  document.getElementById('countdown-date-input').value = workingData.countdown.targetDate;
}
document.getElementById('countdown-label-input').addEventListener('input', e => workingData.countdown.label = e.target.value);
document.getElementById('countdown-date-input').addEventListener('input', e => workingData.countdown.targetDate = e.target.value);

/* ================= GESCHIEDENIS ================= */
function renderHistorySections() {
  const container = document.getElementById('history-sections-list');
  container.innerHTML = '';
  workingData.history.sections.forEach((section, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card-toolbar">
        <button type="button" data-action="up" title="Omhoog">↑</button>
        <button type="button" data-action="down" title="Omlaag">↓</button>
        <button type="button" data-action="remove" class="remove-btn" title="Verwijder">✕</button>
      </div>
      <label>Kop</label>
      <input type="text" class="h-title" value="${escapeAttrJS(section.title)}" />
      <label>Tekst</label>
      <textarea class="h-text" rows="4">${escapeHtmlJS(section.text)}</textarea>
    `;
    card.querySelector('.h-title').addEventListener('input', e => workingData.history.sections[index].title = e.target.value);
    card.querySelector('.h-text').addEventListener('input', e => workingData.history.sections[index].text = e.target.value);
    card.querySelector('[data-action="remove"]').addEventListener('click', () => {
      workingData.history.sections.splice(index, 1);
      renderHistorySections();
    });
    card.querySelector('[data-action="up"]').addEventListener('click', () => {
      if (index === 0) return;
      [workingData.history.sections[index - 1], workingData.history.sections[index]] =
        [workingData.history.sections[index], workingData.history.sections[index - 1]];
      renderHistorySections();
    });
    card.querySelector('[data-action="down"]').addEventListener('click', () => {
      if (index === workingData.history.sections.length - 1) return;
      [workingData.history.sections[index + 1], workingData.history.sections[index]] =
        [workingData.history.sections[index], workingData.history.sections[index + 1]];
      renderHistorySections();
    });
    container.appendChild(card);
  });
}

document.getElementById('add-history-section').addEventListener('click', () => {
  workingData.history.sections.push({ title: 'Nieuwe sectie', text: 'Beschrijf hier een periode uit de geschiedenis van Eindhoven.' });
  renderHistorySections();
});

function fillHistoryExtras() {
  document.getElementById('history-facts-input').value = workingData.history.facts.join('\n');
  document.getElementById('history-quote-input').value = workingData.history.quote;
}
document.getElementById('history-facts-input').addEventListener('input', e => {
  workingData.history.facts = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
});
document.getElementById('history-quote-input').addEventListener('input', e => workingData.history.quote = e.target.value);

/* ================= TIJDLIJN ================= */
function renderTimeline() {
  const container = document.getElementById('timeline-list');
  container.innerHTML = '';
  workingData.timeline.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card-toolbar">
        <button type="button" data-action="up" title="Omhoog">↑</button>
        <button type="button" data-action="down" title="Omlaag">↓</button>
        <button type="button" data-action="remove" class="remove-btn" title="Verwijder">✕</button>
      </div>
      <label>Jaartal</label>
      <input type="text" class="t-year" value="${escapeAttrJS(item.year)}" />
      <label>Titel</label>
      <input type="text" class="t-title" value="${escapeAttrJS(item.title)}" />
      <label>Beschrijving</label>
      <textarea class="t-text" rows="2">${escapeHtmlJS(item.text)}</textarea>
      <div class="checkbox-row">
        <input type="checkbox" class="t-future" id="future-${index}" ${item.future ? 'checked' : ''} />
        <label for="future-${index}">Toekomstig / uitgelicht (rode kaart, bv. 2032)</label>
      </div>
    `;
    card.querySelector('.t-year').addEventListener('input', e => workingData.timeline[index].year = e.target.value);
    card.querySelector('.t-title').addEventListener('input', e => workingData.timeline[index].title = e.target.value);
    card.querySelector('.t-text').addEventListener('input', e => workingData.timeline[index].text = e.target.value);
    card.querySelector('.t-future').addEventListener('change', e => workingData.timeline[index].future = e.target.checked);
    card.querySelector('[data-action="remove"]').addEventListener('click', () => {
      workingData.timeline.splice(index, 1);
      renderTimeline();
    });
    card.querySelector('[data-action="up"]').addEventListener('click', () => {
      if (index === 0) return;
      [workingData.timeline[index - 1], workingData.timeline[index]] = [workingData.timeline[index], workingData.timeline[index - 1]];
      renderTimeline();
    });
    card.querySelector('[data-action="down"]').addEventListener('click', () => {
      if (index === workingData.timeline.length - 1) return;
      [workingData.timeline[index + 1], workingData.timeline[index]] = [workingData.timeline[index], workingData.timeline[index + 1]];
      renderTimeline();
    });
    container.appendChild(card);
  });
}

document.getElementById('add-timeline-item').addEventListener('click', () => {
  workingData.timeline.push({ year: '20xx', title: 'Nieuwe gebeurtenis', text: 'Beschrijving...', future: false });
  renderTimeline();
});

/* ================= GALERIJ ================= */
function renderGalleryList(key, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  workingData.gallery[key].forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card-toolbar">
        <button type="button" data-action="remove" class="remove-btn" title="Verwijder">✕</button>
      </div>
      <img class="image-preview g-preview" src="${escapeAttrJS(item.src)}" style="width:100%;height:120px;margin-bottom:8px;" alt="" />
      <label>Afbeelding (URL of upload)</label>
      <input type="text" class="g-src" value="${escapeAttrJS(item.src)}" />
      <input type="file" class="g-upload" accept="image/*" style="margin-top:6px;" />
      <label>Bijschrift</label>
      <input type="text" class="g-caption" value="${escapeAttrJS(item.caption)}" />
    `;
    card.querySelector('.g-src').addEventListener('input', e => {
      workingData.gallery[key][index].src = e.target.value;
      card.querySelector('.g-preview').src = e.target.value;
    });
    card.querySelector('.g-caption').addEventListener('input', e => workingData.gallery[key][index].caption = e.target.value);
    card.querySelector('.g-upload').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const dataUrl = await fileToDataUrl(file);
      workingData.gallery[key][index].src = dataUrl;
      card.querySelector('.g-src').value = dataUrl.slice(0, 60) + '... (upload)';
      card.querySelector('.g-preview').src = dataUrl;
    });
    card.querySelector('[data-action="remove"]').addEventListener('click', () => {
      workingData.gallery[key].splice(index, 1);
      renderGalleryList(key, containerId);
    });
    container.appendChild(card);
  });
}

document.getElementById('add-gallery-old').addEventListener('click', () => {
  workingData.gallery.old.push({ src: '', caption: 'Nieuwe foto' });
  renderGalleryList('old', 'gallery-old-list');
});
document.getElementById('add-gallery-modern').addEventListener('click', () => {
  workingData.gallery.modern.push({ src: '', caption: 'Nieuwe foto' });
  renderGalleryList('modern', 'gallery-modern-list');
});

/* ================= CONTACT ================= */
function fillContactForm() {
  document.getElementById('contact-heading-input').value = workingData.contact.heading;
  document.getElementById('contact-intro-input').value = workingData.contact.intro;
  document.getElementById('contact-org-input').value = workingData.contact.org;
  document.getElementById('contact-website-input').value = workingData.contact.website;
  document.getElementById('contact-email-input').value = workingData.contact.email;
  document.getElementById('contact-social-input').value = workingData.contact.social;
  document.getElementById('contact-disclaimer-input').value = workingData.contact.disclaimer;
}
document.getElementById('contact-heading-input').addEventListener('input', e => workingData.contact.heading = e.target.value);
document.getElementById('contact-intro-input').addEventListener('input', e => workingData.contact.intro = e.target.value);
document.getElementById('contact-org-input').addEventListener('input', e => workingData.contact.org = e.target.value);
document.getElementById('contact-website-input').addEventListener('input', e => workingData.contact.website = e.target.value);
document.getElementById('contact-email-input').addEventListener('input', e => workingData.contact.email = e.target.value);
document.getElementById('contact-social-input').addEventListener('input', e => workingData.contact.social = e.target.value);
document.getElementById('contact-disclaimer-input').addEventListener('input', e => workingData.contact.disclaimer = e.target.value);

/* ================= DATA BEHEER ================= */
document.getElementById('export-json').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(workingData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'eindhoven800-content.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('import-json').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    workingData = parsed;
    refreshAllForms();
    showBanner('Content geïmporteerd. Klik op "Wijzigingen opslaan" om te bevestigen.', 'success');
  } catch (err) {
    showBanner('Kon het bestand niet importeren: ongeldig JSON-formaat.', 'error');
  }
});

document.getElementById('reset-data').addEventListener('click', () => {
  if (!confirm('Weet je zeker dat je alle content wilt terugzetten naar de standaardinhoud? Niet-opgeslagen wijzigingen gaan verloren.')) return;
  workingData = cloneData(DEFAULT_DATA);
  refreshAllForms();
  showBanner('Content teruggezet naar standaard. Klik op "Wijzigingen opslaan" om te bevestigen.', 'success');
});

/* ================= OPSLAAN ================= */
document.getElementById('save-btn').addEventListener('click', () => {
  saveCmsData(workingData);
  showBanner('Wijzigingen opgeslagen! De website toont nu de nieuwe content.', 'success');
});

/* ---------- Escaping helpers (voor het invullen van HTML-strings in inputs) ---------- */
function escapeHtmlJS(str) {
  if (str == null) return '';
  return String(str);
}
function escapeAttrJS(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/* ---------- Init ---------- */
function refreshAllForms() {
  fillHeroForm();
  fillCountdownForm();
  renderHistorySections();
  fillHistoryExtras();
  renderTimeline();
  renderGalleryList('old', 'gallery-old-list');
  renderGalleryList('modern', 'gallery-modern-list');
  fillContactForm();
}

refreshAllForms();
