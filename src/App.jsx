import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import RegisterCompany from './Components/SuperAdmin/RegisterCompany'
import RegisterEmployee from './Components/Company/RegisterEmployee'
import SignIn from './Components/SignIn'
import AdminDashboard from './Components/SuperAdmin/AdminDashboard';
import SidebarLayout from './Components/SidebarLayout';
import HolidayList from './Components/Company/HolidayList';
import Leaves from './Components/Employee/Leaves';
import LeaveHistory from './Components/Employee/LeaveHistory';
import WFHhistory from './Components/Employee/WFHhistory';
import Department from './Components/Company/Department';
import Profile from "./Components/Employee/Profile";
import Holidays from "./Components/Employee/Holidays";
import SalaryComponent from "./Components/Company/SalaryComponents/SalaryComponent";
import Designation from "./Components/Company/Designation";

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
        <Route path="/leaveHistory" element={<LeaveHistory />} />
        <Route path="/WFHhistory" element={<WFHhistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/employee/holidays" element={<Holidays />} />

        <Route path="/Department" element={<Department />} />
        <Route path="/Designation" element={<Designation />} />
        
        <Route path="/salaryComponent" element={<SalaryComponent />} />



        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App