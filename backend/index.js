import express from "express";
import usersRoute from "./routes/users.js";

import bodyParser from "body-parser";
import  mongoose from "mongoose"
import  User from "./models/User.js";
import  cors from 'cors';
import jwt from "jsonwebtoken";
import auth from './middleware/auth.js';
const secretKey="secret";


const app= express();
const PORT=5001;

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users",usersRoute)

app.listen(PORT,()=>console.log(`server running on port:http://localhost:${PORT}`));

  function verifyToken(req,res,next){
      const bearerHeader = req.headers['authorization'];
      if(typeof bearerHeader !== 'undefined'){
         
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token=token;
      next();
      }else{
          res.send({
              result:'token is not valid'
          })
         
      }
  
  }


// mongoose.connect("mongodb://127.0.0.1:27017/projectDB").then(()=>console.log("connected"))
//  .catch(e=>console.log(e));
mongoose.connect("mongodb+srv://Manisha:mani@cluster.erugvlr.mongodb.net/fprtuser?retryWrites=true&w=majority").then(()=>console.log("connected"))
.catch(e=>console.log(e));