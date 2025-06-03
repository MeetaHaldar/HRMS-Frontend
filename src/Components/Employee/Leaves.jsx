import React, { useState, useEffect } from "react";
import ApplyLeavePopup from "./ApplyLeavePopup";
import LeaveHistory from "./LeaveHistory";
import LeaveStats from "./LeaveStats";
import axios from "axios";

const Leaves = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [leaveCategories, setLeaveCategories] = useState([]);
  const [notification, setNotification] = useState("");

  // Fetch leave categories on mount
  useEffect(() => {
    const fetchLeaveCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://www.attend-pay.com/api/auth/company/getallLeaveCategory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLeaveCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch leave categories:", error);
      }
    };
    fetchLeaveCategories();
  }, []);

  const handleApplyLeave = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://www.attend-pay.com/attendence/applyleave",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotification(response.data.message || "Leave applied successfully!");

      setTimeout(() => setNotification(""), 5000);
    } catch (error) {
      console.error("Error applying leave:", error);
      setNotification("Failed to apply leave. Please try again.");
      setTimeout(() => setNotification(""), 5000);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {notification && (
            <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-md z-50">
              {notification}
            </div>
          )}

          <h2 className="text-lg font-semibold text-gray-500">Leaves:</h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#FFD85F] text-gray-800 font-semibold px-5 py-2 shadow-md rounded-full hover:bg-yellow-500 transition cursor-pointer"
          >
            Apply Leaves
          </button>
        </div>

        <div className="flex items-center text-gray-600 font-medium mb-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none bg-transparent border-none text-gray-600 font-medium focus:outline-none cursor-pointer"
          />
        </div>
        <LeaveStats />

        <ApplyLeavePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleApplyLeave}
          leaveCategories={leaveCategories}
        />
      </div>

      <LeaveHistory selectedMonth={selectedMonth} />
    </>
  );
};

export default Leaves;
