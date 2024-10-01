import axios from "axios";
import express from "express"
import bodyParser from "body-parser"

//create an app instance from epxress function

const app = express();
const port =  process.env.PORT || 3000
const API_URL = "https://v2.jokeapi.dev/joke/"

//making a get request
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("form.ejs");  // Render a form for the user to select a category
});

app.post("/jokes", (req, res) => {
    let categories = req.body.category || 'general';

    axios.get(`${API_URL}${categories}`)
    .then(response => {
        let result = response.data;
        res.render("jokeApi.ejs", { content: JSON.stringify(result) });
    })
    .catch(error => {
        res.render("jokeApi.ejs", { error: JSON.stringify(error.response?.data || error.message) });
    });
});

//activating the server to listen
app.listen(port, () => {
    console.log(`prot ${port} is listening. server is on`)
})