import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import contactRoute from "./routes/contactRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(express.json());  // 🚀 This is required to parse JSON data
app.use(cors());
dotenv.config();

// Serve static files from the uploads folder
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5001; // Fallback to 5001 if PORT is not set
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {  
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api",bookingRoute);
app.use("/api",contactRoute);
