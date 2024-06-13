import express from "express";
import {deleteJob, getAllJobs, getSingleJob, getmyJobs, postJob, updateJob} from "../controllers/jobController.js"
import { isAuthorized } from "../middleware/auth.js";

const router = express.Router();


// for get all jobs 
router.get("/getall" , getAllJobs);

// postJob
router.post("/postjob" , isAuthorized , postJob);

// getmyJobs
router.get("/getmyJobs" , isAuthorized , getmyJobs);

//Update job
router.put("/updatejob/:id" , isAuthorized , updateJob)

//Delete job
router.delete("/deletejob/:id" , isAuthorized , deleteJob)

// get single job
router.get("/:id" , isAuthorized , getSingleJob)


export default router;