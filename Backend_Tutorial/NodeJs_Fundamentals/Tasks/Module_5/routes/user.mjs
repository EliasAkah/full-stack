import express from "express"
import path from "path";

import rootDir from "../util/path.mjs";

const router = express.Router();

//http request handlers
router.get("/users", (req, res, next) => {
    //serving html to the browser
    res.sendFile(path.join(rootDir, "views", "user.html"));
})

export {router as usersRouter}