import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import {  toast } from 'react-toastify';


const AdminRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
  

    if (user && user.role === 'Admin') {
        return children;
    } else {
        toast.error('You cannot access this page. Only admin can.');
        return <Navigate to="/" />;
    }
    
   
};

export default AdminRoute;
