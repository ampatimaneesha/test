import {v4 as uuidV4} from 'uuid';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey="secretkey";
const saltRounds = 10;
export const getUsers = async (req,res) =>{
        const users = await User.find({})
        res.send(users);
    }

export const createUser = async (req,res) =>{
      const {name, email, password}  = req.body;
      const userExists = await User.findOne({email: email}).exec();
      console.log(userExists);
      if(userExists){
          res.status(400).json({message: 'user already exists'})
          return
      }
      const hash = await bcrypt.hashSync(password, saltRounds);
      const emp= new User({
                name: name,
                id:uuidV4(), 
                email:email,
                password:hash, 
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
export const updateUser = async (req,res) =>{
    const userId = req.params.id;
    const data={};
    data.firstname= req.body.firstname;
    data.lastname= req.body.lastname;
    data.email= req.body.email;
    data.password = await bcrypt.hashSync(req.body.password, saltRounds);
    User.updateOne(
        {id:userId}, //afafaf-azfkaghke-afbekajga-agega
        data
      );
    
     res.status(201).json(data)
    
}

export const uploadProfilePicture = async (req,res) =>{
  console.log(req.user, req.body)
  const userId = req.user.id;
  const data={};
  data.profilePicture= req.body.profilePicture;
  await User.updateOne(
      {id:userId}, //afafaf-azfkaghke-afbekajga-agega
      data
    );
  const u = await User.findOne({id: userId}).exec();
   res.status(201).json(u)
  
}



export const loginUser = async(req, res)=>{
try {
const { email, password } = req.body;
  
if (!email || !password) {
  throw new BadRequestError('Please provide email ans password');
}

const user = await User.findOne({ email });
if (!user) {
  throw new Error('Invalid Credentials1');
}
// compare password
const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
if (!isPasswordCorrect) {
  throw new Error('Invalid Credentials');
}
const token = createJWT({ id: user.id});
console.log(user)
res
  .status(200)
  .json({ user: { email: user.email, name: user.name , profilePicture: user.profilePicture}, token })
  
}catch(err){
  res.status(401).json({message:err.message})
}
}

const createJWT = (user)=>{
const t= jwt.sign(user,'secretKey',{expiresIn:'1d'})
return t;
}