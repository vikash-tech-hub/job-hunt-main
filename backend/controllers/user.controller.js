import e from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from '../models/user.model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body;

    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Please fill in all required fields",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      try {
        const fileuri = getDataUri(req.file);
        if (fileuri?.content) {
          const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
          profilePhotoUrl = cloudResponse?.secure_url || "";
        }
      } catch (uploadErr) {
        console.warn("Cloudinary upload failed (continuing without avatar):", uploadErr.message);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profile: {
        profilephoto: profilePhotoUrl,
      }
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: error?.message || "Server error occurred during registration",
      success: false,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please provide email, password, and role",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: `Account does not exist with ${role} role`,
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const isProduction = process.env.NODE_ENV === "production";

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error occurred during login",
      success: false,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Server error occurred during logout",
      success: false,
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    let cloudResponse = null;

    if (file) {
      try {
        const fileuri = getDataUri(file);
        if (fileuri?.content) {
          cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            resource_type: "raw"
          });
        }
      } catch (uploadErr) {
        console.warn("Cloudinary upload failed in updateProfile:", uploadErr.message);
      }
    }

    let skillsArray;
    if (skills) {
      skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()).filter(Boolean);
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skillsArray) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeoriginalname = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Server error occurred during profile update",
      success: false,
    });
  }
};
