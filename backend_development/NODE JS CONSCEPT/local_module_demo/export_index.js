//export is used to send a limited amount of data from one module to another for security purposes.
// in exporting we have to use CJS standard of module importation  the require() is assigned to a variable
const addFn = require('./export_add.js');

console.log("the sum of various number is given as : ");

const sum = addFn(7, 8);
const sum1 = addFn(10, 11);

console.log(`ans of sum is : ${sum}...................ans of sum1 is : ${sum1}`);