import React, { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function WfhEmployeesTable() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);

  const formatDateForAPI = (date) => date.toISOString().split("T")[0];

  // Fetch WFH Employees
  const fetchWfhEmployees = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = formatDateForAPI(date);
      const response = await axios.get(
        `https://atd.infosware-test.in/attendence/wfhemp?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch WFH employees:", error);
      setEmployees([]);
    }
  };

  // 🚀 Fetch data on mount and date change
  useEffect(() => {
    fetchWfhEmployees(selectedDate);
  }, [selectedDate]);

  // 📅 Custom Input for Date Picker
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
            WFH Employees:
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 mr-4">
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
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No WFH employees found
                </td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{emp.emp_code}</td>
                  <td className="px-4 py-3">
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td className="px-4 py-3">
                    <div>{emp.email}</div>
                    <div>{emp.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(emp.start_date).toLocaleDateString("en-GB")}{" "}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(emp.end_date).toLocaleDateString("en-GB")}{" "}
                  </td>
                  <td className="px-4 py-3">{emp.department_name}</td>
                  <td className="px-4 py-3">{emp.position_name}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">WFH</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
