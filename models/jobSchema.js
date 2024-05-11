import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Job Title"],
        minLength: [10, "Minimum 10 Characters"],
        maxLength: [50, "Maximum 50 Characters"],
    },
    description: {
        type: String,
        required: [true, "Provide Job Description"],
        minLength: [10, "Minimum 50 Characters"],
        maxLength: [300, "Maximum 300 Characters"],
    },
    category: {
        type: String,
        required: [true, "Provide Job Category"],
    },
    country: {
        type: String,
        required: [true, "Provide Job Country"],
    },
    city: {
        type: String,
        required: [true, "Provide Job City"],
    },
    state: {
        type: String,
        required: [true, "Provide Job State"],
    },
    location: {
        type: String,
        required: [true, "Provide Job Address"],
        minLength: [10, "Minimum 50 Characters"],
        maxLength: [300, "Maximum 300 Characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Minimum 1K INR Should Be Given"],
        maxLength: [6, "Maximum 100K INR Is Allowed"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Minimum 1K INR Should Be Given"],
        maxLength: [6, "Maximum 100K INR Is Allowed"],
    },
    salaryTo: {
        type: Number,
        minLength: [5, "Minimum 10K INR Should Be Given"],
        maxLength: [6, "Maximum 100K INR Is Allowed"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("job", jobSchema);