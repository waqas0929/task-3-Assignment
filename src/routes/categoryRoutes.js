import express from "express";
import categoryController from "../controllers/categoryController.js";
import authenticateJWT from "../middleware/userMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/category",
  authenticateJWT,
  categoryController.getAllCategory
);
categoryRouter.post(
  "/category",
  authenticateJWT,
  categoryController.createCategory
);
categoryRouter.get(
  "/category/:id",
  authenticateJWT,
  categoryController.getCategoryById
);
categoryRouter.put(
  "/category/:id",
  authenticateJWT,
  categoryController.updateCategory
);
categoryRouter.delete(
  "/category/:id",
  authenticateJWT,
  categoryController.deleteCategory
);

export default categoryRouter;
