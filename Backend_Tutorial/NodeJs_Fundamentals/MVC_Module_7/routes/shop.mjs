import express from "express";
import { productController } from "../controllers/products.mjs";
const router = express.Router();

router.get("/", productController.shopGetProduct);

export { router as shopRoutes };
