import React, { useEffect, useState } from "react";
import ApplyWFHPopup from "./ApplyWFHPopup";

const WFH = () => {
  const [wfhData, setWFHData] = useState({
    granted: 0,
    taken: 0,
    balance: 0,
    pending: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchWFHData = async () => {
      try {
        const response = await fetch(`/api/wfh?month=${selectedMonth}`);
        const data = await response.json();
        setWFHData({
          granted: data.granted || 0,
          taken: data.taken || 0,
          balance: data.balance || 0,
          pending: data.pending || 0,
        });
      } catch (error) {
        console.error("Error fetching WFH data:", error);
      }
    };

    fetchWFHData();
  }, [selectedMonth]);

  const handleApplyWFH = async (formData) => {
    try {
      const response = await fetch("/api/wfh/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to apply for WFH");

      // Optionally refresh data
      const updatedData = await fetch(`/api/wfh?month=${selectedMonth}`).then(
        (res) => res.json()
      );
      setWFHData({
        granted: updatedData.granted || 0,
        taken: updatedData.taken || 0,
        balance: updatedData.balance || 0,
        pending: updatedData.pending || 0,
      });

      console.log("WFH applied successfully!");
    } catch (error) {
      console.error("Error applying for WFH:", error);
    }
  };

  const statCard = (title, value) => (
    <div className="bg-[#f3f3f3] px-6 py-4 rounded-xl relative shadow-sm flex flex-col justify-between">
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      <p className="text-gray-600 font-medium text-xl">
        {String(value).padStart(2, "0")}
      </p>
    </div>
  );

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-500">
            Work From Home:
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#FFD85F] text-gray-800 font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-300 transition"
          >
            Apply WFH
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-gray-600">
          {statCard("WFH Granted", wfhData.granted)}
          {statCard("WFH Taken", wfhData.taken)}
          {statCard("WFH Balance", wfhData.balance)}
          {statCard("Pending WFH", wfhData.pending)}
        </div>

        {/* Popup */}
        <ApplyWFHPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleApplyWFH}
        />
      </div>
    </>
  );
};

export default WFH;
