import express from "express";
import { empGetAllapp , jsGetAllapp , jsdeleteapp, postApplication } from "../controllers/applicationController.js"
import { isAuthorized } from "../middleware/auth.js"


const router = express.Router();

// empoyer get all application
router.get("/employer/getall" , isAuthorized , empGetAllapp);


// job seeker get all application route
router.get("/jobseeker/getall" , isAuthorized , jsGetAllapp) ;


// Job Seeker delete application route
router.delete("/delete/:id" , isAuthorized , jsdeleteapp );


// route for for applicationo
router.post("/postapplication" , isAuthorized , postApplication)


export default router;