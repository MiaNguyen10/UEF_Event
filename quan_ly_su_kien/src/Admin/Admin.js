import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import './Admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/contact";
import EventEnded from "../pages/EventEnded/EventEnded";
import DisplayEventByUnit from "../pages/HomePage/DisplayEventByUnit";
import Logout from "../pages/Login/Logout";


const Admin = () => {

  return (
    <div>
      
        
        <Navbar />

        <Sidebar />
      {/* <Router> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/eventended" element={<EventEnded />} />
          <Route exact path="/displayEventByUnit" element={<DisplayEventByUnit />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      {/* </Router> */}

      

    </div>
  );
};

export default Admin;