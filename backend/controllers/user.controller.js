import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from "cloudinary";
import { User } from '../models/user.model.js';
import { Notification } from "../models/notification.model.js";


export const getprofile= async (req, res) => {
    try {
        const {username}= req.params
        
        const user = await User.findOne({username}).select("-password")
        if (!user) {
            return res.status(404).json({error: "this user "+ username+" not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        // console.log("ERROR in getprofile controller:", error);
        res.status(500).json({error: error.message +"getprofile",})
    }
}

export const suggesteduser= async (req, res) => {
    try {
        const currentUserid= req.currentuser._id
        const userfollowing= await User.findById(currentUserid).select("following")

        const otheruser= await User.aggregate([
            {
                $match:{        // Match this condition. get not equal to current User ID.
                    _id: {$ne: currentUserid}
                }
            },
            {$sample:{size: 10}}    // get Random 10 user.
        ])
        const filteredUsers= otheruser.filter((user)=>{ return !userfollowing.following.includes(user._id)})
        const suggestedUsers= filteredUsers.slice(0,5)

        suggestedUsers.forEach((user)=> user.password= null)

        res.status(200).json(suggestedUsers)

    } catch (error) {
        // console.log("ERROR in suggesteduser controller:", error);
        res.status(500).json({error: error.message+ "suggesteduser"})
    }
}

export const follow_unfollow= async (req, res) => {
    try {
        const {id}= req.params
        const userToModify= await User.findById(id)
        const currentuser= await User.findById(req.currentuser._id)

        if (id== req.currentuser._id.toString()) {
            return res.status(400).json({error: "You cannot follow or unfollow your ID"})
        }
        if (!userToModify || !currentuser) {
            return res.status(400).json({error:"User not found"})
        }
        const isFollowing= currentuser.following.includes(userToModify._id)

        if (isFollowing) {
            // unfollow 
            await User.findByIdAndUpdate(currentuser._id, {$pull:{following: userToModify._id}})
            await User.findByIdAndUpdate(userToModify._id, {$pull:{followers: currentuser._id}})
            // Delete notification document in database, user unfollow
            await Notification.deleteOne({from: currentuser._id, to:userToModify._id, type:"follow" })  // work
            // await Notification.deleteOne({from: currentuser._id} && {to:userToModify._id }&& {type: "follow"})   // not proper work
            return res.status(200).json({message: "User unfollow successfully"})
        }
        else{
            // follow
            await User.findByIdAndUpdate(currentuser._id, {$push: {following: userToModify._id}})
            await User.findByIdAndUpdate(userToModify._id, {$push: {followers: currentuser._id}})

            // Send notification follow to the user
            const newNotification= new Notification({
                from: currentuser._id,
                to: userToModify._id,
                type: "follow",
            })
            await newNotification.save()
            return res.status(200).json({message: "User followed successfully"})
        }
    } catch (error) {
        // console.log("ERROR in follow_unfollow controller:", error);
        res.status(500).json({error: error.message+ "follow_unfollow"})
    }
}

export const profile_info= async (req, res) => {
    
    const {username, fullname, currentpassword, newpassword, email, bio, link}= req.body
    let {profileimg, coverimg}= req.body
    // console.log(req.currentuser._id);    //Postman key value pair last comma is something problem
    // console.log(req.currentuser._id.toString());     // ID based filter no use tostring, FindOne method use tostring
    
    let userId= req.currentuser._id
    try {
        let currentuser= await User.findById(userId)
        if (!currentuser) {
            return res.status(404).json({error: "user not found"})
        }

        if (currentuser.email !== email) {
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  return res.status(400).json({ error: "enter only correct valid email format" });
                }
            }
        }

        if (currentuser.username !== username) {
            const existinguser= await User.findOne({username})
            if (existinguser) {
                return res.status(400).json({error: "This username is already taken"})
            }
        }

        if ((!currentpassword && newpassword) || (!newpassword && currentpassword)) {
            return res.status(400).json({error: "Provide both current password and new password"})
        }
        if (currentpassword && newpassword) {
            let isMatch = await bcrypt.compare(currentpassword, currentuser.password)
            if (!isMatch) return res.status(400).json({error:"Current password is not correct"})
            if (newpassword.length <6) {
                return res.status(400).json({error: "Password at least 6 character"})
            }
            const salt= await bcrypt.genSalt(10)
            currentuser.password= await bcrypt.hash(newpassword, salt)
        }

        if (profileimg) {
            if (currentuser.profileimg) {
                // Destroy already existing profile image
                // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
                await cloudinary.uploader.destroy(currentuser.profileimg.split("/").pop().split(".")[0])    // Public I D=  zmxorcxexpdbh8r0bkjb
            }
            // Upload new profile image
            const upload= (await cloudinary.uploader.upload(profileimg)).secure_url
            profileimg= upload
        }
        if (coverimg) {
            if (currentuser.coverimg) {// Destroy already existing cover image
                await cloudinary.uploader.destroy(currentuser.coverimg.split("/").pop().split(".")[0])
            }
            const upload = (await cloudinary.uploader.upload(coverimg)).secure_url
            coverimg= upload
        }

        currentuser.username= username || currentuser.username
        currentuser.fullname= fullname || currentuser.fullname
        currentuser.email= email || currentuser.email
        currentuser.bio= bio || currentuser.bio
        currentuser.link= link || currentuser.link
        currentuser.profileimg= profileimg || currentuser.profileimg
        currentuser.coverimg= coverimg || currentuser.coverimg

        currentuser= await currentuser.save()
        // Current user password is null in response
        currentuser.password= null
        return res.status(200).json(currentuser)

    } catch (error) {
        // console.log("ERROR in profile_info controller:", error);
        res.status(500).json({error: error.message+ "profile_info"})
    }
}
