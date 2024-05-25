import express from 'express';
import dotenv from "dotenv";
import cors from "cors";



const app  = express();
dotenv.config({path: './config/config.env'});

//cors
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods: ["GET" , "POST" , "DELETE" , "PUT"],
        credentials : true,
    })
)


// express
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


export default app;