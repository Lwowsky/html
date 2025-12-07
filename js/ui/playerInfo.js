function renderPlayerInfo(container) {
  if (!container) container = document.getElementById("playerInfo");

  const avatar = getAvatar();
  const totalXP = getXP();
  const currentLevelXP = getCurrentLevelXP();
  const nextLevelXP = getXPNeededForNextLevel();
  const xpProgress = getXPProgress();

  container.innerHTML = `
    <div class="player-box">
      <img class="player-avatar" src="${avatar.icon}" />
      <div class="player-stats">
        <div>Рівень: <strong>${getLevel()}</strong></div>
        <div>XP: ${currentLevelXP} / ${nextLevelXP} (всього: ${totalXP})</div>
        <div class="xp-bar">
          <div class="xp-fill" style="width:${xpProgress}%"></div>
        </div>
      </div>
    </div>
  `;
}
