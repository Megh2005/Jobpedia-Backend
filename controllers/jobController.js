import { cathAsyncError } from '../middlewares/asyncHandler.js';
import { Job } from '../models/jobSchema.js'
import ErrorHandler from '../middlewares/error.js';
export const getAllJobs = cathAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    })
});

export const postJob = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
        return next(new ErrorHandler("An Employee Can't Post A Job", 400));
    }
    const { title, description, category, country, city, state, location, fixedSalary, salaryFrom, salaryTo } = req.body;
    if (!title || !description || !category || !country || !city || !state || !location) {
        return next(new ErrorHandler("All Required Fields Must Be Filled", 400));
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Provide Any One Of The Salary Modes"))
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Provide Either Fixed or Ranged Salary"))
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        state,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    });
    res.status(200).json({
        success: true,
        message: "Job Posted Successfully",
        job,
    });
});


export const getMyJobs = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
        return next(new ErrorHandler("An Employee Can't Access This", 400));
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myJobs,
    });
});

export const updateJob = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
        return next(new ErrorHandler("An Employee Can't Access This", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job Not Found", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        job,
        message: "Job Updated Successfully"
    });
});

export const deleteJob = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employee") {
        return next(new ErrorHandler("An Employee Can't Access This", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job Not Found", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Deleted Successfully"
    });
});