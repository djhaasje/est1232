/* ============================================================
   render.js — Rendert de content uit data.js (met eventuele CMS-
   aanpassingen uit localStorage) in de statische pagina.
   ============================================================ */

function renderSite(data) {
  // ---- Hero ----
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.src = data.hero.image;
    heroImg.alt = data.hero.imageAlt || 'Eindhoven';
  }
  const heroKicker = document.getElementById('hero-kicker');
  if (heroKicker) heroKicker.textContent = data.hero.kicker;
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.innerHTML = data.hero.title;
  const heroSub = document.getElementById('hero-sub');
  if (heroSub) heroSub.textContent = data.hero.subtitle;

  // ---- Geschiedenis ----
  const historyText = document.getElementById('history-text');
  if (historyText) {
    historyText.innerHTML = data.history.sections.map(s => `
      <h3>${escapeHtml(s.title)}</h3>
      <p>${s.text}</p>
    `).join('');
  }
  const factsList = document.getElementById('history-facts-list');
  if (factsList) {
    factsList.innerHTML = data.history.facts.map(f => `<li>${f}</li>`).join('');
  }
  const factQuote = document.getElementById('history-quote');
  if (factQuote) factQuote.textContent = `"${data.history.quote}"`;

  // ---- Tijdlijn ----
  const track = document.getElementById('tl-track');
  if (track) {
    track.innerHTML = data.timeline.map(item => `
      <div class="tl-item ${item.future ? 'tl-item-future' : ''}">
        <div class="tl-year">${escapeHtml(item.year)}</div>
        <div class="tl-card">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.text)}</p>
        </div>
      </div>
    `).join('');
  }

  // ---- Galerij ----
  const oldGallery = document.getElementById('gallery-old');
  if (oldGallery) {
    oldGallery.innerHTML = data.gallery.old.map(g => `
      <figure>
        <img loading="lazy" src="${g.src}" alt="${escapeHtml(g.caption)}">
        <figcaption>${escapeHtml(g.caption)}</figcaption>
      </figure>
    `).join('');
  }
  const modernGallery = document.getElementById('gallery-modern');
  if (modernGallery) {
    modernGallery.innerHTML = data.gallery.modern.map(g => `
      <figure>
        <img loading="lazy" src="${g.src}" alt="${escapeHtml(g.caption)}">
        <figcaption>${escapeHtml(g.caption)}</figcaption>
      </figure>
    `).join('');
  }

  // ---- Contact ----
  const cHeading = document.getElementById('contact-heading');
  if (cHeading) cHeading.textContent = data.contact.heading;
  const cIntro = document.getElementById('contact-intro');
  if (cIntro) cIntro.innerHTML = data.contact.intro;
  const cList = document.getElementById('contact-list');
  if (cList) {
    cList.innerHTML = `
      <li><strong>Organisatie:</strong> ${escapeHtml(data.contact.org)}</li>
      <li><strong>Website:</strong> <a href="${escapeAttr(data.contact.website)}" target="_blank" rel="noopener">${escapeHtml(data.contact.website.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a></li>
      <li><strong>E-mail:</strong> ${escapeHtml(data.contact.email)}</li>
      <li><strong>Social:</strong> ${escapeHtml(data.contact.social)}</li>
    `;
  }
  const cDisclaimer = document.getElementById('contact-disclaimer');
  if (cDisclaimer) {
    cDisclaimer.innerHTML = `${escapeHtml(data.contact.disclaimer)} <a href="${escapeAttr(data.contact.website)}" target="_blank" rel="noopener">${escapeHtml(data.contact.website)}</a>.`;
  }

  // ---- Aftelklok ----
  const cdLabel = document.getElementById('countdown-label');
  if (cdLabel) cdLabel.textContent = data.countdown.label;
  window.COUNTDOWN_TARGET = data.countdown.targetDate;
  if (typeof startCountdown === 'function') startCountdown(data.countdown.targetDate);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  const data = loadCmsData();
  renderSite(data);
});
