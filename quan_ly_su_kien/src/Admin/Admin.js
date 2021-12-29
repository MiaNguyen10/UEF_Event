import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from '../components/Sidebar/Sidebar';
import './Admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/contact";
import EventEnded from "../pages/EventEnded/EventEnded";
import UEF from "../pages/OrganizationalUnit/UEF";
import FOEconomics from "../pages/OrganizationalUnit/FOEconomics";
import FOPublicRelations from "../pages/OrganizationalUnit/FOPublicRelations";
import FOIT from "../pages/OrganizationalUnit/FOIT";
import FOEnglish from "../pages/OrganizationalUnit/FOEnglish";
import FOLaw from "../pages/OrganizationalUnit/FOLaw";
import FOTourism from "../pages/OrganizationalUnit/FOTourism";
import FOInternationalCultures from "../pages/OrganizationalUnit/FOInternationalCultures";


const Admin = () => {

  return (
    <div>
      <Router>
        
        <Navbar />

        <Sidebar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/eventended" element={<EventEnded />} />
          <Route exact path="/uef" element={<UEF />} />
          <Route exact path="/kinhte" element={<FOEconomics />} />
          <Route exact path="/qhcc" element={<FOPublicRelations />} />
          <Route exact path="/cntt" element={<FOIT />} />
          <Route exact path="/tienganh" element={<FOEnglish />} />
          <Route exact path="/qhqt" element={<FOLaw />} />
          <Route exact path="/dlks" element={<FOTourism />} />
          <Route exact path="/vhqt" element={<FOInternationalCultures />} />

        </Routes>
      </Router>

      

    </div>
  );
};

export default Admin;