import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 4000;

let bandName = "";

app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGenerator(req, res, next){
    // console.log(req.body);
    bandName = `<pre>
    
        Name: ${req.body["fname"]}<br>
        Email:  ${req.body["email"]}<br>
        URL:  ${req.body["url"]}<br>
        Comment: ${req.body["comments"]}
        
    </pre>`;
    next();
}

app.use(bandNameGenerator);

app.get('/', (req, res) => {
    res.sendFile(_dirname + "/index.html");
});

app.post('/storage.php', (req, res) => {
    console.log(req.body);
    res.send(`<h1>Here are your login details</h1><h2>${bandName}</h2>`);
});

app.listen(port, () => {
    console.log("listening on port: ", port);
});


