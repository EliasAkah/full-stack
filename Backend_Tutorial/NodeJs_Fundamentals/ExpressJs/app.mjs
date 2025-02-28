//import third party module called express
import express from "express";

const app = express();

//creating middleware
app.use('/', (req, res, next) => {
    console.log("I am the first Middleware");
    //using next() function to allow the request go to another middleware in the line
    next();
}) 

//creating another middleware
app.use('/james', (req, res, next) => {
    console.log("I am the second Middleware");
    //sending a response
    res.send("<h1>I am James Timothy</h1>")
}) 

//server listening for request
app.listen(3000, () => {
    console.log("listening from port 3000");
})

//Note: the filter "/" sign in a middleware indicates that any url that starts with "/" will be executed if placed before other mniddlewart with different filters.