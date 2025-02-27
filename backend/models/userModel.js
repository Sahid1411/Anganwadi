import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,  
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
},
    {collection:'user'},
)

export default mongoose.model('User',userSchema);