const superHero = require('./super-hero');

const batman = new superHero("Batman");
console.log(batman.getName());
batman.setName("bruce lee");
console.log(batman.getName());

const superman = new superHero("Superman");
console.log(superman.getName());
