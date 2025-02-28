//file available to the users using the e-commerces website
import express from "express";

const router = express.Router();

router.get('/', (req, res, use) => {
    res.send("<h1>Welcom into my Heart lord</h1>")
})

export{router as shopRoute}