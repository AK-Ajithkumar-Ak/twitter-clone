import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { signup, login, logout, getMe,} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe); // protectRoute is a Middleware

export default router;
