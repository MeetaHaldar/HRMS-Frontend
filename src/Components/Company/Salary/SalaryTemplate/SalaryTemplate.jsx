import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dev_url from "../../../../config";
import DeleteConfirmationPopup from "../../../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../../../Pagination";

export default function SalaryTemplate() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${dev_url}salary/listsalarycomponent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleEdit = (item) => {
    navigate(`/companyAdmin/viewSalaryTemplate/${item.id}`);
  };

  const handleDeleteClick = (item) => {
    setTemplateToDelete(item);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = async (item) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${dev_url}salary/deleteTemplate?id=${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setIsDeletePopupOpen(false);
    setTemplateToDelete(null);
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-500 font-semibold">
          Salary Templates:
        </h2>
        <Link to="/companyAdmin/AddNewSalaryTemplate">
          <button className="bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-4 py-2 text-sm rounded-full font-semibold cursor-pointer">
            + Add Template
          </button>
        </Link>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Template Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-yellow-600">
                  <button
                    className=" underline cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    {item.name}
                  </button>
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-gray-500 hover:text-gray-950 cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="text-gray-500 hover:text-gray-950 cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleConfirmDelete}
        data={templateToDelete}
        message="Are you sure you want to delete this template?"
      />
    </div>
  );
}
