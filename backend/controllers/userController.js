// userController.js
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'Sahid4@#';  

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No user exists." });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ updatedUser, message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const data = { user: { id: user._id } };
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            success: true,
            message: "Login successful.",
            authtoken,
            userId: user._id,
        });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const GetLoggedInUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
