import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true , "please provide your name!"],
        minLength : [3 , "Name must contain at least 3 characters!"],
        maxLength : [30 , "Name cannot exceed 30 characters"],
    },
    email : {
        type : String,
        validator : [validator.isEmail, "Please provide an valid Email"],
        required : [true , "Please provide your email"],
    },
    coverletter : {
        type : String,
    },
    phone:{
        type : Number,
        required: [true , "please provide your phone number!"]
    },
    resume : {
        public_id:{
            type : String,
            required : true,
        },
        url:{
            type : String,
            required : true
        },
    },
    applicantId :{
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        role : {
            type : String,
            enum : ["Job Seeker"],
            required : true
        }
    },
    employerId:{
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        role : {
            type : String,
            enum : ["Employer"],
            required : true
        }
    }
});

export const Application = mongoose.model("Application" , applicationSchema);
