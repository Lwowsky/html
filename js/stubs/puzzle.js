/* ================== PUZZLE GAME ================== */
function renderPuzzleGame(container) {
  container.innerHTML = `
    <style>
      .pz-wrap {
        display:flex;
        flex-direction:column;
        gap:14px;
        align-items:center;
        width:100%;
        padding:10px;
      }
      .pz-controls, .pz-img-select {
        display:flex;
        gap:10px;
      }
      .pz-img-option {
        width:46px;
        height:46px;
        border-radius:8px;
        cursor:pointer;
        border:2px solid rgba(255,255,255,0.08);
        background-size:cover;
        background-position:center;
        transition:0.2s;
      }
      .pz-img-option:hover {
        transform:scale(1.06);
        border-color:#4ade80;
      }
      #pzBoard {
        width:340px;
        height:340px;
        display:grid;
        gap:3px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.1);
        background:rgba(255,255,255,0.02);
        overflow:hidden;
      }
      .pz-piece {
        width:100%;
        height:100%;
        border-radius:6px;
        background-size:300% 300%;
        cursor:grab;
        transition:transform .2s ease;
      }
      .pz-piece:active {
        cursor:grabbing;
        transform:scale(.95);
      }
      .pz-status {
        font-size:0.9rem;
        color:var(--muted);
        margin-top:4px;
      }
    </style>

    <div class="pz-wrap">
      
      <div class="pz-controls">
        <button class="btn secondary" data-size="3">3×3</button>
        <button class="btn secondary" data-size="4">4×4</button>
        <button class="btn secondary" data-size="5">5×5</button>
      </div>

      <div class="pz-img-select">
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p1.png')" data-img="/img/puzzles/p1.png"></div>
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p2.png')" data-img="/img/puzzles/p2.png"></div>
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p3.png')" data-img="/img/puzzles/p3.png"></div>
      </div>

      <div style="display:flex;gap:20px">
        <div class="small">⏳ Час: <span id="pzTime">0</span> сек</div>
        <div class="small">🏆 Рекорд: <span id="pzBest">—</span></div>
      </div>

      <div id="pzBoard"></div>

      <div style="display:flex;gap:10px;margin-top:4px;">
        <button id="pzShuffle" class="btn">Перемішати</button>
        <button id="pzReset" class="btn secondary">Скинути</button>
      </div>

      <div id="pzStatus" class="pz-status"></div>

    </div>
  `;

  const board = container.querySelector("#pzBoard");
  const status = container.querySelector("#pzStatus");
  const timeEl = container.querySelector("#pzTime");
  const bestEl = container.querySelector("#pzBest");
  const shuffleBtn = container.querySelector("#pzShuffle");
  const resetBtn = container.querySelector("#pzReset");

  let size = 3;
  let img = "/img/puzzles/p1.png";
  let pieces = [];
  let correctOrder = [];
  let dragged = null;
  let timer = null;
  let time = 0;
  let best = localStorage.getItem("puzzleBest") || "—";

  bestEl.textContent = best;

  /* ==== SELECT IMAGE ==== */
  container.querySelectorAll(".pz-img-option").forEach(opt => {
    opt.addEventListener("click", () => {
      img = opt.dataset.img;
      startGame();
    });
  });

  /* ==== SELECT DIFFICULTY ==== */
  container.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      size = Number(btn.dataset.size);
      startGame();
    });
  });

  shuffleBtn.addEventListener("click", shuffle);
  resetBtn.addEventListener("click", startGame);

  /* ==== START GAME ==== */
  function startGame() {
    stopTimer();
    time = 0;
    timeEl.textContent = 0;

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    pieces = [];
    correctOrder = [];

    let index = 0;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const piece = document.createElement("div");
        piece.className = "pz-piece";
        piece.style.backgroundImage = `url(${img})`;
        piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;
        piece.style.backgroundPosition = `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`;

        piece.dataset.index = index;
        correctOrder.push(index);

        piece.draggable = true;
        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", dropPiece);

        // Поворот
        piece.addEventListener("contextmenu", e => {
          e.preventDefault();
          rotatePiece(piece);
        });

        pieces.push(piece);
        board.appendChild(piece);

        index++;
      }
    }

    shuffle();
    startTimer();
  }

  /* ==== ROTATE ==== */
  function rotatePiece(piece) {
    const deg = (Number(piece.dataset.rot) || 0) + 90;
    piece.dataset.rot = deg;
    piece.style.transform = `rotate(${deg}deg)`;
  }

  /* ==== SHUFFLE ==== */
  function shuffle() {
    pieces.sort(() => Math.random() - 0.5);
    board.innerHTML = "";
    pieces.forEach(p => board.appendChild(p));
    status.textContent = "Перемішано!";
  }

  /* ==== DRAG & DROP ==== */
  function dragStart() {
    dragged = this;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dropPiece() {
    if (!dragged || dragged === this) return;

    const a = pieces.indexOf(dragged);
    const b = pieces.indexOf(this);

    pieces[a] = this;
    pieces[b] = dragged;

    board.innerHTML = "";
    pieces.forEach(p => board.appendChild(p));

    checkWin();
  }

  /* ==== TIMER ==== */
  function startTimer() {
    timer = setInterval(() => {
      time++;
      timeEl.textContent = time;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  /* ==== CHECK WIN ==== */
  function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
      if (Number(pieces[i].dataset.index) !== correctOrder[i]) return;
    }

    stopTimer();

    status.innerHTML = `<span style="color:#4ade80">🎉 Пазл складено!</span>`;

    if (best === "—" || time < best) {
      best = time;
      bestEl.textContent = best;
      localStorage.setItem("puzzleBest", best);
    }

    new Audio("/sounds/success.wav").play();
  }

  startGame();
}
addXP(20);
/* ================== PUZZLE GAME ================== */
function renderPuzzleGame(container) {
  container.innerHTML = `
    <style>
      .pz-wrap {
        display:flex;
        flex-direction:column;
        gap:14px;
        align-items:center;
        width:100%;
        padding:10px;
      }
      .pz-controls, .pz-img-select {
        display:flex;
        gap:10px;
      }
      .pz-img-option {
        width:46px;
        height:46px;
        border-radius:8px;
        cursor:pointer;
        border:2px solid rgba(255,255,255,0.08);
        background-size:cover;
        background-position:center;
        transition:0.2s;
      }
      .pz-img-option:hover {
        transform:scale(1.06);
        border-color:#4ade80;
      }
      #pzBoard {
        width:340px;
        height:340px;
        display:grid;
        gap:3px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.1);
        background:rgba(255,255,255,0.02);
        overflow:hidden;
      }
      .pz-piece {
        width:100%;
        height:100%;
        border-radius:6px;
        background-size:300% 300%;
        cursor:grab;
        transition:transform .2s ease;
      }
      .pz-piece:active {
        cursor:grabbing;
        transform:scale(.95);
      }
      .pz-status {
        font-size:0.9rem;
        color:var(--muted);
        margin-top:4px;
      }
    </style>

    <div class="pz-wrap">
      
      <div class="pz-controls">
        <button class="btn secondary" data-size="3">3×3</button>
        <button class="btn secondary" data-size="4">4×4</button>
        <button class="btn secondary" data-size="5">5×5</button>
      </div>

      <div class="pz-img-select">
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p1.png')" data-img="/img/puzzles/p1.png"></div>
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p2.png')" data-img="/img/puzzles/p2.png"></div>
        <div class="pz-img-option" style="background-image:url('/img/puzzles/p3.png')" data-img="/img/puzzles/p3.png"></div>
      </div>

      <div style="display:flex;gap:20px">
        <div class="small">⏳ Час: <span id="pzTime">0</span> сек</div>
        <div class="small">🏆 Рекорд: <span id="pzBest">—</span></div>
      </div>

      <div id="pzBoard"></div>

      <div style="display:flex;gap:10px;margin-top:4px;">
        <button id="pzShuffle" class="btn">Перемішати</button>
        <button id="pzReset" class="btn secondary">Скинути</button>
      </div>

      <div id="pzStatus" class="pz-status"></div>

    </div>
  `;

  const board = container.querySelector("#pzBoard");
  const status = container.querySelector("#pzStatus");
  const timeEl = container.querySelector("#pzTime");
  const bestEl = container.querySelector("#pzBest");
  const shuffleBtn = container.querySelector("#pzShuffle");
  const resetBtn = container.querySelector("#pzReset");

  let size = 3;
  let img = "/img/puzzles/p1.png";
  let pieces = [];
  let correctOrder = [];
  let dragged = null;
  let timer = null;
  let time = 0;
  let best = localStorage.getItem("puzzleBest") || "—";

  bestEl.textContent = best;

  /* ==== SELECT IMAGE ==== */
  container.querySelectorAll(".pz-img-option").forEach(opt => {
    opt.addEventListener("click", () => {
      img = opt.dataset.img;
      startGame();
    });
  });

  /* ==== SELECT DIFFICULTY ==== */
  container.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      size = Number(btn.dataset.size);
      startGame();
    });
  });

  shuffleBtn.addEventListener("click", shuffle);
  resetBtn.addEventListener("click", startGame);

  /* ==== START GAME ==== */
  function startGame() {
    stopTimer();
    time = 0;
    timeEl.textContent = 0;

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    pieces = [];
    correctOrder = [];

    let index = 0;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const piece = document.createElement("div");
        piece.className = "pz-piece";
        piece.style.backgroundImage = `url(${img})`;
        piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;
        piece.style.backgroundPosition = `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`;

        piece.dataset.index = index;
        correctOrder.push(index);

        piece.draggable = true;
        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", dropPiece);

        // Поворот
        piece.addEventListener("contextmenu", e => {
          e.preventDefault();
          rotatePiece(piece);
        });

        pieces.push(piece);
        board.appendChild(piece);

        index++;
      }
    }

    shuffle();
    startTimer();
  }

  /* ==== ROTATE ==== */
  function rotatePiece(piece) {
    const deg = (Number(piece.dataset.rot) || 0) + 90;
    piece.dataset.rot = deg;
    piece.style.transform = `rotate(${deg}deg)`;
  }

  /* ==== SHUFFLE ==== */
  function shuffle() {
    pieces.sort(() => Math.random() - 0.5);
    board.innerHTML = "";
    pieces.forEach(p => board.appendChild(p));
    status.textContent = "Перемішано!";
  }

  /* ==== DRAG & DROP ==== */
  function dragStart() {
    dragged = this;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dropPiece() {
    if (!dragged || dragged === this) return;

    const a = pieces.indexOf(dragged);
    const b = pieces.indexOf(this);

    pieces[a] = this;
    pieces[b] = dragged;

    board.innerHTML = "";
    pieces.forEach(p => board.appendChild(p));

    checkWin();
  }

  /* ==== TIMER ==== */
  function startTimer() {
    timer = setInterval(() => {
      time++;
      timeEl.textContent = time;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  /* ==== CHECK WIN ==== */
  function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
      if (Number(pieces[i].dataset.index) !== correctOrder[i]) return;
    }

    stopTimer();

    status.innerHTML = `<span style="color:#4ade80">🎉 Пазл складено!</span>`;

    if (best === "—" || time < best) {
      best = time;
      bestEl.textContent = best;
      localStorage.setItem("puzzleBest", best);
    }

    new Audio("/sounds/success.wav").play();
      // Нагорода XP і оновлення інформації гравця
      addXP(20);
    try {
      addXP(20);
      renderPlayerInfo(document.getElementById("playerInfo"));
    } catch (e) {}
  }

  startGame();
}

