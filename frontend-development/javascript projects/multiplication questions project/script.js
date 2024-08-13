(function () {
    "use strict";
    const h4 = document.getElementById('score');
    const label = document.getElementById('question');
    const input = document.getElementById('input');
    const formEl = document.getElementById('form');
    

    let btn = document.getElementById('submit');

    let randomNo1 = Math.floor((Math.random() * 12) + 1);
    let randomNo2 = Math.ceil((Math.random() * 12));

    label.innerText = `What is ${randomNo1} multiply by ${randomNo2}?`;
    const multiply = randomNo1 * randomNo2;

    let score = JSON.parse(localStorage.getItem("score"));

    if (!score) {
        score = 0;
    }

    h4.innerText = `score: ${score}`;

    formEl.addEventListener('submit', ansCheck);


    function ansCheck() {

        let inputValue = +input.value;//convert inputValue to integer for comparison

        if (inputValue === multiply) {
            score++;
            updateLocalStorage();
        }
        else {
            if (score > 0) {
                score--;
                updateLocalStorage();
            }
            else {
                score = 0;
                updateLocalStorage();
            }
        }
    }

    function updateLocalStorage() {
        localStorage.setItem("score", JSON.stringify(score));
    }

})();