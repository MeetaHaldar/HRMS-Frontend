import { useState, useEffect } from "react";
import ApplyLeavePopup from "./ApplyLeavePopup";
import LeaveHistory from "./LeaveHistory";
import LeaveStats from "./LeaveStats";
import axios from "axios";
import dev_url from "../../config";

const Leaves = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [leaveCategories, setLeaveCategories] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [reloadHistory, setReloadHistory] = useState(false);

  // Fetch leave categories on mount
  useEffect(() => {
    const fetchLeaveCategories = async () => {
      try {
        const response = await axios.get(
          `${dev_url}api/auth/company/getallLeaveCategory`,
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
        `${dev_url}attendence/applyleave`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotification({
        message: response.data.message || "Leave applied successfully!",
        type: "success",
      });
      setReloadHistory((prev) => !prev); // Trigger reload

      setTimeout(() => setNotification({ message: "", type: "" }), 5000);
    } catch (error) {
      console.error("Error applying leave:", error);
      setNotification({
        message: error.response?.data?.message || "Failed to apply leave.",
        type: "error",
      });
      setTimeout(() => setNotification({ message: "", type: "" }), 5000);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {notification.message && (
            <div
              className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md z-50 ${
                notification.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {notification.message}
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

      <LeaveHistory
        selectedMonth={selectedMonth}
        token={token}
        reloadTrigger={reloadHistory}
      />
    </>
  );
};

export default Leaves;
