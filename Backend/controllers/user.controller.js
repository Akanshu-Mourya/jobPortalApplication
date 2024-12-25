import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, resp) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        // console.log(req.body);

        if (!fullname || !email || !phoneNumber || !password || !role) {

            return resp.status(400).json({
                message: "Something is missing",
                success: false,
            })

        };
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
        // console.log(req.body);

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
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

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

export const updateProfile = async (req, resp) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // Resume file
        console.log(req.body);

        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(" ");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return resp.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        if (bio) {
            if (!user.profile) user.profile = {};
            user.profile.bio = bio;
        }

        if (skills) {
            if (!user.profile) user.profile = {};
            user.profile.skills = skillsArray;
        }


        await user.save();


        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            bio: user.profile?.bio,
            skills: user.profile?.skills,
            profile: user.profile
        };
        console.log(updatedUser);

        return resp.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false,
        });
    }
};
