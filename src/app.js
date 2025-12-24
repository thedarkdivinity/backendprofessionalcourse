import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import {errorHandler} from '../src/middlewares/error.middleware.js';
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
//helmet middleware
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({limit: '20kb'}));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
//routes import
import userRoutes from "./routes/user.routes.js";

//route declarations
app.use("/api/v1/users",userRoutes);
app.use(errorHandler);
export {app}