import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();// setting up express application
const port = 3000;

let userIsAuthorised = false;

//parsing of urlencoded incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

//setting up an authorization middleware

function authenticatePassword(req, res, next) {
    let passwordInfo = req.body["password"];
    if (passwordInfo === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    next();
}

app.use(authenticatePassword); //mounting the middleware into the express application;

app.get('/', (req, res) => {
    res.sendFile(_dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    if (userIsAuthorised){
        res.sendFile(_dirname + '/public/secret.html');
    }else {
       res.sendFile(_dirname + '/public/index.html');//redirect to the index.html page
    }
    console.log(req.body);
})

app.listen(port, () => {
    console.log('listening on port: ', port);
})