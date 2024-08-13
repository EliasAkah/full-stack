const superHero = require('./super-hero');

console.log(superHero.getName());
superHero.setName("Superman");
console.log(superHero.getName());

const newsuperHero = require('./super-hero');//loads the object as line 1;
console.log(superHero.getName());

// when we require a module in node.js it is loaded and cached(remember) for subsequent loading (i.e it reuse it again when it is required again)
// the last value of name the computer cached was superman there when a new instance is created aging it  stil retains the last name
// that was assigned to it.

