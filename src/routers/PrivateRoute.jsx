import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();
  if (loader) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
