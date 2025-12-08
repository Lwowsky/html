/* ================== MiniGolf Full Game ================== */
function renderMinigolfStub(container){
  container.innerHTML = `
    <div class="small">
      Клікни по м’ячу, потягни для вибору напрямку та сили, відпусти — удар ⛳
    </div>
    <div style="display:flex;gap:10px;margin-top:8px;align-items:center;">
      <label class="small">
        Рівень:
        <select id="mgLevelSelect">
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
        </select>
      </label>
      <button id="mgReset" class="btn secondary">Перезапуск рівня</button>
    </div>
    <div class="small" style="margin-top:6px">
      Рівень: <span id="mgLevelLabel">1</span> |
      🏌️‍♂️ Удари: <span id="mgStrokes">0</span> |
      🏆 Найкращий: <span id="mgBest">—</span>
    </div>
  `;

  const field = document.createElement("div");
  field.style.position = "relative";
  field.style.width = "100%";
  field.style.height = "260px";
  field.style.marginTop = "10px";
  field.style.borderRadius = "12px";
  field.style.background = "#2e7d32";
  field.style.overflow = "hidden";
  field.style.boxShadow = "inset 0 0 10px rgba(0,0,0,0.5)";
  container.appendChild(field);

  const levelSelect = container.querySelector("#mgLevelSelect");
  const resetBtn = container.querySelector("#mgReset");
  const levelLabel = container.querySelector("#mgLevelLabel");
  const strokesEl = container.querySelector("#mgStrokes");
  const bestEl = container.querySelector("#mgBest");

  /* === Ball === */
  const ball = document.createElement("div");
  ball.style.position = "absolute";
  ball.style.width = "22px";
  ball.style.height = "22px";
  ball.style.borderRadius = "50%";
  ball.style.background = "white";
  ball.style.boxShadow = "0 0 4px rgba(0,0,0,0.4)";
  field.appendChild(ball);

  /* === Hole === */
  const hole = document.createElement("div");
  hole.style.position = "absolute";
  hole.style.width = "28px";
  hole.style.height = "28px";
  hole.style.borderRadius = "50%";
  hole.style.background = "#000000aa";
  hole.style.boxShadow = "inset 0 0 6px #000";
  field.appendChild(hole);

  /* === Aim arrow === */
  const aim = document.createElement("div");
  aim.style.position = "absolute";
  aim.style.height = "3px";
  aim.style.borderRadius = "3px";
  aim.style.background = "#fff";
  aim.style.opacity = "0";
  aim.style.transformOrigin = "0 50%";
  aim.style.pointerEvents = "none";
  field.appendChild(aim);

  /* === Zones / Obstacles === */
  function createZone(color) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.borderRadius = "6px";
    el.style.opacity = "0.85";
    el.style.background = color;
    field.appendChild(el);
    return el;
  }

  const water  = createZone("#4fc3f7");           // вода (reset)
  const hill   = createZone("linear-gradient(90deg,#66bb6a,#9ccc65)"); // гірка
  const sand   = createZone("#fdd835");           // пісок (сповільнює)
  const lava   = createZone("#f4511e");           // лава (reset)
  const slope1 = createZone("#8bc34a");           // схил
  const slope2 = createZone("#7cb342");
  const bumper = createZone("#cfd8dc");           // бампер
  const movingPlatform = createZone("#ffeb3b");   // рухома платформа

  /* === Sounds === */
  const hitSound  = new Audio("sounds/golf-hit.wav");   // додай файл, якщо треба
  const holeSound = new Audio("sounds/golf-hole.wav");

  /* === Physics vars === */
  let vx = 0, vy = 0;
  let dragging = false;
  let startX = 0, startY = 0;
  let strokes = 0;
  let activeLevel = 0;
  let finished = false;
  let movingDir = 1;
  let movingBaseX = 0;

  const BEST_KEY_PREFIX = "minigolfBestLevel"; // minigolfBestLevel0,1,2...

  function resetBall() {
    vx = vy = 0;
    ball.style.left = "40px";
    ball.style.top = (field.clientHeight / 2 - 11) + "px";
    ball.style.background = "white";
  }

  function loadBest() {
    const key = BEST_KEY_PREFIX + activeLevel;
    const best = localStorage.getItem(key);
    bestEl.textContent = best ? best : "—";
  }

  function saveBestIfNeeded() {
    const key = BEST_KEY_PREFIX + activeLevel;
    const best = localStorage.getItem(key);
    if (!best || strokes < Number(best)) {
      localStorage.setItem(key, String(strokes));
      bestEl.textContent = strokes;
    }
  }

  function setLevelLayout() {
    levelLabel.textContent = activeLevel + 1;
    strokes = 0;
    strokesEl.textContent = strokes;
    finished = false;
    resetBall();

    const w = field.clientWidth;
    const h = field.clientHeight;

    // За замовчуванням все ховаємо
    [water, hill, sand, lava, slope1, slope2, bumper, movingPlatform].forEach(z => {
      z.style.display = "none";
    });

    // Позиції & видимість за рівнями
    if (activeLevel === 0) {
      // Простий: вода + гірка
      hole.style.left = (w - 80) + "px";
      hole.style.top  = (h / 2 - 14) + "px";

      water.style.display = "block";
      water.style.width = "90px";
      water.style.height = "40px";
      water.style.left = "160px";
      water.style.top  = (h / 2 + 30) + "px";

      hill.style.display = "block";
      hill.style.width = "110px";
      hill.style.height = "40px";
      hill.style.left = "210px";
      hill.style.top  = "40px";
    }
    else if (activeLevel === 1) {
      // Складніший: пісок + лава + бампер
      hole.style.left = (w - 90) + "px";
      hole.style.top  = (h / 2 - 60) + "px";

      sand.style.display = "block";
      sand.style.width = "120px";
      sand.style.height = "50px";
      sand.style.left = "180px";
      sand.style.top  = (h / 2 - 25) + "px";

      lava.style.display = "block";
      lava.style.width = "90px";
      lava.style.height = "40px";
      lava.style.left = "260px";
      lava.style.top  = (h / 2 + 40) + "px";

      bumper.style.display = "block";
      bumper.style.width = "20px";
      bumper.style.height = "80px";
      bumper.style.left = (w / 2 + 40) + "px";
      bumper.style.top  = (h / 2 - 40) + "px";
    }
    else if (activeLevel === 2) {
      // Найскладніший: схили + рухома платформа
      hole.style.left = (w - 70) + "px";
      hole.style.top  = "40px";

      slope1.style.display = "block";
      slope1.style.width = "120px";
      slope1.style.height = "50px";
      slope1.style.left = "160px";
      slope1.style.top  = (h / 2 - 70) + "px";

      slope2.style.display = "block";
      slope2.style.width = "120px";
      slope2.style.height = "50px";
      slope2.style.left = "230px";
      slope2.style.top  = (h / 2 + 10) + "px";

      movingPlatform.style.display = "block";
      movingPlatform.style.width = "70px";
      movingPlatform.style.height = "16px";
      movingPlatform.style.top = (h / 2 + 50) + "px";
      movingBaseX = 260;
      movingPlatform.style.left = movingBaseX + "px";
    }

    loadBest();
  }

  /* === Drag to aim === */
  ball.addEventListener("mousedown", (e) => {
    if (finished) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    ball.style.transition = "none";
  });

  field.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const dx = startX - e.clientX;
    const dy = startY - e.clientY;
    const rawLen = Math.hypot(dx, dy);
    const maxLen = 80;
    const len = Math.min(maxLen, rawLen);

    const angle = Math.atan2(dy, dx); // напрямок удару
    const cx = ball.offsetLeft + ball.offsetWidth / 2;
    const cy = ball.offsetTop + ball.offsetHeight / 2;

    aim.style.opacity = rawLen > 3 ? "1" : "0";
    aim.style.left = cx + "px";
    aim.style.top = cy + "px";
    aim.style.width = len + "px";
    aim.style.transform = `translate(0,-50%) rotate(${angle}rad)`;
  });

  field.addEventListener("mouseup", (e) => {
    if (!dragging) return;
    dragging = false;
    aim.style.opacity = "0";

    const dx = startX - e.clientX;
    const dy = startY - e.clientY;
    const power = Math.hypot(dx, dy);

    if (power < 3) return; // занадто слабкий "удар"

    vx = dx * 0.16;
    vy = dy * 0.16;

    strokes++;
    strokesEl.textContent = strokes;

    try {
      hitSound.currentTime = 0;
      hitSound.play();
    } catch(e) {}

  });

  // На випадок, якщо мишку відпустили за межами поля
  document.addEventListener("mouseup", () => {
    if (dragging) {
      dragging = false;
      aim.style.opacity = "0";
    }
  });

  /* === Physics update loop === */
  function update() {
    const w = field.clientWidth;
    const h = field.clientHeight;

    // Рух платформи (якщо активна)
    if (movingPlatform.style.display !== "none") {
      const amp = 40;
      let x = movingBaseX + amp * Math.sin(Date.now() / 700);
      movingPlatform.style.left = x + "px";
    }

    if (!finished) {
      // тертя
      vx *= 0.97;
      vy *= 0.97;

      // Якщо швидкість майже 0 — зупиняємо
      if (Math.abs(vx) < 0.05) vx = 0;
      if (Math.abs(vy) < 0.05) vy = 0;

      let x = ball.offsetLeft + vx * 0.6;
      let y = ball.offsetTop + vy * 0.6;

      // Відскок від стін поля
      if (x < 0) { x = 0; vx = -vx * 0.8; }
      if (x > w - ball.offsetWidth) { x = w - ball.offsetWidth; vx = -vx * 0.8; }
      if (y < 0) { y = 0; vy = -vy * 0.8; }
      if (y > h - ball.offsetHeight) { y = h - ball.offsetHeight; vy = -vy * 0.8; }

      ball.style.left = x + "px";
      ball.style.top  = y + "px";

      const bx = ball.offsetLeft;
      const by = ball.offsetTop;

      // HOLE
      if (distCenter(ball, hole) < 12 && !finished) {
        finished = true;
        vx = vy = 0;
        ball.style.left = (hole.offsetLeft + 3) + "px";
        ball.style.top  = (hole.offsetTop + 3) + "px";
        ball.style.background = "#bdbdbd";
        try {
          holeSound.currentTime = 0;
          holeSound.play();
        } catch(e) {}
        saveBestIfNeeded();
        setTimeout(() => {
          alert(`🎉 Ви влучили в лунку!\nУдари: ${strokes}`);
        }, 50);
      }

      // WATER → reset
      if (water.style.display !== "none" && isOverlap(ball, water)) {
        resetBall();
      }

      // LAVA → reset + невеликий "покарати"
      if (lava.style.display !== "none" && isOverlap(ball, lava)) {
        resetBall();
        if (!finished) {
          strokes += 1;
          strokesEl.textContent = strokes;
        }
      }

      // SAND → сильніше тертя
      if (sand.style.display !== "none" && isOverlap(ball, sand)) {
        vx *= 0.9;
        vy *= 0.9;
      }

      // SLOPES → прискорення в бік
      if (slope1.style.display !== "none" && isOverlap(ball, slope1)) {
        vx += 0.08;
        vy -= 0.03;
      }
      if (slope2.style.display !== "none" && isOverlap(ball, slope2)) {
        vx += 0.02;
        vy += 0.08;
      }

      // BUMPER → сильний відскок
      if (bumper.style.display !== "none" && isOverlap(ball, bumper)) {
        vx = -vx * 1.2;
        vy = -vy * 1.2;
      }

      // MOVING PLATFORM → відскок + трохи переносить
      if (movingPlatform.style.display !== "none" && isOverlap(ball, movingPlatform)) {
        vy = -Math.abs(vy) * 1.1;
        vx += (movingDir * 0.5);
      }
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);

  /* === Helpers === */
  function distCenter(a, b) {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const ax = ar.left + ar.width / 2;
    const ay = ar.top + ar.height / 2;
    const bx2 = br.left + br.width / 2;
    const by2 = br.top + br.height / 2;
    return Math.hypot(ax - bx2, ay - by2);
  }

  function isOverlap(a, b) {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    return !(
      ar.right < br.left ||
      ar.left > br.right ||
      ar.bottom < br.top ||
      ar.top > br.bottom
    );
  }

  /* === Events: level select / reset === */
  levelSelect.addEventListener("change", () => {
    activeLevel = Number(levelSelect.value);
    setLevelLayout();
  });

  resetBtn.addEventListener("click", () => {
    setLevelLayout();
  });

  // Ініціалізація першого рівня
  activeLevel = 0;
  setLevelLayout();
}

