import mongoose from "mongoose";

const expenseSchema= new mongoose.Schema({
    id: String,
    name:String,
    description: String,
    amount: Number,
    tags: [String],
    createdBy: String,
    createdAt: String
});

const Expense = mongoose.model("Expense",expenseSchema)

export default Expense;