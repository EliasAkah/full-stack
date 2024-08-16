import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import {dirname} from "path";
import { resolveSoa } from "dns";

const port = 5000;
const array = []
const htmlObject = {
    form: `    <form action="/create-post" method = "post" class = "blog">
        <input type="text" required placeholder="Enter Post Title" name = "title", id = "title"><br>
        <textarea name="content" id="content" required placeholder = "type your message here" cols = "30" rows = "50"></textarea><br>
        <button type = "submit">Submit Post</button>
    </form>`
}
//creating an instance of the express module
const app = express();
//getting the directory path
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", (req, res) => {
    res.render(__dirname + "/views/homepage.ejs");
})

let updatearray = localStorage.setItem("form", "array.push(htmlObject)");
// app.get("/new-post", (req, res) => {

//     res.render("homepage.ejs", {newPost: ay})
// })


app.post("/create-post", (req,res) => {
    let title = req.body.title;
    let content = req.body.content;

    res.render("homepage.ejs", {title: title, content: content})
})

app.get("/content", (req, res) => {
    let postContent = req.query.content;
    let postTitle = req.query.title;
    res.render("viewContent.ejs", {content: postContent, title: postTitle})
})


//listening to the server
app.listen(port, () => {
    console.log("listening at port: ", port);
    console.log(__dirname);
    console.log(updatearray)
})