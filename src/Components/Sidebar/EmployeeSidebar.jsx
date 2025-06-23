import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdSpaceDashboard, MdOutlineWorkOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiThreeLeaves } from "react-icons/gi";
import { WiSunset } from "react-icons/wi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const baseMenu = [
  {
    label: "Dashboard",
    to: "/employee/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    label: "Profile",
    to: "/employee/profile",
    icon: <CgProfile />,
  },
  {
    label: "Holiday List",
    to: "/employee/holidays",
    icon: <WiSunset />,
  },

  {
    label: "My Requests",
    icon: <GiThreeLeaves />,
    children: [
      { label: "Leave", to: "/employee/leaves", icon: <GiThreeLeaves /> },
      { label: "WFH", to: "/employee/WFH", icon: <MdOutlineWorkOutline /> },
      {
        label: "Regularization",
        to: "/employee/regularization",
        icon: <IoMdTime />,
      },
    ],
  },
  {
    label: "Attendance Request",
    icon: <MdOutlineWorkOutline />,
    children: [
      {
        label: "Leave Request",
        to: "/employee/leaveRequest",
        icon: <GiThreeLeaves />,
      },
      {
        label: "Regularization Request",
        to: "/employee/RegularizarionRequest",
        icon: <IoMdTime />,
      },
      {
        label: "WFH Request",
        to: "/employee/WFHRequest",
        icon: <MdOutlineWorkOutline />,
      },
    ],
  },
  {
    label: "Update Password",
    to: "/employee/changePassword",
    icon: <RiLockPasswordLine />,
  },
];

const EmployeeSidebar = ({ children }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const navigate = useNavigate();
  let role = "";
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      role = parsedUser.role || "";
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  const employeeMenu =
    role && role.includes("manager")
      ? baseMenu
      : baseMenu.filter((item) => !item.requiresManager);

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="bg-white shadow-lg border-r border-gray-200 h-full flex flex-col items-center w-20 lg:w-64 justify-between">
        <div className="w-full">
          <div className="hidden lg:flex items-center justify-center h-16 font-bold text-xl">
            Employee
          </div>

          <nav className="px-2 py-6 space-y-2 w-full">
            {employeeMenu.map((item, index) => {
              const isActive = location.pathname === item.to;

              if (item.children) {
                const isExpanded = expandedMenus[item.label];

                return (
                  <div key={index}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start text-gray-600 hover:bg-gray-100 w-full"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="hidden lg:inline">{item.label}</span>
                      <span className="ml-auto hidden lg:inline">
                        {isExpanded ? (
                          <FaChevronUp size={12} />
                        ) : (
                          <FaChevronDown size={12} />
                        )}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child, cIndex) => {
                          const isChildActive = location.pathname === child.to;
                          return (
                            <Link
                              key={cIndex}
                              to={child.to}
                              className={`flex items-center space-x-2 p-2 rounded-md text-sm justify-start transition ${
                                isChildActive
                                  ? "bg-[#FFD85F]"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <span>{child.icon}</span>
                              <span className="hidden lg:inline">
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start transition ${
                    isActive
                      ? "bg-[#FFD85F]"
                      : "text-gray-600 hover:bg-gray-100"
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
