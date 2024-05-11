import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide Name"]
    },
    email: {
        type: String,
        required: [true, "Provide Email"],
        validator: [validator.isEmail, "Provide Valid Email"]
    },
    coverletter: {
        type: String,
        required: [true, "Provide Cover Letter"],
    },
    phone: {
        type: Number,
        required: [true, "Provide Phone Number"],
        maxLength: 10
    },
    address: {
        type: String,
        required: [true, "Provide Proper Address"],
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantid: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employee"],
            required: true
        }
    },
    employerid: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Recruiter"],
            required: true
        }
    }
});

export const Application = mongoose.model("Application",applicationSchema);