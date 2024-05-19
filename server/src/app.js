const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const incomeRoutes = require("./routes/income/incomeRoutes");
const expenseRoutes = require("./routes/expenses/expenseRoutes");
const {errorHandler, notFound} = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/users/usersRoute");


const app = express();
//envfile
dotenv.config();

// Connect to the database
dbConnect();

//midleware it is a function called between your request and the response
app.use(express.json());
app.get('/', (req, res) => {
  res.json({msg:'Welcome to Expense Tracker API'});
});
// users routes
app.use('/api/users', userRoute);


//income routes
app.use('/api/income', incomeRoutes);

//expenses 
app.use('/api/expenses', expenseRoutes);
//error
app.use(notFound);
app.use(errorHandler);






//income
//expenses 

module.exports = app;
