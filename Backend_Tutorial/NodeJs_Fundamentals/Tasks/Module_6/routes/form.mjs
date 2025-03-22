import express from "express";

const router = express.Router();

router.get("/", (req, res, next) =>{
    console.log("FORM IS SHOWN TO THE UI");
    res.render("form", {docTitle: "Form"})
})

export{router as form}