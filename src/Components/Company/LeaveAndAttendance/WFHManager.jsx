import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

const WFHManager = () => {
  const [totalDays, setTotalDays] = useState(2);
  const [inputDays, setInputDays] = useState("");
  const [carryForward, setCarryForward] = useState("Yes");

  const [savedData, setSavedData] = useState({
    totalDays: 2,
    carryForward: "Yes",
  });

  const [notification, setNotification] = useState(false);

  const handleSave = () => {
    const daysToAdd = parseInt(inputDays);
    if (!isNaN(daysToAdd) && daysToAdd >= 0) {
      const newTotal = savedData.totalDays + daysToAdd;
      setTotalDays(newTotal);
      setSavedData({ totalDays: newTotal, carryForward });
      setInputDays("");
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
    }
  };

  const handleCancel = () => {
    setTotalDays(savedData.totalDays);
    setCarryForward(savedData.carryForward);
    setInputDays("");
  };

  const handleReset = () => {
    setTotalDays(2);
    setSavedData((prev) => ({ ...prev, totalDays: 2 }));
  };

  return (
    <div className="p-6  max-w-md relative">
      <h2 className="text-lg md:text-lg text-gray-500 font-semibold mb-6">
        Add More Days To WFH
      </h2>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600 mb-3">
          Total number of Days:{" "}
          <span className="text-lg font-bold">0{totalDays}</span>
        </p>
        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-yellow-500 transition"
          title="Reset to default"
        >
          <FiRefreshCw size={18} />
        </button>
      </div>

      <input
        type="number"
        min="0"
        placeholder="+ Add More work from Home"
        value={inputDays}
        onChange={(e) =>
          setInputDays(Math.max(1, parseInt(e.target.value) || 1))
        }
        className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 mb-4"
      />

      <div className="flex items-center mb-6">
        <p className="text-sm font-medium mr-4 whitespace-nowrap text-gray-600">
          Carryforward WFH:
        </p>
        <label className="flex items-center space-x-1 mr-6">
          <input
            type="radio"
            name="carryForward"
            value="Yes"
            checked={carryForward === "Yes"}
            onChange={() => setCarryForward("Yes")}
            className="appearance-none h-3 w-3 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full focus:outline-none"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            name="carryForward"
            value="No"
            checked={carryForward === "No"}
            onChange={() => setCarryForward("No")}
            className="appearance-none h-3 w-3 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full focus:outline-none"
          />
          <span>No</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={!inputDays}
          className={`px-6 py-1 bg-[#FFD85F] text-gray-800 rounded-full shadow w-1/3 transition 
    ${!inputDays ? "opacity-90 cursor-not-allowed" : "cursor-pointer"}`}
        >
          Save
        </button>

        <button
          onClick={handleCancel}
          className="border border-gray-400 text-gray-700 px-6 py-1 rounded-full hover:bg-gray-100 cursor-pointer transition w-1/3"
        >
          Cancel
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm">
          WFH days added successfully!
        </div>
      )}
    </div>
  );
};

export default WFHManager;
