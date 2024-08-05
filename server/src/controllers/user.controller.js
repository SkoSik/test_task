import User from "../models/user.model.js";
import {validateEmail} from "../helper/validate.js";

export const getAllUsers = async (count, offset) => {
    if (count && offset) return User.getAllInBetween(count, offset)
    return User.getAll();
};
export const getUserByID = async (id) => User.getByID(id);
export const createUser = async (createReq) => User.create(createReq)
export const updateUser = async (updateReq) => User.updateByID(updateReq);
export const deleteUser = async (id) => User.deleteByID(id);

export const validateUserReq = (req, res, next) => {
    if (validateEmail(req.body.email)) res.status(400).send("Incorrect email address")
    else if (req.body.firstname.length === 0 || req.body.surname.length === 0) res.status(400).send("Invalid username")
    else next();
}
