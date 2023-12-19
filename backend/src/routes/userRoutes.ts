import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/userController";
import authenticate from "../middlewares/auth";

const router:Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(authenticate, getProfile);

export default router;