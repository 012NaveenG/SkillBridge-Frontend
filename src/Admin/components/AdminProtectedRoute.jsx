import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
  return !!sessionStorage.getItem('adminAuthToken'); 
};
const AdminProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() ? Component : <Navigate to="/tk-admin" />;
  };

export default AdminProtectedRoute
