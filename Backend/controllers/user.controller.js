import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, resp) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {

            return resp.status(400).json({
                message: "Something is missing",
                success: false,
            })

        };
        const file = req.file;

        // phone number validation
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return resp.status(400).json({
                message: "Please Enter a valid phone number",
                success: false,
            });
        };
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return resp.status(400).json({
                message: 'User already exists with this email',
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })
        return resp.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, resp) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return resp.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return resp.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        if (role !== user.role) {
            return resp.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY);

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return resp
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                message: `Welcome back, ${userResponse.fullname}!`,
                user: userResponse,
                success: true,
            });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const logout = async (req, resp) => {
    try {
        return resp.status(200).cookie("token", "", { maxAge: 0 }).json({

            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, uploadedFile, resumeOriginalName } = req.body;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if (uploadedFile) {
            user.profile.resume = uploadedFile;
        }

        if (resumeOriginalName) {
            user.profile.resumeOriginalName = resumeOriginalName;
        }
        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
