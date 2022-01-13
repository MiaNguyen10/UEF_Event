import React from "react";
import "./App.css";
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
      <div>
       <HandleUI />
      </div>
  );
}

