import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../Components/Sidebar/SuperAdminSidebar";

const SuperAdminLayout = () => {
  return (
    <SuperAdminSidebar>
      <Outlet />
    </SuperAdminSidebar>
  );
};

export default SuperAdminLayout;
