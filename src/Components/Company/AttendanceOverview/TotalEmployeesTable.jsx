import React from "react";
import { ArrowLeft } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function TotalEmployeesTable() {
  const navigate = useNavigate();

  const employees = Array(10).fill({
    code: "Employee Code",
    name: "Employee Name",
    email: "xyz@mail.com",
    phone: "+91-987654321",
    joinDate: "22/01/2025",
    department: "Department",
    position: "Position",
    status: "Active",
  });

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
                <td className="px-4 py-3">{emp.status}</td>
                <td className="px-4 py-3 flex gap-3 items-center">
                  <FaEdit className="cursor-pointer text-gray-600 hover:text-blue-600" />
                  <RiDeleteBin6Line className="cursor-pointer text-gray-600 hover:text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
