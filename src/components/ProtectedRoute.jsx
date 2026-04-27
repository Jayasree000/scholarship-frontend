import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAppContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect to their respective dashboards if they try to access wrong route
        return <Navigate to={user.role === 'admin' ? "/admin/dashboard" : "/student/search"} replace />;
    }

    return children;
};
