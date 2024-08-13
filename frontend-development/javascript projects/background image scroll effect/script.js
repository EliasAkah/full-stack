const bgImageEl = document.getElementById('bg-image');

window.addEventListener('scroll', () => {
    updateImage();
});

function updateImage() { 
    //use pageYoffset to get the vertical position of the window when scrolling
    bgImageEl.style.opacity = 1 - (window.pageYOffset / 900);//reducing the opacity of the background image as u scroll down
    bgImageEl.style.backgroundSize = `${160 - (window.pageYOffset / 12)}%`;
}