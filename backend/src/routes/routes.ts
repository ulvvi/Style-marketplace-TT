import { Router } from "express";
import { cartController } from "../controllers/cartController";
import { orderController } from "../controllers/orderController";

const router = Router();

// Cart router
router.post("/cart/:cartId", cartController.addVariantToCart);
router.delete("/cart/:cartId", cartController.removeVariant);
router.get("/cart/:cartId", cartController.getCart);

// Order router
router.post("/order/:userId", orderController.createOrder);
router.get("/order/:userId", orderController.getUserOrders);

export default router;
