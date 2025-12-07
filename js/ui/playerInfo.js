function renderPlayerInfo(container) {
  if (!container) container = document.getElementById("playerInfo");

  const avatar = getAvatar();

  container.innerHTML = `
    <div class="player-box">
      <img class="player-avatar" src="${avatar.icon}" />
      <div class="player-stats">
        <div>Рівень: <strong>${getLevel()}</strong></div>
        <div>XP: ${getXPProgress()} / 100</div>
        <div class="xp-bar">
          <div class="xp-fill" style="width:${getXPProgress()}%"></div>
        </div>
      </div>
    </div>
  `;
}
