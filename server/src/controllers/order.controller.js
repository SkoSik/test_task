import Order from "../models/order.model.js";

export const getAllOrders = () => Order.getAll();
export const getOrderByID = (id) => Order.getByID(id);
export const getOrdersByUserID = (user_id) => Order.getByUserID(user_id);
export const createOrder = (createReq) => Order.create(createReq)
export const updateOrder = (updateReq) => Order.updateByID(updateReq);
export const deleteOrder = (id) => Order.deleteByID(id);

export const validateOrderReq = (req, res, next) => {
    if (req.body.sum <= 0) res.status(400).send("The order amount cannot be negative")
    else next();
}
