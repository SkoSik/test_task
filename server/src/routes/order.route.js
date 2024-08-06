import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderByID,
  updateOrder,
  validateOrderReq,
} from "../controllers/order.controller.js";

const OrderRouter = Router();

OrderRouter.get("/getAll", (req, res) => getAllOrders()
  .then(orders => res.status(200).send(orders))
  .catch((e) => res.status(400).send(e)),
);

OrderRouter.get("/get/:id", (req, res) => getOrderByID(req.params.id)
  .then(orders => res.status(200).send(orders[0]))
  .catch((e) => res.status(400).send(e)),
);

OrderRouter.post("/create", validateOrderReq, (req, res) => createOrder(req.body)
  .then((result) => res.status(200).send({ id: result.id }))
  .catch((e) => res.status(400).send(e)),
);

OrderRouter.post("/update", validateOrderReq, (req, res) => updateOrder(req.body)
  .then(() => res.status(200).send())
  .catch((e) => res.status(400).send(e)),
);

OrderRouter.post("/delete", (req, res) => deleteOrder(req.body.id)
  .then(() => res.status(200).send())
  .catch((e) => res.status(400).send(e)),
);

export default OrderRouter;