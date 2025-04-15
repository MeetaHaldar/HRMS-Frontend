import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function SalaryComponent() {
  const [activeTab, setActiveTab] = useState('earnings');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Simulating fetching data for each tab from the backend
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    // Simulating API call based on the active tab
    if (activeTab === 'earnings') {
      setData([
        { id: 1, name: 'Earnings Name 1', type: 'Type 1', calculation: 'Calculation Type 1', epf: true, esi: true, status: 'active' },
        { id: 2, name: 'Earnings Name 2', type: 'Type 2', calculation: 'Calculation Type 2', epf: true, esi: false, status: 'inactive' },
      ]);
    } else if (activeTab === 'deductions') {
      setData([
        { id: 1, name: 'Deduction Name 1', type: 'Type 1', calculation: 'Calculation Type 1', epf: false, esi: false, status: 'active' },
        { id: 2, name: 'Deduction Name 2', type: 'Type 2', calculation: 'Calculation Type 2', epf: false, esi: true, status: 'inactive' },
      ]);
    } else if (activeTab === 'benefits') {
      setData([
        { id: 1, name: 'Benefit Name 1', type: 'Type 1', calculation: 'Calculation Type 1', epf: true, esi: true, status: 'active' },
        { id: 2, name: 'Benefit Name 2', type: 'Type 2', calculation: 'Calculation Type 2', epf: false, esi: true, status: 'inactive' },
      ]);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Salary Components:</h2>

        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Add Salary Component ▾
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Correction</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Benefits</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Deductions</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reimbursements</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex-1 py-6 rounded-lg font-semibold text-lg ${activeTab === 'earnings' ? 'bg-[#FFD85F] text-gray-600' : 'bg-gray-200 text-gray-500'}`}
        >
          Earnings
        </button>
        <button
          onClick={() => setActiveTab('deductions')}
          className={`flex-1 py-4 rounded-lg font-semibold text-lg ${activeTab === 'deductions' ? 'bg-[#FFD85F] text-gray-600' : 'bg-gray-200 text-gray-500'}`}
        >
          Deductions
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`flex-1 py-4 rounded-lg font-semibold text-lg ${activeTab === 'benefits' ? 'bg-[#FFD85F] text-gray-600' : 'bg-gray-200 text-gray-500'}`}
        >
          Benefits
        </button>
        <button
          onClick={() => setActiveTab('Reimbursment')}
          className={`flex-1 py-4 rounded-lg font-semibold text-lg ${activeTab === 'Reimbursment' ? 'bg-[#FFD85F] text-gray-600' : 'bg-gray-200 text-gray-500'}`}
        >
          Reimbursment
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Type</th>
              <th className="px-4 py-3 text-left">Calculation Type</th>
              <th className="px-4 py-3 text-left">Consider for EPF</th>
              <th className="px-4 py-3 text-left">Consider for ESI</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-yellow-600 underline cursor-pointer">{item.name}</td>
                <td className="px-4 py-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Type</td>
                <td className="px-4 py-2">{item.calculation}</td>
                <td className="px-4 py-2">{item.epf ? 'Consider for EPF' : '-'}</td>
                <td className="px-4 py-2">{item.esi ? 'Consider for ESI' : '-'}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-1 font-semibold ${item.status === 'active' ? 'text-green-500' : 'text-gray-600'}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-950"
                    // Replace with actual edit handler
                    onClick={() => console.log("Edit item", item)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-950"
                    // Replace with actual delete handler
                    onClick={() => console.log("Delete item", item)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
