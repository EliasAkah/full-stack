//calling the native module "fs"
// const fs = require("fs");

// //calling the write file method from "fs" native module
// // fs.writeFile("message.txt", "hello, i am david!", (err) => {
// //     if(err) throw err;
// //     console.log("the file has been saved!");
// // });

// fs.readFile("./message.txt", "utf8", (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

//asychrounous module
const fs = require("node:fs/promises");
fs.readFile("message.txt", "utf-8")
    .then(text => {console.log("this is the text messages:", text)});