const frontLoaderEl = document.querySelector('.loading-bar-front');
const counterEl =  document.querySelector('.counter');

let idx = 0;

function updateCount(){
    //changing the count value and width of the load bar
    counterEl.innerText = idx + "%";
    frontLoaderEl.style.width = idx + "%";
    idx++;
    //creating a loop using setTimeout
    if(idx < 101){
        setTimeout(updateCount, 20);
    }
}

updateCount();