import { Router } from "express";
import { loginUser, logoutUser, RegisterUser } from "../controllers/user.contollers.js";

const router=Router();

router.post('/register',RegisterUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
export default router;