import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDesignationPopup from "./AddDesignationPopup";

const Designation = () => {
  const [designations, setDesignations] = useState([
    {
      id: 1,
      name: "IT - Developers",
      department: "IT/ Software",
    },
    {
      id: 2,
      name: "IT - Designers",
      department: "IT/ Software",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual API.
    fetch(`/api/designations?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setDesignations(data.designations);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching designations:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleAddClick = () => {
    setSelectedDesignation(null);
    setShowAddModal(true);
  };

  const handleAddSubmit = (newDesignation) => {
    const updatedList = selectedDesignation
      ? designations.map((d) =>
          d.id === selectedDesignation.id ? newDesignation : d
        )
      : [...designations, newDesignation];

    setDesignations(updatedList);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      setDesignations(designations.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">Designations:</h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 shadow-md text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={handleAddClick}
        >
          + Add Designation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">Designation Name</th>
              <th className="p-2 md:p-3">Total Employees</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {designations.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">No designations found</p>
                </td>
              </tr>
            ) : (
              designations.map((designation, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3 text-yellow-600 cursor-pointer hover:underline"
                      onClick={() => {
                        setSelectedDesignation(designation);
                        setShowAddModal(true);
                      }}>
                    {designation.name}
                  </td>
                  <td className="p-2 md:p-3">{designation.department}</td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => {
                        setSelectedDesignation(designation);
                        setShowAddModal(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleDelete(designation.id)}
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
      <div className="flex justify-between items-center mt-4 text-gray-600 text-xs md:text-sm">
        <button
          className="px-2 py-1 rounded-md cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>
        <div className="flex space-x-1">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-2 py-1 rounded-md cursor-pointer ${
                currentPage === idx + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className="px-2 py-1 rounded-md cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>

      {/* Add / Edit Popup */}
      <AddDesignationPopup
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
        initialData={selectedDesignation}
      />
    </div>
  );
};

export default Designation;
