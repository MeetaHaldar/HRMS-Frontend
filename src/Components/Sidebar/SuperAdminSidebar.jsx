import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

const superAdminMenu = [
  { label: "Dashboard", to: "/adminDashboard", icon: <MdSpaceDashboard /> },
  {
    label: "Company List",
    to: "/CompaniesList",
    icon: <FaBuilding />,
  },
  {
    label: "Subscription",
    to: "/adminDashboard/subscriptions",
    icon: <BsCardChecklist />,
    children: [
      {
        label: "Subscription List",
        to: "/Subscription",
        icon: <BsCardChecklist />,
      },
      {
        label: "Subscribed Companies",
        to: "/subscribedCompanyList",
        icon: <BsCardChecklist />,
      },
    ],
  },
  {
    label: "Update Password",
    to: "/changePassword",
    icon: <RiLockPasswordLine />,
  },
];

const SuperAdminSidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const toggleSubMenu = () => setOpenSubMenu((prev) => !prev);

  const isPathActive = (path) => path && location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  useEffect(() => {
    const subscriptionItem = superAdminMenu.find(
      (item) => item.label === "Subscription"
    );
    const isAnyChildActive = subscriptionItem?.children?.some((child) =>
      location.pathname.startsWith(child.to)
    );
    if (isAnyChildActive) setOpenSubMenu(true);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center w-20 lg:w-64 overflow-y-auto justify-between">
        <div className="w-full">
          <div className="hidden lg:flex items-center justify-center h-16 font-bold text-xl">
            SuperAdmin
          </div>

          <nav className="px-2 py-6 space-y-2 w-full">
            {superAdminMenu.map((item, index) => {
              const isActive = isPathActive(item.to);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div key={index} className="w-full">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubMenu();
                      } else {
                        navigate(item.to);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start transition ${
                      isActive && !hasChildren
                        ? "text-black bg-yellow-300"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>

                  {/* Submenu */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openSubMenu ? "max-h-40 mt-1" : "max-h-0"
                      }`}
                    >
                      <div className="ml-6 space-y-1">
                        {item.children.map((child, childIndex) => {
                          const isChildActive = isPathActive(child.to);
                          return (
                            <Link
                              key={childIndex}
                              to={child.to}
                              className={`block px-3 py-1 rounded-md text-sm lg:text-base transition-colors ${
                                isChildActive
                                  ? "bg-yellow-300 text-black"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="w-full px-2 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start text-gray-600 hover:bg-gray-100 transition"
          >
            <span className="text-xl">
              <FiLogOut />
            </span>
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-4 bg-white shadow-md lg:hidden">
          <span className="text-xl font-semibold">SuperAdmin Panel</span>
        </header>

        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
