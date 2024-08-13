const hrsEl = document.querySelector('.arrows .hour');
const secondEl = document.querySelector('.arrows .second');
const minuteEl = document.querySelector('.arrows .minute');

// cupdateClock();

function cupdateClock(){
    const currentDate = new Date();
    
    //assigning the current hr, second and minute to their respective variables
    let hr = currentDate.getHours();
    let seconds = currentDate.getSeconds();
    let minutes = currentDate.getMinutes();

    //converting current time to degree
    let hrDeg = (hr / 12) * 360;
    let minutesDeg = (minutes / 60) * 360;
    let secondsDeg = (seconds / 60) * 360;

    //update the degree of rotation of the respective time arrows
    hrsEl.style.transform = `rotate(${hrDeg}deg)`;
    minuteEl.style.transform = `rotate(${minutesDeg}deg)`;
    secondEl.style.transform = `rotate(${secondsDeg}deg)`;

    // setTimeout(cupdateClock, 1000);
}

//calling the function updateClock at every interval of 1 second
setInterval(cupdateClock, 1000);
