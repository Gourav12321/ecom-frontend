import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const token = Cookies.get("authToken");

  // Check if user is logged in and has admin role and valid token
  if (user && user.role === "Admin" && token) {
    return children;
  } else {
    if (!token) {
      toast.error("Please login to access this page.");
    } else {
      toast.error("You cannot access this page. Only admin can.");
    }
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
