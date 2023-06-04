import express from "express";
import usersRoute from "./routes/users.js";
import expenseRouter from "./routes/expenses.js";
import bodyParser from "body-parser";
import  mongoose from "mongoose"
import  cors from 'cors';
import auth from "./middleware/auth.js";
const app= express();
const PORT=5001;

app.use(cors({origin: "*"}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users",usersRoute)
app.use("/expenses", auth, expenseRouter)
app.listen(PORT,()=>console.log(`server running on port:http://localhost:${PORT}`));

mongoose.connect("mongodb+srv://Manisha:mani@cluster.erugvlr.mongodb.net/fprtuser?retryWrites=true&w=majority").then(()=>console.log("connected"))
.catch(e=>console.log(e));