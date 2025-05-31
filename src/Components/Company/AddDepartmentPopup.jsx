import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDepartmentPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    dept_name: "",
    dept_code: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        dept_name: initialData.dept_name || "",
        dept_code: initialData.dept_code || "",
      });
    } else {
      setFormData({
        dept_name: "",
        dept_code: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dept_name || !formData.dept_code) {
      setError("Department name and code are required.");
      return;
    }

    const payload = {
      ...formData,
      is_default: "no",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://www.attend-pay.com/api/auth/company/createDepartment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSubmit(response.data.data || payload); // update parent
      setFormData({ dept_name: "", dept_code: "" });
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create department. Please try again.");
    }
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
            className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer"
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
              name="dept_name"
              value={formData.dept_name}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFD85D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Department Code<span className="text-red-500">*</span>
            </label>
            <input
              name="dept_code"
              value={formData.dept_code}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFD85D]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition cursor-pointer"
          >
            {initialData ? "Update Department" : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentPopup;
