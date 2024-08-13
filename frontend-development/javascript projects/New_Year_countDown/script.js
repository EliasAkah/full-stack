window.addEventListener("DOMContentLoaded", () => {
    const dayEl = document.getElementById("day");
    const minuteEl = document.getElementById("hour");
    const hourEl = document.getElementById("minute");
    const secondEl = document.getElementById("second");

    // const visaExpiringDate = new Date(2024, 4, 21).getTime();
    const visaExpiringDate = new Date("may 21, 2024 00:00:00").getTime();

    function updatetime(){
        const now = new Date().getTime();
        const gap = visaExpiringDate - now;

        let second = 1000;
        let minute = 1000 * 60;
        let hour = minute * 60; 
        let day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour)/ minute);
        const s = Math.floor((gap % minute) /second);
    
        dayEl.innerHTML = `${d}`;
        minuteEl.innerHTML = `${m}`;
        hourEl.innerHTML = `${h}`;
        secondEl.innerHTML = `${s}`;

        setTimeout(updatetime, 1000);
    }

    updatetime();
})

