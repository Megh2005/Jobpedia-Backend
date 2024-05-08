import { User } from "../models/userSchema.js";
import { cathAsyncError } from "./asyncHandler.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthorised = cathAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User Not Authorized", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = await User.findById(decoded.id);
    next();
});