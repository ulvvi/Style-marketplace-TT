import { Router } from "express";
import { productController } from "../controllers/productController";
import { variantController } from "../controllers/variant.Controller";
import { reviewController } from "../controllers/reviewController";

const router = Router();

// Rota do produto
router.post("/product", productController.createProduct);
router.get("/products", productController.readAllProduct);
router.get("/product/:id", productController.readProduct);
router.post("/product/:id", productController.updateProduct);
router.post("/product/:id", productController.deleteProduct);

// Rota da variante
router.post("/variant/:productId", variantController.createVariant);
router.post("/variants/:productId", variantController.readAllVariant);
router.post("/variant/:id", variantController.readVariant);
router.post("/variant/:id", variantController.updateVariant);
router.post("/variant/:id", variantController.deleteVariant);

// Rota da variante
router.post("/review/:productId", reviewController.createReview);
router.post("/reviews/:productId", reviewController.readAllReview);
router.post("/review/:id", reviewController.readReview);
router.post("/review/:id", reviewController.updateReview);
router.post("/review/:id", reviewController.deleteReview);
