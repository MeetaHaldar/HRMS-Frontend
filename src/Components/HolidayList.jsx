import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import HolidayPopup from "./HolidayPopup";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      name: "New Year's Day",
      date: "2025-01-01",
      duration: "1 Day",
    },
    {
      id: 2,
      name: "Independence Day",
      date: "2025-07-04",
      duration: "1 Day",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [mode, setMode] = useState("add"); // "add" or "edit"

  useEffect(() => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data.holidays || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
        setLoading(false);
        setError("Failed to load holidays.");
      });
  }, []);

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

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this holiday?"
    );
    if (confirmDelete) {
      setHolidays(holidays.filter((h) => h.id !== id));
      // TODO: API call to delete from backend
    }
  };

  const handleSubmit = (formData) => {
    if (formData.id) {
      setHolidays((prev) =>
        prev.map((holiday) => (holiday.id === formData.id ? formData : holiday))
      );
    } else {
      const newId = Math.max(...holidays.map((h) => h.id), 0) + 1;
      const newHoliday = { ...formData, id: newId };
      setHolidays((prev) => [...prev, newHoliday]);
    }
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base md:text-lg text-gray-600 uppercase font-semibold">
            Holiday's List:
          </h2>
          <button
            onClick={handleAddClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold shadow-md cursor-pointer"
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
              {holidays.length === 0 ? (
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
                        onClick={() => handleDeleteClick(holiday.id)}
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

        {/* Popup Component */}
        <HolidayPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedHoliday}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default HolidayList;
