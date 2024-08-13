const nextBtnEl = document.querySelector(".next");
const imageContainerEl =  document.querySelector(".image-container");
const imageEl =  document.querySelectorAll("img");
const prevBtnEl = document.querySelector(".prev");


let currentImg = 1;
let timeout;

nextBtnEl.addEventListener("click", () =>{
    currentImg++;
    clearTimeout(timeout);
    updateImage();
})

prevBtnEl.addEventListener("click", () =>{
    currentImg--;
    clearTimeout(timeout);
    updateImage();
})

updateImage();

function updateImage() {
    
     if(currentImg > imageEl.length){
        currentImg = 1;
    }else if(currentImg < 1){
        currentImg =  imageEl.length;
    }

    imageContainerEl.style.transform = `translateX(${(currentImg - 1) * -500}px)`;

    timeout = setTimeout(() => {
        currentImg++;
        updateImage();
    }, 2000);
}