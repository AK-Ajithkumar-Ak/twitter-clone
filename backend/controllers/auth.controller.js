import { generate_token_set_cookie } from "../utils/generateToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "enter only valid correct email format" });
    }

    const existinguser = await User.findOne({ username }); // key and value same
    if (existinguser) {
      return res.status(400).json({ error: "Username already taken" });
    }
    const existingEmail = await User.findOne({ email }); // key and value same
    if (existingEmail) {
      return res.status(400).json({ error: "email already taken" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "password minimum 6 character" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname, // key and value same
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generate_token_set_cookie(newUser._id, res); // jwt token
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileimg: newUser.profileimg,
        coverimg: newUser.coverimg,
      });
    } else {
      res.status(400).json({ error: "invalid user details" });
    }
  } catch (error) {
    // console.log("error in signup controller", error);
    res.status(500).json({ error: "internal server error singnup" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existinguser = await User.findOne({ username });
    // console.log(username, password, existinguser);
    // console.log("typeofusername: ", typeof username);
    // console.log("typeofpass: ", typeof password);
    // console.log("existingfpass: ",  typeof existinguser.password);
    // console.log("existingfpasstostr: ",  typeof existinguser.password.toString());
    // console.log("isPasswordCorrect: ", isPasswordCorrect);
    
    const isPasswordCorrect = await bcrypt.compare( password, existinguser?.password.toString() || "");
    if (!existinguser || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generate_token_set_cookie(existinguser._id, res);

   await res.status(200).json({
      _id: existinguser._id,
      fullname: existinguser.fullname,
      username: existinguser.username,
      email: existinguser.email,
      followers: existinguser.followers,
      following: existinguser.following,
      profileimg: existinguser.profileimg,
      coverimg: existinguser.coverimg,
    });
  } catch (error) {
    // console.log("error in login controller", error);
    res.status(500).json({ error: "internal server error login" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwttoken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    // console.log("error in logout controller", error);
    res.status(500).json({ error: "internal server error logout" });
  }
};

export const getMe = async (req, res) => {
  try {
    const currentuser = await User.findById(req.currentuser._id).select(["-password"]);
    // const currentuser = req.currentuser
    res.status(200).json(currentuser);
  } catch (error) {
    // console.log("error in getme controller", error);
    res.status(500).json({ error: "internal server error get me" });
  }
};
