import express from "express";
import {getAllJobs, getmyJobs, postJob, updateJob} from "../controllers/jobController.js"
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

export default router;