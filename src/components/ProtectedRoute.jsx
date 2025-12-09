import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('access_token'); // ✅ fixed key
  const role = localStorage.getItem('role');

  // ✅ Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Redirect if role is required and doesn't match
  if (requiredRole) {
    // allow array or single role
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ✅ Otherwise, allow access
  return children;
}

export default ProtectedRoute;