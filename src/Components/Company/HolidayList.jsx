import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import HolidayPopup from "./HolidayPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";
import Pagination from "../Pagination";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [mode, setMode] = useState("add");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const companyId = JSON.parse(user).companyId;

    if (!token || !companyId) {
      setError("Token or company ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(
      `https://www.attend-pay.com/attendence/holidayList?company_id=${companyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setHolidays(data.data || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
        setError("Failed to load holidays.");
        setLoading(false);
      });
  }, [currentPage]);

  const handleAddClick = () => {
    setMode("add");
    setSelectedHoliday(null);
    setIsPopupOpen(true);
  };

  const handleEditClick = (holiday) => {
    setMode("edit");
    setSelectedHoliday(holiday);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = (holiday) => {
    setHolidayToDelete(holiday);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmed = () => {
    const token = localStorage.getItem("token");
    if (!token || !holidayToDelete) return;

    fetch(
      `https://www.attend-pay.com/attendence/holidayDelete?id=${holidayToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete holiday.");
        setHolidays((prev) => prev.filter((h) => h.id !== holidayToDelete.id));
        setIsDeleteConfirmOpen(false);
        setHolidayToDelete(null);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete holiday.");
      });
  };

  const handleSubmit = (formData) => {
    if (formData.id) {
      setHolidays((prev) =>
        prev.map((holiday) => (holiday.id === formData.id ? formData : holiday))
      );
    } else {
      const newId = Math.max(0, ...holidays.map((h) => h.id)) + 1;
      setHolidays((prev) => [...prev, { ...formData, id: newId }]);
    }
    setIsPopupOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Holiday's List:
        </h2>
        <button
          onClick={handleAddClick}
          className="bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold shadow-md cursor-pointer"
        >
          + Add New Holiday
        </button>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">Holidays</th>
              <th className="p-2 md:p-3">Date</th>
              <th className="p-2 md:p-3">Duration</th>
              <th className="p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : holidays.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  <img
                    src="src/assets/not.png"
                    alt="No Holidays Found"
                    className="mx-auto w-24 h-24 opacity-50"
                  />
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No holidays found
                  </p>
                </td>
              </tr>
            ) : (
              holidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{holiday.alias}</td>
                  <td className="p-2 md:p-3">
                    {formatDate(holiday.start_date)}
                  </td>
                  <td className="p-2 md:p-3">{holiday.duration_day}</td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-800 cursor-pointer"
                      onClick={() => handleEditClick(holiday)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-800 cursor-pointer"
                      onClick={() => handleDeleteClick(holiday)}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <HolidayPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedHoliday}
        mode={mode}
      />

      <DeleteConfirmationPopup
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete this holiday?"
      />
    </div>
  );
};

export default HolidayList;
