import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const SalaryComponent = () => {
  const [activeTab, setActiveTab] = useState("Earnings");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const salaryComponents = [
    { name: "Name", type: "Earning Type", calculation: "Calculation Type", epf: "Consider for EPF", esi: "Consider for ESI", status: "Status" },
    { name: "Name", type: "Earning Type", calculation: "Calculation Type", epf: "Consider for EPF", esi: "Consider for ESI", status: "Status" },
    { name: "Name", type: "Earning Type", calculation: "Calculation Type", epf: "Consider for EPF", esi: "Consider for ESI", status: "Status" },
    { name: "Name", type: "Earning Type", calculation: "Calculation Type", epf: "Consider for EPF", esi: "Consider for ESI", status: "Status" }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Salary Components:</h2>

        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              + Add Salary Component
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white focus:outline-none z-10">
              <div className="py-2">
                {["Earnings", "Correction", "Benefits", "Deductions", "Reimbursements"].map(option => (
                  <button
                    key={option}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      console.log("Selected:", option);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6 mb-6">
        {["Earnings", "Deductions", "Benefits","Reimbursements"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`$ {
              activeTab === tab
                ? 'bg-yellow-400 text-gray-700 font-semibold'
                : 'bg-gray-100 text-gray-500'
            } w-56 h-14 rounded-xl shadow-sm text-lg`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Earning Type</th>
              <th className="px-4 py-2 text-left">Calculation Type</th>
              <th className="px-4 py-2 text-left">Consider for EPF</th>
              <th className="px-4 py-2 text-left">Consider for ESI</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaryComponents.map((comp, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-yellow-500 underline cursor-pointer">{comp.name}</td>
                <td className="px-4 py-2">{comp.type}</td>
                <td className="px-4 py-2">{comp.calculation}</td>
                <td className="px-4 py-2">{comp.epf}</td>
                <td className="px-4 py-2">{comp.esi}</td>
                <td className="px-4 py-2">{comp.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button><Pencil className="w-4 h-4 text-gray-600 hover:text-gray-800" /></button>
                  <button><Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryComponent;
