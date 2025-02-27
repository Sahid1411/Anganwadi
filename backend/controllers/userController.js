import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_SECRET = 'Sahid4@#';  

export const createUser = async (req,res) => { 
    try {
        const { email, password, name, phone } = req.body;

        const userExist = await User.findOne({email});
        if(userExist){
            req.res(404).json({message:"User already exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUser = new User({
            name,
            email,
            phone,
            password : hashedPassword,
        });

        // sending id 
        const data = {
        user:{
          id: newUser.id ,
          }
        }  
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

        await newUser.save();
        res.status(200).json({authtoken,message:"User created successfully."})

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        if(!users || users.length === 0){
            return res.status(404).json({message:"No user exists."});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

export const getUserById = async (req,res) => {
    try{
        const id = req.params.id ;
        const userExist = await User.findById(id);
        if(!userExist){
            res.status(404).json({message:"User not found."});
        }
        res.status(200).json(userExist);
    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
};

export const updateUser = async (req,res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            res.status(404).json({message:"User not found."});
        }
        const updatedUser = await User.findByIdAndUpdate(id,req.body)
        res.status(200).json({updatedUser,message:'User updated successfully'});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            res.status(404).json({message:"User not found."});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"User deleted successfully."})
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

// Route 2: Authenticate a user using : POST "/api/user/login". no  Login Required
export const LoginUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;  // ✅ Use email instead of username
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials." });
        }
  
        // Compare hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(401).json({ message: "Invalid credentials." });
        }  
     
        // Generate JWT token
        const data = { user: { id: user._id } };
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });  // ✅ Add expiry time
  
        res.status(200).json({
          success: true,
          message: "Login successful.",
          authtoken, // ✅ Sending JWT token
          userId: user._id,
        });
       
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }  
};

// Route 3: get logged in user details using: Post :"/api/user/getUser". Login Required
  
export const GetLoggedInUserDetails =  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(userId)
      
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
  }   
}