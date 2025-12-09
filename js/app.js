renderAll();
applyFilter();

const playerInfoEl = document.getElementById('playerInfo');

try {
  if (playerInfoEl && typeof renderPlayerInfo === 'function') {
    renderPlayerInfo(playerInfoEl);
  }
} catch (e) {}

  const startYear = 2025;

  const currentYear = new Date().getFullYear();
  const yearsText = (startYear === currentYear)
    ? startYear
    : `${startYear}–${currentYear}`;

  document.getElementById('years').textContent = yearsText;