import React, { useState, useEffect } from "react";

const AddDesignationPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    departmentCode: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        code: initialData.code || "",
        departmentCode: initialData.departmentCode || "",
      });
    } else {
      setFormData({
        title: "",
        code: "",
        departmentCode: "",
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

    if (!formData.title || !formData.code) {
      setError("Designation title and code are required.");
      return;
    }

    onSubmit(formData);
    setFormData({ title: "", code: "", departmentCode: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-500 font-semibold">
            {initialData ? "Edit Designation" : "Add Designation"}
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
              Designation Title<span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="e.g. Senior Software Engineer"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Code<span className="text-red-500">*</span>
            </label>
            <input
              name="code"
              placeholder="e.g. SSE001"
              value={formData.code}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Department Code
            </label>
            <input
              name="departmentCode"
              placeholder="e.g. ENG02"
              value={formData.departmentCode}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-yellow-300 text-gray-500 font-medium py-2 rounded-xl transition"
          >
            {initialData ? "Update Designation" : "Add Designation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDesignationPopup;
