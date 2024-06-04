import express from "express";
import productsController from "../controllers/productController.js";
import authenticateJWT from "../middleware/userMiddleware.js";

const productRouter = express.Router();

productRouter.get(
  "/products",
  authenticateJWT,
  productsController.getAllProducts
);
productRouter.post(
  "/product",
  authenticateJWT,
  productsController.createProduct
);
productRouter.get(
  "/product/:id",
  authenticateJWT,
  productsController.getProductById
);
productRouter.put(
  "/product/:id",
  authenticateJWT,
  productsController.updateProduct
);
productRouter.delete(
  "/product/:id",
  authenticateJWT,
  productsController.deleteProduct
);

export default productRouter;
