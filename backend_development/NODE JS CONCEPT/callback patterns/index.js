const jsonFile =  require("./index.json");

console.log(jsonFile);

//callback function for a fucntion calling another is called a higherOrderFunction

function greetFriend(greet){
    const name = "james";
    greet(name);
}

function greet(name){
    console.log(`hello, ${name}`);
}

greetFriend(greet);

//when a function is called as an argument within another function it called with the paranthesis. but it can be called within
//the higherOrderFunction like normal fucntion like function calling.

//types of call back: synchrounous and assyc