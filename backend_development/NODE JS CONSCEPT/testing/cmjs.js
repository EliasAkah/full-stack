const { formatDate } = require("./date");

const today = new Date();
const formattedDate = formatDate(today, "dddd, MMMM Do YYYY");
console.log(formattedDate)

// const weekDay = function () {
//     const names = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
//     return {
//         name(number) { return names[number]; },
//         number(name) { return names.indexOf(name)}
//     };
// }();
// console.log(weekDay.name(weekDay.number("Sunday")));

console.log(formatDate(new Date(2017, 9, 13),
    "dddd the Do"));

//detailed description of how the require function

/*function require(name) {
    if (!(name in require.cache)) {
        let code = readFile(name);
        let exports = require.cache[name] = {};
        let wrapper = Function("require, exports", code);
        wrapper(require, exports);
    }
    return require.cache[name];
}*/
