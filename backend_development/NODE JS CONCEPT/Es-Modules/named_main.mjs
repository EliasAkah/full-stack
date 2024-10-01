// in importing named module the variable or object imported can must be the same name as the one assigned to it in the imported module

import {add, subtract} from './default_export.mjs' // destructured object containing the same  property name as that found in imported module

console.log(add(5, 8));
console.log(subtract(5, 8));
