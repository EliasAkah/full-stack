/*
higher order functions are functions that can take other functions as inputs.
*/
/*function add(num1, num2) {
    return num1 + num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}
function subtract(num1, num2){
    return num1 - num2;
}

function calculator(num1, num2, operator) {
    return operator(num1, num2);
}

calculator(2, 3, add);
*/


function add(num1, num2) {
    return num1 + num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}
function subtract(num1, num2){
    return num1 - num2;
}

function calculator(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "invalid operator"
    }
}

var num1 =  parseFloat(prompt("enter num1"));
var num2 =  parseFloat(prompt("enter num2"));
var operator =  prompt("enter type of operation (+, -, *, /");

var calculation = calculator(num1, num2, operator );
alert("result of " + num1 + operator + num2  + " is "  + calculation);