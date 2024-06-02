// controllers/accountStatsCtrl.js
const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/expense/Expense");
const Income = require("../../model/income/Income");

const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
  const expensesStats = await Expense.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        averageExp: { $avg: "$amount" },
        totalExp: { $sum: "$amount" },
        minExp: { $min: "$amount" },
        maxExp: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const incomeStats = await Income.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        averageInc: { $avg: "$amount" },
        totalInc: { $sum: "$amount" },
        minInc: { $min: "$amount" },
        maxInc: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const profit = incomeStats[0]?.totalInc - expensesStats[0]?.totalExp || 0;
  res.json({ expensesStats, incomeStats, profit });
});

module.exports = {
  accountStatsCtrl,
};
