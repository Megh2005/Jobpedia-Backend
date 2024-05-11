import express from 'express';
import { getUser, login, logout, register } from '../controllers/userController.js';
import { isAuthorised } from '../middlewares/authMiddleware.js';


const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", isAuthorised, logout);
userRouter.get("/getuser",isAuthorised,getUser)

export default userRouter;