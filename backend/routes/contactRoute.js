import express from "express";
import { createContact, deleteContact, getAllContacts, getContactById } from "../controllers/contactController.js";

const route = express.Router();

route.post('/create/contact',createContact);
route.get('/contacts',getAllContacts);
route.get('/contact/:id',getContactById);
route.delete('/delete/contact/:id',deleteContact);

export default route;