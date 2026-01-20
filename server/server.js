import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mangodb.js'
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";


import path from "path";
import issueRouter from "./routes/issueRoutes.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }))

//API EndPoints
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/issues', issueRouter);
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.listen(port, () => console.log(`Server started on PORT:${port}`));