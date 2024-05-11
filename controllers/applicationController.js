import { cathAsyncError } from "../middlewares/asyncHandler.js";
import cloudinary from 'cloudinary'
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
        return next(new ErrorHandler("An Employee Can't Access This", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'employerid.user': _id });
    res.status(200).json({
        success: true,
        applications
    });
});

export const employeeGetAllApplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Recruiter") {
        return next(new ErrorHandler("An Employer Can't Access This", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ 'applicantid.user': _id });
    res.status(200).json({
        success: true,
        applications
    });
});

export const employeeJobDelete = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Recruiter") {
        return next(new ErrorHandler("An Employer Can't Access This", 400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application Not Found", 404))
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully"
    });
});

export const applicationPost = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Recruiter") {
        return next(new ErrorHandler("An Employer Can't Access This", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume File Required", 400));
    }
    const { resume } = req.files;
    const allowedFormats = ['image/png', 'image/jpg', 'image.webp', 'image.jpeg'];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Use PNG/JPEG/JPG/WEBP File Format", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Errotr : ", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Failed To Upload Resume", 500));
    }
    const { name, email, coverletter, phone, address, jobId } = req.body;
    const applicantid = {
        user: req.user._id,
        role: "Employee",
    };
    if (!jobId) {
        return next(new ErrorHandler("Job Not Found", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job Not Found", 404));
    }
    const employerid = {
        user: jobDetails.postedBy,
        role: "Recruiter",
    };
    if (!name || !email || !coverletter || !phone || !address || !applicantid || !employerid || !resume) {
        return next(new ErrorHandler("All Fields Are Mendatory", 400));
    }
    const application = await Application.create({
        name, email, coverletter, phone, address, applicantid, employerid,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted",
        application,
    });
});