import React, { useEffect, useState } from "react";

const HolidayPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    duration: "",
    id: "",
  });

  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: initialData.name || "",
        date: initialData.date || "",
        duration: initialData.duration || "",
        id: initialData.id || "",
      });
    } else {
      setFormData({
        name: "",
        date: "",
        duration: "",
        id: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-700 font-semibold">
            {isEdit ? "Edit Holiday" : "Add New Holiday"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="border-b border-gray-200 mb-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Holiday Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Holiday Name"
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Duration(Days) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="duration"
              min={1}
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g. 1 Day"
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition"
          >
            {isEdit ? "Save Changes" : "Add Holiday"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HolidayPopup;
