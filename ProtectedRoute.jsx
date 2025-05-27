import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signIn" />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/signIn" />;
    }

    const userRoles = decoded.role[0] || [];
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    return hasAccess ? children : <Navigate to="/signIn" />;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/signIn" />;
  }
}
