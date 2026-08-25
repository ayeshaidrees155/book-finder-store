import React from 'react'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoutes({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to='/login' />
    }
    else
        return children
}
