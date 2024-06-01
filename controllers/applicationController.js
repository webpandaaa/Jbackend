import {catchAsyncError} from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errors.js";
import { Application  } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";



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
        message : "Application Deleted Successfully!"
    });     
});


// Post application Routes
// export const postApplication = catchAsyncError(async ( req ,res,next) =>{
//     const {role} = req.user;
//     if(role === "Employer"){
//         return next(
//             new ErrorHandler("Employer is not allowed  to access this resources!" , 400)
//         );
//     }
//     if(!req.files || Object.keys(req.files).length === 0){
//         return next(new ErrorHandler("Resume File Required"));
//     }

//     const { resume } = req.files;
//     const allowedFormats = ["image/png" , "image/jpg" , "image/webp"];
//     if(!allowedFormats.includes(resume.mimetype)){
//         return next(new ErrorHandler("Invalid File type. Please upload your image in a png ,jpg or webp form"))
//     }

//     const cloudinaryResponse = await cloudinary.uploader.upload(
//         resume.tempFilePath
//     );
//     if(!cloudinaryResponse || cloudinaryResponse.error){
//         console.error(
//             "Cloudinary Error:",
//             cloudinaryResponse.error || "Unknown cloudinary Error"
//         );
//         return next(new ErrorHandler("Failed to upload resume" , 500))
//     }

//     const { name , email , coverletter , phone , address , jobId} = req.body;
//     const applicantId = {
//         user : req.user._id,
//         role : "Job Seeker",
//     };
//     if(!jobId){
//         return next(new ErrorHandler("Job not found!" , 404));
//     }
//     const jobDetails = await jobId.findById(jobId);
//     if(!jobDetails){
//         return next(new ErrorHandler("job not found"));
//     }

//     const employerId = {
//         user : jobDetails.postedBy,
//         role : "Employer",
//     }

//     if( 
//         !name ||
//         !email ||
//         !phone ||
//         !coverletter ||
//         !address ||
//         !applicantId ||
//         !employerId ||
//         !resume
//     ){
//         return next(new ErrorHandler("Please fill all fields" , 400));
//     }

//     const application = await Application.create({
//         name,
//         email,
//         phone,
//         coverletter,
//         address,
//         applicantId,
//         employerId,
//         resume : {
//             public_id : cloudinaryResponse.public_id,
//             url : cloudinaryResponse.secure_url,
//         }
//     })
//     res.status(200).json({
//         success:true,
//         message : "Application Submitted!",
//         application,
//     })
// });

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Resume File Required!", 400));
    }
  
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantId = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }
  
    const employerId = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantId ||
      !employerId ||
      !resume
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantId,
      employerId,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  });
  


