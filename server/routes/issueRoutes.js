import express from "express";
import multer from "multer";
import { createIssue, getAllIssues, upvoteIssue } from "../controllers/issueController.js";
import userAuth from "../middleware/userAuth.js";

const issueRouter = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

issueRouter.post('/create', userAuth, upload.single('image'), createIssue);
issueRouter.get('/all', getAllIssues);
issueRouter.post('/upvote', userAuth, upvoteIssue);

export default issueRouter;
