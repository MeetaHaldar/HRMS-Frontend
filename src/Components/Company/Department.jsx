import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDepartmentPopup from "./AddDepartmentPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../Pagination";
import dev_url from "../../config";
const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [apiError, setApiError] = useState("");

  const token = localStorage.getItem("token");

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${dev_url}api/auth/company/getallDepartment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data || [];
      setDepartments(data);
      setTotalPages(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  const handleAddClick = () => {
    setSelectedDepartment(null);
    setApiError("");
    setShowAddModal(true);
  };

  const handleAddSubmit = async (formData) => {
    setApiError("");
    try {
      if (selectedDepartment) {
        await axios.put(
          `${dev_url}api/auth/company/updateDepartment?id=${selectedDepartment.id}`,
          {
            dept_name: formData.dept_name,
            dept_code: formData.dept_code,
            is_default: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${dev_url}api/auth/company/createDepartment`,
          {
            dept_name: formData.dept_name,
            dept_code: formData.dept_code,
            is_default: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setShowAddModal(false);
      setSelectedDepartment(null);
      fetchDepartments();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setApiError(
            "Department code or name already exists for this company."
          );
        } else if (error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("An error occurred. Please try again.");
        }
      } else {
        setApiError("An error occurred. Please try again.");
      }
    }
  };

  const handleDeleteRequest = (department) => {
    setDepartmentToDelete(department);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${dev_url}api/auth/company/deleteDepartment?id=${departmentToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDeletePopup(false);
      setDepartmentToDelete(null);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setDepartmentToDelete(null);
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-gray-500 font-semibold">Departments:</h2>
        <button
          className="bg-[#FFD85F]  hover:bg-yellow-500 text-gray-900 px-4 py-2 shadow-md text-sm rounded-full font-semibold cursor-pointer"
          onClick={handleAddClick}
        >
          + Add Department
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-3">Department Name</th>
              <th className="p-3">Department Code</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : departments.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-100">
                  <td className="p-3">{department.dept_name}</td>
                  <td className="p-3">{department.dept_code}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950 cursor-pointer"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setApiError("");
                        setShowAddModal(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950 cursor-pointer"
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
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <AddDepartmentPopup
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        initialData={selectedDepartment}
        apiError={apiError}
      />

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        data={departmentToDelete}
        message={`Are you sure you want to delete the department: ${departmentToDelete?.dept_name}?`}
      />
    </div>
  );
};

export default Department;
