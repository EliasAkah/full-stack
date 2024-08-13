var randVariable = (Math.floor(Math.random() * 6)) + 1;
var randVariable1 = Math.floor(Math.random() * 6) + 1;

var img1 = document.getElementsByClassName("img1")[0].setAttribute("src", "images/dice" + randVariable + ".png");
var img1 = document.getElementsByClassName("img2")[0].setAttribute("src", "images/dice" + randVariable1 + ".png");

if (randVariable > randVariable1) {
    document.getElementsByTagName("h1")[0].textContent = "⛳ player1 is the winner";
}
else if(randVariable < randVariable1) {
    document.getElementsByTagName("h1")[0].textContent = "⛳ player2 is the winner";
}
else{
    document.getElementsByTagName("h1")[0].textContent = "it is a draw!";
}