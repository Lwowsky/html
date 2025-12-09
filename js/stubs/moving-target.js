function renderTargetStub(container) {
  container.innerHTML = `
    <div class="small">Стріляй по мішені. Вибери рівень та швидкість.</div>
    
    <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap">
      <label class="small">
        <select id="tDiff">
          <option value="easy">Легка</option>
          <option value="medium">Середня</option>
          <option value="hard">Важка</option>
        </select>
      </label>

      <label class="small">Швидкість:
        <input id="tSpeed" type="number" value="4" min="1" max="12" style="width:60px;">
      </label>

      <label class="small">Життя:
        <input id="tLives" type="number" value="3" min="1" max="10" style="width:60px;">
      </label>

      <button id="tStart" class="btn secondary">Старт</button>
    </div>

    <div class="small" style="margin-top:8px">
      ❤️ Життя: <span id="tLifeCount">—</span> |
      🎯 Очки: <span id="tScore">0</span> |
      🏆 Рекорд: <span id="tBest">0</span>
    </div>
  `;

  const stage = document.createElement("div");
  stage.style.position = "relative";
  stage.style.height = "200px";
  stage.style.marginTop = "10px";
  stage.style.borderRadius = "8px";
  stage.style.overflow = "hidden";
  stage.style.border = "1px solid rgba(255,255,255,0.08)";
  stage.style.background = "rgba(255,255,255,0.03)";
  container.appendChild(stage);

  let intervalId = null;
  let gameRunning = false;
  let speed = 4;
  let lives = 3;
  let score = 0;
  let targetSize = 40;
  let target = null; 

  const lifeEl = container.querySelector("#tLifeCount");
  const scoreEl = container.querySelector("#tScore");
  const bestEl = container.querySelector("#tBest");
  const startBtn = container.querySelector("#tStart");
  const diffSelect = container.querySelector("#tDiff");

  const soundHit = new Audio("sounds/click.wav");

  let bestScore = Number(localStorage.getItem("targetBest") || 0);
  bestEl.textContent = bestScore;

  function startGame() {
    clearInterval(intervalId);
    stage.innerHTML = "";

    score = 0;
    scoreEl.textContent = 0;

    lives = Number(container.querySelector("#tLives").value) || 3;
    lifeEl.textContent = lives;

    speed = Number(container.querySelector("#tSpeed").value) || 4;

    gameRunning = true;

    const diff = diffSelect.value;
    if (diff === "easy") targetSize = 50;
    else if (diff === "medium") targetSize = 40;
    else targetSize = 28;

    target = document.createElement("div");
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
    target.style.background = "#fb7185";
    target.style.borderRadius = "50%";
    target.style.position = "absolute";
    target.style.top = "80px";
    target.style.left = "10px";
    target.style.cursor = "pointer";
    target.style.transition = "transform 0.1s";
    stage.appendChild(target);

    let x = 10;
    let dir = 1;

    intervalId = setInterval(() => {
      if (!gameRunning) return;

      x += dir * speed;

      if (x > stage.clientWidth - targetSize) {
        dir = -1;
        loseLife(); 
      }
      if (x < 0) {
        dir = 1;
        loseLife(); 
      }

      target.style.left = x + "px";
    }, 30);

    target.addEventListener("click", (event) => {
      if (!gameRunning) return;
      event.stopPropagation(); 

      score++;
      scoreEl.textContent = score;

      target.style.transform = "scale(0.7)";
      setTimeout(() => (target.style.transform = "scale(1)"), 120);

      soundHit.currentTime = 0;
      soundHit.play();

      target.style.top =
        Math.random() * (stage.clientHeight - targetSize) + "px";
    });

    stage.addEventListener("click", (e) => {
      if (!gameRunning) return;
      if (e.target === stage) {
        loseLife(); 
      }
    });
  }

  function loseLife() {
    if (!gameRunning) return;

    lives--;
    lifeEl.textContent = lives;

    if (lives <= 0) {
      endGame();
    }
  }

  function endGame() {
    gameRunning = false;
    clearInterval(intervalId);

      if (target && target.parentNode) {
      target.remove();
      target = null;
    }

    const diff = diffSelect.value;
    let diffMult = 1;
    if (diff === "medium") diffMult = 3;
    else if (diff === "hard") diffMult = 5;

    const speedVal = Number(container.querySelector("#tSpeed").value) || 4;
    const speedBonus = Math.max(1, Math.floor(speedVal / 4));

    const totalXP = score * diffMult * speedBonus;

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("targetBest", bestScore);
      bestEl.textContent = bestScore;
    }
    if (typeof addXP === "function") {
      addXP(totalXP);
    }
    if (typeof renderPlayerInfo === "function") {
      renderPlayerInfo();
    }

    alert(
      `Гру завершено!\nОчки: ${score}\nРекорд: ${bestScore}\nНараховано XP: ${totalXP}`
    );
  }

  startBtn.addEventListener("click", startGame);
}
