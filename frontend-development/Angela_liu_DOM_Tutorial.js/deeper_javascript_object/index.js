/*
In JavaScript, an object is a collection of key-value pairs, where each key is a string (or a Symbol) 
and each key is associated with a value. Objects are one of the most important data types 
in JavaScript and are used to store and manipulate data. 
Objects can contain both primitive data types (such as numbers, strings, and booleans) and other objects, 
including arrays and functions.
*/
var houseKeeper = {
    name: prompt("what is your name"),
    age: prompt("enter your age"),
    position: prompt("enter your previous position"),
    languages: [prompt("enter language1"), prompt("enter language2")],
    check: function() {
        console.log("my name is " + name + ", i am 45 " + age + " old") ;
    }
    
}

/* to assess the content of check(method: function within an objec(function) ) use "console.log(houseKeeper.check())";

/* 
constructor functions are identified by the capitalisation of the first letter of the combined words.
In JavaScript, a constructor function is a regular function used to create and initialize objects created within it. 
It is a blueprint for creating objects with a specific structure and behavior. Constructor functions are typically used to 
create multiple objects of the same type, each with its own set of properties and methods.
To define a constructor function, you use a function declaration or function expression. 
*/

// declaration of constructor function

function HouseKeeper (name, age, hasWorkPermit, languages) {
    this.name = name;
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
    this.check = function() {
        console.log("my name is " + name + ", i am 45 " + age + " old") ;
}
}
// initialization of constructor function

var houseKeeper1 =  new HouseKeeper("timmy", 19, true, ["french", "english"]);
var houseKeeper2 =  new HouseKeeper("tommy", 21, false, ["french", "english"]);

console.log(houseKeeper1.check());