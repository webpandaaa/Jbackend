import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from './database/database.js';
import { errorMiddleware } from './middleware/errors.js';



const app  = express();
dotenv.config({path: './config/config.env'});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



// database connection ;
dbConnection();


//cors
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods: ["GET" , "POST" , "DELETE" , "PUT"],
        credentials : true,
    })
)


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//import fileUpload
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/"
    })
);


// Routes
app.use("/api/user" , userRouter);
app.use("/api/application" , applicationRouter);
app.use("/api/job" , jobRouter);





// ErrorHandler : it must be used in the last -
app.use(errorMiddleware);



export default app;