
const user = require('./userModel.js')

const create = async (req,res) =>{
    try{
        const {name, email, address} = req.body;
        if(!name || !email || !address){
            return res.status(400).json({ 
                message: "All fields (name, email, address) are required" 
            });
        }
        
        const newUser = new user(req.body);
        
        
        const emailExist = await user.findOne({email});
        if(emailExist){
            return res.status(400).json({ message: "Email Already Exists" });
        }
        
        const savedData = await newUser.save();
        alert("User saved successfully:");
        res.status(201).json(savedData);
    }
    catch(error){
        console.error("Full error details:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ 
            message: "Internal Server Error",
            error: error.message 
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await user.find();
       
        if (users.length === 0) {
            return res.status(200).json({ message: "No Data Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req,res) =>{
    try{
        const userId = req.params.id
        const FilterData = await user.findById(userId);
        if(!FilterData){
            return res.status(404).json({ message: "No Data Found" });
        }
        res.status(200).json(FilterData);
    }
    catch(error){
        console.error("Error fetching user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const UpdateByID = async (req,res) => {
    try{
        const userID = req.params.id;
        const updatedUser = await user.findByIdAndUpdate(userID, req.body, {
            new: true
        });
        
        if(!updatedUser){
            return res.status(404).json({ message: "No Data Found" });
        }
        
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteById = async (req,res) =>{
    try{
        const UserId = req.params.id;
        const deletedUser = await user.findByIdAndDelete(UserId); // ✅ Fixed: Direct delete
        
        if(!deletedUser){
            return res.status(404).json({ message: "No Data Found" });
        }
        
        res.status(200).json({ 
            message: "User deleted successfully", 
            deletedUser: deletedUser 
        }); // ✅ Better response
    }
    catch(error){
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {create, getUserById, getAllUsers, deleteById, UpdateByID}