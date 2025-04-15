import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom'; // Import Link component for navigation

export default function SalaryTemplate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Mock data for the table
    setData([
      { id: 1, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
      { id: 2, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Inactive' },
      { id: 3, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
      { id: 4, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Inactive' },
      { id: 5, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
      { id: 6, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
      { id: 7, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Inactive' },
      { id: 8, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
      { id: 9, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Inactive' },
      { id: 10, name: 'Infosware Pvt. Ltd.', description: 'IT/ Software', status: 'Active' },
    ]);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-lg text-gray-500 font-semiboldtext-2xl font-semibold">Salary Templates:</h2>
        {/* Wrap the "Add Template" button with Link to navigate to AddNewSalaryTemplate page */}
        <Link to="/AddNewSalaryTemplate">
          <button className="inline-flex items-center bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2  text-xs md:text-sm rounded-full font-semibold cursor-pointer">
            + Add Template
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Template Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {/* Link wraps item.name to make it clickable and redirect */}
                <td className="px-4 py-2 text-yellow-600 underline cursor-pointer">
                  <Link to={`/view-salary-template/${item.id}`}>{item.name}</Link>
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">
                  <span className={`font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-950"
                    onClick={() => console.log("Edit template", item)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-950"
                    onClick={() => console.log("Delete template", item)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
        <button className="hover:underline disabled:text-gray-400" disabled={currentPage === 1}>
          &lt; Previous
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, '...', 9, 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                page === currentPage ? 'bg-yellow-300 text-black font-bold' : 'hover:bg-gray-200'
              }`}
              disabled={page === '...'}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="hover:underline disabled:text-gray-400" disabled={currentPage === 10}>
          Next &gt;
        </button>
      </div>
    </div>
  );
}
