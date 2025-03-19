import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import {adminRoute} from "./routes/admin.mjs";
import {shopRoute} from "./routes/shop.mjs";

//creating a server
const app = express();
const port =  3000;

//manually defining __dirname path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")))


//setting up the parser middleware. we do it to fetch the data submitted in a form in javascript object format
app.use(bodyParser.urlencoded({extended: true}));

// ensuring that all the url path of request handler in the admin.mjs file begins with the url "/admin"
app.use("/admin", adminRoute);
app.use(shopRoute);

//adding 404 error page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "./", "views", "page-not-found.html"));
})


app.listen(port, () =>{
    console.log("I amd listening from port: ", port)
})


//when we use app.use() all http request method can be handled
//but using a http method (put,post, get, delete, patch) we filter request handler path to ensure only the url path that matches the filter e.g "/james" is executed
