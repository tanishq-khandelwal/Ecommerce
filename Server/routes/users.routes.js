import { Router } from "express";
import { loginUser, RegisterUser } from "../controllers/user.contollers.js";

const router=Router();

router.post('/register',RegisterUser);
router.post('/login',loginUser);

export default router;