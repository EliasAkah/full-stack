document.addEventListener('DOMContentLoaded', function() {
    (function(){
        'use strict';
        const startGame = document.getElementById('startgame');
        const gameControl = document.getElementById('gamecontrol');
        const game = document.getElementById('game');
        const actionArea = document.getElementById('actions');
        const score = document.getElementById('score');


        const savedValue1 = localStorage.getItem('inputValue1');
        const savedValue2 = localStorage.getItem('inputValue2');

        console.log('Value from HTML1:', savedValue1);
        console.log('Value from HTML1:', savedValue2);

        const gameData = {
            dice: ['dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png'],
            players: [savedValue1, savedValue2],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            gameEnd: 20
        };

        startGame.addEventListener('click', function(){
            game.className = "game";
            actionArea.className = "actions";

            gameData.index = Math.round(Math.random());

            gameControl.innerHTML = '<h2>The game has started</h2>';
            gameControl.innerHTML += '<button id = "quit">Wanna Quit</button>';

            document.getElementById('quit').addEventListener('click', function(){
                location.reload();
            });
            setUpTurn();
        });

        function setUpTurn() {
            game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
            actionArea.innerHTML = '<button id = "roll">Roll the dice!</button>';

            document.getElementById('roll').addEventListener('click', function(){
                throwDice();
            });
        }

        let timeout;
        let actionAreaTimeout;

        function throwDice(){
            actionArea.innerHTML = '';
            actionArea.classList.remove("actions");
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            
            const divEl = document.createElement('div');
            divEl.id = 'image';
            game.appendChild(divEl);

            divEl.innerHTML += `<img src = "images/${gameData.dice[gameData.roll1 - 1]}" alt = "die"> `;
            divEl.innerHTML += `<img src = "images/${gameData.dice[gameData.roll2 - 1]}" alt = "die"> `;
            gameData.rollSum = gameData.roll1 + gameData.roll2;

            const diceImages = document.querySelectorAll('#image img');
            diceImages.className = '';

            // create a class "dice-rolling" for each dice image
            diceImages.forEach(dice =>{
                dice.classList.add("dice-rolling");
            });

            //after a delay, remove 'dice-rolling class from a randomly selected dice
            setTimeout(() => {
                diceImages.forEach(dice =>{
                    dice.classList.remove("dice-rolling");
                });
            }, 1000);
    
            if(gameData.rollSum === 2){
                game.innerHTML += '<p>you have got snake eyes!</p>';
                gameData.score[gameData.index] = 0;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);// use to change the players

                checkWinningCondition();
                setTimeout(setUpTurn, 2000);
                setTimeout(() =>{
                    actionArea.classList.add("actions");
                }, 2000);
                
            }
            else if(gameData.roll1 === 1 || gameData.roll2 === 1){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);// to switch player
                game.innerHTML += `<p>a 1 was rolled, turn is over! to ${gameData.players[gameData.index]}</p>`;
                checkWinningCondition();
                setTimeout(setUpTurn, 2000);
                setTimeout(() =>{
                    actionArea.classList.add("actions");
                }, 2000);
            
            }
            else if (gameData.roll1 === 6 && gameData.roll2 === 6){
                if(gameData.score[gameData.index] !== gameData.gameEnd){
                    gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                    showCurrentScore();
                    actionArea.innerHTML = '<button id = "rollagain">roll again</button> or <button id = "pass">pass</button>';
                    document.getElementById('rollagain').addEventListener('click', function(){
                        throwDice();
                        game.innerHTML += `<p>turn it over to ${gameData.players[gameData.index]}</p>`;
                        checkWinningCondition();
                        return false; // this line prevent the listener from returning true preventing "Uncaught(in promise) Error"
                    });
        
                    document.getElementById('pass').addEventListener('click', function(){
                        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                        setUpTurn();
                        
                    });
                }else{
                    gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                    checkWinningCondition();// show updated score before rolling again
                }

                actionArea.classList.add("actions");
            }

            else {
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                checkWinningCondition();
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);// to switch player
                game.innerHTML += `<p>the dice is rolled! turn it over to ${gameData.players[gameData.index ]}</p>`;
                timeout = setTimeout(setUpTurn, 2000);
                actionAreaTimeout = setTimeout(() =>{
                    actionArea.classList.add("actions");
                }, 2000);
                
            }
        }

        function checkWinningCondition(){
            if (gameData.score[0] >= gameData.gameEnd || gameData.score[1] >= gameData.gameEnd){
                let winnerIndex = (gameData.score[0] >= gameData.gameEnd ? 0: 1);// determine the index of the winner
                
                //update the winner score
                gameData.score[winnerIndex] = gameData.score[winnerIndex];

                //display winner and score
                score.innerHTML = `<h2>${gameData.players[winnerIndex]} wins with ${gameData.score[winnerIndex]} points</h2>`;
                
                //Update game control message
                gameControl.innerHTML = '<h2>Game Over!</h2>';
                gameControl.innerHTML += '<button id = "quit">Start a New Game</button>';

                //Add event listener to restart button to restart the game
                document.getElementById('quit').addEventListener('click', () => {
                    location.reload();
                });

                //Remove game and action area classes
                game.removeAttribute('class');
                actionArea.removeAttribute('class');
                
                //empty the actionArea and game html content together with their children
                actionArea.innerHTML = '';
                game.innerHTML = '';

                //clear timeout
                clearTimeout(timeout);
                clearTimeout(actionAreaTimeout);
                
            }
            else{
                showCurrentScore();
            }
        }

        function showCurrentScore(){
            score.innerHTML = 
            `<p>Current Score: </p>
            <p><strong>${gameData.players[0]} = ${gameData.score[0]}</strong></p>
            <p><strong>${gameData.players[1]} = ${gameData.score[1]}</strong></p>
            `;
        }
    })();
});


    

    



