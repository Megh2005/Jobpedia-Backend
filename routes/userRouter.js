import express from 'express';
import { login, logout, register } from '../controllers/userController.js';
import { isAuthorised } from '../middlewares/authMiddleware.js';


const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", isAuthorised, logout);

export default userRouter;