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
import SalaryTemplate from "./Components/Company/SalaryTemplate";
import AddNewSalaryTemplate from "./Components/Company/AddNewSalaryTemplate";
import ViewSalaryTemplate from "./Components/Company/ViewSalaryTemplate";
import EmployeeLayout from "./Layouts/EmployeeLayout";
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import CompanyAdminLayout from "./Layouts/CompanyAdminLayout";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/" element={<SuperAdminLayout />}>
            <Route path="companies" element={<AdminDashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/RegisterCompany" element={<RegisterCompany />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />

          </Route>
          <Route path="/companyAdmin" element={<CompanyAdminLayout />}>
            {/* Company Routes */}
            <Route path="RegisterEmployee" element={<RegisterEmployee />} />
            <Route path="HolidayList" element={<HolidayList />} />
            <Route path="Department" element={<Department />} />
            <Route path="Designation" element={<Designation />} />
            <Route path="salaryComponent" element={<SalaryComponent />} />
            <Route path="SalaryTemplate" element={<SalaryTemplate />} />
            <Route
              path="addNewSalaryTemplate"
              element={<AddNewSalaryTemplate />}
            />
            <Route path="viewSalaryTemplate" element={<ViewSalaryTemplate />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
          {/* employeeee */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="leave-history" element={<LeaveHistory />} />
            <Route path="WFHhistory" element={<WFHhistory />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
