class ErrorHandler extends Error{
    constructor(message , statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}


export const errorMiddleware = (err, req ,res, next) =>{
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;

    if( err.name === "CastError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message , 400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message , 400);
    }
    if(err.code === "JsonWenTokenError"){
        const message = `Json web token is invalid.  Try again`;
        err = new ErrorHandler(message , 400);
    }
    if(err.code === "TokenExpiredError"){
        const message = `json web token expired. Try again`;
        err = new ErrorHandler(message , 400);
    }
    return res.status(statuscode).json({
        success : false,
        message : err.message,
    });
};


export default ErrorHandler

