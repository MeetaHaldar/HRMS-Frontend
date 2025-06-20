import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDesignationPopup from "./AddDesignationPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../Pagination";
import dev_url from "../../config";
const Designation = () => {
  const [designations, setDesignations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${dev_url}api/auth/company/getallPosition`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allDesignations = res.data?.data || [];
      setDesignations(allDesignations);
      setTotalPages(1);
    } catch (err) {
      console.error("Error fetching designations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleAddClick = () => {
    setSelectedDesignation(null);
    setShowAddModal(true);
  };

  const handleAddSubmit = async () => {
    setShowAddModal(false);
    await fetchDesignations();
  };

  const handleDeleteClick = (designation) => {
    setDesignationToDelete(designation);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!designationToDelete?.id) return;

    try {
      await axios.delete(`${dev_url}api/auth/company/deletePosition`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: designationToDelete.id,
        },
      });
      setShowDeletePopup(false);
      await fetchDesignations(); 
    } catch (error) {
      console.error("Failed to delete designation:", error);
    }
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Designations:
        </h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 shadow-md text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={handleAddClick}
        >
          + Add Designation
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-center p-4">Loading...</p>
        ) : designations.length === 0 ? (
          <p className="text-gray-500 text-center p-4">
            No designations found.
          </p>
        ) : (
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="p-2 md:p-3">Designation Name</th>
                <th className="p-2 md:p-3">Designation Code</th>
                <th className="p-2 md:p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations
                .filter(
                  (d) =>
                    d &&
                    d.position_name &&
                    d.position_code &&
                    typeof d === "object"
                )
                .map((designation) => (
                  <tr key={designation.id} className="hover:bg-gray-100">
                    <td
                      className="p-2 md:p-3 text-yellow-600 cursor-pointer underline underline-offset-3"
                      onClick={() => {
                        setSelectedDesignation(designation);
                        setShowAddModal(true);
                      }}
                    >
                      {designation.position_name}
                    </td>
                    <td className="p-2 md:p-3">{designation.position_code}</td>
                    <td className="p-2 md:p-3 flex space-x-2">
                      <button
                        className="text-gray-500 hover:text-gray-950  cursor-pointer"
                        onClick={() => {
                          setSelectedDesignation(designation);
                          setShowAddModal(true);
                        }}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-950 cursor-pointer"
                        onClick={() => handleDeleteClick(designation)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Add/Edit Popup */}
      <AddDesignationPopup
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        initialData={selectedDesignation}
      />

      {/* Delete Popup */}
      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleConfirmDelete}
        data={designationToDelete}
        message={`Are you sure you want to delete "${designationToDelete?.position_name}"?`}
      />
    </div>
  );
};

export default Designation;
