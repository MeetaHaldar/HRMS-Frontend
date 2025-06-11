import EmployeeWelcomeCard from "./EmployeeWelcomeCard";
import QuickOverview from "./QuickOverview";
import AttendanceChart from "./AttendanceChart";
import PayrollChart from "./PayrollChart";
import QuickActions from "./QuickActions";
export default function CompanyDashboard() {
  return (
    <div>
      <EmployeeWelcomeCard />
      <QuickOverview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50">
        <AttendanceChart />
        <PayrollChart />
      </div>
      <QuickActions />
    </div>
  );
}
