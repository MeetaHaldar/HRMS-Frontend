import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../Pagination";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      code: "EMP001",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1-555-123-4567",
      joiningDate: "22/01/2025",
      department: "Human Resources",
      position: "HR Manager",
      status: "Active",
    },
    {
      id: 2,
      code: "EMP002",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+1-555-234-5678",
      joiningDate: "15/02/2025",
      department: "Engineering",
      position: "Software Engineer",
      status: "Active",
    },
    {
      id: 3,
      code: "EMP003",
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      phone: "+1-555-345-6789",
      joiningDate: "10/03/2025",
      department: "Finance",
      position: "Accountant",
      status: "Inactive",
    },
    {
      id: 4,
      code: "EMP004",
      name: "Dana Lee",
      email: "dana.lee@example.com",
      phone: "+1-555-456-7890",
      joiningDate: "01/04/2025",
      department: "Marketing",
      position: "Marketing Executive",
      status: "Active",
    },
    {
      id: 5,
      code: "EMP005",
      name: "Ethan Brown",
      email: "ethan.brown@example.com",
      phone: "+1-555-567-8901",
      joiningDate: "12/05/2025",
      department: "Support",
      position: "Support Engineer",
      status: "Active",
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetch(`/api/employees?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleDeleteRequest = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete.id));
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">Employee List</h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 shadow-md text-xs md:text-sm rounded-full font-semibold cursor-pointer"
        >
          + New Employee
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-xs md:text-sm">
          <thead className="bg-gray-200 text-left text-gray-600 rounded-t-lg overflow-hidden">
            <tr >
              <th className="p-2 md:p-3">Employee Code</th>
              <th className="p-2 md:p-3">Employee Name</th>
              <th className="p-2 md:p-3">Contact Info.</th>
              <th className="p-2 md:p-3">Joining Date</th>
              <th className="p-2 md:p-3">Department</th>
              <th className="p-2 md:p-3">Position</th>
              <th className="p-2 md:p-3">Status</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center p-4">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">No employees found</td>
              </tr>
            ) : (
              employees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{employee.code}</td>
                  <td className="p-2 md:p-3">{employee.name}</td>
                  <td className="p-2 md:p-3">
                    {employee.email}<br />
                    {employee.phone}
                  </td>
                  <td className="p-2 md:p-3">{employee.joiningDate}</td>
                  <td className="p-2 md:p-3">{employee.department}</td>
                  <td className="p-2 md:p-3">{employee.position}</td>
                  <td className="p-2 md:p-3">{employee.status}</td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleDeleteRequest(employee)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        data={employeeToDelete}
        message={`Are you sure you want to delete the employee: ${employeeToDelete?.name}?`}
      />
    </div>
  );
};

export default EmployeeList;
