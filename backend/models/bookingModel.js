import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },    
    check_in: {
        type: "String",
        required: true
    },   
    check_out: {
        type: "String",
        required: true
    },
    room_type: {  
        type: "String",
        required: true
    },  
   number_of_guest: {
        type: "Number",
        required: true
   },
   additional_request: {
        type: "String",        
   }
    
},  {collection: 'booking'}

);

export default mongoose.model('Booking',bookingSchema);