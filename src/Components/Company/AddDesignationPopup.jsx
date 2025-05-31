import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDesignationPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    position_name: "",
    position_code: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (initialData) {
      setFormData({
        position_name: initialData.position_name || "",
        position_code: initialData.position_code || "",
      });
    } else {
      setFormData({
        position_name: "",
        position_code: "",
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

    if (!formData.position_name.trim() || !formData.position_code.trim()) {
      setError("Both Designation Name and Designation Code are required.");
      return;
    }

    setSubmitting(true);

    try {
      let response;

      if (initialData?.id) {
        // Edit case - updatePosition
        response = await axios.put(
          `https://www.attend-pay.com/api/auth/company/updatePosition?id=${initialData.id}`,
          {
            position_name: formData.position_name,
            position_code: formData.position_code,
            is_default: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create case - createPosition
        response = await axios.post(
          "https://www.attend-pay.com/api/auth/company/createPosition",
          {
            position_name: formData.position_name,
            position_code: formData.position_code,
            is_default: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        onSubmit(response.data.data);
        setFormData({ position_name: "", position_code: "" });
        onClose();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.message || "Failed to submit designation.");
    } finally {
      setSubmitting(false);
    }
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
              Designation Name<span className="text-red-500">*</span>
            </label>
            <input
              name="position_name"
              value={formData.position_name}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Designation Code<span className="text-red-500">*</span>
            </label>
            <input
              name="position_code"
              value={formData.position_code}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full mt-2 bg-gray-200 hover:bg-yellow-300 text-gray-500 font-medium py-2 rounded-xl transition ${
              submitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {submitting
              ? initialData
                ? "Updating..."
                : "Adding..."
              : initialData
              ? "Update Designation"
              : "Add Designation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDesignationPopup;
