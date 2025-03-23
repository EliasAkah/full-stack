import express from "express";
import { productController } from "../controllers/products.mjs";

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

export {router as adminRoutes};
