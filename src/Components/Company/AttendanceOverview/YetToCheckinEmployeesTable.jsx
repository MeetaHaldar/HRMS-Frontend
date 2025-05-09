import React, { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function YetToCheckinEmployeesTable() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
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

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const employees = Array(10).fill({
    code: "Employee Code",
    name: "Employee Name",
    email: "xyz@mail.com",
    phone: "+91-987654321",
    joinDate: "22/01/2025",
    department: "Department",
    position: "Position",
    checkIn: "--:--",
    checkOut: "--:--",
  });

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
            onClick={() => navigate(-1)}
          />
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
            Yet to C/in Employees:
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
            {employees.map((emp, index) => (
              <tr key={index}>
                <td className="px-4 py-3">{emp.code}</td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">
                  <div>{emp.email}</div>
                  <div>{emp.phone}</div>
                </td>
                <td className="px-4 py-3">{emp.joinDate}</td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3">{emp.position}</td>
                <td className="px-4 py-3">{emp.checkIn}</td>
                <td className="px-4 py-3">{emp.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
