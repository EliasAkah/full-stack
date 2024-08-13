window.addEventListener('DOMContentLoaded', function(){
    (function(){
        "use strict";
    
        const startEl = document.getElementById("start");
        const stopEl = document.getElementById("stop");
        const resetEl = document.getElementById("reset");
        const timerEl = document.getElementById("timer");
    
        let interval;
        let timeLeft = 1500;
        function updateTimer(){
            // setting the minutes and seconds values
            let minutes = Math.floor(timeLeft / 60);
            let seconds = (timeLeft % 60);
    
            //updating the value of minutes and seconds to ensure that the timer starts with double for each of them respectively
            minutes = minutes.toString().padStart(2, "0");
            seconds = seconds.toString().padStart(2, "0");
    
            //updating the innerHTML of the timerEl
            timerEl.innerHTML = `${minutes} : ${seconds}`
    
        }
        function startTimer(){
            //creating a time interval
            interval = setInterval(() =>{
                timeLeft --;
                updateTimer();
                if(timeLeft === 0){
                    clearInterval(interval); 
                    alert("time stopped");
                    timeLeft = 1500;
                    updateTimer();     
                }
            }, 1000);
        }
    
        function stopTimer(){
            clearInterval(interval);
        }
    
        function resetTimer(){
            clearInterval(interval);
            timeLeft = 1500;
            updateTimer();
        }
    
        startEl.addEventListener("click", startTimer);
        stopEl.addEventListener("click", stopTimer);
        resetEl.addEventListener("click", resetTimer);
    })();

});
