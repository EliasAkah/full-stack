const math1 = require('./pattern3');

//using destructuring to access the add and subtract functions imported
const { add, subtract } = math1;

console.log(add(7, 5));
console.log(subtract(9, 5));

//an error will be thrown in node.js terminal