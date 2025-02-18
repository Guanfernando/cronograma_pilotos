import React from "react";
import "./Styles.css";
import PilotsForm from "./components/PilotsForm";
import { Col, Row } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PilotsList from "./components/PilotsList";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/api/pilots/" element={<PilotsForm />} />
      <Route path="api/pilotslist" element={<PilotsList/>} />
      </Routes>
      </BrowserRouter>
      ); 
}

export default App;
