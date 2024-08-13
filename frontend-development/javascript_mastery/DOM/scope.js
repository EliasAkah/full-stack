/*
scope in javasscript can be divided into three parts global scope, local scope and block level scope(this is achieved using the "let" keyword). 
the global scope entails values that is declared using the "var" keyword outside 
a given function. when no declaration is made outside the function and a value is assigned to the variable the variable is assumed to be a global variable by
javascript. the variable declared within a function is known as the local variable and can only be used  to carry out operations within the function where it 
is declared. any attempt to use outside that function is considered an error. below is an example to illustrate my point.

*/
/*
var david = "A promising young man with a bright future";

function joseph() {
    var david = "chosen by God to be a priest to his nation";
    console.log(david);
}

joseph();

console.log(david);

*/ 

/*
    To avoid scope related issues in javascript, we need to completely avoid the use of the global scope. we can make this possible by wrapping our code in
    an immediately invoked function expression(IIFE). This anonymus function runs as soon as the script loads, and it will also keep variables out of the global scope.
    below is an example to illustrate this. in  the below example we are going to write a javascript program that will add a given color to all the paragraph elements
    in the html document. the parenthesis after the curly brackets is helps the given code to be execute as soon as the script
*/
/*
(function(){
    var paragraphColor =  document.querySelectorAll("p");
for(var i = 0; i < paragraphColor.length; i++) {
    switch (i) {
        case 0:
        paragraphColor[i].style.color = "yellow";
        break;
        case 1:
        paragraphColor[i].style.color = "green";
        break;
        case 2:
        paragraphColor[i].style.color = "red";
        break;
        default:
        paragraphColor[i].style.color = "black";
        break;
    }
    }}());
}}());
*/

/*
syntax for immediately invokde function Expression is given as 
(function (){
    statements
})();
*/
/*
another way we can deal with scope is the use of "use strict;" directive which was introduced in ES5 in 2009 to cut down on the accidental declarations of
variables without using the "var" keyword. below is an example.
*/

/*
"use strict";
var newVar  = "variable declared without the var keyword";
console.log(newVar);
*/

/*
    combining IIFE with the "use strict"; directive to solve scope issue. this is gives the a perfect control and handling of the problem of not using the var
    keyword to declare a variable.
*/

/*(function (){
    "use strict";
    newVar = "james";
    console.log(newVar);
}());
*/

/*
    third method of solving scope problem is the use of "const" and "let" keywords. they both help minimize the chances that a variable holds an unexpected vlaue.
    the "const" keyword prevent the varible from being updated with a new vlaue.
    the "let" keyuword prevent the variable from being used outside the block where it is defined or declared.
    the "const" keyword should be used most often in ur declaration  of a variables in javascript. if there is need for an update of the variable's value
    use the "let" keyword. this will help avoid erros due to scopr issue while writing your javascript program. try as much as poddible to avoid the use of "var" keyword
    in your javascript program. below is an example that demostrates the use of "const" and "let" keywords.

*/

/*
    const davidAge = 24;
    console.log(davidAge);

    (function (){
        let davidAge = 4;
        for (let i = 0; i < davidAge; i++) {
            console.log(i);
        }
        console.log(davidAge);
    }());
*/

/* 
    Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase. 
    This means that you can use or call a variable or function before it's declared in your code.this can lead to unexpected results.
    varibles should be declared first before being used. "const" and "let" keywords are not hoisted. while the "var" keyword is hoisted.
     below is an example to illustrate this.
*/

/*
    console.log(james);
    var james = "the son of adamu"; //result: undefined.
*/

/*
    console.log(james);
    const jame = "the son of adamu"; // result: referenceerror- cannot not access jam before inittialisation.
*/

/*
console.log(jam);
let jam = "the son of adamu"; // result: referenceerror- cannot not access jam before inittialisation.
*/