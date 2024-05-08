import express from 'express';
import { register } from '../controllers/userController.js';


const userRouter = express.Router();
userRouter.post("/register",register)

export default userRouter;