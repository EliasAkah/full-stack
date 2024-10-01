//importing using pattern1
const addNumber = require('./pattern1');

console.log(addNumber(6, 7));


//importing from pattern2 module
const math = require('./pattern2');

console.log(math.add(8, 9));
console.log(math.subtract(12, 10));

//importing from pattern3 module
const math1 = require('./pattern3');

//using destructuring to access the add and subtract functions imported
const { add, subtract } = math1;

console.log(add(7, 5));
console.log(subtract(9, 5));