const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const incomeRoute = require("./route/income/income");
const expenseRoute = require("./route/expense/expense");
const accountStatsRoute = require("./route/stats/stats");


dotenv.config();

const app = express();

// DB Connection
dbConnect();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/incomes", incomeRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/stats", accountStatsRoute);


app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    app: "Expenses-Tracker",
  });
});

module.exports = app;
