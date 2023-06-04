// import {v4 as uuidv4} from 'uuid';
import User from '../models/User.js';

import jwt from "jsonwebtoken";
const secretKey="secretkey";
export const getUsers = async (req,res) =>{
        const users = await User.find({})
        res.send(users);
    }

export const createUser = async (req,res) =>{
        //  const user= req.body;
         const firstname= req.body.firstName;
         const lastname= req.body.lastName;
         const email = req.body.email;
         const password = req.body.password;
       
    
     const emp= new User({
               firstName:firstname,
               lastName:lastname,
            //    id:uuidv4(), //afafaf-azfkaghke-afbekajga-agega
               email:email,
               password:password,
               
        })
    try{
          const newUser=await emp.save()
          const jwtToken=createJWT({email})
          res.status(201).json({...newUser._doc, jwtToken})
    }
    catch(err){
           res.status(500).json({message:err.message})
    }
   
}
export const updateUser = (req,res) =>{
    const userId = req.params.id;
    const data={};
    // data.user=req.body.user;
    data.firstname= req.body.firstname;
    data.lastname= req.body.lastname;
    data.email= req.body.email;
   
    data.password = req.body.password;
    
    User.updateOne(
        
        {id:userId}, //afafaf-azfkaghke-afbekajga-agega
        data
      );
    
     res.status(201).json(data)
    
}


export const loginUser = async(req, res)=>{
try {
const { email, password } = req.body;
  
if (!email || !password) {
  throw new BadRequestError('Please provide email ans password');
}

const user = await User.findOne({ email });
console.log(user.id,"*****")
if (!user) {
  throw new Error('Invalid Credentials1');
}
// compare password
const isPasswordCorrect = user.password==password;
if (!isPasswordCorrect) {
  throw new Error('Invalid Credentials');
}
const token = createJWT({ id: user.id});
res
  .status(200)
  .json({ user: { email: user.email, name: user.name }, token })
  
}catch(err){
  res.status(401).json({message:err.message})
}
}

const createJWT = (user)=>{
  
const t= jwt.sign(user,'secretKey',{expiresIn:'1d'})
return t;
}