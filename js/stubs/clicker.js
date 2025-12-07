/* ================== Clicker game ================== */
function renderClickerStub(container) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px; padding:10px;">
      
      <div style="font-size:2.4rem;font-weight:700" id="clickScore">0</div>

      <button id="bigClick" 
        style="
          width:140px;height:140px;border-radius:50%;
          background:#ff4747;border:none;color:white;font-size:1.4rem;
          cursor:pointer;transition:0.1s;box-shadow:0 4px 12px rgba(0,0,0,0.3);
        ">
        CLICK
      </button>

      <audio id="clickSound" src="sounds/click.wav"></audio>

      <div class="small">⏳ Time left: <span id="timeLeft">10</span>s</div>
      <div class="small">🏆 Record: <span id="bestScore">0</span></div>

      <div style="display:flex;gap:10px;margin-top:10px">
        <button id="startClick" class="btn secondary">Start</button>
        <button id="resetClick" class="btn secondary">Reset</button>
      </div>
    </div>
  `;

  let score = 0;
  let timeLeft = 10;
  let timer = null;
  let running = false;
  let best = localStorage.getItem("clickerBest") || 0;

  const scoreEl = container.querySelector('#clickScore');
  const timeEl = container.querySelector('#timeLeft');
  const bestEl = container.querySelector('#bestScore');
  const bigClick = container.querySelector('#bigClick');
  const startBtn = container.querySelector('#startClick');
  const resetBtn = container.querySelector('#resetClick');
  const sound = container.querySelector('#clickSound');

  bestEl.textContent = best;

  function startGame() {
    if (running) return;
    running = true;
    score = 0;
    timeLeft = 10;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function endGame() {
    running = false;
    clearInterval(timer);

    if (score > best) {
      best = score;
      localStorage.setItem("clickerBest", best);
    }

    bestEl.textContent = best;

    alert("⏳ Час вийшов!\nВаш результат: " + score);
    // нагорода XP та оновлення інформації про гравця
    try {
      addXP(score);
      renderPlayerInfo(document.getElementById("playerInfo"));
    } catch (e) {
      // якщо функції відсутні — ігноруємо
    }
  }

  bigClick.addEventListener("click", () => {
    if (!running) return;

    score++;
    scoreEl.textContent = score;

    // анімація кнопки
    bigClick.style.transform = "scale(0.9)";
    setTimeout(() => (bigClick.style.transform = "scale(1)"), 100);

    // звук
    sound.currentTime = 1;
    sound.play();
  });

  startBtn.addEventListener("click", startGame);

  resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(timer);
    score = 0;
    timeLeft = 10;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
  });
}


