import  express  from "express";
import {getExpenses,getExpense, createExpense, updateExpense,deleteExpense} from "../controllers/expenses.js";


const router = express.Router();

router.get("/",getExpenses);

router.get("/:id",getExpense);
router.post("/",createExpense);
router.patch("/:id",updateExpense);
router.delete("/:id",deleteExpense);


export default router;