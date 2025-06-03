import React, { useState } from "react";
import ApplyLeavePopup from "./ApplyLeavePopup";
import LeaveHistory from "./LeaveHistory";
import LeaveStats from "./LeaveStats";

const Leaves = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const handleApplyLeave = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://www.attend-pay.com/attendence/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to apply leave");

      console.log("Leave applied successfully!");
    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-500">Leaves:</h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#FFD85F] text-gray-800 font-semibold px-5 py-2 shadow-md rounded-full hover:bg-yellow-500 transition cursor-pointer"
          >
            Apply Leaves
          </button>
        </div>

        {/* Leave Stats Component */}
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
        />
      </div>

      <LeaveHistory />
    </>
  );
};

export default Leaves;
