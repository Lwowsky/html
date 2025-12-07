/* ================= Avatars list ================= */

const AVATARS = [
  { id: 1, name: "Котик", icon: "img/puzzles/p1.png" },
  { id: 2, name: "Песик", icon: "img/avatars/dog.png" },
  { id: 3, name: "Дельфін", icon: "img/avatars/dolphin.png" },
  { id: 4, name: "Робот", icon: "img/avatars/robot.png" },
  { id: 5, name: "Астронавт", icon: "img/avatars/astro.png" }
];

/* === Avatar save/load === */
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

function addXP(amount) {
  const xp = getXP() + amount;
  localStorage.setItem("xp", xp);
  return xp;
}

function getLevel() {
  const xp = getXP();
  return Math.floor(xp / 100) + 1;
}

function getXPProgress() {
  const xp = getXP();
  return xp % 100;
}
