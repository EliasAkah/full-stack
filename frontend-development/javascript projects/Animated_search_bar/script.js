const btnCotainerEl = document.querySelector('.search-bar-container');
const magnifierEl =  document.querySelector('.magnifier');

magnifierEl.addEventListener('click', () => {
    btnCotainerEl.classList.toggle("active");
}); 