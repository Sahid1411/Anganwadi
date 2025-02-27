import express from "express";
import { createUser, deleteUser, getAllUsers, GetLoggedInUserDetails, getUserById, LoginUser, updateUser } from "../controllers/userController.js";
import fetchUser from "../middlewares/fetchUser.js";

const route = express.Router();

route.post('/create/user',createUser);
route.get('/users',getAllUsers);
route.get('/user/:id',getUserById);
route.put('/update/user/:id',updateUser);
route.delete('/delete/user/:id',deleteUser);

route.post("/user/login",LoginUser);
route.post("/user/auth/getUser",fetchUser,GetLoggedInUserDetails);
export default route;
