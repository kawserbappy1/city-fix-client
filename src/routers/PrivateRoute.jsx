import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) return <Loader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
