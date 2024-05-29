import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errors.js";
import { Job } from "../models/jobSchema.js";



// get All jobs 
export const getAllJobs = catchAsyncError(async(req, res , next) =>{
    const jobs = await Job.find({expired : false});
    res.status(200).json({
        success : true,
        jobs
    });
});


// post Job
export const postJob = catchAsyncError(async(req, res, next) =>{
    const {role} = req.user;  // we can write : const role = req.user.role;
    if( role === "Job Seeker"){
        return next(
            new ErrorHandler(
                "job Seeker is not allowed to access this resource!",
                400
            )
        );
    }

    const { 
        title , 
        description , 
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;

    if(!title || !description || !category || !country || !location){
        return next(new ErrorHandler("Please provide all jobs details", 400));
    }

    if((!salaryFrom || !salaryTo ) && !fixedSalary){
        return next(
            new ErrorHandler("Please either provide fixed salary or ranged salary")
        )
    }

    if((salaryFrom && salaryTo ) && fixedSalary){
        return next(
            new ErrorHandler("Cannot enter fixed salary and ranged salary together!")
        )
    }
 
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        salaryFrom,
        salaryTo,
        postedBy,
    });

    res.status(200).json({
        success: true,
        message : "Job posted Successfully!",
        job
    })
});


// get my jobs;
export const getmyJobs = catchAsyncError(async (req ,res, next) => {
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler(
                "Job Seeker is not allowed to access this resources!",
                400
            )
        );
    }

    const myjobs = await Job.find({ postedBy : req.user._id});
    res.status(200).json({
        success : true,
        myjobs,
    });
});


// Update Job
export const updateJob = catchAsyncError(async ( req , res , next) =>{
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler(
                "Job Seeker is not allowed to access this resources!",
                400
            )
        );
    }

    const { id } = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(
            new ErrorHandler(
                "Oops , Job not found!",
                404
            )
        );
    }

    job = await Job.findByIdAndUpdate(id , req.body , {
        new :true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        job,
        message : " Job Updated Successfully!"
    })
})






