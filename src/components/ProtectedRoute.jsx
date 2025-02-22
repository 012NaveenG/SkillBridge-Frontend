import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  return !!sessionStorage.getItem('authToken'); 
};

const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
