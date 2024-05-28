import express from "express";
import {login, logout, register} from "../controllers/userController.js"
import {isAuthorized} from "../middleware/auth.js"

const router = express.Router();

// Register
router.post("/register" , register);

// Login
router.post("/login" , login);

// Logout
router.get("/logout" , isAuthorized, logout);

export default router;


