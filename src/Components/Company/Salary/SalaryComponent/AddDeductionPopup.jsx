import React, { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../../config";

const AddDeductionPopup = ({ isOpen, onClose }) => {
  const initialFormState = {
    deduction_type_id: "",
    deduction_name: "",
    name_in_payslip: "",
    deduction_frequency: "recurring",
    pay_type: "fixed",
    calculation_type: "flat",
    amount: "",
    show_in_payslip: false,
    is_active: false,
  };

  const [deductionTypes, setDeductionTypes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchDeductionTypes();
    }
  }, [isOpen]);

  const fetchDeductionTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${dev_url}salary/getdeductiontype`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const options = res.data.data?.map((item) => ({
        id: item.id,
        label: item.deduction_name,
      }));
      setDeductionTypes(options);
    } catch (err) {
      console.error("Error fetching deduction types:", err);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setError("");
    onClose();
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
    setError("");

    try {
      const token = localStorage.getItem("token");
      const selectedType = deductionTypes.find(
        (type) => type.id.toString() === formData.deduction_type_id
      );

      if (!selectedType) {
        setError("Please select a valid deduction type.");
        return;
      }

      const payload = {
        deduction_type_id: Number(formData.deduction_type_id),
        deduction_name: formData.deduction_name,
        name_in_payslip: formData.name_in_payslip,
        deduction_frequency: formData.deduction_frequency,
        pay_type: formData.pay_type,
        calculation_type: formData.calculation_type,
        amount: Number(formData.amount),
        show_in_payslip: formData.show_in_payslip ? 1 : 0,
        is_active: formData.is_active ? 1 : 0,
      };

      await axios.post(`${dev_url}salary/adddeductionComponent`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resetForm();
    } catch (err) {
      setError("Failed to submit. Please check your inputs.");
      console.error("POST error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Deductions</h2>
          <button
            onClick={resetForm}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none  cursor-pointer"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-2 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deduction Type <span className="text-red-500">*</span>
            </label>
            <select
              name="deduction_type_id"
              value={formData.deduction_type_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Deduction Type</option>
              {deductionTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deduction Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="deduction_name"
              value={formData.deduction_name}
              onChange={handleChange}
              placeholder="Deduction Name..."
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name in Payslip <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name_in_payslip"
              value={formData.name_in_payslip}
              onChange={handleChange}
              placeholder="Name in Payslip..."
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deduction Frequency <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="deduction_frequency"
                  value="one-time"
                  checked={formData.deduction_frequency === "one-time"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>One-time</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="deduction_frequency"
                  value="recurring"
                  checked={formData.deduction_frequency === "recurring"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Recurring</span>
              </label>
            </div>
          </div>

          {/* Pay Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay Type <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="pay_type"
                  value="fixed"
                  checked={formData.pay_type === "fixed"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Fixed</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="pay_type"
                  value="variable"
                  checked={formData.pay_type === "variable"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Variable</span>
              </label>
            </div>
          </div>

          {/* Calculation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calculation Type <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="calculation_type"
                  value="flat"
                  checked={formData.calculation_type === "flat"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Flat</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="calculation_type"
                  value="percentage"
                  checked={formData.calculation_type === "percentage"}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                <span>Percentage</span>
              </label>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="show_in_payslip"
              name="show_in_payslip"
              checked={formData.show_in_payslip}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <label htmlFor="show_in_payslip">Show in Payslip</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <label htmlFor="is_active">Mark this as Active</label>
          </div>

          {/* Note */}
          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
            <strong>Note:</strong> Once you associate this component with an
            employee, you will only be able to edit the Name and
            Amount/Percentage. Changes will apply only to new employees.
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 font-semibold py-2 px-6 rounded-full  cursor-pointer w-1/2 mr-2"
            >
              + Add Deductions
            </button>
            <button
              type="button"
              onClick={resetForm}
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
