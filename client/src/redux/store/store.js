import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expensesReducer from "../slices/expenses/expenseSlices";
import incomeReducer from "../slices/income/incomeSlices";
import statisticsReducer from "../slices/accountStats/accountStatsSlices";


const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expensesReducer,
    income: incomeReducer,
    statistics: statisticsReducer,
 
  },
});

export default store;
