/* ================= Levels data ================= */

const LEVELS = {
  clicker: [
    { id: 1, time: 10, goal: 30 },
    { id: 2, time: 15, goal: 60 },
    { id: 3, time: 20, goal: 100 }
  ],

  puzzle: [
    { id: 1, size: 3, image: "/img/puzzles/p1.png" },
    { id: 2, size: 4, image: "/img/puzzles/p2.png" },
    { id: 3, size: 5, image: "/img/puzzles/p3.png" }
  ],

  movingTarget: [
    { id: 1, speed: 4, lives: 3 },
    { id: 2, speed: 6, lives: 3 },
    { id: 3, speed: 8, lives: 2 }
  ],

  minigolf: [
    { id: 1, difficulty: "easy" },
    { id: 2, difficulty: "medium" },
    { id: 3, difficulty: "hard" }
  ]
};

/* === Level helpers === */
function getLevels(gameId) {
  return LEVELS[gameId] || [];
}

function saveBest(gameId, levelId, val) {
  localStorage.setItem(`${gameId}_best_${levelId}`, val);
}

function loadBest(gameId, levelId) {
  return localStorage.getItem(`${gameId}_best_${levelId}`) || null;
}
