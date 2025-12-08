function renderPlayerInfo(container) {
  if (!container) container = document.getElementById("playerInfo");

  const avatar = getAvatar();
  const totalXP = getXP();
  const currentLevelXP = getCurrentLevelXP();
  const nextLevelXP = getXPNeededForNextLevel();
  const xpProgress = getXPProgress(); // % для width і тексту

  container.innerHTML = `
    <div class="player-box">
      <img class="player-avatar" id="playerAvatarClick" src="${avatar.icon}" />

      <div class="player-stats">
        <div>Рівень: <strong>${getLevel()}</strong></div>
        <div>XP: ${currentLevelXP} / ${nextLevelXP} (всього: ${totalXP})</div>

        <div class="xp-bar">
          <div class="xp-fill" style="width:${xpProgress}%"></div>
          <span class="xp-text">${xpProgress}%</span>
        </div>
      </div>
    </div>

    <div id="avatarDropdown" class="avatar-dropdown"></div>
  `;

  const dropdown = document.getElementById("avatarDropdown");
  const avatarClick = document.getElementById("playerAvatarClick");

  // Заповнення меню аватарів
  dropdown.innerHTML = AVATARS.map(a => `
    <div class="avatar-item" data-id="${a.id}">
      <img src="${a.icon}" width="40" height="40" />
      <span>${a.name}</span>
    </div>
  `).join("");

  // Показ / сховати меню
  avatarClick.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Вибір аватара
  dropdown.querySelectorAll(".avatar-item").forEach(item => {
    item.addEventListener("click", () => {
      setAvatar(item.dataset.id);
      renderPlayerInfo(container); // оновити UI
    });
  });

  // Закривати меню при натисканні поза ним
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) dropdown.style.display = "none";
  });
}
