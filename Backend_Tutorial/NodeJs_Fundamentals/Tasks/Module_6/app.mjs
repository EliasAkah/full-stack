import express from "express";
import { form } from "./routes/form.mjs";
import { users } from "./routes/users.mjs";
import expressHbs from "express-handlebars"; //exports a default function

const app = express();
app.use(express.static("public"));

app.use(express.json()); //allows the parsing of json data and storing them in the req.body where it can be accessed
app.use(express.urlencoded({ extended: true })); //allows nested object and arrays if set to true. it supports only simple key-value pairs if set to false

//registering a new engine
app.engine(
  "hbs",
  expressHbs({
    layoutDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

//specify which template engine to use
app.set("view engine", "hbs");
// app.set("view engine", "ejs");
// app.set("view engine", "pug");

app.set("views", "views"); //setting the directly to be accessed to find files

app.use(form); //executes the subApp "form";
app.use(users); //executes the subApp "useers"

app.listen(3000, () => {
  console.log("I am listening from Port: 3000");
});
