import express from "express";

//creating a server application
const app = express();


app.use('/users', (req, res, next) => {
    console.log("I did see you with Jesus");
    res.send("<h1>Jesus loves me more than I can ever imagine</h1>")
})

//creating middlewares
app.use('/', (req, res, next) => {
    console.log("Have you seen me today");
    res.send("<h1>His presence is the best place to abide</h1>")
})

//server listens to request
app.listen(3000, () => {
    console.log("I am listening to your request");
})