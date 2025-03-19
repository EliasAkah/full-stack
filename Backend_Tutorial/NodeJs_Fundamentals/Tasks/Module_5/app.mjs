import express from "express"
import path from "path";

import { usersRouter } from "./routes/user.mjs";
import rootDir from "./util/path.mjs";

//setting up app server
const app = express();

//serving Static files
app.use(express.static(path.join(rootDir, "public"))) 

app.use(usersRouter);

app.get("/", (req, res, next) => {
        //serving html to the browser
        res.sendFile(path.join(rootDir, "views", "homepage.html"));
})

//server listens to request
app.listen(3000, () => {
    console.log("I am listening you can pass your request")
})