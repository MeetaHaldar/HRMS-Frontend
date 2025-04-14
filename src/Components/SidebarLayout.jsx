import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FaFolderPlus } from "react-icons/fa";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { FaQuestionCircle, FaBookOpen, FaPhoneVolume } from "react-icons/fa";  // Added icons for settings menu

const menuItems = [
  { label: 'Dashboard', to: '/adminDashboard', icon: <MdSpaceDashboard /> },
  { label: 'Employees', to: '/listings1', icon: <FaPeopleGroup /> },
  { label: 'Pay Runs', to: '/listings2', icon: <FaArrowTrendUp /> },
  { label: 'Approvals', to: '/listings3', icon: <FaClipboardCheck /> },
  { label: 'Form 16', to: '/organisations', icon: <FaWpforms /> },
  { label: 'loans', to: '/listings4', icon: <LuReceiptIndianRupee /> },
  { label: 'Documents', to: '/logs', icon: <FaFolderPlus /> },
  { label: 'Reports', to: '/support', icon: <GoReport /> },
  { label: 'Settings', to: '/adminDashboard', icon: <IoSettingsOutline /> },
];

const settingsMenu = [
  { label: 'Organisation Profile', to: '/help/faq', icon: <FaQuestionCircle /> },
  { label: 'Departments', to: '/Department', icon: <FaBookOpen /> },
  { label: 'Designations', to: '/Designation', icon: <FaPhoneVolume /> },
  { label: 'Holidays', to: '/HolidayList', icon: <FaPhoneVolume /> },

  { label: 'Statutory Components', to: '/help/contact', icon: <FaPhoneVolume /> },

  { label: 'Salary Components', to: '/salaryComponent', icon: <FaPhoneVolume /> },
  { label: 'Salary Templates', to: '/help/contact', icon: <FaPhoneVolume /> },
  { label: 'Taxes', to: '/help/contact', icon: <FaPhoneVolume /> },
  { label: 'Pay Schedule', to: '/help/contact', icon: <FaPhoneVolume /> },
  { label: 'Leave & Attendance', to: '/leaves', icon: <FaPhoneVolume /> },
  { label: 'User & Roles', to: '/help/contact', icon: <FaPhoneVolume /> },

];

const SidebarLayout = ({ children }) => {
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);

  const handleMenuClick = (item) => {
    setIsSettingsMenuActive(item.label === 'Settings');
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Sidebar */}
      <div className={`
          bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center 
          ${isSettingsMenuActive ? 'lg:w-20' : 'lg:w-64'} 
          w-20 
        `}
      >
        <div className="hidden lg:flex items-center justify-center h-16 font-bold">
          {isSettingsMenuActive ? 'M' : 'Main'}
        </div>

        <nav className="px-2 py-6 space-y-2 w-full">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              onClick={() => handleMenuClick(item)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition text-gray-600 justify-center lg:justify-start"
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`hidden lg:${isSettingsMenuActive ? 'hidden' : 'inline'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings Sidebar */}
      {isSettingsMenuActive && (
        <div className="w-64 bg-white shadow-lg  h-full flex flex-col">
          <div className="flex items-center justify-center h-16 text-[#303030] font-bold text-2xl">Settings</div>
          <nav className="px-4 py-6 space-y-2">
            {settingsMenu.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition text-gray-600"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <span className="text-xl font-semibold">My App</span>
        </header>

        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
