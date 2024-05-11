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
        return next(new ErrorHandler("All Required Fields Must Be Filled",400));
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
})