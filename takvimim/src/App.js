import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./containers/Hero";
import Login from "./components/Login";
import Register from "./components/Register";
import MainBar from "./components/MainBar";
import SearchBar from "./components/SearchBar";
import Calendar from "./components/Calendar";
import Main from "./containers/Main";
import Settings from "./containers/Settings";
import Appointment from "./components/Appointment";
import Request from "./components/Request";
import { Routes, Route, Link } from "react-router-dom"
import CalendarAppointmentPage from "./containers/CalendarAppointmentPage";
import Terms from "./containers/Terms";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/atakan" element={<CalendarAppointmentPage />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
