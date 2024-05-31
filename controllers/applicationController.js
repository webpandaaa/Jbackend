import {catchAsyncError} from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errors.js";
import { Application  } from "../models/applicationSchema.js";



// employer get all applications
export const empGetAllapp = catchAsyncError(async ( req , res, next) => {
    const { role } = req.user;
    if(role === "Job Seeker"){
        return next(
            new ErrorHandler(
                "Job Seeker is not allowed to access this resources!",
                400
            )
        );
    }

    const {_id} = req.user;
    const applications = await Application.find({"employerId.user" : _id});
    res.status(200).json({
        success : true,
        applications
    })     
})


// Job seeker get all applications
export const jsGetAllapp = catchAsyncError(async ( req , res, next) => {
    const { role } = req.user;
    if(role === "Employer"){
        return next(
            new ErrorHandler(
                "Employer is not allowed to access this resources!",
                400
            )
        );
    }

    const {_id} = req.user;
    const applications = await Application.find({"applicantId.user" : _id});
    res.status(200).json({
        success : true,
        applications
    })     
})


// Job Seeker delete application
export const jsdeleteapp = catchAsyncError(async ( req , res, next) => {
    const { role } = req.user;
    if(role === "Employer"){
        return next(
            new ErrorHandler(
                "Employer is not allowed to access this resources!",
                400
            )
        );
    }

    const { id } = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops , application not found!" , 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success : true,
        message : "Application Deleted Successfully!";
    });     
});

