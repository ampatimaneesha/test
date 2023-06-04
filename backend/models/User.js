import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    name:String,
    email: String,
    password:String,
    profilepicture: String,

   
});

const User = mongoose.model("User",projectSchema)

export default User;