import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import './App.css'
import RegisterCompany from './Components/RegisterCompany'
import RegisterEmployee from './Components/RegisterEmployee'
import SignIn from './Components/SignIn'
import AdminDashboard from './Components/AdminDashboard';
import SidebarLayout from './Components/SidebarLayout';
import HolidayList from './Components/HolidayList';
import Leaves from './Components/Leaves';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/RegisterEmployee" element={<RegisterEmployee />} />
        <Route path="/sidebar" element={<SidebarLayout/>} />
        <Route path="/HolidayList" element={<HolidayList />} />

        <Route path="/leaves" element={<Leaves />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App