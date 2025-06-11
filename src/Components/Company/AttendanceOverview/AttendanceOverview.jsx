import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import dev_url from "../../../config";

export default function AttendanceOverview() {
  const [currentTime, setCurrentTime] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [approvalDate, setApprovalDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [checkinEmployees, setCheckinEmployees] = useState(0);
  const [yetToCheckin, setYetToCheckin] = useState(0);
  const [onWfh, setOnWfh] = useState(0);
  const [onLeave, setOnLeave] = useState(0);

  const token = localStorage.getItem("token");

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
    const fetchCounts = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const empRes = await axios.get(`${dev_url}api/employee`, { headers });
        setTotalEmployees(empRes.data.employees.length || 0);

        const checkinRes = await axios.get(
          `${dev_url}attendence/checkinEmp?date=${attendanceDate}`,
          { headers }
        );
        setCheckinEmployees(checkinRes.data.data?.length || 0);

        const yetToCheckinRes = await axios.get(
          `${dev_url}attendence/yettocheckin?date=${attendanceDate}`,
          { headers }
        );
        setYetToCheckin(yetToCheckinRes.data.data?.length || 0);

        const wfhRes = await axios.get(
          `${dev_url}attendence/wfhemp?date=${attendanceDate}`,
          { headers }
        );
        setOnWfh(wfhRes.data.data?.length || 0);

        const leaveRes = await axios.get(
          `${dev_url}attendence/leavemp?date=${attendanceDate}`,
          { headers }
        );
        setOnLeave(leaveRes.data.data?.length || 0);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      }
    };

    if (attendanceDate) {
      fetchCounts();
    }
  }, [attendanceDate, token]);

  const handleDateChange = (e) => {
    const selected = dayjs(e.target.value).format("YYYY-MM-DD");
    setAttendanceDate(selected);
  };

  const overviewData = [
    {
      title: "Total Employees",
      value: totalEmployees,
      link: "/companyAdmin/employeeList",
    },
    {
      title: "C/in Employees",
      value: checkinEmployees,
      link: "/companyAdmin/checkinEmployees",
    },
    {
      title: "Yet to C/in",
      value: yetToCheckin,
      link: "/companyAdmin/yetToCheckinEmployees",
    },
    { title: "On WFH", value: onWfh, link: "/companyAdmin/wfhEmployees" },
    {
      title: "On Leave",
      value: onLeave,
      link: "/companyAdmin/onLeaveEmployees",
    },
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
          onChange={handleDateChange}
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
