import React from 'react';
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

const superAdminMenu = [
  { label: 'Dashboard', to: '/adminDashboard', icon: <MdSpaceDashboard /> },
  { label: 'Company List', to: '/adminDashboard', icon: <FaBuilding /> },
  { label: 'Company List', to: '/adminDashboard', icon: <FaBuilding /> },
  { label: 'Subscription List', to: '/adminDashboard', icon: <BsCardChecklist /> },
];

const SuperAdminSidebar = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center w-20 lg:w-64">
        <div className="hidden lg:flex items-center justify-center h-16 font-bold text-xl">
          SuperAdmin
        </div>

        <nav className="px-2 py-6 space-y-2 w-full">
          {superAdminMenu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition text-gray-600 justify-center lg:justify-start"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <span className="text-xl font-semibold">SuperAdmin Panel</span>
        </header>

        <main className="p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
