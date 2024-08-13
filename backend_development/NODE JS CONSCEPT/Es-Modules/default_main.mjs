// import add from './default_export.mjs'
// //import * as math from './default_export.mjs'


// console.log(add(5, 8));

// or
import * as math from './default_export.mjs'

const {add, subtract} = math;

console.log(math.add(5, 8));
console.log(math.subtract(5, 8));

// in importing default module the variable imported can assume another name aside from the given to it in the imported module