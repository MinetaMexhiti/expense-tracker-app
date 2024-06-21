const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/expense/Expense");
const { getCategory } = require("../../openaiService")

//-------------------------------------
//Create
//-------------------------------------
const createExpenseCtrl = expressAsyncHandler(async (req, res) => {
  const { description, title, amount } = req.body;

  console.log(req.user);
  try {
    const category = await getCategory({ description, title, amount });
    const exp = await Expense.create({
      description,
      title,
      amount,
      category, // Add category to the expense
      user: req?.user?._id,
    });
    console.log("New Expense Created:", exp); // Log the new expense
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense", error });
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
    res.status(500).json({ message: "Failed to fetch expenses", error });
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
