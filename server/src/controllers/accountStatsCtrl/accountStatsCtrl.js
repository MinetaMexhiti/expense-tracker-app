const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/expense/Expense");
const Income = require("../../model/income/Income");

const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const expensesStats = await Expense.aggregate([
      {
        $group: {
          _id: null, // Group by a null value to aggregate all documents
          averageExp: { $avg: "$amount" },
          totalExp: { $sum: "$amount" },
          minExp: { $min: "$amount" },
          maxExp: { $max: "$amount" },
          totalRecords: { $sum: 1 },
        },
      },
    ]);

    const incomeStats = await Income.aggregate([
      {
        $group: {
          _id: null, // Group by a null value to aggregate all documents
          averageInc: { $avg: "$amount" },
          totalInc: { $sum: "$amount" },
          minInc: { $min: "$amount" },
          maxInc: { $max: "$amount" },
          totalRecords: { $sum: 1 },
        },
      },
    ]);

    const profit = (incomeStats[0]?.totalInc || 0) - (expensesStats[0]?.totalExp || 0);

    res.json({ expensesStats, incomeStats, profit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  accountStatsCtrl,
};
