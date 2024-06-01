import express from "express";
import {getUser, login, logout, register} from "../controllers/userController.js"
import {isAuthorized} from "../middleware/auth.js"

const router = express.Router();

// Register
router.post("/register" , register);

// Login
router.post("/login" , login);

// Logout
router.get("/logout" , isAuthorized, logout);

// getuser 
router.get("/getuser" , isAuthorized , getUser)

export default router;


