import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditCompanyPopup from "./EditCompanyPopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Solutions Ltd.",
      type: "IT Services",
      email: "contact@techsolutions.com",
      phone: "+1234567890",
      city: "New York",
      country: "USA",
      status: "Active",
      subdomain: "techsolutions.example.com",
      address: "123 Tech Street, New York",
      paymentMode: "Credit Card",
      maxEmployees: "100",
      adminName: "John Doe",
    },
    {
      id: 2,
      name: "Creative Minds Inc.",
      type: "Design Agency",
      email: "info@creativeminds.com",
      phone: "+9876543210",
      city: "San Francisco",
      country: "USA",
      status: "Inactive",
      subdomain: "creativeminds.example.com",
      address: "456 Design Blvd, San Francisco",
      paymentMode: "Debit Card",
      maxEmployees: "50",
      adminName: "Jane Smith",
    },
  ]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
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

  // Dummy: Load data via API (commented)
  /*
  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("/api/companies");
      const data = await res.json();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);
  */

  const handleEditClick = (company) => {
    // Optional: Fetch by ID (commented)
    /*
    const res = await fetch(`/api/companies/${company.id}`);
    const data = await res.json();
    setSelectedCompany(data);
    */
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleEditSubmit = (updatedData) => {
    // Dummy update in state (replace with PUT API later)
    const updatedList = companies.map((comp) =>
      comp.id === updatedData.id
        ? { ...comp, ...updatedData, name: updatedData.companyName }
        : comp
    );
    setCompanies(updatedList);
    setShowEditModal(false);

    // Real API call:
    /*
    await fetch(`/api/companies/${updatedData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    */
  };
  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/companies/${companyToDelete.id}`, {
        method: "DELETE",
      });
      setCompanies(companies.filter((c) => c.id !== companyToDelete.id));
      setShowDeletePopup(false);
    } catch (error) {
      console.error("Error deleting company:", error);
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Listed Companies:
        </h2>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2  text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={() => navigate("/RegisterCompany")}
        >
          + New Company
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">
                <input type="checkbox" />
              </th>
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
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No Companies found
                  </p>
                </td>
              </tr>
            ) : (
              companies.map((company, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 md:p-3">{company.name}</td>
                  <td className="p-2 md:p-3">{company.type}</td>
                  <td className="p-2 md:p-3">{company.email}</td>
                  <td className="p-2 md:p-3">
                    {company.city}, {company.country}
                  </td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      company.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {company.status}
                  </td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleEditClick(company)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleDeleteClick(company)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
              className={`px-2 py-1 rounded-md cursor-pointer ${
                currentPage === idx + 1 ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
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

      {/* Logout */}
      <div className="mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Modal Popup */}
      <EditCompanyPopup
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedCompany}
      />
      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onCancel={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        companyName={companyToDelete?.name}
      />
    </div>
  );
};

export default AdminDashboard;
