import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "please provide job title"],
        minLength : [3, "job title must contain at least 3 characeters"],
        maxLength : [50, "job title  cannot exceed 50 characeters"],
    },
    description : {
        type : String,
        required : [true , "please provide job description"],
        minLength : [3, "job description must contain at least 3 characeters"],
        maxLength : [350, "job description  cannot exceed 350 characeters"],
    },
    category : {
        type : String,
        required : [true , "please provide job category"],
    },
    country : {
        type : String,
        required : [true , "please provide job category"],
    },
    city : {
        type : String
    },
    location : {
        type : String,
        required : [true , "please provide job location"],
    },
    fixedSalary:{
        type : Number,
        minLength : [4, "Fixed Salary must contain at least 4 characeters"],
        maxLength : [9, "Fixed Salary cannot exceed 9 characeters"],
    },
    salaryFrom:{
        type : Number,
        minLength : [4, "Fixed Salary must contain at least 4 characeters"],
        maxLength : [9, "Fixed Salary cannot exceed 9 characeters"],
    },
    SalaryTo:{
        type : Number,
        minLength : [4, "Fixed Salary must contain at least 4 characeters"],
        maxLength : [9, "Fixed Salary cannot exceed 9 characeters"],
    },
    expired:{
        type : Boolean,
        default : false,
    },
    jobPostedOn : {
        type:Date,
        default : Date.now,
    },
    postedBy:{
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
});

