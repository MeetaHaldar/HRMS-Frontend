import { Outlet } from "react-router-dom";
import CompanyAdminSidebar from "../Components/Sidebar/CompanyAdminSidebar";

const CompanyAdminLayout = () => {
  return (
    <CompanyAdminSidebar>
      <Outlet />
    </CompanyAdminSidebar>
  );
};

export default CompanyAdminLayout;
