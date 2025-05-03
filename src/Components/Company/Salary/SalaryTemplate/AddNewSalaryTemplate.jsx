import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalaryComponentDropdown from "./SalaryComponentDropdown";

const AddNewSalaryTemplate = () => {
  const [salaryComponents, setSalaryComponents] = useState([]);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/companyAdmin/salaryTemplate");
  };

  const handleAddComponent = (category, item) => {
    const newComponent = {
      name: item,
      description: `(${category})`,
      monthly: "₹ 0.00",
      annual: "₹ 0.00",
    };
    setSalaryComponents((prev) => [...prev, newComponent]);
  };

  const handleRemoveComponent = (index) => {
    setSalaryComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const selectedComponents = salaryComponents.map((c) => c.name);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Add New Salary Template:
        </h2>

        <div className="relative text-left">
          <SalaryComponentDropdown
            onAddComponent={handleAddComponent}
            selectedComponents={selectedComponents}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Earnings
          </label>
          <input
            type="text"
            placeholder="Total Earnings"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descriptions
          </label>
          <input
            type="text"
            placeholder="Max 500 characters..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <div className="flex flex-row mb-2">
          <label className="text-gray-700 mr-2 basis-1/3">Annual CTC</label>
          <div className="flex items-center basis-2/3">
            <input
              type="text"
              value="₹ 0.00"
              className="p-2 w-40 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              readOnly
            />
            <span className="ml-2 text-gray-600">per year</span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-2">Salary Components</th>
              <th className="py-2">Calculation Type</th>
              <th className="py-2">Monthly Amt.</th>
              <th className="py-2">Annual Amt.</th>
              <th className="py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {salaryComponents.length > 0 && (
              <tr>
                <td className="py-2 font-medium">Earnings</td>
                <td colSpan="4"></td>
              </tr>
            )}

            {salaryComponents.map((component, index) => (
              <tr key={index}>
                <td className="py-2">
                  {component.name}
                  <div className="text-xs text-gray-500">
                    {component.description}
                  </div>
                </td>
                <td className="py-2 text-gray-500 italic">(Custom)</td>
                <td className="py-2">₹ 0.00</td>
                <td className="py-2">₹ 0.00</td>
                <td className="py-2 text-center">
                  <span
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={() => handleRemoveComponent(index)}
                  >
                    x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="border-t border-gray-300">
            <tr>
              <td className="py-2 font-medium">Cost to Company</td>
              <td></td>
              <td className="py-2 font-semibold">₹ 0.00</td>
              <td className="py-2 font-semibold text-left">
                <span className="text-xs text-gray-400 block">Total Pay</span>
                <span>₹ 0.00</span>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-center p-4">
        <button className="flex items-center justify-center bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer">
          Save Template
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center justify-center ml-4 w-1/9 border border-gray-300 text-gray-900 px-5 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewSalaryTemplate;
