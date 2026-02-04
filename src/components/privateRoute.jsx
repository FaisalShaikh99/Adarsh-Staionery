import React from "react";
import { Navigate } from "react-router-dom";

const privateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("currentUser");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default privateRoute;
