import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    let location = useLocation();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;

};

export default ProtectedRoute;