import express from 'express';
import { getUser, login, logout, register, updateProfile } from '../controllers/userController.js';
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.put("/update_profile",isAuthenticated,updateProfile);
router.get("/logout",isAuthenticated,logout);
router.get("/getuser",isAuthenticated,getUser);

export default router;
