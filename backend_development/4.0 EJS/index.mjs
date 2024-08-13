import express from "express";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";// commonly used as a middleware for form processing

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// const now = new Date();
// Define the getDay function


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let index;

function getDay(day) {
    index = days.indexOf(day);
    return index;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname +  "/index.html");
});

app.post("/", (req, res) => {

    if(days.includes(req.body["day"])){
        console.log(req.body["day"]);

        if(getDay(req.body["day"]) === 0 || getDay(req.body["day"]) === 6){
            res.send(`<pre>
                    Hey! it's the weekend, it's time
                    to have fun!
                </pre>
            `);
        }else{
            res.send(`<pre>
                    Hey! it's the weekend, it's time
                    to have fun!
                </pre>
            `);
        }
    }else{
        res.send(`<pre>
            Invalid day entered. Please enter a valid day of the week.
        </pre>`);
    }
})

app.listen(port, () => {
    console.log('listening on port' + port);
})
