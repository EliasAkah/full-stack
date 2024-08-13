document.getElementsByTagName("h1")[0].innerHTML = "<b style = 'text-transform: uppercase'>David</b></upp>";
document.getElementsByTagName("h2")[0].innerHTML = "<b style = 'text-transform: uppercase'>Akah</b>";

function myName () {
    firstName = "david";
    lastName = "akah";
    console.log(firstName);
    console.log(lastName);
}

myName();

// generating random number with function;

var foods = ["abacha", "ogbono", "okro_soup", "bitter_leaf_sounp"];

function randomInt (min, max)  {
    var numOfValues = max-min + 1;
    var randomNumber = Math.random() * numOfValues;
    var floorNumber = Math.floor(randomNumber);
    var startRandomNumberFrom = min + floorNumber;
   return startRandomNumberFrom;
}

console.log(foods[randomInt(0,3)]);

// anonymous functions 

var game = function () {
    console.log("game of thrones");
}
game();

// arrow functions

var gameArrow = game => game.toUpperCase();
console.log(gameArrow("Game of Thrones"));

function game(fame) {
    fame = fame.toUpperCase();
    return fame;
}
game("Game of Thrones");

//