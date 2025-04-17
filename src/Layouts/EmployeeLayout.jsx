import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/Sidebar/EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <EmployeeSidebar>
      <Outlet />
    </EmployeeSidebar>
  );
};

export default EmployeeLayout;
