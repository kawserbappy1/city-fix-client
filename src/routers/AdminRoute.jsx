import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { loader } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (loader || isRoleLoading) {
    return <p>Loding.....</p>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
