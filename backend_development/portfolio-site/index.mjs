import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import {dirname} from "path";
import { resolveSoa } from "dns";

const port = 5000;
const posts = [];
const htmlObject = {
    id: 1,
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
    const createPostButton = `<a href = "/new-post"><button type = "submit" id = "new-post">Create a Post</button></a>`
    res.render(__dirname + "/views/homepage.ejs", {createPost: posts, button: createPostButton});
})


app.get("/new-post", (req, res) => {
    function updatePost(){
        posts.push(htmlObject);
        return posts;
    }
    res.render("homepage.ejs", {newPost: updatePost()})
})


app.post("/create-post", (req,res) => {
    let title = req.body.title;
    let content = req.body.content;
    const newPost = {
        id: posts.length ? Math.max(posts.map(p => p.id)) + 1 : 1,
        form: `<div><h2>${title}</h2><p>${content}</p></div>`
    }
    posts.push(newPost)
    // res.render("homepage.ejs", {title: title, content: content})
    res.redirect("/");
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
})