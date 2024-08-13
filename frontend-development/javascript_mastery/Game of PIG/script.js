(function(){
    'use strict';
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const actionArea = document.getElementById('actions');
    const score = document.getElementById('score');

    game.removeAttribute('game');
    game.removeAttribute('actions');

    const gameData = {
        dice: ['dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png'],
        players: ['player1', 'player2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){

        gameData.index = Math.round(Math.random() );

        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML += '<button id = "quit">Wanna Quit</button>';

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
        console.log('set up the turn!');
        console.log(gameData.index);
        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id = "roll">Roll the dice!</button>';
        document.getElementById('roll').addEventListener('click', function(){
            console.log("roll the dice");
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;

        const divEl = document.createElement('div');
        game.appendChild(divEl);

        divEl.innerHTML += `<img src = "images/${gameData.dice[gameData.roll1 - 1]}" alt = "die"> `;
        divEl.innerHTML += `<img src = "images/${gameData.dice[gameData.roll2 - 1]}" alt = "die"> `;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        // gameData.roll2

        if(gameData.rollSum === 2){
            game.innerHTML += '<p>you have got snake eyes!</p>';
            // gameData.score  = `${gameData.score[gameData.index]}`;
            // gameData.score = 0;
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);// use to change the players
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
            
        }
        else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);// to switch player
            game.innerHTML += `<p>a 1 was rolled, turn is over! to ${gameData.players[gameData.index ]}</p>`;
            setTimeout(setUpTurn, 2000);
        
        }
        else if (gameData.roll1 === 6 && gameData.roll2 === 6){
            // gameData.index ? (gameData.index = 0) : (gameData.index = 1);// to switch player
            // game.innerHTML += `<p>a 1 was rolled, turn is over! to ${gameData.players[gameData.index ]}</p>`;
            // setTimeout(setUpTurn, 2000);

            gameData.rollSum = gameData.roll1 + gameData.roll2;
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id = "rollagain">roll again</button> or <button id = "pass">pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            // checkWinningCondition();
        }

        else {


            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);// to switch player

            game.innerHTML += `<p>a 1 was rolled, turn is over! to ${gameData.players[gameData.index ]}</p>`;
            setTimeout(setUpTurn, 2000);

            checkWinningCondition();
        }

        
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] >= gameData.gameEnd){
            
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`;
          
            // location.reload();

            actionArea = '';
            document.getElementById('quit').innerHTML = 'start a New Game';
            
        }
        else{
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score.innerHTML = `<p>The score is Currently <strong>${gameData.players[0]} is ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`;
    }
})();


    

    



