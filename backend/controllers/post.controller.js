import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Notification } from "../models/notification.model.js";
import {v2 as cloudinary} from "cloudinary"

export const createpost = async (req, res) => {
    try {
        const {text} = req.body
        let {img} = req.body
        const currentUserid = req.currentuser._id
        
        const user= await User.findById(currentUserid).select("-password -email")
        if (!user) {
            return req.status(404).json({error: "user not found"})
        }
        if (img) {
            img= (await cloudinary.uploader.upload(img)).secure_url
        }
        const newPost= new Post({
            user: user._id,
            text,
            img,
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        // console.log("error in createpost controller: ", error);
        res.status(201).json({error: "Internal server error createpost"})
    }
}

export const deletePost = async (req, res) => {
    try {
        const userpost= await Post.findById(req.params.id)
        // console.log("userpost: ", userpost);
        
        if (!userpost) {
            return res.status(404).json({error: "post not found"})
        }
        if (req.currentuser._id.toString() !== userpost.user.toString()) {
            return res.status(401).json({error: "unauthorised user you are not delete this post"})
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "post deleted successfully"})

    } catch (error) {
        // console.log("error in deletePost controller: ", error);
        res.status(201).json({error: "Internal server error deletePost"})
    }
}

export const commentpost = async (req, res) => {
    try {
        const {text}= req.body
        const postId= req.params.id
        const userId= req.currentuser._id

        if (!text) {
            return res.status(404).json({error: "Text field is required"})
        }
        const post= await Post.findById(postId)
        if (!post) {
            return res.status(404).json({error: "post not found"})
        }
        const comment = {user: userId, text}
        post.comments.push(comment)
        await post.save()
        res.status(200).json(post)

    } catch (error) {
        // console.log("error in commentOnPost controller: ", error);
        res.status(201).json({error: "Internal server error commentpost"})
    }
}

export const like_unlikepost = async (req, res) => {
    try {
        // const postId = req.params.id     // both are same
        const {id: postId}= req.params
        const currentuserid= req.currentuser._id

        let post= await Post.findById(postId)
        if (!post) {
            return res.status(404).json({error: "post not found"})
        }
        let likedPosts = post.likes.includes(currentuserid)

        if (likedPosts) {
            // unlike
            await Post.updateOne({_id: postId}, {$pull:{likes: currentuserid}})
            await User.updateOne({_id: currentuserid}, {$pull:{likedposts: postId}})       //Current user liked post list
            
            // delete like notification
            await Notification.deleteOne({from: currentuserid, likedpostid: post._id })
            // await Notification.deleteOne({from: currentuserid, to: post.user, type:"like", likedpostid:post._id })
            const updatedLikes= post.likes.filter(id=> id.toString() !== currentuserid.toString())  //
            res.status(200).json(updatedLikes)
        }
        else{
            //like
            post.likes.push(currentuserid)
            await User.updateOne({_id: currentuserid}, {$push: {likedposts: postId}})   //Current user liked post list
            await post.save()
            
            const notification= new Notification({
                from: currentuserid,
                to: post.user,
                type: "like",
                likedpostid: post._id,
            })
            await notification.save()

            const updatedLikes= post.likes
            res.status(200).json(updatedLikes)
        }
    } catch (error) {
        // console.log("error in like_unlikepost controller: ", error);
        res.status(201).json({error: "Internal server error like_unlikepost"})
    }
}

export const getallposts = async (req, res) => {
    try {
        const allpost = await Post.find({})
        .sort({createdAt: -1})
        .populate({
            path: "user",   // key name
            select: "-password"
        })
        .populate({
            path: "comments.user",
            select: "-password"
        })

        if (allpost.length == 0) {
            return res.status(200).json([])
        }
        res.status(200).json(allpost)

    } catch (error) {
        // console.log("error in getAllPosts controller: ", error);
        res.status(201).json({error: "Internal server error getallposts"})
    }
}

export const getfollowingposts = async (req, res) => {
    try {
        const currentuserid= req.currentuser._id
        const currentuser= await User.findById(currentuserid)
        if (!currentuser) {
            return res.status(404).json({error: "user not found"})
        }
        const following = currentuser.following

        const feedfollowPosts= await Post.find({user: {$in :following}})
        .sort({createdAt: -1}) // Dissenting order
        .populate({
            path: "user",   // user key name
            select: "-password"
        })
        .populate({
            path:"comments.user",   //key name
            select: "-password"
        })

        res.status(200).json(feedfollowPosts)

    } catch (error) {
        // console.log("error in getFollowingPosts controller: ", error);
        res.status(201).json({error: "Internal server error getfollowingposts"})
    }
}

export const getlikedposts = async (req, res) => {
    try {
        const userId= req.params.id     // params no currly braces

        const user= await User.findById(userId)
        if (!user) {
            return res.status(404).json({error: "user not found"})
        }

        const likedPosts= await Post.find({_id: { $in: user.likedposts}})
        .sort({createdAt: -1})
        .populate({
            path:"user",
            select: "-password",
        })
        .populate({
            path:"comments.user",
            select: "-password",
        })
        res.status(200).json(likedPosts)

    } catch (error) {
        // console.log("error in getLikedPosts controller: ", error);
        res.status(201).json({error: "Internal server error getlikedposts"})
    }
}

export const getuserposts = async (req, res) => {
    try {
        const {username}= req.params
        const user= await User.findOne({username})
        if (!user) return res.status(404).json({ error: "User not found" });

        const userpost = await Post.find({user: user._id})
        .sort({createdAt: -1}) // des order newest first
        .populate({path:"user", select:"-password"})
        .populate({path:"comments.user", select:"-password"})
        res.status(200).json(userpost)

    } catch (error) {
        // console.log("error in getUserPosts controller: ", error);
        res.status(201).json({error: "Internal server error getuserposts"})
    }
}
