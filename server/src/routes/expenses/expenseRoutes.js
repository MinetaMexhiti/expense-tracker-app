const express = require('express');
const {createExpCtrl, 
  fetchAllExpCtrl ,
   fetchExpDetailsCtrl,
    updateExpCtrl,
     deleteExpCtrl,
} = require("../../controllers/expenses/expenseCtrl");
const expenseRoutes = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");

expenseRoutes.post('/',authMiddleware, createExpCtrl);
expenseRoutes.get('/', authMiddleware,fetchAllExpCtrl);
expenseRoutes.get('/:id', authMiddleware,fetchExpDetailsCtrl);//api/income/someid jknbcvs
expenseRoutes.put('/:id',authMiddleware, updateExpCtrl);
expenseRoutes.delete('/:id', authMiddleware, deleteExpCtrl);
module.exports = expenseRoutes;