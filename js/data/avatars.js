const AVATARS = [
  // 👦 Хлопчики
  {
    id: 1,
    name: "Новачок",
    rarity: "common",
    gender: "male",
    icon: "img/avatars/common.png",
  },
  {
    id: 2,
    name: "Досвідчений",
    rarity: "rare",
    gender: "male",
    icon: "img/avatars/rare.png",
  },
  {
    id: 3,
    name: "Профі",
    rarity: "epic",
    gender: "male",
    icon: "img/avatars/epic.png",
  },
  {
    id: 4,
    name: "Легенда",
    rarity: "legendary",
    gender: "male",
    icon: "img/avatars/legendary.png",
  },
  {
    id: 5,
    name: "Епічний",
    rarity: "mythic",
    gender: "male",
    icon: "img/avatars/mythic.png",
  },

  // 👧 Дівчатка
  {
    id: 6,
    name: "Новачка",
    rarity: "common",
    gender: "female",
    icon: "img/avatars/common_f.png",
  },
  {
    id: 7,
    name: "Досвідчена",
    rarity: "rare",
    gender: "female",
    icon: "img/avatars/rare_f.png",
  },
  {
    id: 8,
    name: "Профі",
    rarity: "epic",
    gender: "female",
    icon: "img/avatars/epic_f.png",
  },
  {
    id: 9,
    name: "Легенда",
    rarity: "legendary",
    gender: "female",
    icon: "img/avatars/legendary_f.png",
  },
  {
    id: 10,
    name: "Епічна",
    rarity: "mythic",
    gender: "female",
    icon: "img/avatars/mythic_f.png",
  },
];

function setAvatar(id) {
  localStorage.setItem("avatar", id);
}

function getAvatar() {
  const id = localStorage.getItem("avatar");
  const gender = localStorage.getItem("playerGender") || "male";

  if (id) {
    const found = AVATARS.find((a) => a.id == id);
    if (found) return found;
  }
  return (
    AVATARS.find((a) => a.gender === gender && a.rarity === "common") ||
    AVATARS[0]
  );
}

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

  if (newLevel > oldLevel) {
    autoUpgradeAvatar(newLevel);
  }

  return newXP;
}

function xpForLevel(level) {
  return 100 * Math.pow(2, level - 1);
}

function getLevel() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }
  return level;
}

function getXPProgress() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }

  return Math.floor((xp / xpForLevel(level)) * 100);
}

function getCurrentLevelXP() {
  let xp = getXP();
  let level = 1;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }

  return xp;
}

function getXPNeededForNextLevel() {
  return xpForLevel(getLevel());
}

function autoUpgradeAvatar(level) {
  if (AVATARS[level - 1]) {
    setAvatar(AVATARS[level - 1].id);
  }

  if (typeof renderPlayerInfo === "function") {
    renderPlayerInfo();
  }
}

function openAvatarSelection() {
  const modal = document.getElementById("avatarModal");
  const listEl = document.getElementById("avatarList");
  const gender = localStorage.getItem("playerGender") || "male";

  const currentLevel = getLevel();
  const currentAvatar = getAvatar();

  listEl.innerHTML = "";

  const avatars = AVATARS.filter((a) => a.gender === gender);

  avatars.forEach((a) => {
    const card = document.createElement("div");
    card.className = "avatar-card";

    if (currentAvatar.id === a.id) {
      card.classList.add("active");
    }

    const unlockLevel = {
      common: 1,
      rare: 2,
      epic: 3,
      legendary: 4,
      mythic: 5,
    }[a.rarity];

    const locked = currentLevel < unlockLevel;

    if (locked) {
      card.classList.add("locked");
    }

    card.innerHTML = `
      <img src="${a.icon}">
      <span>${a.name}</span>
      ${
        locked
          ? `<div class="avatar-locked-text">Відкриється на рівні ${unlockLevel}</div>`
          : ""
      }
    `;

    if (!locked) {
      card.addEventListener("click", () => {
        setAvatar(a.id);
        modal.classList.add("hidden");
        renderPlayerInfo();
      });
    }

    listEl.appendChild(card);
  });

  modal.classList.remove("hidden");
}

function editProfile() {
  const modal = document.getElementById("profileModal");

  document.getElementById("profileName").value =
    localStorage.getItem("playerName") || "";

  document.getElementById("profileGender").value =
    localStorage.getItem("playerGender") || "male";

  modal.classList.remove("hidden");
}

document.getElementById("saveProfile").addEventListener("click", () => {
  const name = document.getElementById("profileName").value.trim();
  const gender = document.getElementById("profileGender").value;

  if (name.length < 2) {
    alert("Ім’я повинно містити хоча б 2 символи.");
    return;
  }

  localStorage.setItem("playerName", name);
  localStorage.setItem("playerGender", gender);

  updateAvatarByGender();

  document.getElementById("profileModal").classList.add("hidden");
  renderPlayerInfo();
});

document.getElementById("closeProfile").addEventListener("click", () => {
  document.getElementById("profileModal").classList.add("hidden");
});

function updateAvatarByGender() {
  const gender = localStorage.getItem("playerGender") || "male";
  const currentAvatar = getAvatar();
  const newAvatar = AVATARS.find(
    (a) => a.rarity === currentAvatar.rarity && a.gender === gender
  );

  if (newAvatar) {
    setAvatar(newAvatar.id);
  }
}

function autoUpgradeAvatar(level) {
  const gender = localStorage.getItem("playerGender") || "male";

  const raritiesByLevel = ["common", "rare", "epic", "legendary", "mythic"];
  const targetRarity =
    raritiesByLevel[Math.min(level - 1, raritiesByLevel.length - 1)];

  const avatar = AVATARS.find(
    (a) => a.rarity === targetRarity && a.gender === gender
  );

  if (avatar) {
    setAvatar(avatar.id);
  }

  if (typeof renderPlayerInfo === "function") {
    renderPlayerInfo();
  }
}

document.getElementById("closeAvatarModal").addEventListener("click", () => {
  document.getElementById("avatarModal").classList.add("hidden");
});

document.getElementById("avatarModal").addEventListener("click", (e) => {
  if (e.target.id === "avatarModal") {
    document.getElementById("avatarModal").classList.add("hidden");
  }
});
