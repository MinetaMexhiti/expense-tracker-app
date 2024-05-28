import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateProtectRoute = () => {
  // Check if user is logged in
  const user = useSelector(state => state?.users);
  const { userAuth } = user;

  return userAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateProtectRoute;
