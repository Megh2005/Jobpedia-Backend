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
    sendToken(user, 201, res, "Registration Successfull")
})

// LOG IN A USER
export const login = cathAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !role || !password) {
        return next(new ErrorHandler("Provide All Asked Fields", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("User Not Found With This Role"));
    }
    sendToken(user, 200, res, "User Successfully Logged In");
})

// LOG OUT A USER
export const logout = cathAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
    }).json({
        success:true,
        message:"User Logged Out Successfully"
    });
});

// GET USER
export const getUser = cathAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });