import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please provide your name!"],
        minLength : [3 , "name must be contain at least 3 characters"],
        maxLength : [30, "Name cannot exceed 30 Characters "],
    },

    email : {
        type : String,
        required : [true , "please provide your email"],
        validate : [validator.isEmail, "Please Enter the valid email"],
    },

    phone:{
        type : Number,
        required : [true , "please provide your phone numbers"],
    },

    password:{
        type : String,
        required : [true , "please provide your password!"],
        minLength : [3 , "password must be contain at least 3 characters"],
        maxLength : [30, "password cannot exceed 30 Characters "],
        select : false // don't show password
    },

    role:{
        type : String,
        required : [true , "please provide your password!"],
        enum : ["Job Seeker" , "Employer"]
    },

    createdAt:{
        type : Date,
        default : Date.now,
    },
});



// Hashing -
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// Comparing password -
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a jwt token for authorization:
userSchema.methods.getJwtToken = function (){
    return jwt.sign({ id : this._id } , process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};  

export const User = mongoose.model("User" , userSchema);