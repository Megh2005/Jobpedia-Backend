import { cathAsyncError } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwt.js";

// REGISTER A USER
export const register = cathAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("All Fields Are Mendatory"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email Already Exist"));
    }
    const user = await User.create({
        name, 
        email, 
        phone, 
        role, 
        password,
    });
    sendToken(user,201,res,"Registration Successfull")
})

// LOGIN A USER