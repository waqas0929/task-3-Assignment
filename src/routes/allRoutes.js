import authenticateJWT from "../middleware/userMiddleware.js";
import categoryRouter from "./categoryRoutes.js";
import productRouter from "./productRoutes.js";
import salesRouter from "./salesRoutes.js";
import userRouter from "./userRoutes.js";

const allRoutes = [userRouter, authenticateJWT, categoryRouter,productRouter, salesRouter];

export default allRoutes;
