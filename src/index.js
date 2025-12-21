import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
import {app} from './app.js'
import connectDB from "./db/index.js";
console.log(`Mongo URI: ${process.env.MONGO_URI}`);
// import express from "express";
// const app = express();
// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//        app.on('error',(error)=>{
//         console.error("Express app error:", error);
//         throw error;
//        })
//        app.listen(process.env.PORT || 3000,()=>{
//         console.log(`Server is running on port ${process.env.PORT || 3000}`);
//        })
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// })();
connectDB()
.then(()=>{
       app.on('error',(error)=>{
        console.error("Express app error:", error);
        throw error;
       })
app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
})
})
.catch((error)=>{
    console.error("Error connecting to MongoDB:", error);
   
})