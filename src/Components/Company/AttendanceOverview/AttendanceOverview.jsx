import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function AttendanceOverview() {
  const [currentTime, setCurrentTime] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("2025-05-05");
  const [approvalDate, setApprovalDate] = useState("2025-05-05");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatted.toLowerCase());
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`https://www.attend-pay.com/api/employee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch employees");
        return response.json();
      })
      .then((data) => {
        setTotalEmployees(data.employees.length || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);

        setLoading(false);
      });
  }, []);

  const overviewData = [
    {
      title: "Total Employees",
      value: 0 || totalEmployees,
      link: "/companyAdmin/employeeList",
    },
    {
      title: "C/in Employees",
      value: 165,
      link: "/companyAdmin/checkinEmployees",
    },
    {
      title: "Yet to C/in",
      value: 15,
      link: "/companyAdmin/yetToCheckinEmployees",
    },
    {
      title: "On WFH",
      value: 15,
      link: "/companyAdmin/yetToCheckinEmployees",
    },
    { title: "On Leave", value: 12, link: "/companyAdmin/onLeaveEmployees" },
  ];

  const approvalData = [
    { title: "Leave Requests", value: 8, link: "/companyAdmin/leaveRequests" },
    {
      title: "Regularization Requests",
      value: 4,
      link: "/companyAdmin/regularization-requests",
    },
  ];

  return (
    <div className="p-6 text-gray-800 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Attendance & Leaves Overview:
        </h2>
        <span className="text-lg md:text-lg text-gray-500 font-semibold">
          {currentTime}
        </span>
      </div>

      <hr className="my-4 border-gray-400" />

      {/* Attendance Overview Section */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Attendance Overviews:
        </h2>
        <input
          type="date"
          className="text-sm border border-gray-300 rounded px-2 py-1"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {overviewData.map((item, index) => (
          <div
            key={index}
            className="rounded-md p-4 bg-gray-50 shadow h-24 flex flex-col items-center justify-center text-center relative"
          >
            <Link
              to={item.link}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <ExternalLink size={14} />
            </Link>
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-xl font-semibold mt-1">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Pending Approvals Section */}
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <h3 className="text-lg md:text-lg text-gray-500 font-semibold">
          Pending Approvals:
        </h3>
        <input
          type="date"
          className="text-sm border border-gray-300 rounded px-2 py-1"
          value={approvalDate}
          onChange={(e) => setApprovalDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {approvalData.map((item, index) => (
          <div
            key={index}
            className="rounded-md p-4 bg-gray-50 shadow h-24 flex flex-col items-center justify-center text-center relative"
          >
            <Link
              to={item.link}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <ExternalLink size={14} />
            </Link>
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-xl font-semibold mt-1">
              {item.value.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
