import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  // Check if user is authenticated and has admin privileges
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Add your admin role check logic here
  // For example: if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
}

export default AdminRoute;
