import express from "express";
import ejs from "ejs";

const app = express();
// const port = 3000;

let dayType =  "it's a weekday";
let adviceType = "it's time to work hard";

const today = new Date(2024, 3, 28);
const todayDate = today.getDay();
console.log(todayDate)

if(todayDate === 0 || todayDate === 6){
    dayType =  "it's a weekdend";
    adviceType = "it's time to Enjoy";
}

app.get('/', (req, res) => {
    res.render('index.ejs', {day: dayType, advice:  adviceType });
})

app.listen(port, () => {
    console.log('listening on port' + port);
})