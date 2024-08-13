//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//parsing of urlencoded incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    let passwordInfo = req.body["password"];

    if (passwordInfo === "ILoveProgramming"){
        res.sendFile(_dirname + '/public/secret.html');
    }else {
        res.redirect('/');//redirect to the home page or any other appropriate page
    }

    console.log(req.body);
})

app.listen(port, () => {
    console.log('listening on port: ', port);
})
