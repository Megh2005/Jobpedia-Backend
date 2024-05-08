import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide Your Name"]
    },
    email: {
        type: String,
        required: [true, "Provide Your Email"],
        validate: [validator.isEmail, "Provide Valid Email"]
    },
    phone: {
        type: Number,
        required: [true, "Provide Contact Number"],
        minLength: [10, "Provide Valid Phone Number"],
        maxLength: [13, "Provide Valid Phone Number"]
    },
    password: {
        type: String,
        required: [true, "Provide Your Password"],
        minLength: [6, "Password Atleast Contain 6 Characters"],
        maxLength: [12, "Password Atmost Contain 12 Characters"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Provide Your Role"],
        enum: ["Recruiter", "Employee"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);