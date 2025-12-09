const grid = document.getElementById('grid');

function createCard(g){
  const el = document.createElement('article');
  el.className = 'card';
  el.dataset.id = g.id;
  el.innerHTML = `
    <div style="display:flex;gap:10px;align-items:center">
      <div class="image"><img src="${g.image}" alt="${g.title}"></div>
      <div>
        <div class="title">${g.title}</div>
        <div class="desc">${g.short}</div>
      </div>
    </div>

    <div class="meta">
      <div class="pill">Рівні складності</div>
      <div class="pill">Рекорди</div>
      <div class="pill">XP за проходження</div>
      <div class="pill">Міні-гра</div>
    </div>

    <div class="actions">
      <button class="btn play">Іграти</button>
    </div>
  `;

  el.querySelector('.play').addEventListener('click', () => openModal(g, 'play'));
  return el;
}

function renderAll(list = GAMES){
  grid.innerHTML = '';
  list.forEach(g => grid.appendChild(createCard(g)));
}
