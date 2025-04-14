// Layout.js
import { Outlet } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';

const Layout = () => {
  return (
    <SidebarLayout>
      <Outlet />  {/* Dynamic content here */}
    </SidebarLayout>
  );
};

export default Layout;
