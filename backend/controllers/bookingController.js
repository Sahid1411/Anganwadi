import Booking from "../models/bookingModel.js"

export const createBooking = async (req,res) => {       
    try {
        const {name,email,check_in, check_out, room_type, number_of_guest, additional_request} = req.body ; // one user email can book only one room

        const bookingExist = await Booking.findOne({email});
        if(bookingExist){
            return res.status(404).json({message:'User already has a booking with this emailId.'});
        }
        const newBooking = new Booking({
            name,
            email,
            check_in,
            check_out,
            room_type, 
            number_of_guest,
            additional_request,
        })
        await newBooking.save();
        res.status(200).json({message:'Booking created successfully.'});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});  
    }
}  

export const getAllBookings = async (req,res) => {
    try {
        const bookings = await Booking.find();        
        if(!bookings || bookings.length === 0){
            return res.status(404).json({message:"No Bookings found."});
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});        
    }
};

export const getBookingsById = async (req,res) => {
    try {
        const id = req.params.id;
        const bookingExist = await Booking.findById(id);
        if(!bookingExist){
            return res.status(404).json({message:'No Booking exist with this id.'});
        }
        res.status(200).json(bookingExist);
    } catch (error) {
        res.status(500).json({errorMessage:error.message}); 
    }
};    

export const getBookingsByUserEmail = async (req, res) => {
    try {
        const { email } = req.body; // ✅ Extract email correctly
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const bookingExist = await Booking.findOne({ email });
        if (!bookingExist) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json(bookingExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


export const updateBookings = async (req,res) => {
    try {
        const id = req.params.id;
        const bookingExist = await Booking.findById(id);
        if(!bookingExist){
            return res.status(404).json({message:'Booking not found.'});
        }
        const updatedBooking = await Booking.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Booking updated successfully."});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}; 

export const deleteBookings = async (req,res) => {
    try {
        const id = req.params.id;
        const bookingExist = await Booking.findById(id);
        if(!bookingExist){
            return res.status(404).json({message:'Booking not found.'});
        }
        await Booking.findByIdAndDelete(id);
        res.status(200).json({message:"Booking deleted successfully."})
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};