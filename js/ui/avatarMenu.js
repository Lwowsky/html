function renderAvatarMenu(container) {
  container.innerHTML = `
    <div class="avatar-title">Вибери аватар</div>
    <div class="avatar-grid">
      ${AVATARS.map(a => `
        <div class="avatar-item" data-id="${a.id}">
          <img src="${a.icon}" />
          <div class="avatar-name">${a.name}</div>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".avatar-item").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.dataset.id;
      setAvatar(id);
      alert("Аватар змінено!");
    });
  });
}
function renderAvatarMenu(container) {
  // Render only the current avatar (no selection). This makes the avatar
  // menu always visible but non-interactive for choosing avatars.
  const avatar = (typeof getAvatar === 'function') ? getAvatar() : (AVATARS && AVATARS[0]);
  const level = (typeof getLevel === 'function') ? getLevel() : 1;
  const xpProgress = (typeof getXPProgress === 'function') ? getXPProgress() : 0;
  const toNext = Math.max(0, 100 - xpProgress);

  container.innerHTML = `
    <div class="avatar-current">
      <img src="${avatar.icon}" alt="${avatar.name}" class="avatar-menu-img" />
      <div class="avatar-details">
        <div class="avatar-name">${avatar.name}</div>
        <div class="avatar-meta">Рівень ${level} · до наступного ${toNext} XP</div>
        <div class="xp-bar avatar-xp-bar" aria-hidden="true">
          <div class="xp-fill" style="width:${xpProgress}%"></div>
        </div>
      </div>
    </div>
  `;
}
