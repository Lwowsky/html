const modalBack = document.getElementById('modalBack');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalGoal = document.getElementById('modalGoal');
const modalBullets = document.getElementById('modalBullets');
const modalTips = document.getElementById('modalTips');
const playArea = document.getElementById('playArea');
const playBtn = document.getElementById('playBtn');
const docsBtn = document.getElementById('docsBtn');
const exampleBtn = document.getElementById('exampleBtn');
const closeModal = document.getElementById('closeModal');

let activeGame = null;

function openModal(game, mode = 'details'){
  activeGame = game;
  modalBack.style.display = 'flex';

  modalTitle.textContent = game.title;
  modalDesc.textContent = game.desc;
  modalGoal.textContent = game.goal;

  modalBullets.innerHTML = game.bullets.map(b => `<li>${b}</li>`).join('');
  modalTips.innerHTML = game.tips.map(t => `<li>${t}</li>`).join('');

  playArea.innerHTML = '';
renderPlayerInfo(document.getElementById("playerInfo"));
  if (mode === 'play') startStub(game);
}

function closeModalFn(){
  modalBack.style.display = 'none';
  stopStub();
}

function stopStub(){
  playArea.innerHTML = '';
}

function startStub(game){
  stopStub();

  switch(game.id){
    case 'clicker': renderClickerStub(playArea); break;
    case 'puzzle': renderPuzzleGame(playArea); break;
    case 'moving-target': renderTargetStub(playArea); break;
    case 'minigolf': renderMinigolfStub(playArea); break;
    case 'butterflies': renderButterfliesStub(playArea); break;

    default:
      playArea.textContent = "Демо ще не зроблено";
  }
}

closeModal.addEventListener("click", closeModalFn);
modalBack.addEventListener("click", e => { if (e.target === modalBack) closeModalFn(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModalFn(); });

