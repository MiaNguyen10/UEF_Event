import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import './Admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/contact";
import EventEnded from "../pages/EventEnded/EventEnded";
import Language from "../pages/MultiLanguage/MultiLanguage";
import DisplayEventByUnit from "../pages/HomePage/DisplayEventByUnit";
import Favorite from "../pages/HomePage/FavoriteEvent";
import Logout from "../pages/Login/Logout";
import ManageAccount from "../components/Login_Regis/ManageAccount";
import Setting from "../pages/Setting/Setting";


const Admin = () => {

  return (
    <div>
      
        
        <Navbar />

        <Sidebar />
      {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/language" element={<Language />} />
          <Route exact path="/eventended" element={<EventEnded />} />
          <Route exact path="/displayEventByUnit" element={<DisplayEventByUnit />} />
          <Route exact path="/favorite" element={<Favorite />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/manageaccount" element={<ManageAccount/>} />
          <Route exact path="/settings" element={<Setting/>} />
        </Routes>
      {/* </Router> */}

      

    </div>
  );
};

export default Admin;