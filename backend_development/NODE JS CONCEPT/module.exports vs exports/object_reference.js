//functions like export keyword when assigned a property and also like export module.
const actor = {
    name: "bruce lee",
};

const actor1 = actor;
actor1.name = "jet lin";
console.log(actor);
console.log(actor1);

const actor2 = {
    name: "",
}

const actor3 = actor2;
actor3.name = "seeker";
console.log(actor2);
console.log(actor3);

// functions like exports keyword,
const actor5 = {
    name: "",
}
let actor4 = actor5
//reference to actor5 is loss.
actor4 = {
    name: "james smith",
}

console.log(actor5);
console.log(actor4);