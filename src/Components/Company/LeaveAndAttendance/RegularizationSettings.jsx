import React, { useState, useEffect } from "react";
import axios from "axios";

const RegularizationSettings = () => {
  const [inputValue, setInputValue] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const company_id = JSON.parse(localStorage.getItem("user"))?.companyId;

  const fetchAllowLate = async () => {
    try {
      const res = await axios.get(
        `https://www.attend-pay.com/api/auth/company/getTimeInterval?company_id=${company_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allowLate = res?.data?.data?.allow_late;
      if (allowLate !== undefined) {
        setInputValue(allowLate.toString());
        setSavedValue(allowLate.toString());
      }
    } catch (err) {
      setError("Failed to load data. Please try again.");
    }
  };

  useEffect(() => {
    if (token && company_id) {
      fetchAllowLate();
    } else {
      setError("Missing token or company ID.");
    }
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(
        "https://www.attend-pay.com/api/auth/company/updateLateAllowance",
        {
          company_id,
          allow_late: parseInt(inputValue, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowNotification(true);
      setSavedValue(inputValue);
      setTimeout(() => setShowNotification(false), 3000);
      fetchAllowLate();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save data. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setInputValue(savedValue);
    setError("");
  };

  return (
    <div className="p-6 rounded-md max-w-md relative">
      <h2 className="text-lg text-gray-500 font-semibold mb-2">
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
        onChange={(e) => {
          setInputValue(e.target.value);
          setError("");
        }}
        className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 placeholder-italic mb-6"
      />

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={inputValue === savedValue || inputValue === ""}
          className={`px-6 py-1 bg-[#FFD85F] text-gray-800 hover:bg-yellow-500 rounded-full shadow-md w-1/3 ${
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

      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm">
          Saved successfully!
        </div>
      )}
    </div>
  );
};

export default RegularizationSettings;
