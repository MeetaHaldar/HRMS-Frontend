import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import './App.css'
import CompanyRegistration from './Components/CompanyRegistration'
import EmployeeRegister from './Components/EmployeeRegister'
import Login from './Components/Login'
import AdminDashboard from './Components/AdminDashboard';
import Hey from './Components/hey';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/adminDashboard" element={<AdminDashboard />} /> 
        <Route path="/hey" element={<Hey/>} /> 


        <Route path="/companyregister" element={<CompanyRegistration />} /> 
        <Route path="/employeeregister" element={<EmployeeRegister />} /> 
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />  
      </Routes>
    </Router>
    </>
  )
}

export default App
