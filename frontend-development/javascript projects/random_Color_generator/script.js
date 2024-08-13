const containerEl = document.querySelector('.container');

//creating multiple color container within the containerEl
for (let index = 0; index < 30; index++) {
    const colorContainerElement = document.createElement('div');
    colorContainerElement.classList.add('color-container');
    containerEl.appendChild(colorContainerElement);
}

//adding the random color to all the elements with '.color-container' as their class
const colorContainerEl = document.querySelectorAll('.color-container');
colorContainerEl.forEach(element => {
    element.style.backgroundColor = "#" + randomColor();
    element.innerHTML = "#" + randomColor();
});

//creating a random color
function randomColor() {
    const color = "0123456789abcde";
    let colorSize = 6;
    let randomNumberSelection = ""
    
    for (let index = 0; index < colorSize; index++) {
        const selectRandomNumber = Math.floor(Math.random() * color.length);
        const randomSelectChar = color.charAt(selectRandomNumber);
        randomNumberSelection += randomSelectChar;
        
    }
    return randomNumberSelection;
}