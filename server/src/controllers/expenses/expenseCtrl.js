const { populate } = require("dotenv");
const Expense = require("../../model/Expense");
const expressAsyncHandler = require ("express-async-handler");

//create 
const createExpCtrl = expressAsyncHandler (async(req, res, ) => {
  const{title, amount, description,user} = req.body;
  try {
    const expense = await Expense.create({
          title,
           amount,
            description,
            user,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

//fetch  income all  
const fetchAllExpCtrl = expressAsyncHandler(async (req, res) => {
  const {page} = req?.query;
  try {
    // Correct model name to "Expense"
    const expenses = await Expense.paginate({}, 
      {limit: 2, page: Number(page), populate: "user"});  // Use the correct singular form
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch expenses", error });
  }
});

//fetch single
const fetchExpDetailsCtrl = expressAsyncHandler (async(req, res, ) => {
 const{id} = req?.params;
   try {
     const expense = await Expense.findById(id);
     res.json(expense);
   } catch (error) {
     res.json(error);
   }
  
});

//update

const updateExpCtrl = expressAsyncHandler(async( req, res) => {
  const{id} = req?.params;
  const{title, amount, description} = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(id, {
      title, 
      description,
       amount,
    },
    {new: true}
  );
    res.json(expense);
  } catch (error) {
    res.json(error);
  }

});

//delete
const deleteExpCtrl = expressAsyncHandler (async(req, res, ) => {
  const{id} = req?.params;
    try {
      const expense = await Expense.findByIdAndDelete(id);
      res.json(expense);
    } catch (error) {
      res.json(error);
    }
   
 });
module.exports = { createExpCtrl, 
  fetchAllExpCtrl ,
   fetchExpDetailsCtrl,
    updateExpCtrl,
     deleteExpCtrl};
