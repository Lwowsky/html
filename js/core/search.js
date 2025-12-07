const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('reset');

function applyFilter(){
  const q = searchInput.value.trim().toLowerCase();

  let filtered = GAMES.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.short.toLowerCase().includes(q)
  );

  if (sortSelect.value === 'az') {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderAll(filtered);
}

searchInput.addEventListener('input', applyFilter);
sortSelect.addEventListener('change', applyFilter);
resetBtn.addEventListener('click', () => {
  searchInput.value = "";
  sortSelect.value = "default";
  applyFilter();
});
