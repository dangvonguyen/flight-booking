import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to login with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}; 