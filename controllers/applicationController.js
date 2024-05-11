import { cathAsyncError } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";

export const employerGetAllApplications = cathAsyncError(async (req, res, send) => {
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

export const employeeGetAllApplications = cathAsyncError(async (req, res, send) => {
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

export const employeeJobDelete = cathAsyncError(async(req,res,send)=>{
    if (role === "Recruiter") {
        return next(new ErrorHandler("An Employer Can't Access This", 400));
    }
    const {id} = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application Not Found",404))
    }
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application Deleted Successfully"
    })
})