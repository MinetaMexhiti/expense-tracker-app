import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../../pages/users/Login/Login";

const AdminRoute = () => {
  // Check if user is logged in and is an admin
 
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  console.log(Login);
  return userAuth?.isAdmin ? <Outlet /> : <Navigate to="/not-admin" />;
};

export default AdminRoute;
