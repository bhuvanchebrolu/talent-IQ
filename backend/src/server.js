import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import {serve} from "inngest/express"

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { functions, inngest } from "./lib/inngest.js";

dotenv.config();

const app=express();

//middlewares   
app.use(express.json());
//credentials:true meaning ?? => server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.use("/api/inngest",serve({client:inngest,functions}));


app.get("/health",(req,res)=>{
    res.status(200).json({msg:"api is up and running"});
})



const startServer=async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>console.log("Server is running on port:",ENV.PORT));

    }catch(error){
        console.error("Error starting the server",error);
    }
}

startServer();