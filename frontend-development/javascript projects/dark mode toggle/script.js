const inputEl = document.querySelector('.input');
const bodyEl = document.querySelector('body');

//setting the checkbox to its last stored state/ retreiving the current state of the  checkbox from the local storage
inputEl.checked = JSON.parse(localStorage.getItem('mode'));

updateBody();

inputEl.addEventListener('input', (event) => {
    console.log(event.target.checked);
    updateBody();
    updatelocalStorage();
})

function updateBody(){
    if(inputEl.checked){
        bodyEl.style.background = "black";
    }else{
        bodyEl.style.background = "white";
    }
}

//writing/storiing the current state of the checkbox to the localStorage
function updatelocalStorage(){
    localStorage.setItem('mode', JSON.stringify(inputEl.checked));
}

updatelocalStorage();