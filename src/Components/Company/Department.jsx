import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDepartmentPopup from "./AddDepartmentPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";

const Department = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Human Resources",
      code: "HR01",
      parentId: "0",
      totalEmployees: 15,
    },
    {
      id: 2,
      name: "Engineering",
      code: "ENG02",
      parentId: "0",
      totalEmployees: 40,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    fetch(`/api/departments?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data.departments);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleAddClick = () => {
    setSelectedDepartment(null); // Set to null to indicate it's a new department
    setShowAddModal(true);
  };

  const handleAddSubmit = (newDepartment) => {
    if (selectedDepartment) {
      // Update department if selectedDepartment is present
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === newDepartment.id ? newDepartment : dept
        )
      );
    } else {
      // Add new department
      setDepartments((prev) => [...prev, newDepartment]);
    }
    setShowAddModal(false);
  };

  const handleDeleteRequest = (department) => {
    setDepartmentToDelete(department);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    setDepartments((prev) =>
      prev.filter((d) => d.id !== departmentToDelete.id)
    );
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Departments:
        </h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 shadow-md text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={handleAddClick}
        >
          + Add Department
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">Department Name</th>
              <th className="p-2 md:p-3">Department Code</th>
              <th className="p-2 md:p-3">Parent ID</th>
              <th className="p-2 md:p-3">Total Employees</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No departments found
                  </p>
                </td>
              </tr>
            ) : (
              departments.map((department, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{department.name}</td>
                  <td className="p-2 md:p-3">{department.code}</td>
                  <td className="p-2 md:p-3">{department.parentId}</td>
                  <td className="p-2 md:p-3">{department.totalEmployees}</td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setShowAddModal(true); // Open the modal with the selected department's data
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleDeleteRequest(department)}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, '...', 9, 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#FFD85F] text-black font-bold' : 'hover:bg-gray-200'}`}
              disabled={page === '...'}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === 10}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>

      {/* Modal Popup */}
      <AddDepartmentPopup
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        initialData={selectedDepartment} // Prefill data if editing
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        data={departmentToDelete}
        message={`Are you sure you want to delete the department: ${departmentToDelete?.name}?`} // Show department name
      />
    </div>
  );
};

export default Department;
