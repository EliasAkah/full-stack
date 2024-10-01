const path = require("path");
// console.log(path.join("/folder1", "//folder2", "../index.html"));

console.log(path.resolve("folder1", "folder2", "index.html"));
console.log(path.resolve("/folder1", "/folder2", "index.html"));
console.log(path.resolve("/folder1", "//folder2", "index.html"));
console.log(path.resolve("/folder1", "//folder2", "../index.html"));
console.log(path.resolve("//folder1", "//folder2", "../index.html"));
console.log(path.resolve(__dirname, "index.html"));

//outputs for resolve method

/*/home/akah_david/Desktop/all programing languages/web development projects/node testing/path module/folder1/folder2/index.html
/folder2/index.html
/folder2/index.html
/index.html
/index.html
/home/akah_david/Desktop/all programing languages/web development projects/node testing/path module/index.html
*/

