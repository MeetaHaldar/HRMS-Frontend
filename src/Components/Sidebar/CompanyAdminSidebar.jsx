import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUmbrellaBeach } from "react-icons/fa6";
import {
  FaFolderPlus,
  FaBookOpen,
  FaIdBadge,
  FaChevronDown,
} from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaArrowTrendUp, FaPeopleGroup } from "react-icons/fa6";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { TbTax } from "react-icons/tb";
import { FcLeave } from "react-icons/fc";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { GrTemplate } from "react-icons/gr";
import { MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const menuItems = [
  {
    label: "Dashboard",
    to: "/companyAdmin/CompanyDashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    label: "Employees",
    to: "/companyAdmin/employeeList",
    icon: <FaPeopleGroup />,
  },
  { label: "Documents", to: "/companyAdmin/documents", icon: <FaFolderPlus /> },
  {
    label: "Leave & Attendance",
    to: "LeaveAttendanceOverview",
    icon: <FcLeave />,
  },
  {
    label: "Subscription",
    icon: <FaBookOpen />,
    isExpandable: true,
    subItems: [
      {
        label: "All Subs.",
        to: "/companyAdmin/subscriptionPlans",
        icon: <FaListAlt />,
      },
      {
        label: "My Subs.",
        to: "/companyAdmin/my-subscriptions",
        icon: <FaUserCheck />,
      },
    ],
  },
  { label: "Settings", to: "", icon: <IoSettingsOutline /> },
];

const settingsMenu = [
  {
    label: "Organisation Profile",
    to: "/companyAdmin/companyProfile",
    icon: <CgProfile />,
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
    icon: <FaUmbrellaBeach />,
  },
  {
    label: "Salary Components",
    to: "/companyAdmin/salaryComponent",
    icon: <RiMoneyDollarBoxLine />,
  },
  {
    label: "Salary Templates",
    to: "/companyAdmin/salaryTemplate",
    icon: <GrTemplate />,
  },
  {
    label: "Taxes",
    to: "/companyAdmin/TaxDetails",
    icon: <TbTax />,
  },
  {
    label: "Leave & Attendance",
    icon: <FcLeave />,
    isExpandable: true,
    subItems: [
      { label: "Leave Type", to: "/companyAdmin/leaveType" },
      { label: "Work From Home", to: "/companyAdmin/wfhManager" },
      { label: "Attendance", to: "/companyAdmin/workShift" },
      { label: "Regularization", to: "/companyAdmin/regularizationSettings" },
    ],
  },
  {
    label: "Change Password",
    to: "/companyAdmin/changePassword",
    icon: <RiLockPasswordLine />,
  },
];

const CompanyAdminSidebar = ({ children }) => {
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isLeaveAttendanceOpen, setIsLeaveAttendanceOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Collapsible Main Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 pl-2 ${
          isSettingsMenuActive ? "w-16" : "w-34"
        } flex flex-col items-center`}
      >
        <div className="flex items-center justify-center h-16 text-lg font-bold">
          System Admin
        </div>
        <nav className="space-y-4 py-4 w-full">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            if (item.isExpandable) {
              return (
                <div key={index} className="w-full">
                  <button
                    onClick={() => {
                      setIsSubscriptionOpen(!isSubscriptionOpen);
                      setIsSettingsMenuActive(false);
                    }}
                    className={`flex items-center justify-between w-full p-2 rounded-md transition ${
                      isSubscriptionOpen
                        ? "bg-[#FFD85F] text-black"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-lg">{item.icon}</span>
                      {!isSettingsMenuActive && (
                        <span className="text-sm ml-2">{item.label}</span>
                      )}
                    </div>
                    <span className="text-xs">
                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          isSubscriptionOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    className={`ml-6 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
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
                          onClick={() => {
                            setIsSettingsMenuActive(false);
                            setIsSubscriptionOpen(false);
                          }}
                          className={`flex items-center space-x-2 py-1 text-sm pl-4 ${
                            isSubActive
                              ? "text-black font-semibold"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          <span className="text-base">{subItem.icon}</span>
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.to}
                onClick={(e) => {
                  if (item.label === "Settings") {
                    e.preventDefault();
                    setIsSettingsMenuActive(!isSettingsMenuActive);
                    setIsSubscriptionOpen(false);
                  } else {
                    setIsSettingsMenuActive(false);
                    setIsSubscriptionOpen(false);
                  }
                }}
                className={`flex items-center p-2 rounded-md transition ${
                  isActive ||
                  (item.label === "Settings" && isSettingsMenuActive)
                    ? "bg-[#FFD85F] text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isSettingsMenuActive && (
                  <span className="text-sm ml-2">{item.label}</span>
                )}
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="w-full px-2 pt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded-md justify-center lg:justify-start text-gray-600 hover:bg-gray-100 transition"
            >
              <span className="text-xl">
                <FiLogOut />
              </span>
              {!isSettingsMenuActive && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Settings Sidebar */}
      {isSettingsMenuActive && (
        <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
          <div className="h-16 flex items-center justify-center text-2xl font-semibold text-[#303030]">
            Settings
          </div>
          <nav className="px-4 py-4 space-y-2">
            {settingsMenu.map((item, index) => {
              const isActive = location.pathname === item.to;

              if (item.isExpandable) {
                const isAnySubActive = item.subItems?.some(
                  (sub) => location.pathname === sub.to
                );

                return (
                  <div key={index}>
                    <button
                      onClick={() =>
                        setIsLeaveAttendanceOpen(!isLeaveAttendanceOpen)
                      }
                      className={`flex justify-between items-center w-full p-2 rounded-md transition ${
                        isLeaveAttendanceOpen || isAnySubActive
                          ? "bg-[#FFD85F] text-black"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`transition-transform duration-300 text-sm ${
                          isLeaveAttendanceOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    </button>

                    <div
                      className={`ml-6 pl-2 mt-1 overflow-hidden transition-all duration-300 ease-in-out border-l border-r border-b border-gray-600 border-dashed p-3 ${
                        isLeaveAttendanceOpen
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
                            className={`block py-1 text-sm ${
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
                <Link
                  key={index}
                  to={item.to}
                  className={`flex items-center space-x-3 p-2 rounded-md transition ${
                    isActive
                      ? "bg-[#FFD85F] text-black"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CompanyAdminSidebar;
