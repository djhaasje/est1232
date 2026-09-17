/* ============================================================
   admin-auth.js — Eenvoudig wachtwoordscherm voor het CMS.
   Let op: dit is een statische site zonder server, dus dit is
   client-side bescherming (voorkomt toevallige/ongewenste
   bezoekers). Het is GEEN vervanging voor echte serverauthenticatie.
   Het wachtwoord wordt nooit in platte tekst opgeslagen: alleen
   de SHA-256 hash staat in de broncode.
   ============================================================ */
(function () {
  const PASSWORD_HASH = '906bdbe665d6a47ee2c7b2682ac5b9cf06c206bfec68d171f2e88a517a7a8e54';
  const SESSION_KEY = 'est1232-admin-auth';

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function showGate() {
    document.documentElement.classList.add('admin-locked');
    const overlay = document.createElement('div');
    overlay.id = 'admin-auth-overlay';
    overlay.innerHTML = `
      <div class="admin-auth-box">
        <h2>Beheerpaneel</h2>
        <p>Voer het wachtwoord in om verder te gaan.</p>
        <input type="password" id="admin-auth-input" autocomplete="current-password" />
        <button type="button" id="admin-auth-submit">Inloggen</button>
        <p id="admin-auth-error" class="admin-auth-error"></p>
      </div>`;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#admin-auth-input');
    const submit = overlay.querySelector('#admin-auth-submit');
    const error = overlay.querySelector('#admin-auth-error');

    async function tryLogin() {
      const hash = await sha256(input.value);
      if (hash === PASSWORD_HASH) {
        sessionStorage.setItem(SESSION_KEY, '1');
        document.documentElement.classList.remove('admin-locked');
        overlay.remove();
      } else {
        error.textContent = 'Onjuist wachtwoord.';
        input.value = '';
        input.focus();
      }
    }

    submit.addEventListener('click', tryLogin);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
    input.focus();
  }

  if (sessionStorage.getItem(SESSION_KEY) !== '1') {
    showGate();
  }
})();
