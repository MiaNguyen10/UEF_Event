import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../components/Login_Regis/Login"
import SignUp from "../../components/Login_Regis/SignUp";
import Logout from "./Logout";


const LoginUI = () => {

  return (
    <div>
      {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
};

export default LoginUI;