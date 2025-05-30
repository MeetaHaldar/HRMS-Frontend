import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TotalEmployeesTable() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`https://www.attend-pay.com/api/employee/`, {
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
        setEmployees(data.employees || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 text-gray-800 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/companyAdmin/LeaveAttendanceOverview")}
          />
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
            Total Employees:
          </h2>
        </div>
        <button className="bg-[#FFD85F] hover:bg-yellow-500 text-sm text-gray-800 font-semibold px-4 py-2 rounded-full shadow">
          + New Employee
        </button>
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
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((employee, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{employee.emp_code}</td>
                  <td className="px-4 py-3">{employee.first_name}</td>
                  <td className="px-4 py-3">
                    <div>{employee.email || "-"}</div>
                    <div>{employee.phone || "-"}</div>
                  </td>
                  <td className="px-4 py-3">{employee.hire_date || "-"}</td>
                  <td className="px-4 py-3">{employee.department || "-"}</td>
                  <td className="px-4 py-3">{employee.position || "-"}</td>
                  <td className="px-4 py-3">{employee.status || "-"}</td>
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <FaEdit className="cursor-pointer text-gray-600 hover:text-blue-600" />
                    <RiDeleteBin6Line className="cursor-pointer text-gray-600 hover:text-red-500" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
