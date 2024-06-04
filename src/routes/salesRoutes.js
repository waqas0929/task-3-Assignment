import express from "express";
import authenticateJWT from "../middleware/userMiddleware.js";
import salesController from "../controllers/salesController.js";

const salesRouter = express.Router();

salesRouter.post("/createSales", authenticateJWT, salesController.createSale);
// salesRouter.get(
//   "/getSalesById/:id",
//   authenticateJWT,
//   salesController.getSalesById
// );
// salesRouter.get("/getAllSales", authenticateJWT, salesController.getAllSales);
// salesRouter.put(
//   "/updateSalesById/:id",
//   authenticateJWT,
//   salesController.updateSalesById
// );
// salesRouter.delete(
//   "/deleteSalesById/:id",
//   authenticateJWT,
//   salesController.deleteSalesById
// );

export default salesRouter;
