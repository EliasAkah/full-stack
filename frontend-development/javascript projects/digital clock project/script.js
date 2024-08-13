let hourEl = document.getElementById('hours');
let minuteEl = document.getElementById('minutes');
let secondEl = document.getElementById('seconds');
let amPmEl = document.getElementById('ampm');

function updateDate() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = "AM";

    if (h > 12){
        h = h - 12;
        ampm = "PM";
    }

   h =  h < 10 ? "0" + h : h;
   m =  m < 10 ? "0" + m : m;
   s =  s < 10 ? "0" + s : s;
   
    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    amPmEl.innerText = ampm;

    setTimeout(()=> {
        updateDate();
    }, 1000);
}

updateDate();
