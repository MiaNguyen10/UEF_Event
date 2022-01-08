import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import './Admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/contact";
import EventEnded from "../pages/EventEnded/EventEnded";
import DisplayEventByUnit from "../pages/HomePage/DisplayEventByUnit";


const Admin = () => {

  return (
    <div>
      <Router>
        
        <Navbar />

        <Sidebar />

        <Routes>
          <Route exact path="/homepage" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/eventended" element={<EventEnded />} />
          <Route exact path="/displayEventByUnit" element={<DisplayEventByUnit />} />
        </Routes>
      </Router>

      

    </div>
  );
};

export default Admin;