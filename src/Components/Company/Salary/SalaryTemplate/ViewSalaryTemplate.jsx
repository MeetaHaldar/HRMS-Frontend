import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalaryComponentDropdown from "./SalaryComponentDropdown";

const ViewSalaryTemplate = () => {
  const navigate = useNavigate();

  const [salaryComponents, setSalaryComponents] = useState([
    {
      name: "Basic",
      description: "(50% of Annual CTC)",
      monthly: "₹ 4.00",
      annual: "₹ 48.00",
    },
    {
      name: "Fixed Allowance",
      description: "",
      monthly: "₹ 4.00",
      annual: "₹ 48.00",
    },
  ]);

  const handleAddComponent = (category, item) => {
    const newComponent = {
      name: item,
      description: `(${category})`,
      monthly: "₹ 0.00",
      annual: "₹ 0.00",
    };
    setSalaryComponents(prev => [...prev, newComponent]);
  };

  const handleDeleteComponent = (index) => {
    setSalaryComponents(prev => prev.filter((_, i) => i !== index));
  };

  const selectedComponents = salaryComponents.map(c => c.name);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Infosware - Salary Template:</h2>

        <div className="flex gap-2 relative">
          <SalaryComponentDropdown
            onAddComponent={handleAddComponent}
            selectedComponents={selectedComponents}
          />

          <button
            className="px-4 py-2 bg-[#FFD85F] hover:bg-yellow-500 text-black rounded-full text-sm font-medium shadow"
            onClick={() => navigate(`/companyAdmin/AddNewSalaryTemplate`)}
          >
            + Add Template
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-sm font-medium">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Salary Components</th>
              <th className="p-3 text-center">Monthly Amt.</th>
              <th className="p-3 text-center">Annual Amt.</th>
              <th className="p-3 text-center">Deductions (If any)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3 font-semibold" colSpan="4">
                Earnings
              </td>
            </tr>

            {salaryComponents.map((component, index) => (
              <tr key={index}>
                <td className="p-3">
                  <div>{component.name}</div>
                  {component.description && (
                    <div className="text-gray-500 text-xs">
                      {component.description}
                    </div>
                  )}
                </td>
                <td className="p-3 text-center">{component.monthly}</td>
                <td className="p-3 text-center">{component.annual}</td>
                <td className="p-3 text-center">
                  <span
                    className="ml-2 cursor-pointer text-gray-500 font-bold text-2xl"
                    onClick={() => handleDeleteComponent(index)}
                  >
                    x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-3 border-t border-gray-200 flex justify-between items-center text-sm font-medium">
          <div>Cost to Company</div>
          <div className="w-32 text-center">₹ 8.00</div>
          <div className="w-32 text-center">₹ 100.00</div>
          <div className="w-32 text-center">
            <span>Total Pay</span>
            <div className="text-lg font-semibold">₹ 100.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSalaryTemplate;
