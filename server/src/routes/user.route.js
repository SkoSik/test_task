import {Router} from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserByID,
    updateUser,
    validateUserReq
} from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.get('/getAll/:count?/:offset?', (req, res) => getAllUsers(req.params.count, req.params.offset)
    .then(users => res.status(200).send(users))
    .catch((e) => res.status(400).send(e))
)

UserRouter.get('/get/:id', (req, res) => getUserByID(req.params.id)
    .then(users => res.status(200).send(users[0]))
    .catch((e) => res.status(400).send(e))
)

UserRouter.post('/create', validateUserReq, (req, res) => createUser(req.body)
    .then(() => res.status(200).send())
    .catch((e) => res.status(400).send(e))
)

UserRouter.post('/update', validateUserReq, (req, res) => updateUser(req.body)
    .then(() => res.status(200).send())
    .catch((e) => res.status(400).send(e))
)

UserRouter.post('/delete', (req, res) => deleteUser(req.body.id)
    .then(() => res.status(200).send())
    .catch((e) => res.status(400).send(e))
)


export default UserRouter;