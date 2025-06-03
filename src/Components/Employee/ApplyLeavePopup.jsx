import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplyLeavePopup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch leave categories on open
  useEffect(() => {
    if (!isOpen) return;

    const fetchLeaveCategories = async () => {
      setLoadingLeaveTypes(true);
      setFetchError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://www.attend-pay.com/api/auth/company/getallLeaveCategory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLeaveTypes(res.data.data || []);
      } catch (err) {
        console.error("Failed to load leave categories", err);
        setFetchError("Failed to load leave types. Please try again.");
      } finally {
        setLoadingLeaveTypes(false);
      }
    };

    fetchLeaveCategories();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!formData.category_id) {
      setFormError("Please select a leave type.");
      return;
    }
    if (!formData.startDate) {
      setFormError("Please select a start date.");
      return;
    }
    if (!formData.endDate) {
      setFormError("Please select an end date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < today) {
      setFormError("Start date must be today or later.");
      return;
    }

    if (start > end) {
      setFormError("Start date cannot be after end date.");
      return;
    }

    const payload = {
      category_id: parseInt(formData.category_id, 10),
      start_time: start.toISOString().split("T")[0],
      end_time: end.toISOString().split("T")[0],
      apply_reason: formData.reason.trim(),
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
      // Clear form after success
      setFormData({
        category_id: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      onClose();
    } catch (error) {
      setFormError("Failed to apply leave. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-leave-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="apply-leave-title"
            className="text-lg text-gray-500 font-semibold"
          >
            Apply for Leave
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Apply Leave Popup"
            className="text-gray-600 hover:text-gray-900 text-4xl cursor-pointer leading-none"
            type="button"
          >
            &times;
          </button>
        </div>
        <hr className="mb-3 border-gray-300 w-full m-auto" />

        {loadingLeaveTypes ? (
          <p className="text-center text-gray-500">Loading leave types...</p>
        ) : fetchError ? (
          <p className="text-center text-red-600">{fetchError}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {formError && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">
                {formError}
              </div>
            )}

            <div>
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Leave Type<span className="text-red-500">*</span>
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Leave Type --</option>
                {leaveTypes.map((leave) => (
                  <option key={leave.id} value={leave.id}>
                    {leave.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                End Date<span className="text-red-500">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-500 mb-1"
              >
                Reason<span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Type your reason..."
                value={formData.reason}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 min-h-[80px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full mt-2 ${
                submitting
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-[#FFD85F] hover:bg-yellow-500"
              } text-gray-800 font-medium py-2 rounded-xl transition shadow-md`}
            >
              {submitting ? "Applying..." : "Apply Leave"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyLeavePopup;
