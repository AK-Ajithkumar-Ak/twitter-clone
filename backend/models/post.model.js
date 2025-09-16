import mongoose from 'mongoose';

const postSchema= new mongoose.Schema(
    {
        user:{
            type: mongoose.SchemaTypes.ObjectId,       // post user id
            ref: "User",   // Rafere a user collection in Mongodb relationship
            required: true,
        },
        text:{
            type: String,
        },
        img:{
            type: String,
        },
        likes:[{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        }],
        comments:[{
            user:{
                type:mongoose.SchemaTypes.ObjectId,
                ref: "User",
                required:true,
            },
            text:{
                type: String,
                required: true,
            },
        }],
    },
    {timestamps: true}
)
export const Post = mongoose.model("Post", postSchema)