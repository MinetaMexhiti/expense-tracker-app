import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/user-profile-expenses" element={<PrivateProtectRoute />}>
          <Route path="" element={<UserProfileExpList />} />
        </Route>
        <Route path="/user-profile-income" element={<PrivateProtectRoute />}>
          <Route path="" element={<UserProfileIncList />} />
        </Route>
        <Route path="/not-admin" element={<NotAdmin />} />
        <Route path="/update-profile" element={<PrivateProtectRoute />}>
          <Route path="" element={<UpdateProfile />} />
        </Route>
        <Route path="/edit" element={<PrivateProtectRoute />}>
          <Route path="" element={<EditContent />} />
        </Route>
        <Route path="/add-expense" element={<PrivateProtectRoute />}>
          <Route path="" element={<AddExpense />} />
        </Route>
        <Route path="/add-income" element={<PrivateProtectRoute />}>
          <Route path="" element={<AddIncome />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateProtectRoute />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/incomes" element={<PrivateProtectRoute />}>
          <Route path="" element={<IncomeList />} />
        </Route>
        <Route path="/expenses" element={<PrivateProtectRoute />}>
          <Route path="" element={<ExpensesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
