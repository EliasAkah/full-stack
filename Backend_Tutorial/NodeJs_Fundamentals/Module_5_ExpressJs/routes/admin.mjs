//request handler available to the admin of the app
import express from "express";
import path from "path";

import __dirname from  "../util/path.mjs"

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', (req, res, use) => {
    //serving add-product.html file to request handler
    res.sendFile(path.join(__dirname, "views", "add-product.html"))
})

// /admin/add-product => POST
router.post('/add-product', (req, res, use) => {
    console.log(req.body);
    res.redirect("/");
})

export{router as adminRoute}

//Note: two request can have the same url path provide their http request method are different like illustrated above
//instead of beginning each path with "/admin" on each request handler we can just add the path "/admin" to the adminRoute
//request handler imported inside the app.mjs file to quicky assign at once to all the url path in the admin.mjs file.