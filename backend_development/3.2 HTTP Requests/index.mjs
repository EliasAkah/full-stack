import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send('hi this is current folder');
    console.log(req.rawHeaders);
});

app.get("/about", (req, res) => {
    res.send(`<h1 style = "color: red">i am david chinamerem akah<h1>`);
});

app.get("/contact", (req, res) => {
    res.send(`<h1>contact me on: <span style = "color: blue">990178481<span><h1>`);
});

//creating the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);

});

//we start the server by using node index.js