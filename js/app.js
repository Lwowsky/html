renderAll();
applyFilter();

const playerInfoEl = document.getElementById('playerInfo');

try {
  if (playerInfoEl && typeof renderPlayerInfo === 'function') {
    renderPlayerInfo(playerInfoEl);
  }
} catch (e) {}
