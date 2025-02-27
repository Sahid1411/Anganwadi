import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: 'String',  
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    gender:{
        type: 'String',  
    },
    password: {
        type: 'String', 
        required: true
    }  
},
    {collection:'admin'}
);

export default mongoose.model('Admin',adminSchema);