const containerEl = document.querySelector('.container');
const popupContainerEl = document.querySelector('.popup-container');
const btnEl = document.querySelector('.btn');
const closeIconBtn = document.querySelector('.close-icon');

btnEl.addEventListener('click', () => { 
    containerEl.classList.add('active');
    popupContainerEl.classList.remove('active');
});

closeIconBtn.addEventListener('click', () => { 
    containerEl.classList.remove('active');
    popupContainerEl.classList.add('active');
});