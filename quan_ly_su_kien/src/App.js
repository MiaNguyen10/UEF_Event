import React from "react";
import "./App.css";
import {Routes, Route } from "react-router-dom";

import Login from "./components/Login_Regis/Login";
import SignUp from "./components/Login_Regis/SignUp";
import Admin from "./Admin/Admin";

export default function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/sign-in" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp/>} />
        <Route path="/admin" exact element={<Admin/>} />
      </Routes>
  );
}

