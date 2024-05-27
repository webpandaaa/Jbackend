import express from "express";
import {register} from "../controllers/userController.js"

const router = express.Router();

// Register
router.post("/register" , register);


export default router;