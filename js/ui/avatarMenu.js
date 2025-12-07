function renderAvatarMenu(container) {
  const avatar = getAvatar();
  const level = getLevel();
  const xpProgress = getXPProgress();
  const toNext = 100 - xpProgress;

  container.innerHTML = `
    <div class="avatar-current">
      <img src="${avatar.icon}" alt="${avatar.name}" class="avatar-menu-img" />

      <div class="avatar-details">
        <div class="avatar-name">${avatar.name}</div>

        <div class="avatar-meta">
          Рівень ${level} · До наступного рівня ${toNext} XP
        </div>

        <div class="xp-bar avatar-xp-bar">
          <div class="xp-fill" style="width:${xpProgress}%"></div>
        </div>
      </div>
    </div>
  `;
}
