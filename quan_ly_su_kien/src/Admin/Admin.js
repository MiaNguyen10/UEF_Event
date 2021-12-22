import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import './Admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/contact";
import Instruction from "../pages/Instruction/instruction";
import EventEnded from "../pages/EventEnded/EventEnded";

const Admin = () => {

  return (
    <div>
      <Router>
        
        <Navbar />

        <Sidebar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/instruction" element={<Instruction />} />
          <Route exact path="/eventended" element={<EventEnded />} />
        </Routes>
      </Router>

      

    </div>
  );
};

export default Admin;
