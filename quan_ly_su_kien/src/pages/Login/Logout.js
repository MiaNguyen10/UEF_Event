import React from "react";
import Cookies from "universal-cookie";
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const cookies = new Cookies()
    cookies.remove('authToken', { path: '/' });
    // window.location.reload();
    return <Navigate to="/" />
    
};

export default Logout;