import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationPopup from "../../SuperAdmin/DeleteConfirmationPopup";

const LeaveType = () => {
  const [leaveName, setLeaveName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const resetForm = () => {
    setLeaveName("");
    setLeaveType("");
    setDays("");
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleAddOrUpdateLeave = () => {
    if (leaveName.trim() && leaveType && days) {
      const newLeave = { leaveName, leaveType, days };
      if (isEditing) {
        const updatedLeaves = [...leaves];
        updatedLeaves[editingIndex] = newLeave;
        setLeaves(updatedLeaves);
      } else {
        setLeaves([...leaves, newLeave]);
      }
      resetForm();
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleEdit = (index) => {
    const leaveToEdit = leaves[index];
    setLeaveName(leaveToEdit.leaveName);
    setLeaveType(leaveToEdit.leaveType);
    setDays(leaveToEdit.days);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeletePopup(true);
  };

  const confirmDelete = (index) => {
    const updatedLeaves = leaves.filter((_, i) => i !== index);
    setLeaves(updatedLeaves);
    if (isEditing && editingIndex === index) {
      resetForm();
    }
    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteIndex(null);
  };

  const isFormValid = leaveName.trim() && leaveType && days;

  return (
    <>
      <div className="p-6 max-w-md">
        <p className="text-lg md:text-lg font-semibold text-gray-500 mb-6">
          {isEditing ? "Edit Leave Type" : "Add New Leave Type"}
        </p>

        <input
          type="text"
          placeholder="Leave Name"
          value={leaveName}
          onChange={(e) => setLeaveName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 placeholder-italic"
        />

        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-3 text-gray-600 placeholder-italic"
        >
          <option value="" disabled>
            Leave Type
          </option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>

        <input
          type="number"
          placeholder="Total number of Days"
          min={0}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-6 placeholder-italic"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleAddOrUpdateLeave}
            className={`bg-[#FFD85F] text-gray-800 font-semibold px-6 py-1 rounded-full shadow-md  ${
              isFormValid
                ? " hover:bg-yellow-300 cursor-pointer"
                : "cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {isEditing ? "Save Changes" : "+ Add Leave"}
          </button>
          <button
            onClick={resetForm}
            className="border border-gray-300 text-gray-700 px-6 py-1 rounded-full cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {showNotification && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            Leave type {isEditing ? "updated" : "added"} successfully!
          </p>
        )}
      </div>

      {leaves.length > 0 && (
        <div className="mt-10 w-2/3 p-6">
          <p className="text-lg md:text-lg font-semibold text-gray-500 mb-6">
            Leaves:
          </p>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="text-center w-full">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 font-semibold">Leave Name</th>
                  <th className="px-4 py-2 font-semibold">Leave Type</th>
                  <th className="px-4 py-2 font-semibold">Total Days</th>
                  <th className="px-4 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{leave.leaveName}</td>
                    <td className="px-4 py-2">{leave.leaveType}</td>
                    <td className="px-4 py-2">{leave.days}</td>
                    <td className="px-4 py-2 flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-gray-500 hover:text-gray-800 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(index)}
                        className="text-gray-500 hover:text-gray-800 cursor-pointer w-1/2"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        data={deleteIndex}
        message="Are you sure you want to delete this leave type?"
      />
    </>
  );
};

export default LeaveType;
