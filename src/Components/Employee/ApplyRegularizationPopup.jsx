import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const ApplyRegularizationPopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");

  // Dummy date options for now — replace with API-fetched options later
  const dateOptions = [
    "10/06/2025",
    "09/06/2025",
    "08/06/2025",
    "07/06/2025",
    "06/06/2025",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    onSubmit({ date: selectedDate });
    setSelectedDate("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Apply for Regularization
        </h2>

        <hr className="mb-5 border-gray-300" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Date<span className="text-red-500">*</span>
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select a date</option>
              {dateOptions.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD85F] hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-xl transition cursor-pointer"
          >
            Apply Regularization
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyRegularizationPopup;
