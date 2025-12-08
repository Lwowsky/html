const modalBack = document.getElementById("modalBack");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGoal = document.getElementById("modalGoal");
const modalBullets = document.getElementById("modalBullets");
const modalTips = document.getElementById("modalTips");
const playArea = document.getElementById("playArea");
const playBtn = document.getElementById("playBtn");
const docsBtn = document.getElementById("docsBtn");
const exampleBtn = document.getElementById("exampleBtn");
const closeModal = document.getElementById("closeModal");

let activeGame = null;

function openModal(game, mode = "details") {
  activeGame = game;
  modalBack.style.display = "flex";

  modalTitle.textContent = game.title;
  modalDesc.innerHTML = `
  <div style="text-align:center; font-size:1.2rem; color:white;">
    <strong>Опис:</strong>
  </div>
  ${game.desc}
`;
  modalGoal.textContent = game.goal;

  modalBullets.innerHTML = game.bullets.map((b) => `<li>${b}</li>`).join("");
  modalTips.innerHTML = game.tips.map((t) => `<li>${t}</li>`).join("");

  playArea.innerHTML = "";

  if (mode === "play") startStub(game);
}
function closeModalFn() {
  modalBack.style.display = "none";
  stopStub();
}

function stopStub() {
  playArea.innerHTML = "";
}

function startStub(game) {
  stopStub();

  switch (game.id) {
    case "clicker":
      renderClickerStub(playArea);
      break;
    case "puzzle":
      renderPuzzleGame(playArea);
      break;
    case "moving-target":
      renderTargetStub(playArea);
      break;
    case "minigolf":
      playArea.textContent = "Демо 'Міні-гольф' ще не зроблено.";
      break;
    case "butterflies":
      renderButterfliesStub(playArea);
      break;
    case "speedway":
      playArea.textContent = "Демо 'Спідвей' ще не зроблено.";
      break;

    case "space-def":
      playArea.textContent = "Демо 'Космічний захист' ще не зроблено.";
      break;

    case "block-shift":
      playArea.textContent = "Демо 'Переставлення блоків' ще не зроблено.";
      break;

    case "rock":
      playArea.textContent = "Демо 'Камінь, ножиці і папір' ще не зроблено.";
      break;
    default:
      playArea.textContent = "Демо ще не зроблено";
  }
}

closeModal.addEventListener("click", closeModalFn);
modalBack.addEventListener("click", (e) => {
  if (e.target === modalBack) closeModalFn();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalFn();
});
