import React, { useState, useEffect } from "react";

const RegularizationSettings = () => {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSave = () => {
    setSavedValue(inputValue);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCancel = () => {
    setInputValue(savedValue);
  };

  return (
    <div className="p-6 rounded-md max-w-md relative">
      <h2 className="text-lg text-gray-500 font-semibold mb-6">
        Regularizations Settings:
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Restrict the number of Regularization days an Employee can make in a
        month.
      </p>

      <input
        type="number"
        min={0}
        placeholder="Number of Monthly Regularizations allowed"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 placeholder-italic mb-6"
      />

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={inputValue === savedValue || inputValue === ""}
          className={`px-6 py-1 bg-[#FFD85F] text-gray-800 hover:bg-yellow-500  rounded-full shadow-md w-1/3  
            ${
              inputValue === savedValue || inputValue === ""
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="border border-gray-400 text-gray-700 px-6 py-1 rounded-full hover:bg-gray-100 w-1/3 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm">
          Saved successfully!
        </div>
      )}
    </div>
  );
};

export default RegularizationSettings;
