//file available to the users using the e-commerces website
import express from "express";
import path from "path";
import rootDir from "../util/path.mjs"; // i used rootDir to represent the exported __dirname from utlil folder. and it points to /epressJs

const router = express.Router();
console.log("rootDir points to:", rootDir);

router.get('/', (req, res, use) => {
    res.sendFile(path.join(rootDir, "views", "shop.html"))// __dirname path of the current directing we are in now
})

export{router as shopRoute}

//Note: The reason we use path.join() is that it detect the operating system to ensure that the accurate path is constructed dynamically 
//and according to the right file path for each operating system. 
//__dirname gives us the absolute path that is root path of our current project folder, and path of file are thus included and separated each 
// by a comman rather than an inclined slash
// NOTE: __dirname is only available in commonJS and not Js Modules.
//Note: Manually define __dirname using import.meta.url: for Js modules.
//app.use(express.static(path.join(__dirname, "public"))); express.static() => use to send static files like css, images, js stored in their respective folder
// inside the public folder
