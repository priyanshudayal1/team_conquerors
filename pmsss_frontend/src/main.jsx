import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import StudentDocument from "./Pages/Dashboard/StudentDocument";
import StudentProfile from "./Pages/Dashboard/StudentProfile";
import StudentSetting from "./Pages/Dashboard/StudentSetting";
import AuthorityDashboard from "./Pages/Dashboard/AuthorityDashboard";
import SagDashboard from "./Pages/Dashboard/SagDashboard";
import FinancialDashboard from "./Pages/Dashboard/FinancialDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/profile" element={<StudentProfile />} />
          <Route path="/dashboard/student/documents" element={<StudentDocument />} />
          <Route path="/dashboard/student/settings" element={<StudentSetting />} />
          <Route path="/dashboard/authority" element={<AuthorityDashboard />} />
          <Route path='/dashboard/sag' element={<SagDashboard />} />  
          <Route path='/dashboard/financial' element={<FinancialDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
