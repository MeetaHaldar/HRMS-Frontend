import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import dev_url from "../../../../config";

const AddDeductionPopup = ({ isOpen, onClose, onSuccess, item = null }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [deductionTypes, setDeductionTypes] = useState([]);
  const [formData, setFormData] = useState({
    nameInPayslip: "",
    calculationType: "",
    deductionFrequency: "",
    amount: "",
    isActive: false,
    show_in_payslip: false,
    pay_type: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setSelectedType(null);
    setFormData({
      nameInPayslip: "",
      calculationType: "",
      amount: "",
      isActive: 0,
    });
    setErrorMsg("");
  };

  useEffect(() => {
    const fetchDeductionTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${dev_url}salary/getdeductiontype`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formatted = (response.data.data || []).map((item) => ({
          value: item.id,
          label: item.deduction_name,
        }));

        setDeductionTypes(formatted);
      } catch (error) {
        console.error("Error fetching deduction types:", error);
      }
    };

    fetchDeductionTypes();
  }, []);

  useEffect(() => {
    if (item) {
      setSelectedType({
        value: item.deduction_type_id || item.deduction_code,
        label: item.deduction_name,
      });

      setFormData({
        nameInPayslip: item.name_in_payslip || "",
        calculationType: item.calculation_type || "",
        amount: item.amount || "",
        isActive: item.is_active || false,
        show_in_payslip: item.show_in_payslip || false,
        deductionFrequency: item.deduction_frequency || "",
        pay_type: item.pay_type || "",
      });
    } else {
      resetForm();
    }
  }, [item]);

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
      setErrorMsg("Please select a Deduction Type");
      return;
    }

    const token = localStorage.getItem("token");

    const body = {
      id: item ? item.id : null,
      deduction_type_id: selectedType.value,
      // deduction_code: selectedType.value,
      deduction_type_name: selectedType.label,
      deduction_name: selectedType.label,
      name_in_payslip: formData.nameInPayslip,
      deduction_frequency: formData.deductionFrequency,
      pay_type: formData.pay_type,
      calculation_type: formData.calculationType,
      amount: Number(formData.amount),
      show_in_payslip: formData.show_in_payslip,
      is_active: formData.isActive,
    };

    try {
      const url = item
        ? `${dev_url}salary/updatedeductionComponent`
        : `${dev_url}salary/adddeductionComponent`;

      const method = item ? "put" : "post";

      const response = await axios[method](url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(item ? "Updated:" : "Saved:", response.data);
      onSuccess?.();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {item ? "Edit Deduction" : "Add Deduction"}
          </h2>
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
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Deduction Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={deductionTypes}
              placeholder="Select deduction type..."
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
                  className="accent-yellow-500"
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
                  className="accent-yellow-500"
                />
                <span className="ml-2">Percentage of Basic</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              Deduction Frequency <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deductionFrequency"
                  value="one-time"
                  checked={formData.deductionFrequency === "one-time"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                  required
                />
                <span className="ml-2">One-time</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deductionFrequency"
                  value="recurring"
                  checked={formData.deductionFrequency === "recurring"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span className="ml-2">Recurring</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              Pay Type <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pay_type"
                  value="fixed"
                  checked={formData.pay_type === "fixed"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                  required
                />
                <span className="ml-2">Fixed</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pay_type"
                  value="variable"
                  checked={formData.pay_type === "variable"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span className="ml-2">Variable</span>
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
                className="accent-yellow-500"
              />

              <span className="ml-2">Mark this as Active</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="shows_in_payslip"
                className="accent-yellow-500"
                checked={formData.show_in_payslip}
                onChange={handleChange}
              />
              <span className="ml-2">Show in Payslip</span>
            </label>
          </div>

          <p className="text-gray-500 text-xs mb-4">
            Note: Once you associate this component with an employee, you will
            only be able to edit the Name and Amount/Percentage. Changes apply
            only to new employees.
          </p>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-[#FFD85F] hover:bg-yellow-500 px-4 py-2 rounded-full w-1/2 cursor-pointer"
            >
              {item ? "Save Changes" : "+ Add Deduction"}
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

export default AddDeductionPopup;
