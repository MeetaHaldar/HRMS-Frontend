import React, { useState } from "react";

const ViewSalaryTemplate = () => {
  const [salaryComponents, setSalaryComponents] = useState([
    { name: "Basic", description: "(50% of Annual CTC)", monthly: "₹ 4.00", annual: "₹ 48.00" },
    { name: "Fixed Allowance", description: "", monthly: "₹ 4.00", annual: "₹ 48.00" },
  ]);

  const removeComponent = (index) => {
    const updatedComponents = salaryComponents.filter((_, i) => i !== index);
    setSalaryComponents(updatedComponents);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Infosware - Salary Template:</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-full text-sm font-medium shadow-sm hover:bg-gray-100">
            + Add Salary Component
          </button>
          <button className="px-4 py-2 bg-[#FFD85F] hover:bg-yellow-500 text-black rounded-full text-sm font-medium shadow">
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

          {/* Earning div above the table body */}
          <div className="p-3 text-center font-semibold flex flex-row">
            Earnings
          </div>

          <tbody>
            {salaryComponents.map((component, index) => (
              <tr key={index}>
                <td className="p-3">
                  <div>{component.name}</div>
                  {component.description && <div className="text-gray-500 text-xs">{component.description}</div>}
                </td>
                <td className="p-3 text-center">{component.monthly}</td>
                <td className="p-3 text-center">{component.annual}</td>
                <td className="p-3 text-center flex justify-center items-center">
                  ----
                  <span
                    className="ml-2 cursor-pointer text-red-500 font-bold"
                    onClick={() => removeComponent(index)}
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
