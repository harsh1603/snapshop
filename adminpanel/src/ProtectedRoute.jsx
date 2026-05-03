import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if the token exists in local storage
    const isAuthenticated = localStorage.getItem('token') !== null;

    // If authenticated, render child components (Outlet)
    // If NOT authenticated, redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
