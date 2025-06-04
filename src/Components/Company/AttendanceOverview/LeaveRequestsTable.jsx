import React, { useEffect, useState, forwardRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function LeaveRequestsTable() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update current time every second
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

  // Format date to yyyy-MM for API query param
  const formatMonthYear = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  // Fetch leave requests from API based on selectedDate
  const fetchLeaveRequests = async (date) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token"); // Get token from localStorage

    try {
      const response = await axios.get(
        `https://www.attend-pay.com/attendence/history`,
        {
          params: { month_year: formatMonthYear(date) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming response.data contains the array of leave requests
      setLeaveRequests(response.data.leave_history);
    } catch (err) {
      setError("Failed to fetch leave requests");
      setLeaveRequests([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount for current month
  useEffect(() => {
    fetchLeaveRequests(selectedDate);
  }, []);

  // Handle date change and fetch new data
  const onDateChange = (date) => {
    setSelectedDate(date);
    fetchLeaveRequests(date);
  };

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
    <div className="p-6 text-gray-800 w-full">
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
            onChange={onDateChange}
            customInput={<CustomDateInput />}
            dateFormat="dd/MMM/yyyy"
          />
        </div>
      </div>

      {/* Error message */}
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Employee Code</th>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Applied on</th>
                <th className="px-4 py-2">No.of Days</th>
                <th className="px-4 py-2">Leave Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaveRequests.map((req, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{req.emp_code || "-"}</td>
                    <td className="px-4 py-3">
                      {req.first_name} {req.last_name}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(req.apply_time).toLocaleDateString("en-GB") ||
                        "-"}
                    </td>
                    <td className="px-4 py-3">{req.days || "-"}</td>
                    <td className="px-4 py-3">{req.category_name || "-"}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        req.status === "Approved"
                          ? "text-green-600"
                          : req.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status || "Pending"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(req.start_time).toLocaleDateString("en-GB") ||
                        "-"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(req.end_time).toLocaleDateString("en-GB") ||
                        "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
