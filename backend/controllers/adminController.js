import Admin from "../models/adminModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" 
const JWT_SECRET = 'Sahid4@#' ;

export const createAdmin = async (req,res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
        return res.status(400).json({ message: "Admin already exists." });
        }
         
        const {name, email, password,  } = req.body;
   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newAdmin = new Admin({
            name,
            email,  
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(200).json({message:"Admin created successfully."})

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const getAllAdmin = async (req,res) => {
    try {
        const admins = await Admin.find();
        if(!admins || admins.length === 0){
            return res.status(404).json({message:"No Admins exists."});
        }
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}  

export const getAdminById = async (req,res) => {  
    try{
        const id = req.params.id ;
        const adminExist = await Admin.findById(id);
        if(!adminExist){
          return  res.status(404).json({message:"Admin not found."});
        }
        res.status(200).json(adminExist);
    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
};

export const updateAdmin = async (req,res) =>{
    try {
        const id = req.params.id;
        const adminExist = await Admin.findById(id);
        if(!adminExist){
            res.status(404).json({message:"Admin not found."});
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(id,req.body)
        res.status(200).json({updatedAdmin,message:'Admin updated successfully'});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

export const deleteAdmin = async (req,res) => {
    try {
        const id = req.params.id;
        const adminExist = await Admin.findById(id);
        if(!adminExist){
            res.status(404).json({message:"Admin not found."});
        }
        await Admin.findByIdAndDelete(id);
        res.status(200).json({message:"Admin deleted successfully."})
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}


// Route 2: Authenticate a user using : POST "/api/user/login". no  Login Required
export const LoginAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;  // ✅ Use email instead of username
        const user = await Admin.findOne({ email });
  
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
          adminId: user._id,
        });
  
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Route 3: get logged in user details using: Post :"/api/user/getUser". Login Required
  
export const GetLoggedInAdminDetails =  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Admin.findById(userId).select("-password")
    res.send(userId)
    
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
}   
}