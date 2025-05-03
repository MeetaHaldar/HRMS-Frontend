import React, { useState } from "react";
import Select from "react-select";

const AddEarningsPopup = ({ isOpen, onClose, onSubmit }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    earningsName: "",
    nameInPayslip: "",
    calculationType: "",
    amount: "",
    isActive: false,
  });

  const earningsTypes = [
    { value: "bonus", label: "Bonus" },
    { value: "allowance", label: "Allowance" },
    { value: "overtime", label: "Overtime" },
  ];

  const resetForm = () => {
    setSelectedType(null);
    setFormData({
      earningsName: "",
      nameInPayslip: "",
      calculationType: "",
      amount: "",
      isActive: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) return alert("Please select an Earnings Type");
    onSubmit({ ...formData, earningsType: selectedType.value });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Earnings</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-black text-xl  cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Earnings Type Dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Earnings Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={earningsTypes}
              placeholder="Select earnings type..."
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#EAEAEA",
                  boxShadow: state.isFocused ? "0 0 0 2px #FFD85F" : "none",
                  "&:hover": { borderColor: "#FFD85F" },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#FFD85F" : "white",
                  color: "black", // Ensure text is always visible
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black", // Ensure selected text is black
                }),
              }}
            />
          </div>

          {selectedType && (
            <>
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Earnings Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="earningsName"
                  value={formData.earningsName}
                  onChange={handleChange}
                  placeholder="Enter earnings name..."
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Name in Payslip <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nameInPayslip"
                  value={formData.nameInPayslip}
                  onChange={handleChange}
                  placeholder="Name in Payslip..."
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Calculation Type <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="calculationType"
                      value="flat"
                      checked={formData.calculationType === "flat"}
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2">Flat Amount</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="calculationType"
                      value="percentage"
                      checked={formData.calculationType === "percentage"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Percentage of Basic</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Enter Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount here..."
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Mark this as Active</span>
                </label>
              </div>
            </>
          )}

          <p className="text-gray-500 text-xs mb-4">
            Note: Once you associate this component with an employee, you will
            only be able to edit the Name and Amount/Percentage. Changes apply
            only to new employees.
          </p>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-[#FFD85F] hover:bg-yellow-500 px-4 py-2 rounded-full w-1/2  cursor-pointer"
            >
              + Add Earnings
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="border px-4 py-2 rounded-full text-gray-700 w-1/2  cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEarningsPopup;
