import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
import { connectMongoDB } from "./db/connectMongoDB.js";

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// console.log(path.join(__dirname, "frontend", "dist"));

const allow= ["http://localhost:5173","http://localhost:3000","https://twitter-clone-6wcl.onrender.com"]
app.use(cors({
  // origin: "http://localhost:5173", // Replace with your frontend URL
  origin: function (origin, calback) {
    if (allow.indexOf(origin) !==-1 || !origin) {
      calback(null, true) // allow the req
    }else{
      calback(new Error("not allowed by CORS, your current domain"))
    }
  },
  credentials: true, // Allow credentials to be sent with requests
}))

app.use(express.json({ limit: "5mb", })); // Returns middleware that only parses json, to parse req.body  //limit Controls the maximum request body size
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true,limit:"4m" })); // to parse html form data
app.use(cookieParser()); // Browser Cookie access uning req

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/notification", notificationRoutes)

if (process.env.NODE_ENV=== "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist"),{maxAge: "3d"})); // Serve static files from the frontend/dist directory, cache file for 3 days

  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"),{maxAge:"5d"})
  })
}
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
  connectMongoDB();
});
