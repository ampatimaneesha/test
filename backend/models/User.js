import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    email: String,
    password:String
   
});

const User = mongoose.model("User",projectSchema)

export default User;