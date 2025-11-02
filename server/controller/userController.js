import bcryptjs from "bcryptjs";
import User from "../models/User.js";

import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: "something missing" });

  try {
    const exist = await User.findOne({ email });
    if (exist)
      return res.json({ success: false, message: "user already exists" });

    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign(
      { id: user._id },
      process.env.SRTOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, message: "Register successfully", user });
  } catch (error) {
    res.json({ success: false, message: error.message || "error" });
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "something missing" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "user not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "incorrect password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.SRTOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.json({ success: false, message: error.message || "error" });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ success: true, message: "Logout successful" ,data:null});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};





export const UserExist = async (req, res) => { 
  const userid = req.userid; 

  try {
 
    const user = await User.findById(userid).select("-password"); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
