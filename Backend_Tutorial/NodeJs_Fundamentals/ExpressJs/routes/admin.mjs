//request handler available to the admin of the app
import express from "express";

const router = express.Router()

const Form = `<form action = "/product" method = "POST">
    <input type = "text" name = "title" />
    <button type = "submit">Submit</button>
</form>`

router.get('/add-product', (req, res, use) => {
    res.send(Form)
})

router.post('/product', (req, res, use) => {
    console.log(req.body);
    res.redirect("/");
})

export{router as adminRoute}