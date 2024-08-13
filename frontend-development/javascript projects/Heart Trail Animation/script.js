const bodyEl = document.querySelector('body');

bodyEl.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    //increasing the number of span
    const spanEl = document.createElement('span');

    //changing the position value of the span element
    spanEl.style.left = x + 'px';
    spanEl.style.top = y + 'px';

    //creating random size for the love elements
    const size = Math.random() * 50;
    
    spanEl.style.height = size + 'px';
    spanEl.style.width = size + 'px';

    bodyEl.appendChild(spanEl)
    setTimeout(() =>{
        spanEl.remove();
    }, 3000);

});
