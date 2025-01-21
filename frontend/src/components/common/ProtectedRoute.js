import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children, userType }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if no JWT token found
    return <Navigate to="/login" />;
  }

  if (userType && user.user_type !== userType) {
    // Redirect based on user type (admin/user)
    return <Navigate to={user.user_type === "admin" ? "/admin-home" : "/"} />;
  }

  return children;
};

export default ProtectedRoute;
