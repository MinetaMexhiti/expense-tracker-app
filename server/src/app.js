const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const incomeRoute = require("./route/income/income");
const expenseRoute = require("./route/expense/expense");
const accountStatsRoute = require("./route/stats/stats");

//dotenv
dotenv.config();

const app = express();

//DB
dbConnect();

//-------------
//Middleware
//--------------
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

//Users route
app.use("/api/users", userRoutes);
//incomeRoute
app.use("/api/incomes", incomeRoute);
//Expenses
app.use("/api/expenses", expenseRoute);
//stats
app.use("/api/stats", accountStatsRoute);

//err handler
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    app: "Expenses-Tracker",
    developer: "inovotek",
    youtubeChannel: "i-Novotek",
  });
});

module.exports = app;
