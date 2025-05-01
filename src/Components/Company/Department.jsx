import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDepartmentPopup from "./AddDepartmentPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../Pagination";

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
    setSelectedDepartment(null);
    setShowAddModal(true);
  };

  const handleAddSubmit = (newDepartment) => {
    if (selectedDepartment) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === newDepartment.id ? newDepartment : dept
        )
      );
    } else {
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
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
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

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-xs md:text-sm">
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
                        setShowAddModal(true);
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

      <Pagination
        currentPage={currentPage}
        totalPages={10} // Replace this with: totalPages if dynamic
        onPageChange={(page) => setCurrentPage(page)}
      />

      <AddDepartmentPopup
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        initialData={selectedDepartment}
      />

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        data={departmentToDelete}
        message={`Are you sure you want to delete the department: ${departmentToDelete?.name}?`}
      />
    </div>
  );
};

export default Department;
