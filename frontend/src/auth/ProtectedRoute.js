import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Pastikan jalur ini benar

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');
  const isTokenValid = token && token !== 'null' && token !== null;

  if (isAuthenticated || isTokenValid) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
