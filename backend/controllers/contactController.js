import Contact from "../models/contactModel.js"

export const createContact = async (req,res) => {
    try {        
        const {name,phone, email, description,  } = req.body;

        const newContact = new Contact({
            name,
            phone,
            email,  
            description,
        });

        await newContact.save();
        res.status(200).json({message:"Contact sent successfully."})

    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message:"No contact details exists."});
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}

export const getContactById = async (req,res) => {
    try{
        const id = req.params.id ;
        const contactExist = await Contact.findById(id);
        if(!contactExist){
            res.status(404).json({message:"Contact details not found."});
        }
        res.status(200).json(contactExist);
    }catch(error){
        res.status(500).json({errorMessage:error.message});
    }
};


export const deleteContact = async (req,res) => {
    try {
        const id = req.params.id;
        const contactExist = await Contact.findById(id);
        if(!contactExist){
            res.status(404).json({message:"Contact details not found."});
        }
        await Contact.findByIdAndDelete(id);
        res.status(200).json({message:"Contact details deleted successfully."})
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
}