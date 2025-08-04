const express = require("express");
const { body } = require("express-validator");

const { isAuth } = require("../middleware/is-auth");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProducts);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title", "Please enter a title").trim().notEmpty().isString(),
    body("price").notEmpty().withMessage("Please enter a price").isFloat(),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Please enter a description")
      .isString(),
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  [
    body("title", "Please enter a title").trim().notEmpty().isString(),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("Please enter a price")
      .isFloat(),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Please enter a description"),
  ],
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
