import mongoose from "mongoose";

import { ENV } from "./env.js";
export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(ENV.DB_URL);
        console.log("Connected to MONGO DB:",conn.connection.host);
    }catch(error){
        console.log("Error connecting to MONGO DB",error);
        process.exit(1);//0 means success, 1 means failure
    }
};