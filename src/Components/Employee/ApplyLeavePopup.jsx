import React, { useState, useRef } from "react";

const ApplyLeavePopup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    leaveType: "Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [error, setError] = useState("");

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < today) {
      setError("Start date must be today or later.");
      return;
    }

    if (start > end) {
      setError("Start date cannot be after end date.");
      return;
    }

    onSubmit(formData);
    setFormData({ leaveType: "Leave", startDate: "", endDate: "", reason: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-500 font-semibold">
            Apply for {formData.leaveType}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        <hr className="mb-3 border-gray-300 w-full m-auto" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Leave Type<span className="text-red-500">*</span>
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Leave1">Leave</option>
              <option value="Leave2">Leave2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              ref={startDateRef}
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              onFocus={() => startDateRef.current?.showPicker()}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              ref={endDateRef}
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              onFocus={() => endDateRef.current?.showPicker()}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Reason<span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              placeholder="Type your reason..."
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 min-h-[80px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-[#FFD85F] text-gray-500 font-medium py-2 rounded-xl transition cursor-pointer shadow-md"
          >
            Apply {formData.leaveType}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeavePopup;
