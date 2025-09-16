import express from "express";
import {protectRoute} from "../middleware/protectRoute.js"
import { getprofile, suggesteduser, follow_unfollow, profile_info } from "../controllers/user.controller.js";

const router= express.Router()

router.get("/profile/:username", protectRoute, getprofile)
router.get("/suggested", protectRoute, suggesteduser)
router.post("/follow_unfollow/:id", protectRoute, follow_unfollow)
router.post("/profile_info", protectRoute, profile_info)

export default router