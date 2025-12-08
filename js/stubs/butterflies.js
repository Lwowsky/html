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
