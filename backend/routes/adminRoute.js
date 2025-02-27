import express from "express";
import { createAdmin, deleteAdmin, getAdminById, getAllAdmin, GetLoggedInAdminDetails, LoginAdmin, updateAdmin } from "../controllers/adminController.js";
import fetchAdmin from "../middlewares/fetchAdmin.js";
  
const route = express.Router();

route.post('/create/admin',createAdmin);
route.get('/admins',getAllAdmin);
route.get('/admin/:id',getAdminById);
route.put('/update/admin/:id',updateAdmin);  
route.delete('/delete/admin/:id',deleteAdmin);

route.post("/admin/login",LoginAdmin);
route.post("/admin/auth/getAdmin",fetchAdmin,GetLoggedInAdminDetails);

   
export default route;