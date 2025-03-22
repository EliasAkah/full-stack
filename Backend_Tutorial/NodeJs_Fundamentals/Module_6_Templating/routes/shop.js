const path = require("path");

const express = require("express");

const rootDir = require("../util/path"); //fetches the root directory of the loader file(app.js)
const adminData = require("./admin.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  console.log(rootDir);
  //using render to send a template engine file to the Client side of the browser
  res.render("shop", {
    products: products,
    docTitle: "Shop",
    path: "/",
    formCSS: true,
    shopActive: true,
  });
});

module.exports = router;
