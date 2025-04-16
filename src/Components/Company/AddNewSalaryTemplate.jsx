import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewSalaryTemplate = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleCancel = () => {
    navigate("/salaryTemplate"); // Redirect on cancel
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
     <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
        Add New Salary Template:
        </h2>

        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex justify-center w-full rounded-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Add Salary Component ▾
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Earnings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Correction
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Benefits
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Deductions
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Reimbursements
                </a>
              </div>
            </div>
          )}
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
            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descriptions
          </label>
          <input
            type="text"
            placeholder="Max 500 characters..."
            className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <div className="flex flex-row mb-2">
          <label className="text-gray-700 mr-2 basis-1/3">Annual CTC</label>
          <div className="flex items-center bais-2/3">
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 font-medium">Earnings</td>
            </tr>
            <tr>
              <td className="py-2">Basic</td>
              <td className="py-2 text-gray-500 italic">(50% of Annual CTC)</td>
              <td className="py-2">₹ 0.00</td>
              <td className="py-2">₹ 0.00</td>
            </tr>
            <tr>
              <td className="py-2">
                Fixed Allowance
                <div className="text-xs text-gray-500">
                  Monthly CTC - Sum of all components
                </div>
              </td>
              <td className="py-2">Fixed Amount</td>
              <td className="py-2">₹ 0.00</td>
              <td className="py-2">₹ 0.00</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Cost to Company</td>
              <td></td>
              <td className="py-2 font-semibold">₹ 0.00</td>
              <td className="py-2 font-semibold">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400">Total Pay</span>
                  <span>₹ 0.00</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center p-4">
        <button className="flex items-center justify-center bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer">
          + Add Template
        </button>
        <button
          onClick={handleCancel} // trigger navigation
          className="flex items-center justify-center ml-4 w-1/9 border border-gray-300 text-gray-900 px-5 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewSalaryTemplate;
