import React, { useState, useEffect } from "react";
import Select from "react-select";

const AddBenefitPopup = ({ isOpen, onClose, onSubmit, item }) => {
  const [benefitPlanOptions, setBenefitPlanOptions] = useState([]);
  const [investmentOptions, setInvestmentOptions] = useState([]);
  const [formData, setFormData] = useState({
    benefitPlan: "",
    investment: "",
    nameInPayslip: "",
    includeContribution: false,
    isSuperFund: false,
    isProRata: false,
    isActive: false,
  });

  useEffect(() => {
    // Simulating backend fetch for benefit and investment options
    setBenefitPlanOptions([
      { id: 1, label: "Benefit Plan A" },
      { id: 2, label: "Benefit Plan B" },
    ]);

    setInvestmentOptions([
      { id: 1, label: "Investment Option X" },
      { id: 2, label: "Investment Option Y" },
    ]);
  }, []);

  useEffect(() => {
    if (item) {
      // Pre-fill form data when editing an existing item
      setFormData({
        benefitPlan: item.benefitPlan || "",
        investment: item.investment || "",
        nameInPayslip: item.nameInPayslip || "",
        includeContribution: item.includeContribution || false,
        isSuperFund: item.isSuperFund || false,
        isProRata: item.isProRata || false,
        isActive: item.isActive || false,
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const customStyles = {
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
    dropdownIndicator: (base) => ({
      ...base,
      color: "black", // Set darker color for the dropdown arrow
      "&:hover": {
        color: "black", // Slightly darker on hover
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "#8A8A8A", // Color of the separator line (if visible)
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {item ? `Edit ${item.name}` : "Add Benefit"}
          </h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Benefit Plan Dropdown using react-select */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Benefits Plan <span className="text-red-500">*</span>
            </label>
            <Select
              name="benefitPlan"
              value={benefitPlanOptions.find(option => option.label === formData.benefitPlan)}
              onChange={(selectedOption) => handleSelectChange("benefitPlan", selectedOption)}
              options={benefitPlanOptions}
              styles={customStyles}
              className="w-full"
              placeholder="Select Benefit Plan...."
            />
          </div>

          {/* Investment Dropdown using react-select */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Associate this benefit with <span className="text-red-500">*</span>
            </label>
            <Select
              name="investment"
              value={investmentOptions.find(option => option.label === formData.investment)}
              onChange={(selectedOption) => handleSelectChange("investment", selectedOption)}
              options={investmentOptions}
              styles={customStyles}
              className="w-full"
              placeholder="Select an investment...."
            />
          </div>

          {/* Name in Payslip */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name in Payslip <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nameInPayslip"
              value={formData.nameInPayslip}
              onChange={handleChange}
              placeholder="Name in Payslip..."
              className="w-full rounded-lg px-3 py-2 bg-[#EAEAEA] focus:outline-none"
            />
          </div>

          {/* Checkbox Inputs */}
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="includeContribution"
                  checked={formData.includeContribution}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Include employer's contribution in employee’s salary structure.</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isSuperFund"
                  checked={formData.isSuperFund}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Consider this a superannuation fund</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isProRata"
                  checked={formData.isProRata}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>
                  Calculate on pro-rata basis <br />
                  <small className="text-gray-400 block">
                    Pay will be adjusted based on employee working days.
                  </small>
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Mark this as Active</span>
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mt-2">
            <strong>Note:</strong> Once you associate this deduction with an employee, you will only be able to edit the Name in Payslip. The change will be reflected in both new and existing employees.
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#FFD85F] hover:bg-yellow-600 text-gray-700 font-semibold py-2 rounded-full mr-2"
            >
              {item ? "Save Changes" : "+ Add Benefit"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBenefitPopup;
