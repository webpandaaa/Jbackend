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
})