import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { getallposts, getfollowingposts, getuserposts, createpost, commentpost, deletePost, getlikedposts, like_unlikepost } from '../controllers/post.controller.js'
const router= express.Router()

router.get("/all", protectRoute, getallposts)
router.get("/following", protectRoute, getfollowingposts)
router.get("/user/:username", protectRoute, getuserposts)
router.get("/likes/:id", protectRoute, getlikedposts)
router.post("/create", protectRoute, createpost)
router.post("/comment/:id", protectRoute, commentpost)
router.post("/like_unlike/:id", protectRoute, like_unlikepost)
router.delete("/delete/:id", protectRoute, deletePost)

export default router