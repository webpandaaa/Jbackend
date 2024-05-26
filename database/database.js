import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose
    .connect(process.env.MONGO_URI , {
        dbName : "HireWay",
    })
    .then(() => {
        console.log("connection established");
    })
    .catch((err) => {
        console.log(`some error occured dure to ${err}`);
    });
};