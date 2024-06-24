export const sendToken = (user, statuscode , res, message) =>{
    const token = user.getJwtToken();
    const options = {
        expire : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
        secure : true,  // for logout user
        sameSite : "None",
    }
    res.status(statuscode).cookie("token", token ,options).json({
        success : true,
        user,
        message,
        token,
    });
};
