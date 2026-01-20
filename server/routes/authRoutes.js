import express from "express";
import { register, login, logout, isAuthenticated } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/is-auth',userAuth,isAuthenticated);

export default authRouter;