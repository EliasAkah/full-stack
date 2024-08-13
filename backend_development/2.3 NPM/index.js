//importing a node module using CJS

/*const generateName = require('sillyname');
const sillyNames = generateName();

console.log(`i am ${sillyNames}.`);*/

//importing a node module using ECMAS
/*import  generateName from "sillyname";
const sillyNames = generateName();

console.log(`i am ${sillyNames}.`);*/

//importing the superheroes node module using ECMAS
import chooseSuperheroes from "superheroes";
const selectSuperhero = chooseSuperheroes.random();

console.log(`i am ${selectSuperhero}.`);




