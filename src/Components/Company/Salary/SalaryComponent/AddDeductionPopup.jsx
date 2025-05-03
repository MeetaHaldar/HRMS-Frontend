import React, { useState } from "react";

const AddDeductionPopup = ({ isOpen, onClose, onSubmit }) => {
  const [nameInPayslip, setNameInPayslip] = useState("");
  const [frequency, setFrequency] = useState("recurring");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nameInPayslip,
      frequency,
      isActive,
    };
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Deductions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none  cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name in Payslip <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name in Payslip..."
              value={nameInPayslip}
              onChange={(e) => setNameInPayslip(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select the deduction frequency{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="frequency"
                  value="one-time"
                  checked={frequency === "one-time"}
                  onChange={() => setFrequency("one-time")}
                  className="accent-yellow-500"
                />
                <span>One-time deduction</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="frequency"
                  value="recurring"
                  checked={frequency === "recurring"}
                  onChange={() => setFrequency("recurring")}
                  className="accent-yellow-500"
                />
                <span>Recurring deduction for subsequent Payrolls</span>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-yellow-500"
            />
            <label htmlFor="isActive">Mark this as Active</label>
          </div>

          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
            <strong>Note:</strong> Once you associate this component with an
            employee, you will only be able to edit the Name and
            Amount/Percentage. Changes will apply only to new employees.
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 font-semibold py-2 px-6 rounded-full  cursor-pointer w-1/2 mr-2"
            >
              + Add Deductions
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-100  cursor-pointer w-1/2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeductionPopup;
