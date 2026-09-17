/* ============================================================
   countdown.js — Grote, live aftelklok naar de 800-jarige
   jubileumdatum van Eindhoven. Wordt aangestuurd vanuit render.js
   via startCountdown(targetDateString).
   ============================================================ */

let countdownInterval = null;

function startCountdown(targetDateString) {
  const targetDate = new Date(targetDateString);

  const dateEl = document.getElementById('countdown-date');
  if (dateEl && !isNaN(targetDate)) {
    dateEl.textContent = targetDate.toLocaleDateString('nl-NL', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  if (countdownInterval) clearInterval(countdownInterval);

  function tick() {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    if (!daysEl) return;

    if (isNaN(diff)) {
      daysEl.textContent = '----';
      hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '--';
      return;
    }

    if (diff <= 0) {
      daysEl.textContent = '0000';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const labelEl = document.getElementById('countdown-label');
      if (labelEl) labelEl.textContent = '🎉 Het is zover: 800 jaar Eindhoven! 🎉';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(4, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}
