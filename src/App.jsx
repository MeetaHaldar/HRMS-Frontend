import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterCompany from "./Components/SuperAdmin/RegisterCompany";
import RegisterEmployee from "./Components/Company/RegisterEmployee";
import SignIn from "./Components/SignIn";
import AdminDashboard from "./Components/SuperAdmin/AdminDashboard";
import HolidayList from "./Components/Company/HolidayList";
import Leaves from "./Components/Employee/Leaves";
import LeaveHistory from "./Components/Employee/LeaveHistory";
import WFHhistory from "./Components/Employee/WFHhistory";
import Department from "./Components/Company/Department";
import Profile from "./Components/Employee/Profile";
import Holidays from "./Components/Employee/Holidays";
import SalaryComponent from "./Components/Company/SalaryComponent";
import Designation from "./Components/Company/Designation";
import Layout from "./Components/Layout";
import SalaryTemplate from "./Components/Company/SalaryTemplate";
import AddNewSalaryTemplate from "./Components/Company/AddNewSalaryTemplate";
import ViewSalaryTemplate from "./Components/Company/ViewSalaryTemplate";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/RegisterCompany" element={<RegisterCompany />} />
            {/* Employee Route */}
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/leaveHistory" element={<LeaveHistory />} />
            <Route path="/WFHhistory" element={<WFHhistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/employee/holidays" element={<Holidays />} />
            {/* Company Routes */}
            <Route path="/RegisterEmployee" element={<RegisterEmployee />} />
            <Route path="/HolidayList" element={<HolidayList />} />
            <Route path="/Department" element={<Department />} />
            <Route path="/Designation" element={<Designation />} />
            <Route path="/salaryComponent" element={<SalaryComponent />} />
            <Route path="/salaryTemplate" element={<SalaryTemplate />} />
            <Route path="/addNewSalaryTemplate" element={<AddNewSalaryTemplate />} />
            <Route path="/viewSalaryTemplate" element={<ViewSalaryTemplate />} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
