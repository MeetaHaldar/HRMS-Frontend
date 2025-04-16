import React, { useState, useEffect } from "react";

const AddDepartmentPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    parentCode: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        code: initialData.code || "",
        parentCode: initialData.parentCode || "",
      });
    } else {
      setFormData({
        name: "",
        code: "",
        parentCode: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.code) {
      setError("Department name and code are required.");
      return;
    }

    onSubmit(formData);
    setFormData({ name: "", code: "", parentCode: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-500 font-semibold">
            {initialData ? "Edit Department" : "Add Department"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-4xl"
          >
            &times;
          </button>
        </div>
        <hr className="mb-3 border-gray-300 w-full m-auto" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Department Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="e.g. Human Resources"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Code<span className="text-red-500">*</span>
            </label>
            <input
              name="code"
              placeholder="e.g. HR001"
              value={formData.code}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Parent Code
            </label>
            <input
              name="parentCode"
              placeholder="e.g. ADMIN01"
              value={formData.parentCode}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-yellow-300 text-gray-500 font-medium py-2 rounded-xl transition"
          >
            {initialData ? "Update Department" : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentPopup;
