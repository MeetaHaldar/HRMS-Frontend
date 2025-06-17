import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import RegisterCompanyPopup from "./RegisterCompanyPopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import axios from "axios";
import dev_url from "../../config";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const [companyRes, subscriptionRes] = await Promise.all([
        axios.get(`${dev_url}api/auth/company/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${dev_url}subscription/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const companyData = companyRes.data || [];
      const subscriptionData = subscriptionRes.data || [];

      setCompanies(companyData);
      setSubscriptions(subscriptionData);
      setTotalPages(companyData.totalPages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage]);

  const getSubscriptionName = (id) => {
    const sub = subscriptions.find((s) => s.id === id);
    return sub ? sub.name : "-";
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setShowPopup(true);
  };

  const handleAddClick = () => {
    setSelectedCompany(null);
    setShowPopup(true);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${dev_url}api/auth/?id=${companyToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(companies.filter((c) => c.id !== companyToDelete.id));
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
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
          className="bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={handleAddClick}
        >
          + New Company
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">Organisation's Name</th>
              <th className="p-2 md:p-3">Domain</th>
              <th className="p-2 md:p-3">City/Country</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : companies.length === 0 ? (
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
                  <td className="p-2 md:p-3">{company.name}</td>
                  <td className="p-2 md:p-3">{company.sub_domain}</td>
                  <td className="p-2 md:p-3">
                    {company.city}, {company.country}
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

      <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-[#FFD85F] text-black font-bold"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>

      {/* Register / Edit Company Popup */}
      <RegisterCompanyPopup
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          setSelectedCompany(null); // clear the form
          fetchCompanies();
        }}
        item={selectedCompany}
        onSuccess={fetchCompanies}
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={companyToDelete}
        message={`Are you sure you want to delete "${companyToDelete?.name}"?`}
      />
    </div>
  );
};

export default CompaniesList;
