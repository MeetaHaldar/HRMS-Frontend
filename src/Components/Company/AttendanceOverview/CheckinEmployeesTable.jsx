import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function CheckinEmployeesTable() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Format date as YYYY-MM-DD
  const formatDateForAPI = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Fetch employee check-in data
  const fetchCheckinData = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://atd.infosware-test.in/attendence/checkinEmp?date=${formatDateForAPI(
          date
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching check-in data:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set current time every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCheckinData(selectedDate);
    }
  }, [selectedDate]);

  // Custom input component for date picker
  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="flex items-center gap-2 cursor-pointer px-2 py-1"
      onClick={onClick}
      ref={ref}
    >
      <span className="text-gray-600">{value}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </div>
  ));

  return (
    <div className="text-gray-800 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <ArrowLeft
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/companyAdmin/LeaveAttendanceOverview")}
          />
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
            C/in Employees:
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
              <th className="px-4 py-2">Contact Info.</th>
              <th className="px-4 py-2">Joining Date</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">C/in</th>
              <th className="px-4 py-2">C/out</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No records found for selected date
                </td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{emp.emp_code || "-"}</td>
                  <td className="px-4 py-3">{emp.first_name || "-"}</td>
                  <td className="px-4 py-3">
                    <div>{emp.email || "-"}</div>
                    <div>{emp.mobile || "-"}</div>
                  </td>
                  <td className="px-4 py-3">
                    {emp.hire_date?.split("T")[0] || "-"}
                  </td>
                  <td className="px-4 py-3">{emp.department_name || "-"}</td>
                  <td className="px-4 py-3">{emp.position_name || "-"}</td>
                  <td className="px-4 py-3">{emp.punch_time || "--:--"}</td>
                  <td className="px-4 py-3">{emp.check_out || "--:--"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
