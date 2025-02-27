import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type : "String",
        required: true
    },
    
    phone: {
        type: "Number",
        required: true
    },

    email:{
        type: "String",
        required: true
    },
    
    description: {
        type: "String",
        required: true
    },
    
},  {collection: 'contact'}

);

export default mongoose.model('Contact',contactSchema);