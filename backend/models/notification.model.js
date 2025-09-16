import mongoose from "mongoose";

const notificationSchema= new mongoose.Schema(
    {
        from:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required:true,
        },
        to:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User",
            required: true,
        },
        type:{
            type: String,
            required: true,
            enum:["follow", "like"],
        },
        read:{
            type:Boolean,
            default: false,
        },
        likedpostid:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Post"
        },
    },
    {timestamps: true}
)
export const Notification= mongoose.model("Notification", notificationSchema)