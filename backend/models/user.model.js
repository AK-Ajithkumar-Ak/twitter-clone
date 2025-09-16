import mongoose from 'mongoose'

const userSchema= new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        fullname:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        followers:[{
            // type: mongoose.Schema.Types.ObjectId,  // Both are same functionality
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            default: [],
        }],
        following:[{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            default: [],
        }],
        profileimg:{
            type: String,
            default: "",
        },
        coverimg:{
            type: String,
            default: "",
        },
        bio:{
            type: String,
            default: "",
        },
        link:{
            type: String,
            default: "",
        },
        likedposts:[{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Post",  // refer post collection in Mongodb relationship
            default: [],
        }]
    },
    {timestamps: true}// CreatedAt and updatedAt two field
)
export const User= mongoose.model("User", userSchema)
