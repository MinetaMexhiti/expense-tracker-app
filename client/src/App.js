import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import IncomeList from "./pages/Income/IncomeList";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./pages/users/Profile/Profile";
import Register from "./pages/users/Register/Register";
import Login from "./pages/users/Login/Login";
import ExpensesList from "./pages/Expenses/ExpensesList";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewRecord from "./components/Add/NewRecordForm";
import EditContent from "./components/EditContent/EditContent";
import UserProfileExpList from "./pages/users/Profile/UserProfileExpList";
import UserProfileIncList from "./pages/users/Profile/UserProfileIncList";
import UpdateProfile from "./pages/users/Profile/UpdateProfile";
import AddIncome from "./pages/Income/AddIncome";
import AddExpense from "./pages/Expenses/AddExpense";
import PrivateProtectRoute from "./components/Navigation/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/AdminRoute";
import NotAdmin from "./components/NotAdmin/NotAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route exact path="/user-profile-expenses" element={<PrivateProtectRoute><UserProfileExpList /></PrivateProtectRoute>} />
        <Route exact path="/user-profile-income" element={<UserProfileIncList />} />
        <Route exact path="/not-admin" element={<NotAdmin />} />
        <Route  exact path="/update-profile" element={<PrivateProtectRoute><UpdateProfile /></PrivateProtectRoute>} />
        <Route exact path="/edit" element={<PrivateProtectRoute><EditContent /></PrivateProtectRoute>} />
        <Route exact path="/add-expense" element={<PrivateProtectRoute><AddExpense /></PrivateProtectRoute>} />
        <Route exact path="/add-income" element={<PrivateProtectRoute><AddIncome /></PrivateProtectRoute>} />
        <Route  exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<PrivateProtectRoute><Profile /></PrivateProtectRoute>} />
        <Route exact path="/incomes" element={<PrivateProtectRoute><IncomeList /></PrivateProtectRoute>} />
        <Route exact path="/expenses" element={<PrivateProtectRoute><ExpensesList /></PrivateProtectRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
