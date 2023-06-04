import { v4 as uuidV4 } from 'uuid';
import Expense from '../models/Expense.js'

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ createdBy: req.user.id }).exec();
  res.send(expenses);
}

export const createExpense = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const amount = req.body.amount;
  const tags = req.body.tags;
  const createdBy = req.user.id;
  const createdAt = req.body.createdAt;

  const exp = new Expense({
    id: uuidV4(),
    name: name,
    description: description,
    amount: amount,
    tags: tags,
    createdBy: createdBy,
    createdAt: createdAt

  })
  try {
    const newExpense = await exp.save()
    res.status(201).json({ ...newExpense._doc })
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }

}

export const updateExpense = (req, res) => {
  const id = req.params.id;
  const data = {};
  const body= req.body;
  if (body.name)
    data.name = body.name;
  if (body.description)
    data.description = body.description;
  if (body.amount)
    data.amount =body.amount;
  if (body.tags)
    data.tags = body.tags;
  data.createdBy = req.user.id;
  Expense.updateOne(
    { id: id },
    data
  ).exec();
  res.status(201).json(data)
}

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.deleteOne({ id: id });
  res.json({ message: 'deleted' })
}

export const getExpense = async(req, res) =>{
  const { id } = req.params;
  const expenses = await Expense.findOne({ createdBy: req.user.id, id: id }).exec();
  if(!expenses){
    res.status(400).json({message: 'invalid id'})
    return
  }
  res.send(expenses);
}