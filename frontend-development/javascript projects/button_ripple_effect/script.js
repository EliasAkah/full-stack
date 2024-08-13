const btnEl = document.querySelector('.btn');

btnEl.addEventListener('mouseover', (event) => {
    let pageY = event.pageY;
    let pageX = event.pageX;
    let offSetTop = btnEl.offsetTop;
    let offSetleft = btnEl.offsetLeft;

    console.log("pageY: ", pageY);
    console.log("pageX: ", pageX);
    console.log("offSetTop: ", offSetTop);
    console.log("offSetleft: ", offSetleft);

    const x = (pageX - offSetleft);
    const y = (pageY - offSetTop);

    btnEl.style.setProperty('--xPos', x + "px");
    btnEl.style.setProperty('--yPos', y + "px");
});