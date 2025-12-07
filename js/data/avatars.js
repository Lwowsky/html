/* ================= Avatars list ================= */

const AVATARS = [
  { id: 1, name: "Новачок", rarity: "common", icon: "img/avatars/common.png" },
  { id: 2, name: "Досвідчений", rarity: "rare", icon: "img/avatars/rare.png" },
  { id: 3, name: "Профі", rarity: "epic", icon: "img/avatars/epic.png" },
  { id: 4, name: "Легенда", rarity: "legendary", icon: "img/avatars/legendary.png" },
  { id: 5, name: "Епічний", rarity: "mythic", icon: "img/avatars/mythic.png" }
];

/* ================= Avatar save/load ================= */

function setAvatar(id) {
  localStorage.setItem("avatar", id);
}

function getAvatar() {
  const id = localStorage.getItem("avatar");
  return AVATARS.find(a => a.id == id) || AVATARS[0];
}

/* ================= Player XP system ================= */

function getXP() {
  return Number(localStorage.getItem("xp") || 0);
}

function setXP(val) {
  localStorage.setItem("xp", val);
}

function addXP(amount) {
  let oldLevel = getLevel();
  let newXP = getXP() + amount;
  setXP(newXP);

  let newLevel = getLevel();

  // Якщо рівень виріс → апгрейд аватара
  if (newLevel > oldLevel) {
    autoUpgradeAvatar(newLevel);
  }

  return newXP;
}

/* ---- XP required for level (doubling each time) ---- */
function xpForLevel(level) {
  return 100 * Math.pow(2, level - 1);
}

/* ---- Calculate level based on XP ---- */
function getLevel() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }
  return level;
}

/* ---- Calculate XP progress to next level (0-100%) ---- */
function getXPProgress() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }

  return Math.floor((xp / xpForLevel(level)) * 100);
}

/* ---- Get current XP in level (how much XP grained for THIS level) ---- */
function getCurrentLevelXP() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }

  return xp;
}

/* ---- Get XP needed for next level ---- */
function getXPNeededForNextLevel() {
  return xpForLevel(getLevel());
}

/* ================= AUTO AVATAR UPGRADE ================= */

function autoUpgradeAvatar(level) {
  // Якщо аватар існує на цьому рівні → оновити
  if (AVATARS[level - 1]) {
    setAvatar(AVATARS[level - 1].id);
  }

  // Оновити UI профілю
  if (typeof renderPlayerInfo === "function") {
    renderPlayerInfo();
  }
}