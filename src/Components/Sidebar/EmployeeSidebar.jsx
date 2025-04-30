import React from "react";
import { Link, useLocation } from "react-router-dom";

const employeeMenu = [
  { label: "Dashboard", to: "/employee/dashboard", icon: "" },
  { label: "Profile", to: "/employee/profile", icon: "" },
  { label: "Holiday List", to: "/employee/holidays", icon: "" },
  { label: "Leaves", to: "/employee/leaves", icon: "" },
  { label: "WFH", to: "/employee/WFHhistory", icon: "" },
];

const EmployeeSidebar = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center w-20 lg:w-64">
        <div className="hidden lg:flex items-center justify-center h-16 font-bold text-xl">
          Employee
        </div>

        <nav className="px-2 py-6 space-y-2 w-full">
          {employeeMenu.map((item, index) => {
            const isActive = location.pathname === item.to; // Exact match

            return (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start transition ${
                  isActive ? "bg-[##FFD85F]" : "text-gray-600 hover:bg-gray-100"
                }`}
                style={isActive ? { backgroundColor: "#FFD85F" } : {}}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <span className="text-xl font-semibold">Employee Panel</span>
        </header>

        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
