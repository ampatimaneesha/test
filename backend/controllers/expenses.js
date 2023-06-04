// import {v4 as uuidv4} from 'uuid';
import Expense from './models/Expense.js'

export const getExpenses = async (req,res) =>{
        const expenses = await Expense.find({})
        res.send(expenses);
    }

export const createExpense = async (req,res) =>{
  const name= req.body.name;
         const description= req.body.description;
         const amount = req.body.amount;
         const tags = req.body.tags;
         const createdBy = req.user.id;
         const createdAt = req.body.createdAt;
    
     const exp= new Expense({
               name:name,
               description:description,
               amount:amount,
                tags:tags,
                createdBy:createdBy,
                createdAt:createdAt
               
       })
    try{
          const newExpense=await exp.save()
          res.status(201).json({...newExpense._doc})
    }
    catch(err){
           res.status(500).json({message:err.message})
    }
   
}

export const updateExpense = (req,res) =>{
    const id = req.params.id;
    const data={};
   if(data.name)
   data.name= req.body.name;
   if(data.description)
    data.description= req.body.description;
   if(data.amount)
    data.amount= req.body.amount;
    data.tags = req.body.tags;
    data.createdBy = req.body.createdBy;
    data.createdAt = req.body.createdAt;
    Expense.updateOne(
        {id:id}, 
        data
      );
     res.status(201).json(data)
}

export const deleteExpense = (req, res) => {
const  {id} = req.params;
await Expense.deleteOne({id:id});
res.json({message: 'deleted'})
}