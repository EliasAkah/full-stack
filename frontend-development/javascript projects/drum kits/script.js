const containerEl = document.querySelector('.container');
const kits = ['crash', 'kick', 'snare', 'tom-4'];

kits.forEach(kit => {
    const btnEl = document.createElement('button');
    containerEl.appendChild(btnEl);
    btnEl.className = 'btn';
    btnEl.innerText = kit;
    btnEl.style.backgroundImage = "url(images/" + kit + ".png)";

    const audioEl = document.createElement('audio');
    containerEl.appendChild(audioEl);
    audioEl.src = "sounds/" + kit + ".mp3";

    btnEl.addEventListener('click', () => { 
        audioEl.play();
        btnEl.style.transform = 'scale(.9)';
        setTimeout(() => {
            btnEl.style.transform = 'scale(1)';
        }, 100);
    });
    window.addEventListener('keydown', () => {
        if (event.key === kit.slice(0, 1)) {
            console.log(event.key);
            audioEl.play();
            btnEl.style.transform = 'scale(.9)';
            setTimeout(() => {
                btnEl.style.transform = 'scale(1)';
             }, 100);
        }
    });

});