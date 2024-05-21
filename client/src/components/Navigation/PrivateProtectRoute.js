import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  //check if user is logged in
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  return (
    <Route
      {...rest}
      render={() =>
        userAuth ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateProtectRoute;
