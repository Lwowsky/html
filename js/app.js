renderAll();
applyFilter();

// Ensure avatar menu and player info are rendered on load so the avatar
// menu is always visible in the header area.
const avatarMenuEl = document.getElementById('avatarMenu');
const playerInfoEl = document.getElementById('playerInfo');

try {
	if (avatarMenuEl && typeof renderAvatarMenu === 'function') {
		renderAvatarMenu(avatarMenuEl);
	}
} catch (e) { /* ignore if module not loaded */ }

try {
	if (playerInfoEl && typeof renderPlayerInfo === 'function') {
		renderPlayerInfo(playerInfoEl);
	}
} catch (e) { /* ignore if module not loaded */ }
