// userRoute.js
import express from "express";
import { deleteUser, getAllUsers, GetLoggedInUserDetails, getUserById, LoginUser, updateUser } from "../controllers/userController.js";
import fetchUser from "../middlewares/fetchUser.js";
import User from "../models/userModel.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const route = express.Router();

// Configure multer to store files in 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

const upload = multer({ storage });

route.post("/create/user", upload.single("photo"), async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

        const UserExist = await User.findOne({ email });
        if (UserExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            photo: photoPath,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
});

// User routes
route.get('/users', getAllUsers);
route.get('/user/:id', getUserById);
route.put('/update/user/:id', updateUser);
route.delete('/delete/user/:id', deleteUser);
route.post("/user/login", LoginUser);
route.post("/user/auth/getUser", fetchUser, GetLoggedInUserDetails);

export default route;
