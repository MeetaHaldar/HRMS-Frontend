import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import dev_url from "../../config";

const ApplyRegularizationPopup = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [dateOptions, setDateOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLateDates = async () => {
      setLoading(true);
      setFetchError("");
      setFormMessage("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${dev_url}attendence/lateEmployee`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dates = res.data.data || [];
        setDateOptions(dates);
      } catch (err) {
        console.error("Error fetching late dates:", err);
        setFetchError("Failed to load dates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLateDates();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");

    if (!selectedDate || !reason.trim()) {
      setFormMessage("Both fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${dev_url}attendence/regularizeLate`,
        {
          date: selectedDate,
          reason: reason.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormMessage("Regularization applied successfully.");
      setSelectedDate("");
      setReason("");
    } catch (err) {
      console.error("Submission error:", err);
      setFormMessage(
        err.response?.data?.message || "Failed to apply regularization."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Apply for Regularization
        </h2>

        <hr className="mb-5 border-gray-300" />

        {loading ? (
          <p className="text-center text-gray-500">Loading dates...</p>
        ) : fetchError ? (
          <p className="text-center text-red-600">{fetchError}</p>
        ) : dateOptions.length === 0 ? (
          <p className="text-center text-gray-500">
            There is No need to regularize as you don't have any Late yet.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {formMessage && (
              <div
                className={`text-sm px-4 py-2 rounded-xl ${
                  formMessage.toLowerCase().includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {formMessage}
              </div>
            )}

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Date<span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select a date</option>
                {dateOptions.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Reason<span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type your reason..."
                required
                className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg min-h-[80px] placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full ${
                submitting
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-[#FFD85F] hover:bg-yellow-500"
              } text-black font-semibold py-2.5 rounded-xl transition cursor-pointer`}
            >
              {submitting ? "Submitting..." : "Apply Regularization"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyRegularizationPopup;
