import express from "express";
import bodyParser from "body-parser";

import {adminRoute} from "./routes/admin.mjs";
import {shopRoute} from "./routes/shop.mjs";

//creating a server
const app = express();
const port =  3000;

//setting up the parser middleware. we do it to fetch the data submitted in a form in javascript object format
app.use(bodyParser.urlencoded({extended: true}));

app.use(adminRoute);
app.use(shopRoute);

//adding 404 error page
app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>")
})



app.listen(port, () =>{
    console.log("I amd listening from port: ", port)
})


//when we use app.use() all http request method can be handled
//but using a http method (put,post, get, delete, patch) we filter request handler path to ensure only the url path that matches the filter e.g "/james" is executed
