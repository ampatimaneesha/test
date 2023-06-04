import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password:String,
    profilePicture: String
   
});

const User = mongoose.model("User",userSchema);
export default User;