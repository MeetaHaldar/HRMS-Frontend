import React, { useEffect, useState, forwardRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function LeaveRequestsTable() {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const leaveRequests = [
    { appliedOn: "30/04/25" },
    { appliedOn: "28/04/25" },
    { appliedOn: "30/04/25" },
    { appliedOn: "27/04/25" },
    { appliedOn: "30/04/25" },
    { appliedOn: "28/04/25" },
    { appliedOn: "30/04/25" },
    { appliedOn: "26/04/25" },
  ];
  // Custom input component for the date picker
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="flex items-center gap-2 cursor-pointer border rounded px-2 py-1"
      onClick={onClick}
      ref={ref}
    >
      <span className="text-gray-600">{value}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </div>
  ));
  return (
    <div className=" p-6 text-gray-800 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <ArrowLeft
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/companyAdmin/LeaveAttendanceOverview")}
          />
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
            Leave Requests:
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="text-lg md:text-lg text-gray-500 font-semibold">
            {currentTime}
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<CustomDateInput />}
            dateFormat="dd/MMM/yyyy"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Employee Code</th>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Applied on</th>
              <th className="px-4 py-2">No.of Days</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req, index) => (
              <tr key={index}>
                <td className="px-4 py-3">Employee Code</td>
                <td className="px-4 py-3">Employee Name</td>
                <td className="px-4 py-3">{req.appliedOn}</td>
                <td className="px-4 py-3">3 Days</td>
                <td className="px-4 py-3">Department</td>
                <td className="px-4 py-3 text-yellow-600 font-medium">
                  Pending
                </td>
                <td className="px-4 py-3">1/5/25</td>
                <td className="px-4 py-3">4/5/25</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
