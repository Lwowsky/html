/* ================= Data: список ігор ================= */
const GAMES = [
  {
    id: 'clicker',
    image: '/img/games/clicker.png',
    title: 'Клікер',
    short: 'Натискай кнопку якомога швидше, щоб набрати очки.',
    desc: 'Гра-клікер: натискайте велику кнопку, збирайте очки. Додайте анімації та звук для фідбеку.',
    goal: 'Набрати максимальну кількість очок за відведений час.',
    bullets: ['Кнопка з анімацією','Таймер','Звук при кліку','Таблиця рекордів'],
    tips: ['Фокусуйтеся на ритмі','Використовуйте клавіатуру для швидшого кліку']
  },
  {
    id: 'puzzle',
    image: '/img/games/puzzle.png',
    title: 'Складання пазлів',
    short: 'Перетягуй фрагменти зображення і збирай картинку.',
    desc: 'Фото-пазли з перетягуванням і поворотом фрагментів. Рівні складності і декілька картинок.',
    goal: 'Зібрати зображення якомога швидше.',
    bullets: ['Drag & drop','Поворот елементів','Рівні','Підказки'],
    tips: ['Почніть з кутів','Використовуйте дрібні частини останніми']
  },
  {
    id: 'moving-target',
    image: '/img/games/target.png',
    title: 'Рухома мішень',
    short: 'Стріляй у рухомі цілі. Є життя та різні швидкості.',
    desc: 'Мішені рухаються по екрану. Гравець стріляє та заробляє очки, за пропуск — втрачає життя.',
    goal: 'Попасти в якомога більше мішеней, не втратити всі життя.',
    bullets: ['Рухомі цілі','Рівні швидкості','Життя','Система очок'],
    tips: ['Прогнозуйте траєкторію','Не витрачай патрони даремно']
  },
  {
    id: 'minigolf',
    image: '/img/games/mini-golf.png',
    title: 'Міні-гольф',
    short: 'Керуйте кулькою, обходьте перешкоди та потрапляйте в лунку.',
    desc: 'Фізика кидка, перешкоди, різні ландшафти. Можливість налаштувати силу і напрям.',
    goal: 'Вмістити м’яч у лунку за мінімальну кількість ударів.',
    bullets: ['Кут і сила удару','Перешкоди','Різні рівні'],
    tips: ['Змінюйте силу в залежності від рельєфу','Враховуйте відскоки']
  },
  {
    id: 'speedway',
    image: '/img/games/racing.png',
    title: 'Спідвей',
    short: 'Керуй мотоциклом, обганяй суперників на трасі.',
    desc: 'Гоночна гра: вибір мотоцикла, траси, змагання проти AI. Повернення, дрифт, бустер.',
    goal: 'Фінішувати першим.',
    bullets: ['Різні траси','Покращення байків','Суперники AI'],
    tips: ['Тримай траєкторію','Використовуй дрифт на поворотах']
  },
  {
    id: 'space-def',
    image: '/img/games/rocket.png',
    title: 'Космічний захист',
    short: 'Захищай корабель від ворожих супутників і астероїдів.',
    desc: 'Шутер у космосі з апгрейдами зброї та захисту. Хвилі ворогів і боси.',
    goal: 'Проходити якомога більше хвиль ворогів.',
    bullets: ['Хвилі ворогів','Апгрейди','Боси'],
    tips: ['Вкладати в шкоду або щит залежно від стилю']
  },
  {
    id: 'block-shift',
    image: '/img/games/block.png',
    title: 'Переставлення блоків',
    short: 'Переставляй блоки щоб отримати потрібну форму.',
    desc: 'Головоломка про перестановку блоків на полі. Можна вибирати рівні складності.',
    goal: 'Отримати задану форму з мінімальною кількістю ходів.',
    bullets: ['Різні форми','Обмеження ходів','Рівні'],
    tips: ['Плануй кілька ходів наперед','Розбирайся з кутовими елементами']
  },
  {
    id: 'butterflies',
    image: '/img/games/butterfly.png',
    title: 'Метелики',
    short: 'Лови метеликів на полі — різні види і рівні.',
    desc: 'Гра на реакцію: ловіть метеликів, ускладнення з часом, бонуси.',
    goal: 'Зловити якомога більше метеликів за тур.',
    bullets: ['Різні види','Бонуси','Рівні складності'],
    tips: ['Фокусуйся на швидких метеликах','Збирай бонуси для більших очок']
  },
  {
    id: 'ROCK',
    image: '/img/games/rock-paper-scissors.png',
    title: 'ROCK',
    short: 'Лови метеликів на полі — різні види і рівні.',
    desc: 'Гра на реакцію: ловіть метеликів, ускладнення з часом, бонуси.',
    goal: 'Зловити якомога більше метеликів за тур.',
    bullets: ['Різні види','Бонуси','Рівні складності'],
    tips: ['Фокусуйся на швидких метеликах','Збирай бонуси для більших очок']
  }
];

/* =============== Render cards ================ */
const grid = document.getElementById('grid');

function createCard(g){
  const el = document.createElement('article');
  el.className = 'card';
  el.dataset.id = g.id;
  el.innerHTML = `
    <div style="display:flex;gap:10px;align-items:center">
      <div class="image">
        <img src="${g.image}" alt="${g.title}" />
      </div>
      <div>
        <div class="title">${g.title}</div>
        <div class="desc small">${g.short}</div>
      </div>
    </div>
    <div class="meta">
      <div class="pill">Рівні складності</div>
      <div class="pill">Рекорди</div>
      <div class="pill">Міні-гра</div>
    </div>
    <div class="actions">
      <div style="display:flex;gap:8px">
        <button class="btn play">Play</button>
        <button class="btn secondary details">Details</button>
      </div>
      <div style="font-size:0.86rem;color:var(--muted)">${g.bullets.length} елементів</div>
    </div>
  `;
  el.querySelector('.play').addEventListener('click', () => openModal(g, 'play'));
  el.querySelector('.details').addEventListener('click', () => openModal(g, 'details'));
  return el;
}

function renderAll(list = GAMES){
  grid.innerHTML = '';
  list.forEach(g => grid.appendChild(createCard(g)));
}
renderAll();

/* ============ Search & Sort ============= */
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('reset');

function applyFilter(){
  const q = searchInput.value.trim().toLowerCase();
  let res = GAMES.filter(
    g => g.title.toLowerCase().includes(q) || g.short.toLowerCase().includes(q)
  );
  if (sortSelect.value === 'az') {
    res = res.slice().sort((a,b)=> a.title.localeCompare(b.title));
  }
  renderAll(res);
}

searchInput.addEventListener('input', applyFilter);
sortSelect.addEventListener('change', applyFilter);
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  sortSelect.value = 'default';
  applyFilter();
});

/* ============ Modal logic & play stubs =========== */
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
  modalTitle.innerHTML = `<strong style="display:block; text-align:center;">${game.title}</strong>`;
  modalDesc.textContent = game.desc;
  modalGoal.textContent = game.goal;
  modalBullets.innerHTML = game.bullets.map(b => `<li>${b}</li>`).join('');
  modalTips.innerHTML = game.tips.map(t => `<li>${t}</li>`).join('');
  playArea.innerHTML = '';
  if (mode === 'play') startStub(game);
}

function closeModalFn(){
  modalBack.style.display = 'none';
  stopStub();
}

/* Stop/cleanup stub area */
function stopStub(){
  playArea.innerHTML = '';
}

function startStub(game){
  if (!game) return;
  stopStub();

  switch (game.id) {
    case 'clicker':
      renderClickerStub(playArea);
      break;
    case 'puzzle':
      renderPuzzleGame(playArea);
      break;
    case 'moving-target':
      renderTargetStub(playArea);
      break;
    case 'minigolf':
      renderMinigolfStub(playArea);
      break;
    case 'butterflies':
      renderButterfliesStub(playArea);
      break;
       default:
      playArea.innerHTML =
        '<div class="small">Демо для цієї гри ще не зроблене 🙂</div>';
  }
}

/* handlers */
playBtn.addEventListener('click', () => startStub(activeGame));
docsBtn.addEventListener('click', () => alert(activeGame.title + '\n\n' + activeGame.desc));
exampleBtn.addEventListener('click', () => alert('Приклади: ' + activeGame.bullets.join(', ')));
closeModal.addEventListener('click', closeModalFn);
modalBack.addEventListener('click', (e) => { if (e.target === modalBack) closeModalFn(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModalFn();
});

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


/* ================== Moving Target Stub ================== */
function renderTargetStub(container){
  container.innerHTML = `
    <div class="small">Стріляй по мішені. Вибери рівень та швидкість.</div>
    
    <div style="display:flex;gap:12px;margin-top:8px">
      <label class="small">Складність:
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
      ❤️ Життя: <span id="tLifeCount">—</span> | 🎯 Очки: <span id="tScore">0</span>
    </div>
  `;

  const stage = document.createElement('div');
  stage.style.position='relative';
  stage.style.height='200px';
  stage.style.marginTop='10px';
  stage.style.borderRadius='8px';
  stage.style.overflow='hidden';
  stage.style.border='1px solid rgba(255,255,255,0.08)';
  stage.style.background='rgba(255,255,255,0.03)';
  container.appendChild(stage);

  let intervalId = null;
  let speed = 4;
  let lives = 3;
  let score = 0;
  let targetSize = 40;

  const lifeEl = container.querySelector('#tLifeCount');
  const scoreEl = container.querySelector('#tScore');
  const startBtn = container.querySelector('#tStart');
  const diffSelect = container.querySelector('#tDiff');

  const soundHit = new Audio('/sounds/click.wav'); // ти можеш замінити шлях

  function startGame(){
    clearInterval(intervalId);

    stage.innerHTML = '';
    score = 0;
    scoreEl.textContent = 0;

    lives = Number(container.querySelector('#tLives').value);
    lifeEl.textContent = lives;

    speed = Number(container.querySelector('#tSpeed').value);

    const diff = diffSelect.value;
    if (diff === 'easy') targetSize = 50;
    if (diff === 'medium') targetSize = 40;
    if (diff === 'hard') targetSize = 28;

    const target = document.createElement('div');
    target.style.width = targetSize + 'px';
    target.style.height = targetSize + 'px';
    target.style.background = '#fb7185';
    target.style.borderRadius = '50%';
    target.style.position = 'absolute';
    target.style.top = '80px';
    target.style.left = '10px';
    target.style.cursor = 'pointer';
    target.style.transition = 'transform 0.1s';
    stage.appendChild(target);

    let x = 10;
    let dir = 1;

    intervalId = setInterval(() => {
      x += dir * speed;
      if (x > stage.clientWidth - targetSize){
        dir = -1;
        loseLife();
      }
      if (x < 0){
        dir = 1;
        loseLife();
      }
      target.style.left = x + 'px';
    }, 30);

    target.addEventListener('click', () => {
      score++;
      scoreEl.textContent = score;

      // Анімація попадання
      target.style.transform = 'scale(0.7)';
      setTimeout(()=> target.style.transform='scale(1)', 120);

      // Звук
      soundHit.currentTime = 0;
      soundHit.play();

      // Переміщення мішені випадково
      target.style.top = Math.random() * (stage.clientHeight - targetSize) + 'px';
    });
  }

  function loseLife(){
    lives--;
    lifeEl.textContent = lives;
    if (lives <= 0){
      clearInterval(intervalId);
      alert(`Гру завершено!\nВаші очки: ${score}`);
    }
  }

  startBtn.addEventListener('click', startGame);
}
/* ================== MiniGolf Stub ================== */
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
  const hitSound  = new Audio("/sounds/golf-hit.wav");   // додай файл, якщо треба
  const holeSound = new Audio("/sounds/golf-hole.wav");

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

/* ================== Butterflies Stub ================== */

function renderButterfliesStub(container){
  container.innerHTML = '<div class="small">Лови метеликів — клік по рухомих елементах</div>';
  const stage = document.createElement('div');
  stage.style.position='relative';
  stage.style.height='150px';
  stage.style.marginTop='8px';
  stage.style.borderRadius='8px';
  stage.style.overflow='hidden';
  container.appendChild(stage);
  for(let i=0;i<6;i++){
    const b = document.createElement('div');
    b.style.position='absolute';
    b.style.width='28px';
    b.style.height='20px';
    b.style.left = (10 + i*50) + 'px';
    b.style.top = (20 + (i%3)*30) + 'px';
    b.style.cursor='pointer';
    b.textContent='🦋';
    b.addEventListener('click', () => { b.style.display='none'; });
    stage.appendChild(b);
  }
}
