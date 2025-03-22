const path = require("path");

const express = require("express");

const rootDir = require("../util/path"); //fetches the root directory of the loader file(app.js)

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    docTitle: "Enter Product",
    path: "/admin/add-Product",
    formCSS: true,
    productCSS: true,
    productActive: true,
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

//sending subapp in the form object
module.exports.routes = router;
module.exports.products = products;
