import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { LuBadgeIndianRupee } from "react-icons/lu";
import { IoIosListBox } from "react-icons/io";
import LogoutButtonWithPopup from "./LogoutButtonWithPopup";
import {
  FaFolderPlus,
  FaBookOpen,
  FaIdBadge,
  FaChevronDown,
  FaUserCheck,
  FaPeopleGroup,
} from "react-icons/fa6";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { TbTax } from "react-icons/tb";
import { FcLeave } from "react-icons/fc";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { GrSchedule } from "react-icons/gr";

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
    label: "Subscription",
    icon: <FaBookOpen />,
    isExpandable: true,
    subItems: [
      {
        label: "All Subscriptions",
        to: "/companyAdmin/subscriptionPlans",
        icon: <IoIosListBox />,
      },
      {
        label: "My Subscription",
        to: "/companyAdmin/my-subscriptions",
        icon: <FaUserCheck />,
      },
    ],
  },
  {
    label: "Leave & Attendance",
    to: "LeaveAttendanceOverview",
    icon: <FcLeave />,
  },
  {
    label: "Salary",
    icon: <RiMoneyDollarBoxLine />,
    isExpandable: true,
    subItems: [
      {
        label: "Salary List",
        to: "/companyAdmin/salarylist",
        icon: <LuBadgeIndianRupee />,
      },
      {
        label: "Monthly Salary",
        to: "/companyAdmin/MonthlySalaryList",
        icon: <LuBadgeIndianRupee />,
      },
      {
        label: "Salary Components",
        to: "/companyAdmin/salaryComponent",
        icon: <LuBadgeIndianRupee />,
      },
      {
        label: "Salary Templates",
        to: "/companyAdmin/salaryTemplate",
        icon: <LuBadgeIndianRupee />,
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
    label: "Pay Schedule",
    to: "/companyAdmin/paySchedule",
    icon: <GrSchedule />,
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
    label: "Taxes",
    to: "/companyAdmin/TaxDetails",
    icon: <TbTax />,
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
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [activeSettingsParent, setActiveSettingsParent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 pl-2 ${
          isSettingsMenuActive ? "w-16" : "w-[240px]"
        } flex flex-col items-center`}
      >
        <div className="flex items-center justify-center h-16 text-lg font-bold">
          System Admin
        </div>
        <nav className="space-y-4 py-4 w-full">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            if (item.isExpandable) {
              const isOpen =
                item.label === "Subscription"
                  ? isSubscriptionOpen
                  : item.label === "Salary"
                  ? isSalaryOpen
                  : false;

              const setOpen =
                item.label === "Subscription"
                  ? setIsSubscriptionOpen
                  : item.label === "Salary"
                  ? setIsSalaryOpen
                  : () => {};

              return (
                <div key={index} className="w-full">
                  <button
                    onClick={() => {
                      setOpen(!isOpen);
                      setIsSettingsMenuActive(false);
                    }}
                    className={`flex items-center justify-between w-full p-2 rounded-md transition ${
                      isOpen
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
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out border-l border-r border-b border-gray-600 border-dashed p-3 ${
                      isOpen
                        ? "max-h-60 opacity-100 mt-0.5"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((subItem, subIdx) => {
                      const isSubActive = location.pathname === subItem.to;
                      return (
                        <Link
                          key={subIdx}
                          to={subItem.to}
                          onClick={() => setIsSettingsMenuActive(false)}
                          className={`flex items-center gap-2 py-1 text-sm ${
                            isSubActive
                              ? "text-black font-semibold"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          {subItem.icon}
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
                onClick={(e) => {
                  if (item.label === "Settings") {
                    e.preventDefault();
                    setIsSettingsMenuActive(!isSettingsMenuActive);
                    setIsSubscriptionOpen(false);
                    setIsSalaryOpen(false);
                  } else {
                    setIsSettingsMenuActive(false);
                    setIsSubscriptionOpen(false);
                    setIsSalaryOpen(false);
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

          <div className="w-full px-2 pt-6">
            <LogoutButtonWithPopup />
          </div>
        </nav>
      </div>

      {/* Settings Panel */}
      {isSettingsMenuActive && (
        <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
          <div className="h-16 flex items-center justify-center text-2xl font-semibold text-[#303030]">
            Settings
          </div>
          <nav className="px-4 py-4 space-y-2">
            {settingsMenu.map((item, index) => {
              const isActive = location.pathname === item.to;

              if (item.isExpandable) {
                const isOpen = activeSettingsParent === item.label;
                const isAnySubActive = item.subItems?.some(
                  (sub) => location.pathname === sub.to
                );

                return (
                  <div key={index}>
                    <button
                      onClick={() => {
                        setActiveSettingsParent((prev) =>
                          prev === item.label ? null : item.label
                        );
                      }}
                      className={`flex justify-between items-center w-full p-2 rounded-md transition ${
                        isOpen || isAnySubActive
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
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    </button>
                    <div
                      className={`ml-6 pl-2 mt-1 overflow-hidden transition-all duration-300 ease-in-out border-l border-r border-b border-gray-600 border-dashed p-3 ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
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

      <div className="flex-1 overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CompanyAdminSidebar;
