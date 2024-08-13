const imageContainerEl = document.querySelector('.image-container');
const prevEl =  document.querySelector('#prev');
const nextEl =  document.querySelector('#next');

let x = 0;
let timer;

prevEl.addEventListener('click', () =>{
    //set the rotation to be from the left to the right
    x = x + 45;
    clearTimeout(timer);
    updateGallery();

});

nextEl.addEventListener('click', () =>{
    //set the rotation to be from the right to the left
    x = x - 45;
    clearTimeout(timer);
    updateGallery();

});



function updateGallery(){
    imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;

    //create a setTimeout for auto rotation animation of the images
    timer = setTimeout(() =>{
        //set the rotation to be from the right to the left
        x = x - 45;
        updateGallery();  
    }, 3000);
}

//activating the setTimeout auto rotation by calling the updateGallery function
updateGallery();
