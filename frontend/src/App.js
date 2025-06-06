import React from "react";
import "./Styles.css";
import PilotsForm from "./components/PilotsForm";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PilotsList from "./components/PilotsList";
import Admin from "./components/Admin";
import AirplaneForm from "./components/AirplaneForm";
import SheetForm from "./components/SheetForm";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/api/pilots" element={<PilotsForm />} />
      <Route path="api/pilotslist" element={<PilotsList/>} />
      <Route path="api/mision" element={<SheetForm />} />
      <Route path="api/admin" element={<Admin />} />
      <Route path="api/airplane" element={<AirplaneForm />} />
      </Routes>
      </BrowserRouter>
      ); 
}

export default App;
