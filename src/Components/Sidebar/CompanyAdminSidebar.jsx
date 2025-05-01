import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaFolderPlus,
  FaClipboardCheck,
  FaQuestionCircle,
  FaBookOpen,
  FaPhoneVolume,
  FaIdBadge,
} from "react-icons/fa";
import { FaPeopleGroup, FaArrowTrendUp } from "react-icons/fa6";
import { PiBuildingOfficeLight, PiSunglasses } from "react-icons/pi";

const menuItems = [
  {
    label: "Employees",
    to: "/companyAdmin/employeeList",
    icon: <FaPeopleGroup />,
  },
  { label: "Pay Runs", to: "/companyAdmin", icon: <FaArrowTrendUp /> },
  { label: "Approvals", to: "/companyAdmin", icon: <FaClipboardCheck /> },
  { label: "Documents", to: "/companyAdmin/documents", icon: <FaFolderPlus /> },
  {
    label: "Subscription",
    icon: <FaBookOpen />,
    isExpandable: true,
    subItems: [
      { label: "All Subscriptions", to: "/companyAdmin/subscriptionPlans" },
      { label: "My Subscriptions", to: "/companyAdmin/my-subscriptions" },
    ],
  },
  { label: "Settings", to: "", icon: <IoSettingsOutline /> }, // Triggers settings panel
];

const settingsMenu = [
  {
    label: "Organisation Profile",
    to: "/companyAdmin/companyProfile",
    icon: <FaQuestionCircle />,
  },
  {
    label: "Departments",
    to: "/companyAdmin/Department",
    icon: <PiBuildingOfficeLight />,
  },
  {
    label: "Designations",
    to: "/companyAdmin/Designation",
    icon: <FaIdBadge />,
  },
  {
    label: "Holidays",
    to: "/companyAdmin/HolidayList",
    icon: <PiSunglasses />,
  },
  {
    label: "Salary Components",
    to: "/companyAdmin/salaryComponent",
    icon: <FaPhoneVolume />,
  },
  {
    label: "Salary Templates",
    to: "/companyAdmin/salaryTemplate",
    icon: <FaPhoneVolume />,
  },
  { label: "Taxes", to: "/companyAdmin/z", icon: <FaPhoneVolume /> },
  { label: "Pay Schedule", to: "/companyAdmin/c", icon: <FaPhoneVolume /> },
  {
    label: "Leave & Attendance",
    to: "/companyAdmin/leaves",
    icon: <FaPhoneVolume />,
  },
];

const CompanyAdminSidebar = ({ children }) => {
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const location = useLocation();

  const handleSettingsClick = () => {
    setIsSettingsMenuActive(!isSettingsMenuActive);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Sidebar */}
      <div
        className={`bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center ${
          isSettingsMenuActive ? "lg:w-20" : "lg:w-64"
        } w-20`}
      >
        <div className="hidden lg:flex items-center justify-center h-16 font-bold">
          {isSettingsMenuActive ? "M" : "Main"}
        </div>

        <nav className="px-2 py-6 space-y-2 w-full">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            if (item.isExpandable) {
              return (
                <div key={index} className="w-full">
                  <div
                    onClick={() => setIsSubscriptionOpen(!isSubscriptionOpen)}
                    className={`flex items-center space-x-3 p-2 rounded-md transition cursor-pointer ${
                      isSubscriptionOpen
                        ? "bg-[#FFD85F] text-black"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`hidden lg:${
                        isSettingsMenuActive ? "hidden" : "inline"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Submenu */}
                  <div
                    className={`ml-10 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      isSubscriptionOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((subItem, subIdx) => {
                      const isSubActive = location.pathname === subItem.to;
                      return (
                        <Link
                          key={subIdx}
                          to={subItem.to}
                          className={`block py-1 text-sm transition ${
                            isSubActive
                              ? "text-black font-semibold"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-md transition justify-center lg:justify-start ${
                  item.label === "Settings"
                    ? "hover:bg-gray-100 text-gray-600"
                    : isActive
                    ? "bg-[#FFD85F] text-black"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={item.label === "Settings" ? handleSettingsClick : null}
              >
                {item.label === "Settings" ? (
                  <span className="text-xl">{item.icon}</span>
                ) : (
                  <Link to={item.to} className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`hidden lg:${
                        isSettingsMenuActive ? "hidden" : "inline"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Settings Sidebar */}
      {isSettingsMenuActive && (
        <div className="w-64 bg-white shadow-lg h-full flex flex-col">
          <div className="flex items-center justify-center h-16 text-[#303030] font-bold text-2xl">
            Settings
          </div>
          <nav className="px-4 py-6 space-y-2">
            {settingsMenu.map((item, index) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center space-x-3 p-2 rounded-md transition ${
                    isActive
                      ? "bg-[#FFD85F] text-black"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
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

export default CompanyAdminSidebar;
