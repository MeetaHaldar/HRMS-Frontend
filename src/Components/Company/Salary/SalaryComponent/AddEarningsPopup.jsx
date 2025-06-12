import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import dev_url from "../../../../config";

const AddEarningsPopup = ({ isOpen, onClose, onSuccess }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [earningsTypes, setEarningsTypes] = useState([]);
  const [formData, setFormData] = useState({
    nameInPayslip: "",
    calculationType: "",
    amount: "",
    isActive: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setSelectedType(null);
    setFormData({
      nameInPayslip: "",
      calculationType: "",
      amount: "",
      isActive: false,
    });
    setErrorMsg("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedType) {
      setErrorMsg("Please select an Earnings Type");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const body = {
        earning_type_id: selectedType.value, // assuming it's id or code
        earning_code: selectedType.value,
        earning_name: selectedType.label,
        name_in_payslip: formData.nameInPayslip,
        pay_type: "fixed",
        calculation_type: formData.calculationType,
        amount: Number(formData.amount),
        is_active: formData.isActive,
      };

      const response = await axios.post(
        `${dev_url}salary/addearningcomponent`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Saved:", response.data);
      onSuccess?.(); // Optional success callback
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrorMsg(msg);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    const fetchEarningsTypes = async () => {
      try {
        const companyId = JSON.parse(localStorage.getItem("user"))?.companyId;
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${dev_url}salary/?company_id=${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formatted = (response.data || []).map((item) => ({
          value: item.id,
          label: item.allowance_name,
        }));

        setEarningsTypes(formatted);
      } catch (error) {
        console.error("Error fetching earnings types:", error);
      }
    };

    fetchEarningsTypes();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Earnings</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-black text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Earnings Type */}
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
                  color: "black",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black",
                }),
              }}
            />
          </div>

          {/* Name in Payslip */}
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

          {/* Calculation Type */}
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

          {/* Amount */}
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

          {/* Is Active Checkbox */}
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

          {/* Info */}
          <p className="text-gray-500 text-xs mb-4">
            Note: Once you associate this component with an employee, you will
            only be able to edit the Name and Amount/Percentage. Changes apply
            only to new employees.
          </p>

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-[#FFD85F] hover:bg-yellow-500 px-4 py-2 rounded-full w-1/2 cursor-pointer"
            >
              + Add Earnings
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="border px-4 py-2 rounded-full text-gray-700 w-1/2 cursor-pointer"
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
