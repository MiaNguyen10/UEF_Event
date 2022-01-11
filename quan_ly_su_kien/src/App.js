import React from "react";
import "./App.css";
// import {Routes, Route } from "react-router-dom";

import Login from "./components/Login_Regis/Login";
import SignUp from "./components/Login_Regis/SignUp";
import LoginUI from "./pages/Login/LoginUI";
import Admin from "./Admin/Admin";
import Cookies from 'universal-cookie';


export default function App() {

  function HandleUI() {
    const cookies = new Cookies()
    let account = cookies.get('authToken');
    console.log(account)
    if (account) {
      return <Admin />
    } else {
      return <LoginUI />
    }
  }

  return (
      // <Routes>
      //   <Route path="/" exact element={<Login />} />
      //   <Route path="/sign-in" exact element={<Login />} />
      //   <Route path="/sign-up" exact element={<SignUp/>} />
      //   <Route path="/admin" exact element={<Admin/>} />
      // </Routes>
      <div>
       <HandleUI />
      </div>
  );
}

