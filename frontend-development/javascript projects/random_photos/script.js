const imageContainer = document.querySelector('.image-container');
const btnEl = document.querySelector('.btn');

btnEl.addEventListener('click', () => {
    numberOfImages = 10;
    createNewImages();
});

function createNewImages() {
    //creating a number of images to be generated using loop
    for (let index = 0; index < numberOfImages; index++) {
        const imageEl = document.createElement('img');
        imageEl.src = `https://picsum.photos/300?random=${Math.floor(Math.random() * 2000)}`;
        imageContainer.appendChild(imageEl);   
    }

}
