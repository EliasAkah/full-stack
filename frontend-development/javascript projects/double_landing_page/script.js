const containerdivEl = document.querySelector('.container');
const divLeftEl = document.querySelector('.split.left');
const divRightEl = document.querySelector('.split.right');

divLeftEl.addEventListener('click', () =>{
    updatwidthLeft();
});

divLeftEl.addEventListener('mouseenter', () =>{
    containerdivEl.classList.add('active-left');
});

divLeftEl.addEventListener('mouseleave', () =>{
    containerdivEl.classList.remove('active-left');
});

divRightEl.addEventListener('click', () =>{
    updatwidthRight();
});

divRightEl.addEventListener('mouseenter', () =>{
    containerdivEl.classList.add('active-right');
});

divRightEl.addEventListener('mouseleave', () =>{
    containerdivEl.classList.remove('active-right');
});

function updatwidthLeft(){
    containerdivEl.classList.remove('active-right');
    containerdivEl.classList.add('active-left');
};

function updatwidthRight(){
    containerdivEl.classList.remove('active-left');
    containerdivEl.classList.add('active-right');
    // containerdivEl.setAttribute('style', 'transition: 2s width ease-in-out;');
};