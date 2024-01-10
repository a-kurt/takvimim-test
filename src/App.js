import React from "react";
import Hero from "./containers/Hero";
import Register from "./components/Register";
import Main from "./containers/Main";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Admin from "./pages/Admin";
import Unauthorized from "./components/Unauthorized";
import Settings from "./containers/Settings";
import CalendarAppointmentPage from "./containers/CalendarAppointmentPage";
import AppointmentSuccessPage from "./containers/AppointmentSuccessPage";
import VerificationCodePage from "./pages/VerificationCodePage";
import VerificationSuccess from "./pages/VerificationSuccess";
import Music from "./pages/Music";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Hero />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="admin" element={<Admin />} />
        <Route path="verification" element={<VerificationCodePage />} />
        <Route path="verificationSuccess" element={<VerificationSuccess />} />
        <Route path="music" element={<Music />} />


        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={["USER"]} />}>
          <Route path="/" element={<Main />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:nickname" element={<CalendarAppointmentPage />} />
          <Route
            path="/appointmentSuccessPage"
            element={<AppointmentSuccessPage />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
