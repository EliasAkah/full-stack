// var randomNumber1 =  Math.random();
// randomNumber1 *= 6;
// randomNumber1 = Math.floor(randomNumber1) + 1;
// var randomDiceImage1 = "dice" + randomNumber1 + ".png";
// var randomImageSource1 = "images/" + randomDiceImage1;
// var image1 = document.querySelectorAll("img")[0];
// image1.setAttribute("src", randomImageSource1);

// var randomNumber2 = Math.floor(Math.random() * 6) + 1;
// var randomImageSource2 = "images/dice" + randomNumber2 + ".png";
// document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);


// if (randomNumber1 > randomNumber2) {
//     document.querySelector("h1").innerHTML = "⛳ player1 wins";
// }
// else if (randomNumber2 > randomNumber1) {
//     document.querySelector("h1").innerHTML = "⛳ player2 wins";
// }
// else {
//     document.querySelector("h1").innerHTML = "draw!";
// }


var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomImageSource1 = "images/dice" + randomNumber1 + ".png";
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src",randomImageSource1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomImageSource1 = "images/dice" + randomNumber1 + ".png";
var image1 = document.querySelectorAll("img")[0].setAttribute("src",randomImageSource1);

if(randomNumber1 > randomNumber2){
    document.querySelector("h1").textContent = "⛳ player1 wins";
}
else if(randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "⛳ player2 wins";
}
else{
    document.querySelector("h1").textContent = "Draw";
}