import express from "express"
import { createBooking, deleteBookings, getAllBookings, getBookingsById, getBookingsByUserEmail, updateBookings } from "../controllers/bookingController.js";

const route = express.Router();
  
route.post('/create/booking',createBooking);
route.get('/bookings/:id',getBookingsById);
route.get('/bookings',getAllBookings);
route.post('/user/bookings',getBookingsByUserEmail);
route.put('/update/bookings/:id',updateBookings);
route.delete('/delete/bookings/:id',deleteBookings);

export default route; 