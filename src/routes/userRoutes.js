import express from "express";
import userController from "../controllers/userController.js";
import authenticateJWT from "../middleware/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signUp",  userController.signUp);
userRouter.post("/signIn",  userController.signIn);
// userRouter.get("/getUser/:id", authenticateJWT, userController.getUserById);
userRouter.get("/getAll", authenticateJWT, userController.getUserAllId);
userRouter.put("/updateUser/:id", authenticateJWT, userController.updateUser);
userRouter.delete(
  "/deleteUser/:id",
  authenticateJWT,
  userController.userDeleted
);

export default userRouter;
