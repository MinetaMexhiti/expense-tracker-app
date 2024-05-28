import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // Check if user is logged in and is an admin
  const user = useSelector(state => state?.users);
  const { userAuth } = user;

  return userAuth?.isAdmin ? <Outlet /> : <Navigate to="/not-admin" />;
};

export default AdminRoute;
