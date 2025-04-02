import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([
    {
      name: "Tech Solutions Ltd.",
      type: "IT Services",
      email: "contact@techsolutions.com",
      phone: "+1234567890",
      city: "New York",
      country: "USA",
      status: "Active",
    },
    {
      name: "Green Energy Corp.",
      type: "Renewable Energy",
      email: "info@greenenergy.com",
      phone: "+9876543210",
      city: "Berlin",
      country: "Germany",
      status: "Inactive",
    },
    {
      name: "Health First Clinic",
      type: "Healthcare",
      email: "support@healthfirst.com",
      phone: "+1122334455",
      city: "Toronto",
      country: "Canada",
      status: "Active",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/setCompanies?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data.companies);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          alert("Logged out successfully");
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm md:text-lg text-gray-600">Listed Companies:</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-lg cursor-pointer">
          + New Company
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3"><input type="checkbox" /></th>
              <th className="p-2 md:p-3">Organisation's Name</th>
              <th className="p-2 md:p-3">Type</th>
              <th className="p-2 md:p-3">Contact Info</th>
              <th className="p-2 md:p-3">City/Country</th>
              <th className="p-2 md:p-3">Status</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  <img
                    src="src/assets/not.png"
                    alt="No Companies Found"
                    className="mx-auto w-24 h-24 opacity-50"
                  />
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">No Companies found</p>
                </td>
              </tr>
            ) : (
              companies.map((org, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-2 md:p-3"><input type="checkbox" /></td>
                  <td className="p-2 md:p-3">{org.name}</td>
                  <td className="p-2 md:p-3">{org.type}</td>
                  <td className="p-2 md:p-3">{org.email}</td>
                  <td className="p-2 md:p-3">{org.city}, {org.country}</td>
                  <td className={`p-2 md:p-3 font-semibold ${org.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                    {org.status}
                  </td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-950">
                      <FaEdit />
                    </button>
                    <button className="text-gray-500 hover:text-gray-950">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-600 text-xs md:text-sm">
        <button
          className="px-2 py-1 rounded-md cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>
        <div className="flex space-x-1">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-2 py-1 rounded-md cursor-pointer ${currentPage === idx + 1 ? "bg-gray-300" : "hover:bg-gray-200"}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className="px-2 py-1 rounded-md cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>
      <div className="mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
