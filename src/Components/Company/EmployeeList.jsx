import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import dev_url from "../../config";
import RegisterEmployee from "./RegisterEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  const fetchEmployees = () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`${dev_url}api/employee/?page=${currentPage}`, {
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
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null); // Clear any selected employee
    setIsPopupOpen(true); // Open popup in add mode
  };

  const handleEditEmployee = (employee) => {
    console.log("Editing employee:", employee);
    setSelectedEmployee(employee); // Set employee to edit
    setIsPopupOpen(true); // Open popup in edit mode
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-gray-500 font-semibold">Employee List</h2>
        <button
          onClick={handleAddEmployee}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 shadow-md text-sm rounded-full font-semibold cursor-pointer"
        >
          + New Employee
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-sm">
          <thead className="bg-gray-200 text-left text-gray-600">
            <tr>
              <th className="p-3">Emp Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Position</th>
              <th className="p-3">Active/InActive</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3">{employee.emp_code}</td>
                  <td className="p-3">{employee.first_name}</td>
                  <td className="p-3">{employee.department_name}</td>
                  <td className="p-3">{employee.position_name}</td>

                  <td className="p-3">
                    {employee.is_active ? "Active" : "InActive"}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-900"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <FiEdit />
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

      {isPopupOpen && (
        <RegisterEmployee
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          item={selectedEmployee}
          onSuccess={() => {
            fetchEmployees();
            setIsPopupOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
