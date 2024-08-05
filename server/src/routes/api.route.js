import {Router} from "express";
import OrderRouter from "./order.route.js";
import UserRouter from "./user.route.js";

const ApiRouter = Router();

ApiRouter.use("/user", UserRouter)
ApiRouter.use("/order", OrderRouter)

export default ApiRouter;