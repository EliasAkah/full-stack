const { days, months } = require("date-names");
const ordinal = require("ordinal");


function formatDate(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
}

// function ordinal(number) {
//   // Add appropriate ordinal suffix for numbers (e.g., 1st, 2nd, 3rd)
//   const suffixes = ["th", "st", "nd", "rd"];
//   const v = number % 100;
//   return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
// }

module.exports = { formatDate};