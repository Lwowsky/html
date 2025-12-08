function renderPlayerInfo(container) {
  if (!container) container = document.getElementById("playerInfo");

  const avatar = getAvatar();
  const totalXP = getXP();
  const currentLevelXP = getCurrentLevelXP();
  const nextLevelXP = getXPNeededForNextLevel();
  const xpProgress = getXPProgress();

  const playerName = localStorage.getItem("playerName") || "Гравець";

  container.innerHTML = `
    <div class="player-box">
      <img class="player-avatar" id="playerAvatarClick" src="${avatar.icon}" />

      <div class="player-stats">
        <div><strong style="font-size: 1.3rem; color: orange">${playerName}</strong></div>
        <div>Рівень: <strong>${getLevel()}</strong></div>
        <div>XP: ${currentLevelXP} / ${nextLevelXP}</div>

        <div class="xp-bar">
          <div class="xp-fill" style="width:${xpProgress}%"></div>
          <span class="xp-text">${xpProgress}%</span>
        </div>
      </div>
    </div>

    <div id="avatarDropdown" class="avatar-dropdown-menu">
      <div class="menu-item" id="menuChangeAvatar">🎭 Змінити аватар</div>
      <div class="menu-item" id="menuEditProfile">⚙️ Профіль</div>
      <div class="menu-item" id="menuShowStats">📊 Статистика</div>
      <div class="menu-item red" id="menuResetPlayer">🗑 Скинути дані гравця</div>
    </div>
  `;

  const dropdown = document.getElementById("avatarDropdown");
  const avatarClick = document.getElementById("playerAvatarClick");

  avatarClick.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) dropdown.style.display = "none";
  });

  document.getElementById("menuChangeAvatar").addEventListener("click", () => {
    openAvatarSelection();
  });

  document.getElementById("menuEditProfile").addEventListener("click", () => {
    editProfile();
  });

  document.getElementById("menuShowStats").addEventListener("click", () => {
    openStatsModal();
  });

  document.getElementById("menuResetPlayer").addEventListener("click", () => {
    if (confirm("Точно скинути всі дані гравця?")) {
      localStorage.clear();
      location.reload();
    }
  });
}


// Модальне вікно статистики
function openStatsModal() {
  const modal = document.getElementById("statsModal");
  const statsBlock = document.getElementById("statsContent");
  const days = getDaysPlayed();
  const level = getLevel();
  const totalXP = getXP();
  const currentXP = getCurrentLevelXP();
  const nextXP = getXPNeededForNextLevel();
  const xpToNext = nextXP - currentXP;
  statsBlock.innerHTML = `
    <p><strong>📅 Днів у грі:</strong> ${days}</p>
    <p><strong>🏅 Рівень:</strong> ${level}</p>
    <p><strong>🔋 Поточний XP:</strong> ${currentXP} / ${nextXP}</p>
    <p><strong>⬆ До наступного рівня:</strong> ${xpToNext}</p>
    <p><strong>⭐ Всього XP:</strong> ${totalXP}</p>
  `;

  modal.classList.remove("hidden");
}

document.getElementById("closeStats").addEventListener("click", () => {
  document.getElementById("statsModal").classList.add("hidden");
});

document.getElementById("statsModal").addEventListener("click", (e) => {
  if (e.target.id === "statsModal") {
    document.getElementById("statsModal").classList.add("hidden");
  }
});


// Дні у грі 

function getDaysPlayed() {
  let firstLogin = localStorage.getItem("firstLogin");

  if (!firstLogin) {
    firstLogin = Date.now();
    localStorage.setItem("firstLogin", firstLogin);
  }

  const diff = Date.now() - Number(firstLogin);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
