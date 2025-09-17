import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    
    // console.dir(req);
    // console.log(req.cookies)
    // console.log("token:",token)
    let token = req.cookies?.jwttoken;
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorised user or no jwt token" });
    }
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ error: "Unauthorised Invalid jwt token" });
    }
    const user = await User.findById(verify.userId).select("-password"); // Cannot get password in database
    // const user= await User.findById(verify.userId).select(["-password"])
    
    if (!user) {
      return res.status(404).json({error: "user not found"})
    }
    
    req.currentuser = user;
    next();

  } catch (error) {
    // console.log("Error in protectRoute Middleware", error);
    return res.status(500).json({ error: "Internal Server error protection protectRoute" });
  }
};
