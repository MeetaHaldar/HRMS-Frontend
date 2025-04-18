import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import HolidayPopup from "./HolidayPopup";
import DeleteConfirmationPopup from "../SuperAdmin/DeleteConfirmationPopup";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([
    { id: 1, name: "New Year's Day", date: "2025-01-01", duration: "1 Day" },
    { id: 2, name: "Independence Day", date: "2025-07-04", duration: "1 Day" },
  ]);

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
    fetch(`/api/holidays?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data.holidays || []);
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
    if (holidayToDelete) {
      setHolidays((prev) => prev.filter((h) => h.id !== holidayToDelete.id));
      // TODO: Backend delete API call here
      setHolidayToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
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

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">Holiday's List:</h2>
        <button
          onClick={handleAddClick}
          className="bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold shadow-md cursor-pointer"
        >
          + Add New Holiday
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
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
                <td colSpan="4" className="text-center p-4">Loading...</td>
              </tr>
            ) : holidays.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  <img
                    src="src/assets/not.png"
                    alt="No Holidays Found"
                    className="mx-auto w-24 h-24 opacity-50"
                  />
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">No holidays found</p>
                </td>
              </tr>
            ) : (
              holidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{holiday.name}</td>
                  <td className="p-2 md:p-3">{holiday.date}</td>
                  <td className="p-2 md:p-3">{holiday.duration}</td>
                  <td className="p-2 md:p-3 flex space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleEditClick(holiday)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-950"
                      onClick={() => handleDeleteClick(holiday)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     {/* Pagination */}
     <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Previous
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, '...', 9, 10].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#FFD85F] text-black font-bold' : 'hover:bg-gray-200'}`}
              disabled={page === '...'}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="hover:underline disabled:text-gray-400"
          disabled={currentPage === 10}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next &gt;
        </button>
      </div>

      {/* Add / Edit Popup */}
      <HolidayPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedHoliday}
        mode={mode}
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete this holiday?"
      />
    </div>
  );
};

export default HolidayList;
