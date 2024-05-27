import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errors.js";
import { User } from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"


export const register = catchAsyncError(async (req ,res, next) =>{
    const { name , email , phone , role , password} = req.body;
    if(!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("please fill all information"));
    }

    const isEmail = await User.findOne( { email });
    
    if(isEmail){
        return next(new ErrorHandler("Email already exists"));
    }

    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });
    sendToken(user, 200 , res , "User Register Successfully!");
});
