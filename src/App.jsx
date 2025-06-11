function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/CompaniesList" element={<CompaniesList />} />
            <Route path="/RegisterCompany" element={<RegisterCompany />} />
            <Route
              path="/subscribedCompanyList"
              element={<SubscribedCompanyList />}
            />
            <Route path="Subscription" element={<Subscription />} />
            <Route path="changePassword" element={<UpdatePassword />} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
          <Route
            path="/companyAdmin"
            element={
              <ProtectedRoute allowedRoles={["systemAdmin"]}>
                <CompanyAdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Company Routes */}
            <Route path="CompanyDashboard" element={<CompanyDashboard />} />
            <Route path="RegisterEmployee" element={<RegisterEmployee />} />
            <Route path="employeeList" element={<EmployeeList />} />
            <Route path="documents" element={<DocumentManager />} />
            <Route path="documents/trash" element={<Trash />} />

            <Route path="HolidayList" element={<HolidayList />} />
            <Route path="Department" element={<Department />} />
            <Route path="Designation" element={<Designation />} />
            <Route path="salaryComponent" element={<SalaryComponent />} />
            <Route path="SalaryTemplate" element={<SalaryTemplate />} />
            <Route path="addBenifitpopup" element={<AddBenefitPopup />} />

            <Route
              path="addNewSalaryTemplate"
              element={<AddNewSalaryTemplate />}
            />

            <Route path="viewSalaryTemplate" element={<ViewSalaryTemplate />} />
            <Route path="companyProfile" element={<CompanyProfile />} />
            <Route path="subscriptionPlans" element={<SubscriptionPlans />} />
            <Route path="my-subscriptions" element={<MySubscription />} />
            <Route path="taxDetails" element={<TaxDetailsForm />} />
            <Route path="workShift" element={<WorkShift />} />
            <Route path="wfhManager" element={<WFHManager />} />
            <Route
              path="regularizationSettings"
              element={<RegularizationSettings />}
            />
            <Route path="leaveType" element={<LeaveType />} />
            <Route
              path="LeaveAttendanceOverview"
              element={<AttendanceOverview />}
            />
            <Route path="totalEmployees" element={<TotalEmployeesTable />} />
            <Route path="attendanceOverview" element={<AttendanceOverview />} />
            <Route
              path="yetToCheckinEmployees"
              element={<YetToCheckinEmployeesTable />}
            />
            <Route
              path="onLeaveEmployees"
              element={<OnLeaveEmployeesTable />}
            />
            <Route path="leaveRequests" element={<LeaveRequestsTable />} />
            <Route
              path="checkinEmployees"
              element={<CheckinEmployeesTable />}
            />
            <Route path="wfhEmployees" element={<WfhEmployeesTable />} />
            <Route path="paySchedule" element={<PayScheduleForm />} />
            <Route path="changePassword" element={<UpdatePassword />} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
          {/* employeeee */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="profile" element={<Profile />} />
            {/* // for manager  */}
            <Route
              path="leaveRequest"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <LeaaveRequest />
                </ProtectedRoute>
              }
            />

            <Route path="holidays" element={<Holidays />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="leave-history" element={<LeaveHistory />} />
            <Route path="WFH" element={<WFH />} />
            <Route path="calender" element={<AttendanceCalendar />} />
            <Route path="changePassword" element={<UpdatePassword />} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute";
import RegisterCompany from "./Components/SuperAdmin/RegisterCompany";
import RegisterEmployee from "./Components/Company/RegisterEmployee";
import SignIn from "./Components/SignIn";
import CompaniesList from "./Components/SuperAdmin/CompaniesList";
import HolidayList from "./Components/Company/HolidayList";
import Leaves from "./Components/Employee/Leaves";
import LeaveHistory from "./Components/Employee/LeaveHistory";
import WFH from "./Components/Employee/WFH";
import Department from "./Components/Company/Department";
import Profile from "./Components/Employee/Profile";
import Holidays from "./Components/Employee/Holidays";
import SalaryComponent from "./Components/Company/Salary/SalaryComponent/SalaryComponent";
import Designation from "./Components/Company/Designation";
import SalaryTemplate from "./Components/Company/Salary/SalaryTemplate/SalaryTemplate";
import AddNewSalaryTemplate from "./Components/Company/Salary/SalaryTemplate/AddNewSalaryTemplate";
import ViewSalaryTemplate from "./Components/Company/Salary/SalaryTemplate/ViewSalaryTemplate";
import EmployeeLayout from "./Layouts/EmployeeLayout";
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import CompanyAdminLayout from "./Layouts/CompanyAdminLayout";
import AddBenefitPopup from "./Components/Company/Salary/SalaryComponent/AddBenifitPopup";
import AttendanceCalendar from "./Components/Employee/Dashboard/AttendanceCalendar";
import LeaaveRequest from "./Components/Employee/Manager/LeaveRequest";
import EmployeeList from "./Components/Company/EmployeeList";
import Dashboard from "./Components/Employee/Dashboard/Dashboard";
import DocumentManager from "./Components/Company/Documents/DocumentManager";
import Trash from "./Components/Company/Documents/Trash";
import SubscribedCompanyList from "./Components/SuperAdmin/Subscription/SubscribedCompanyList";
import Subscription from "./Components/SuperAdmin/Subscription/Subscription";
import CompanyProfile from "./Components/Company/CompanyProfile";
import SubscriptionPlans from "./Components/Company/Subscription/SubscriptionPlans";
import MySubscription from "./Components/Company/Subscription/MySubscription";
import TaxDetailsForm from "./Components/Company/TaxDetailsForm";
import WorkShift from "./Components/Company/LeaveAndAttendance/WorkShift";
import WFHManager from "./Components/Company/LeaveAndAttendance/WFHManager";
import RegularizationSettings from "./Components/Company/LeaveAndAttendance/RegularizationSettings";
import LeaveType from "./Components/Company/LeaveAndAttendance/LeaveType";
import AttendanceOverview from "./Components/Company/AttendanceOverview/AttendanceOverview";
import TotalEmployeesTable from "./Components/Company/AttendanceOverview/TotalEmployeesTable";
import YetToCheckinEmployeesTable from "./Components/Company/AttendanceOverview/YetToCheckinEmployeesTable";
import OnLeaveEmployeesTable from "./Components/Company/AttendanceOverview/OnLeaveEmployeesTable";
import LeaveRequestsTable from "./Components/Company/AttendanceOverview/LeaveRequestsTable";
import CheckinEmployeesTable from "./Components/Company/AttendanceOverview/CheckinEmployeesTable";
import CompanyDashboard from "./Components/Company/Dashboard/CompanyDashboard";
import PayScheduleForm from "./Components/Company/PayScheduleForm";
import WfhEmployeesTable from "./Components/Company/AttendanceOverview/WfhEmployeesTable";
import UpdatePassword from "./Components/Employee/UpdatePassword";
