import express from "express";
import { shopController } from "../controllers/shop.mjs";
const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);
router.get("/products", shopController.getproducts);
router.get("/getCheckout", shopController.getCheckout);

export { router as shopRoutes };
