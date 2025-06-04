import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import DeleteConfirmationPopup from "../../SuperAdmin/DeleteConfirmationPopup";

const LeaveType = () => {
  const [leaveName, setLeaveName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const token = localStorage.getItem("token");

  const showTempNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2500);
  };

  const resetForm = () => {
    setLeaveName("");
    setLeaveType("");
    setDays("");
    setIsEditing(false);
    setEditingIndex(null);
    setEditingId(null);
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(
        "https://www.attend-pay.com/api/auth/company/getallLeaveCategory",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const list = response.data?.data || [];
      const mappedLeaves = list.map((item) => ({
        id: item.id,
        leaveName: item.category_name,
        leaveType: item.is_paid ? "Paid" : "Unpaid",
        days: item.days || "",
      }));
      setLeaves(mappedLeaves);
    } catch (error) {
      console.error("Failed to fetch leave types:", error);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const handleAddOrUpdateLeave = async () => {
    if (!leaveName.trim() || !leaveType || !days) {
      showTempNotification("error", "All fields are required.");
      return;
    }

    const leavePayload = {
      category_name: leaveName,
      is_paid: leaveType === "Paid" ? 1 : 0,
      days: Number(days),
    };

    if (isEditing) {
      try {
        const response = await axios.put(
          `https://www.attend-pay.com/api/auth/company/updateLeaveCategory?id=${editingId}`,
          leavePayload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const updatedLeaves = [...leaves];
        updatedLeaves[editingIndex] = {
          id: editingId,
          leaveName,
          leaveType,
          days,
        };
        setLeaves(updatedLeaves);
        showTempNotification("success", "Leave type updated successfully.");
        resetForm();
      } catch (error) {
        console.error("Error updating leave type:", error);
        if (error.response?.status === 409 && error.response?.data?.msg) {
          showTempNotification("error", error.response.data.msg);
        } else {
          showTempNotification("error", "Failed to update leave type.");
        }
      }
    } else {
      try {
        const response = await axios.post(
          "https://www.attend-pay.com/api/auth/company/addLeaveCategory",
          leavePayload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const newId = response.data?.data?.id;
        const msg = response.data?.message || "Leave type added!";
        setLeaves([
          ...leaves,
          {
            id: newId,
            leaveName,
            leaveType,
            days,
          },
        ]);
        showTempNotification("success", msg);
        resetForm();
      } catch (error) {
        console.error("Error adding leave type:", error);
        if (error.response?.status === 409 && error.response?.data?.msg) {
          showTempNotification("error", error.response.data.msg);
        } else {
          showTempNotification("error", "Failed to add leave type.");
        }
      }
    }
  };

  const handleEdit = (index) => {
    const leaveToEdit = leaves[index];
    setLeaveName(leaveToEdit.leaveName);
    setLeaveType(leaveToEdit.leaveType);
    setDays(leaveToEdit.days);
    setIsEditing(true);
    setEditingIndex(index);
    setEditingId(leaveToEdit.id);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(
        `https://www.attend-pay.com/api/auth/company/deleteLeaveCategory?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLeaves(leaves.filter((item) => item.id !== id));
      showTempNotification("success", "Leave type deleted successfully.");
    } catch (error) {
      console.error("Error deleting leave type:", error);
      showTempNotification("error", "Failed to delete leave type.");
    } finally {
      setShowDeletePopup(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteId(null);
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
          <p
            className={`mt-4 text-sm font-medium ${
              notificationType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {notificationMessage}
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
                  <tr key={leave.id}>
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
                        onClick={() => handleDeleteClick(leave.id)}
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
        onConfirm={() => confirmDelete(deleteId)}
        data={deleteId}
        message="Are you sure you want to delete this leave type?"
      />
    </>
  );
};

export default LeaveType;
