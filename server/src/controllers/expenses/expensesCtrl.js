const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/expense/Expense");

//-------------------------------------
//Create
//-------------------------------------
const createExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { description, title, amount } = req.body;
  console.log(req.user);
  try {
    const exp = await Expense.create({
      description,
      title,
      amount,
      user: req?.user?._id,
    });
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Fetch all
//-------------------------------------
const fetchExpensesCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const expenses = await Expense.paginate(
      { user: req.user._id }, // Filter by logged-in user
      {
        limit: 10,
        page: Number(page),
        sort: { createdAt: 'desc' },
        populate: ["user"],
      }
    );
    res.json(expenses);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Fetch single
//-------------------------------------
const fetchExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Expense.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Update
//-------------------------------------
const updateExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { description, title, amount } = req.body;
  try {
    const income = await Expense.findByIdAndUpdate(
      id,
      {
        description,
        title,
        amount,
      },
      { new: true, runValidators: true }
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------------
//Delete
//-------------------------------------
const deletExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Expense.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createExpenseCtrl,
  fetchExpenseCtrl,
  fetchExpensesCtrl,
  updateExpenseCtrl,
  deletExpenseCtrl,
};
