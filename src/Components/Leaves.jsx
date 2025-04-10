import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const Leaves = () => {
  const [leaveData, setLeaveData] = useState({
    granted: 0,
    taken: 0,
    balance: 0,
    pending: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`/api/leaves?month=${selectedMonth}`); // pass selected month
        const data = await response.json();
        setLeaveData({
          granted: data.granted || 0,
          taken: data.taken || 0,
          balance: data.balance || 0,
          pending: data.pending || 0,
        });
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaveData();
  }, [selectedMonth]);

  const statCard = (title, value) => (
    <div className="bg-[#f3f3f3] px-6 py-4 rounded-xl relative shadow-sm flex flex-col justify-between">
      <div className="absolute top-2 right-2 text-gray-400">
        <FiExternalLink />
      </div>
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      <p className="text-gray-600 font-medium text-xl">
        {String(value).padStart(2, "0")}
      </p>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-500">Leaves:</h2>
        <button className="bg-yellow-400 text-gray-800 font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-300 transition">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-gray-600">
        {statCard("Leaves Granted", leaveData.granted)}
        {statCard("Leaves Taken", leaveData.taken)}
        {statCard("Leaves Balance", leaveData.balance)}
        {statCard("Pending Leaves", leaveData.pending)}
      </div>
    </div>
  );
};

export default Leaves;
